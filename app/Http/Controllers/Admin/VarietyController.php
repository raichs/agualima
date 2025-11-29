<?php

namespace App\Http\Controllers\Admin;

use App\Http\Resources\VarietyCollection;
use App\Http\Resources\VarietyResource;
use App\Models\Variety;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VarietyController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('admin/varieties/index', [
            'filters' => $request->only('search'),
            'varieties' => new VarietyCollection(
                Variety::orderBy('id')
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
        return Inertia::render('admin/varieties/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:varieties,name',
        ]);

        Variety::create($validated);

        return redirect()->route('admin.varieties.index')
            ->with('success', 'Variedad creada exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Variety $variety): Response
    {
        return Inertia::render('admin/varieties/show', [
            'variety' => new VarietyResource($variety),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Variety $variety): Response
    {
        return Inertia::render('admin/varieties/edit', [
            'variety' => new VarietyResource($variety),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Variety $variety)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:varieties,name,' . $variety->id,
        ]);

        $variety->update($validated);

        return redirect()->route('admin.varieties.index')
            ->with('success', 'Variedad actualizada exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Variety $variety)
    {
        $variety->delete();

        return redirect()->route('admin.varieties.index')
            ->with('success', 'Variedad eliminada exitosamente.');
    }
}
