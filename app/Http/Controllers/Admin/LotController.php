<?php

namespace App\Http\Controllers\Admin;

use App\Http\Resources\LotCollection;
use App\Http\Resources\LotResource;
use App\Models\Lot;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LotController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('admin/lots/index', [
            'filters' => $request->only('search'),
            'lots' => new LotCollection(
                Lot::orderBy('id')
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
        return Inertia::render('admin/lots/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:255|unique:lots,code',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:500',
        ]);

        Lot::create($validated);

        return redirect()->route('admin.lots.index')
            ->with('success', 'Lote creado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Lot $lot): Response
    {
        return Inertia::render('admin/lots/show', [
            'lot' => new LotResource($lot),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Lot $lot): Response
    {
        return Inertia::render('admin/lots/edit', [
            'lot' => new LotResource($lot),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Lot $lot)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:255|unique:lots,code,' . $lot->id,
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:500',
        ]);

        $lot->update($validated);

        return redirect()->route('admin.lots.index')
            ->with('success', 'Lote actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lot $lot)
    {
        $lot->delete();

        return redirect()->route('admin.lots.index')
            ->with('success', 'Lote eliminado exitosamente.');
    }
}
