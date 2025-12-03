<?php

namespace App\Http\Controllers\Admin;

use App\Http\Resources\CountryResource;
use App\Http\Resources\NurseryCollection;
use App\Http\Resources\NurseryResource;
use App\Models\Country;
use App\Models\Nursery;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NurseryController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('admin/nurseries/index', [
            'filters' => $request->only('search'),
            'total' => Nursery::count(),
            'nurseries' => new NurseryCollection(
                Nursery::with('country')
                    ->orderBy('id')
                    ->when($request->input('search'), function ($query, $search) {
                        $query->where('name', 'like', "%{$search}%")
                            ->orWhere('description', 'like', "%{$search}%");
                    })
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
        return Inertia::render('admin/nurseries/create', [
            'countries' => CountryResource::collection(Country::orderBy('name')->get()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'country_id' => 'required|exists:countries,id',
        ]);

        Nursery::create($validated);

        return redirect()->route('admin.nurseries.index')
            ->with('success', 'Vivero creado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Nursery $nursery): Response
    {
        return Inertia::render('admin/nurseries/show', [
            'nursery' => new NurseryResource($nursery->load('country')),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Nursery $nursery): Response
    {
        return Inertia::render('admin/nurseries/edit', [
            'nursery' => new NurseryResource($nursery->load('country')),
            'countries' => CountryResource::collection(Country::orderBy('name')->get()),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Nursery $nursery)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'country_id' => 'required|exists:countries,id',
        ]);

        $nursery->update($validated);

        return redirect()->route('admin.nurseries.index')
            ->with('success', 'Vivero actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Nursery $nursery)
    {
        $nursery->delete();

        return redirect()->route('admin.nurseries.index')
            ->with('success', 'Vivero eliminado exitosamente.');
    }
}
