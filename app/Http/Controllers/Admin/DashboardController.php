<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends BaseController
{

    public function index()
    {
        return Inertia::render('admin/dashboard/index');
    }
}
