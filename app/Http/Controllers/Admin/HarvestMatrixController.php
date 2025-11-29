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
            'filters' => $request->only('search', 'status', 'year'),
            'matrices' => new HarvestMatrixCollection(
                HarvestMatrix::with(['creator'])
                    ->withCount('programming')
                    ->filter($request->only('search', 'status', 'year'))
                    ->orderBy('year', 'desc')
                    ->orderBy('week_number', 'desc')
                    ->paginate(10)
                    ->appends($request->all())
            ),
            'statuses' => collect(MatrixStatusEnum::cases())->map(fn($status) => [
                'value' => $status->value,
                'label' => $status->label(),
            ]),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        // Calcular siguiente semana
        $now = Carbon::now();
        $nextWeek = $now->copy()->addWeek();
        
        return Inertia::render('admin/harvest-matrices/create', [
            'suggestedWeek' => $nextWeek->week,
            'suggestedYear' => $nextWeek->year,
            'suggestedStartDate' => $nextWeek->startOfWeek()->format('Y-m-d'),
            'suggestedEndDate' => $nextWeek->endOfWeek()->format('Y-m-d'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'week_number' => 'required|integer|min:1|max:53',
            'year' => 'required|integer|min:2020|max:2100',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'kg_target' => 'nullable|numeric|min:0',
            'total_staff' => 'nullable|integer|min:0',
            'notes' => 'nullable|string',
        ]);

        // Verificar que no exista matriz para esa semana/año
        $exists = HarvestMatrix::where('week_number', $validated['week_number'])
            ->where('year', $validated['year'])
            ->exists();

        if ($exists) {
            return back()->withErrors([
                'week_number' => 'Ya existe una matriz para la semana ' . $validated['week_number'] . ' del año ' . $validated['year']
            ]);
        }

        $matrix = HarvestMatrix::create([
            ...$validated,
            'status' => MatrixStatusEnum::DRAFT,
            'created_by' => auth()->id(),
        ]);

        return redirect()->route('admin.harvest-matrices.show', $matrix)
            ->with('success', 'Matriz de cosecha creada exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(HarvestMatrix $harvestMatrix): Response
    {
        $harvestMatrix->load(['programming.distribution.project', 'programming.distribution.variety', 
                              'programming.distribution.shift', 'programming.distribution.lot', 'creator']);

        return Inertia::render('admin/harvest-matrices/show', [
            'matrix' => new HarvestMatrixResource($harvestMatrix),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(HarvestMatrix $harvestMatrix): Response
    {
        return Inertia::render('admin/harvest-matrices/edit', [
            'matrix' => new HarvestMatrixResource($harvestMatrix),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HarvestMatrix $harvestMatrix)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'week_number' => 'required|integer|min:1|max:53',
            'year' => 'required|integer|min:2020|max:2100',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'status' => 'required|in:draft,active,completed,cancelled',
            'kg_target' => 'nullable|numeric|min:0',
            'total_staff' => 'nullable|integer|min:0',
            'notes' => 'nullable|string',
        ]);

        // Verificar que no exista otra matriz para esa semana/año
        $exists = HarvestMatrix::where('week_number', $validated['week_number'])
            ->where('year', $validated['year'])
            ->where('id', '!=', $harvestMatrix->id)
            ->exists();

        if ($exists) {
            return back()->withErrors([
                'week_number' => 'Ya existe otra matriz para la semana ' . $validated['week_number'] . ' del año ' . $validated['year']
            ]);
        }

        $harvestMatrix->update([
            ...$validated,
            'updated_by' => auth()->id(),
        ]);

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
}
