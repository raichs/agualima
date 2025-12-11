<?php

namespace App\Http\Middleware;

use App\Http\Controllers\Admin\MenuController;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class ShareMenus
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check()) {
            $menuController = new MenuController();
            $menus = $menuController->getMenus();

            Inertia::share('menus', $menus);
        }

        return $next($request);
    }
}
