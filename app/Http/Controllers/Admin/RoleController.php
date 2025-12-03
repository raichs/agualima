<?php

namespace App\Http\Controllers\Admin;

use App\Http\Resources\RoleCollection;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Role;

class RoleController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $query = Role::orderBy('id')
            ->when($request->input('search'), function ($query, $search) {
                $query->where('name', 'like', "%{$search}%");
            });

        return Inertia::render('admin/roles/index', [
            'filters' => $request->only('search'),
            'total' => Role::count(),
            'roles' => new RoleCollection(
                $query->paginate()
                    ->appends($request->all())
            ),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('admin/roles/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'display_name' => 'required|string|max:255',
            'description' => 'nullable|string|max:500',
        ]);

        // Generate system name from display_name
        $validated['name'] = $this->generateSystemName($validated['display_name']);

        // Check if name is unique
        $request->validate([
            'name' => 'unique:roles,name',
        ]);

        Role::create($validated);

        return redirect()->route('admin.roles.index')
            ->with('success', 'Rol creado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role): Response
    {
        return Inertia::render('admin/roles/show', [
            'role' => new \App\Http\Resources\RoleResource($role),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role): Response
    {
        return Inertia::render('admin/roles/edit', [
            'role' => new \App\Http\Resources\RoleResource($role),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Role $role)
    {
        $validated = $request->validate([
            'display_name' => 'required|string|max:255',
            'description' => 'nullable|string|max:500',
        ]);

        // Generate system name from display_name
        $validated['name'] = $this->generateSystemName($validated['display_name']);

        // Check if name is unique (excluding current role)
        $request->validate([
            'name' => 'unique:roles,name,' . $role->id,
        ]);

        $role->update($validated);

        return redirect()->route('admin.roles.index')
            ->with('success', 'Rol actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        if ($role->users()->count() > 0) {
            return redirect()->route('admin.roles.index')
                ->with('error', 'No se puede eliminar el rol porque tiene usuarios asignados.');
        }

        $role->delete();

        return redirect()->route('admin.roles.index')
            ->with('success', 'Rol eliminado exitosamente.');
    }

    /**
     * Generate system name from display name
     */
    private function generateSystemName(string $displayName): string
    {
        return strtolower(
            preg_replace('/[^a-zA-Z0-9_]/', '', str_replace(' ', '_', $displayName))
        );
    }
}
