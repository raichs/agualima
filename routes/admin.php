<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\VarietyController;
use App\Http\Controllers\Admin\ShiftController;
use App\Http\Controllers\Admin\LotController;
use App\Http\Controllers\Admin\DistributionController;
use App\Http\Controllers\Admin\HarvestMatrixController;
use App\Http\Controllers\Admin\NurseryController;

Route::prefix('admin')->as('admin.')->middleware(['auth', 'verified'])->group(function () {

    Route::get('/', function () {
        return redirect()->route('dashboard');
    });

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resources([
        'projects' => ProjectController::class,
        'roles' => RoleController::class,
        'users' => UserController::class,
        'varieties' => VarietyController::class,
        'shifts' => ShiftController::class,
        'lots' => LotController::class,
        'distributions' => DistributionController::class,
        'harvest-matrices' => HarvestMatrixController::class,
    ]);

    Route::resource('nurseries', NurseryController::class)->parameters([
        'nurseries' => 'nursery'
    ]);

    // Additional user routes
    Route::post('users/{user}/reset-password', [UserController::class, 'resetPassword'])->name('users.reset-password');
});
