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
use App\Http\Controllers\Admin\MenuController;
use App\Http\Controllers\Admin\CampaignController;

Route::prefix('admin')->as('admin.')->middleware(['auth', 'verified', 'ShareMenus'])->group(function () {

    Route::get('/', function () {
        return redirect()->route('admin.dashboard');
    });

    Route::get('/dashboard', [DashboardController::class, 'index'])->middleware('permission:view_dashboard')->name('dashboard');

    Route::get('/menus', [MenuController::class, 'index'])->name('menus.index');

    Route::resource('roles', RoleController::class)->middleware('permission:view_roles');
    Route::resource('users', UserController::class)->middleware('permission:view_users');
    Route::resource('nurseries', NurseryController::class)->parameters([
        'nurseries' => 'nursery'
    ])->middleware('permission:view_nurseries');
    Route::resource('projects', ProjectController::class)->middleware('permission:view_projects');
    Route::resource('varieties', VarietyController::class)->middleware('permission:view_varieties');
    Route::resource('shifts', ShiftController::class)->middleware('permission:view_shifts');
    Route::resource('lots', LotController::class)->middleware('permission:view_lots');
    Route::resource('distributions', DistributionController::class)->middleware('permission:view_distributions');
    Route::resource('harvest-matrices', HarvestMatrixController::class)->middleware('permission:view_harvest_matrices');
    Route::resource('campaigns', CampaignController::class)->middleware('permission:view_campaigns');

    // Additional user routes
    Route::post('users/{user}/reset-password', [UserController::class, 'resetPassword'])->middleware('permission:view_users')->name('users.reset-password');
    Route::post('users/{user}/toggle-active', [UserController::class, 'toggleActive'])->middleware('permission:view_users')->name('users.toggle-active');
});
