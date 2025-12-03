<?php

namespace App\Http\Controllers\Admin;

use App\Http\Resources\DistributionCollection;
use App\Http\Resources\DistributionResource;
use App\Models\Distribution;
use App\Models\Project;
use App\Models\Variety;
use App\Models\Shift;
use App\Models\Lot;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DistributionController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('admin/distributions/index', [
            'filters' => $request->only('search'),
            'total' => Distribution::count(),
            'distributions' => new DistributionCollection(
                Distribution::with(['project', 'variety', 'shift', 'lot'])
                    ->orderBy('id')
                    ->filter($request->only('search'))
                    ->paginate()
                    ->appends($request->all())
            ),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('admin/distributions/create', [
            'projects' => Project::orderBy('name')->get(['id', 'name']),
            'varieties' => Variety::orderBy('name')->get(['id', 'name']),
            'shifts' => Shift::orderBy('name')->get(['id', 'name']),
            'lots' => Lot::orderBy('code')->get(['id', 'code', 'name']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'variety_id' => 'required|exists:varieties,id',
            'shift_id' => 'required|exists:shifts,id',
            'lot_id' => 'required|exists:lots,id',
            'total_area' => 'nullable|numeric|min:0',
            'campaign_number' => 'nullable|integer|min:0',
            'density' => 'nullable|numeric|min:0',
            'planting_date' => 'nullable|date',
            'pruning_date' => 'nullable|date',
        ]);

        // Verificar si ya existe esta combinación
        $exists = Distribution::where([
            ['project_id', $validated['project_id']],
            ['variety_id', $validated['variety_id']],
            ['shift_id', $validated['shift_id']],
            ['lot_id', $validated['lot_id']],
        ])->exists();

        if ($exists) {
            return back()->withErrors([
                'combination' => 'Esta combinación de proyecto, variedad, turno y lote ya existe.'
            ])->withInput();
        }

        Distribution::create($validated);

        return redirect()->route('admin.distributions.index')
            ->with('success', 'Distribución creada exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Distribution $distribution): Response
    {
        $distribution->load(['project', 'variety', 'shift', 'lot']);

        return Inertia::render('admin/distributions/show', [
            'distribution' => new DistributionResource($distribution),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Distribution $distribution): Response
    {
        $distribution->load(['project', 'variety', 'shift', 'lot']);

        return Inertia::render('admin/distributions/edit', [
            'distribution' => new DistributionResource($distribution),
            'projects' => Project::orderBy('name')->get(['id', 'name']),
            'varieties' => Variety::orderBy('name')->get(['id', 'name']),
            'shifts' => Shift::orderBy('name')->get(['id', 'name']),
            'lots' => Lot::orderBy('code')->get(['id', 'code', 'name']),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Distribution $distribution)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'variety_id' => 'required|exists:varieties,id',
            'shift_id' => 'required|exists:shifts,id',
            'lot_id' => 'required|exists:lots,id',
            'total_area' => 'nullable|numeric|min:0',
            'campaign_number' => 'nullable|integer|min:0',
            'density' => 'nullable|numeric|min:0',
            'planting_date' => 'nullable|date',
            'pruning_date' => 'nullable|date',
        ]);

        // Verificar si ya existe esta combinación (excepto el registro actual)
        $exists = Distribution::where([
            ['project_id', $validated['project_id']],
            ['variety_id', $validated['variety_id']],
            ['shift_id', $validated['shift_id']],
            ['lot_id', $validated['lot_id']],
            ['id', '!=', $distribution->id],
        ])->exists();

        if ($exists) {
            return back()->withErrors([
                'combination' => 'Esta combinación de proyecto, variedad, turno y lote ya existe.'
            ])->withInput();
        }

        $distribution->update($validated);

        return redirect()->route('admin.distributions.index')
            ->with('success', 'Distribución actualizada exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Distribution $distribution)
    {
        $distribution->delete();

        return redirect()->route('admin.distributions.index')
            ->with('success', 'Distribución eliminada exitosamente.');
    }
}
