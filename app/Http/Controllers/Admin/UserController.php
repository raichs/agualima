<?php

namespace App\Http\Controllers\Admin;

use App\Http\Resources\RoleResource;
use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class UserController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('admin/users/index', [
            'filters' => $request->only('search'),
            'total' => User::count(),
            'users' => new UserCollection(
                User::with('roles')
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
        return Inertia::render('admin/users/create', [
            'roles' => RoleResource::collection(Role::orderBy('name')->get()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'dni' => 'required|string|max:20|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role_id' => 'required|exists:roles,id',
        ]);

        $user = User::create([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'name' => $validated['first_name'] . ' ' . $validated['last_name'],
            'dni' => $validated['dni'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $role = Role::findById($validated['role_id']);
        $user->assignRole($role);

        return redirect()->route('admin.users.index')
            ->with('success', 'Usuario creado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user): Response
    {
        return Inertia::render('admin/users/show', [
            'user' => new UserResource($user->load('roles')),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user): Response
    {
        return Inertia::render('admin/users/edit', [
            'user' => new UserResource($user->load('roles')),
            'roles' => RoleResource::collection(Role::orderBy('name')->get()),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'dni' => 'required|string|max:20|unique:users,dni,' . $user->id,
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed',
            'role_id' => 'required|exists:roles,id',
        ]);

        $user->update([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'name' => $validated['first_name'] . ' ' . $validated['last_name'],
            'dni' => $validated['dni'],
            'email' => $validated['email'],
            'password' => isset($validated['password']) && $validated['password'] ? Hash::make($validated['password']) : $user->password,
        ]);

        // Actualizar rol
        $role = Role::findById($validated['role_id']);
        $user->syncRoles([$role]);

        return redirect()->route('admin.users.index')
            ->with('success', 'Usuario actualizado exitosamente.');
    }

    public function destroy(User $user)
    {
        if ($user->hasRole('administrador')) {
            return redirect()->route('admin.users.index')
                ->with('error', 'No se puede eliminar un usuario con rol de administrador.');
        }

        $user->delete();

        return redirect()->route('admin.users.index')
            ->with('success', 'Usuario eliminado exitosamente.');
    }

    /**
     * Reset user password.
     */
    public function resetPassword(User $user)
    {
        $newPassword = $user->dni;

        $user->update([
            'password' => Hash::make($newPassword),
        ]);

        return redirect()->route('admin.users.index')
            ->with('success', 'Contraseña restablecida exitosamente.');
    }
}
