<?php

namespace App\Http\Controllers\Admin;

use App\Http\Resources\ShiftCollection;
use App\Http\Resources\ShiftResource;
use App\Models\Shift;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ShiftController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('admin/shifts/index', [
            'filters' => $request->only('search'),
            'shifts' => new ShiftCollection(
                Shift::orderBy('id')
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
        return Inertia::render('admin/shifts/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:shifts,name',
        ]);

        Shift::create($validated);

        return redirect()->route('admin.shifts.index')
            ->with('success', 'Turno creado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Shift $shift): Response
    {
        return Inertia::render('admin/shifts/show', [
            'shift' => new ShiftResource($shift),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Shift $shift): Response
    {
        return Inertia::render('admin/shifts/edit', [
            'shift' => new ShiftResource($shift),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Shift $shift)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:shifts,name,' . $shift->id,
        ]);

        $shift->update($validated);

        return redirect()->route('admin.shifts.index')
            ->with('success', 'Turno actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Shift $shift)
    {
        $shift->delete();

        return redirect()->route('admin.shifts.index')
            ->with('success', 'Turno eliminado exitosamente.');
    }
}
