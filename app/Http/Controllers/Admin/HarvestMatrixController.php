<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MatrixStatusEnum;
use App\Http\Resources\HarvestMatrixCollection;
use App\Http\Resources\HarvestMatrixResource;
use App\Models\HarvestMatrix;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HarvestMatrixController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('admin/harvest-matrices/index', [
            'filters' => $request->only('search'),
            'matrices' => new HarvestMatrixCollection(
                HarvestMatrix::with(['user'])
                    ->filter($request->only('search'))
                    ->orderBy('year', 'desc')
                    ->orderBy('week_number', 'desc')
                    ->paginate(10)
                    ->appends($request->all())
            ),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        // Obtener usuarios con rol de responsable de cultivo
        $users = \App\Models\User::role('crop_manager')->get(['id', 'name']);

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
    public function show(HarvestMatrix $harvestMatrix): Response
    {
        $harvestMatrix->load(['user', 'rows.variety', 'rows.shift', 'rows.lots.lot', 'rows.lots.dailyData']);

        return Inertia::render('admin/harvest-matrices/show', [
            'matrix' => new HarvestMatrixResource($harvestMatrix),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(HarvestMatrix $harvestMatrix): Response
    {
        $harvestMatrix->load(['user', 'rows.variety', 'rows.shift', 'rows.lots.lot', 'rows.lots.dailyData']);

        // Generar fechas para la semana
        $dates = $this->generateWeekDates($harvestMatrix->year, $harvestMatrix->week_number);
        $harvestMatrix->dates = $dates;

        // Obtener todas las variedades, turnos y lotes disponibles
        $varieties = \App\Models\Variety::orderBy('name')->get();
        $shifts = \App\Models\Shift::orderBy('name')->get();
        $lots = \App\Models\Lot::orderBy('code')->get();

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
        dd($request->all());
        $validated = $request->validate([
            'rows' => 'required|array',
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
        foreach ($validated['rows'] as $rowData) {
            // Crear o actualizar la fila
            $row = $harvestMatrix->rows()->firstOrCreate(
                [
                    'variety_id' => $rowData['variety_id'],
                    'shift_id' => $rowData['shift_id'],
                ]
            );

            // Procesar lotes de esta fila
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

        return redirect()->route('admin.harvest-matrices.show', $harvestMatrix)
            ->with('success', 'Matriz de cosecha actualizada exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HarvestMatrix $harvestMatrix)
    {
        $harvestMatrix->delete();

        return redirect()->route('admin.harvest-matrices.index')
            ->with('success', 'Matriz de cosecha eliminada exitosamente.');
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
