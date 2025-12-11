<?php

namespace App\Http\Controllers\Admin;

use App\Enums\RoleEnum;
use App\Http\Resources\HarvestMatrixCollection;
use App\Http\Resources\HarvestMatrixResource;
use App\Models\HarvestMatrix;
use App\Models\Lot;
use App\Models\Shift;
use App\Models\User;
use App\Models\Variety;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class HarvestMatrixController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $currentUser = Auth::user();
        $query = HarvestMatrix::with(['user'])
            ->filter($request->only('search'))
            ->orderBy('year', 'desc')
            ->orderBy('week_number', 'desc');

        if ($currentUser->hasRole(RoleEnum::CROP_MANAGER->value)) {
            $query->where('user_id', $currentUser->id);
        }

        return Inertia::render('admin/harvest-matrices/index', [
            'filters' => $request->only('search'),
            'total' => $query->count(),
            'matrices' => new HarvestMatrixCollection(
                $query->paginate(10)->appends($request->all())
            ),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $currentUser = Auth::user();

        if ($currentUser->hasRole(RoleEnum::CROP_MANAGER->value)) {
            $users = collect([$currentUser]);
        } else {
            $users = User::role(RoleEnum::CROP_MANAGER->value)->get(['id', 'name']);
        }

        return Inertia::render('admin/harvest-matrices/create', [
            'users' => $users,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'week_number' => 'required|integer|min:1|max:53',
            'year' => 'required|integer|min:2020|max:2100',
            'user_id' => 'required|exists:users,id',
        ]);

        // Verificar que no exista matriz para esa semana/año/usuario
        $exists = HarvestMatrix::where('week_number', $validated['week_number'])
            ->where('year', $validated['year'])
            ->where('user_id', $validated['user_id'])
            ->exists();

        if ($exists) {
            return back()->withErrors([
                'week_number' => 'Ya existe una matriz para la semana ' . $validated['week_number'] . ' del año ' . $validated['year'] . ' para este usuario'
            ]);
        }

        $matrix = HarvestMatrix::create($validated);

        return redirect()->route('admin.harvest-matrices.edit', $matrix)
            ->with('success', 'Matriz de cosecha creada exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(HarvestMatrix $harvestMatrix)
    {
        $currentUser = Auth::user();

        if (!$this->canAccessMatrix($harvestMatrix, $currentUser)) {
            return redirect()->route('admin.harvest-matrices.index')->with('error', 'No tienes permisos para ver esta matriz.');
        }

        $harvestMatrix->load(['user', 'rows.variety', 'rows.shift', 'rows.lots.lot', 'rows.lots.dailyData']);

        return Inertia::render('admin/harvest-matrices/show', [
            'matrix' => new HarvestMatrixResource($harvestMatrix),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(HarvestMatrix $harvestMatrix)
    {
        $currentUser = Auth::user();

        if (!$this->canAccessMatrix($harvestMatrix, $currentUser)) {
            return redirect()->route('admin.harvest-matrices.index')->with('error', 'No tienes permisos para editar esta matriz.');
        }

        $harvestMatrix->load(['user', 'rows.variety', 'rows.shift', 'rows.lots.lot', 'rows.lots.dailyData']);

        // Generar fechas para la semana
        $dates = $this->generateWeekDates($harvestMatrix->year, $harvestMatrix->week_number);
        $harvestMatrix->dates = $dates;

        // Obtener todas las variedades, turnos y lotes disponibles
        $varieties = Variety::orderBy('name')->get();
        $shifts = Shift::orderBy('name')->get();
        $lots = Lot::orderBy('code')->get();

        return Inertia::render('admin/harvest-matrices/edit', [
            'matrix' => new HarvestMatrixResource($harvestMatrix),
            'varieties' => $varieties,
            'shifts' => $shifts,
            'lots' => $lots,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HarvestMatrix $harvestMatrix)
    {
        $currentUser = Auth::user();

        if (!$this->canAccessMatrix($harvestMatrix, $currentUser)) {
            return redirect()->route('admin.harvest-matrices.index')->with('error', 'No tienes permisos para editar esta matriz.');
        }

        $validated = $request->validate([
            'rows' => 'required|array',
            'rows.*.id' => 'nullable|exists:harvest_matrix_rows,id',
            'rows.*.variety_id' => 'required|exists:varieties,id',
            'rows.*.shift_id' => 'required|exists:shifts,id',
            'rows.*.lots' => 'required|array',
            'rows.*.lots.*.lot_id' => 'required|exists:lots,id',
            'rows.*.lots.*.lines' => 'required|integer|min:1',
            'rows.*.lots.*.total_kilos' => 'required|numeric|min:0',
            'rows.*.lots.*.kg_per_shift_avg' => 'required|numeric|min:0',
            'rows.*.lots.*.total_shifts' => 'required|integer|min:0',
            'rows.*.lots.*.daily_data' => 'required|array',
            'rows.*.lots.*.daily_data.*.day_of_week' => 'required|integer|min:1|max:6',
            'rows.*.lots.*.daily_data.*.date' => 'required|date',
            'rows.*.lots.*.daily_data.*.frequency' => 'required|numeric|min:0',
            'rows.*.lots.*.daily_data.*.kg_per_day' => 'required|numeric|min:0',
            'rows.*.lots.*.daily_data.*.shifts' => 'required|integer|min:0',
        ]);

        // Procesar cada fila
        $sentRowIds = collect($validated['rows'])->pluck('id')->filter()->toArray();
        foreach ($validated['rows'] as $rowData) {
            if (isset($rowData['id'])) {
                $row = $harvestMatrix->rows()->find($rowData['id']);
                if ($row) {
                    $row->update([
                        'variety_id' => $rowData['variety_id'],
                        'shift_id' => $rowData['shift_id'],
                    ]);
                } else {
                    // If id not found, create new
                    $row = $harvestMatrix->rows()->create([
                        'variety_id' => $rowData['variety_id'],
                        'shift_id' => $rowData['shift_id'],
                    ]);
                }
            } else {
                $row = $harvestMatrix->rows()->create([
                    'variety_id' => $rowData['variety_id'],
                    'shift_id' => $rowData['shift_id'],
                ]);
            }

            // Procesar lotes de esta fila
            // Primero eliminar datos diarios de los lotes existentes
            $row->lots->each(function ($lot) {
                $lot->dailyData()->delete();
            });
            $row->lots()->delete(); // Limpiar lotes existentes
            foreach ($rowData['lots'] as $lotData) {
                $lot = $row->lots()->create([
                    'lot_id' => $lotData['lot_id'],
                    'lines' => $lotData['lines'],
                    'total_kilos' => $lotData['total_kilos'],
                    'kg_per_shift_avg' => $lotData['kg_per_shift_avg'],
                    'total_shifts' => $lotData['total_shifts'],
                ]);

                // Crear datos diarios para este lote
                foreach ($lotData['daily_data'] as $dailyData) {
                    $lot->dailyData()->create($dailyData);
                }

                // Ya no necesitamos calcular totales automáticamente
                // $this->calculateLotTotals($lot);
            }

            // Calcular totales para la fila (suma de todos sus lotes)
            $this->calculateRowTotals($row);
        }

        // Eliminar filas que no están en los datos enviados
        $harvestMatrix->rows()->whereNotIn('id', $sentRowIds)->each(function ($row) {
            $row->lots->each(function ($lot) {
                $lot->dailyData()->delete();
            });
            $row->lots()->delete();
            $row->delete();
        });

        return redirect()->route('admin.harvest-matrices.index')
            ->with('success', 'Matriz de cosecha actualizada exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HarvestMatrix $harvestMatrix)
    {
        $currentUser = Auth::user();

        if (!$this->canAccessMatrix($harvestMatrix, $currentUser)) {
            return redirect()->route('admin.harvest-matrices.index')->with('error', 'No tienes permisos para eliminar esta matriz.');
        }

        $harvestMatrix->delete();

        return redirect()->route('admin.harvest-matrices.index')
            ->with('success', 'Matriz de cosecha eliminada exitosamente.');
    }

    /**
     * Check if user can access the matrix
     */
    private function canAccessMatrix(HarvestMatrix $matrix, $user): bool
    {
        if ($user->hasRole(RoleEnum::CROP_MANAGER->value)) {
            return $matrix->user_id === $user->id;
        }
        return true;
    }

    /**
     * Calcular totales para una fila
     */
    private function calculateRowTotals($row)
    {
        $totalKilos = 0;
        $totalKgPerShiftAvg = 0;
        $totalShifts = 0;

        // Sumar totales de todos los lotes de la fila
        foreach ($row->lots as $lot) {
            $totalKilos += $lot->total_kilos;
            $totalKgPerShiftAvg += $lot->kg_per_shift_avg;
            $totalShifts += $lot->total_shifts;
        }

        $row->update([
            'total_kilos' => $totalKilos,
            'kg_per_shift_avg' => $totalKgPerShiftAvg,
            'total_shifts' => $totalShifts,
        ]);
    }

    /**
     * Calcular totales para un lote
     */
    private function calculateLotTotals($lot)
    {
        $dailyData = $lot->dailyData;
        $totalKilos = $dailyData->sum(function ($data) {
            return $data->frequency * $data->kg_per_day;
        });

        $totalFrequency = $dailyData->sum('frequency');
        $totalShifts = $dailyData->sum('shifts');

        $lot->update([
            'total_kilos' => $totalKilos,
            'total_frequency' => $totalFrequency,
            'total_shifts' => $totalShifts,
        ]);
    }

    /**
     * Generar fechas para una semana específica
     */
    private function generateWeekDates(int $year, int $weekNumber): array
    {
        // Crear fecha del primer día de la semana (lunes) usando setISODate
        // setISODate establece el año ISO, semana ISO y día de la semana (1 = Lunes)
        $monday = Carbon::now()->setISODate($year, $weekNumber, 1);

        $dates = [];
        for ($i = 0; $i < 6; $i++) { // Lunes a sábado
            $currentDate = $monday->copy()->addDays($i);
            $dates[] = [
                'day_of_week' => $i + 1,
                'date' => $currentDate->format('Y-m-d'),
                'day_name' => $currentDate->locale('es')->dayName,
            ];
        }

        return $dates;
    }
}
