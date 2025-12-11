<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class MenuController extends Controller
{
    public function getMenus()
    {
        $user = Auth::user();

        $menus = Menu::active()
            ->root()
            ->ordered()
            ->get()
            ->filter(function ($menu) use ($user) {
                return $this->hasPermission($menu, $user);
            })
            ->map(function ($menu) use ($user) {
                return $this->buildMenuTree($menu, $user);
            })
            ->values()
            ->toArray();

        // Filter out titles that have no accessible non-title menus after them
        $filtered = [];
        $hasAccessibleAfter = false;
        for ($i = count($menus) - 1; $i >= 0; $i--) {
            $menu = $menus[$i];
            if (!$menu['is_title']) {
                $hasAccessibleAfter = true;
                $filtered[] = $menu;
            } elseif ($hasAccessibleAfter) {
                $filtered[] = $menu;
                $hasAccessibleAfter = false;
            }
        }
        $filtered = array_reverse($filtered);

        return $filtered;
    }

    /**
     * @param Menu $menu
     * @param User $user
     */
    private function hasPermission($menu, $user)
    {
        if (!$menu->permission) {
            return true;
        }

        return $user->can($menu->permission);
    }

    /**
     * @param Menu $menu
     * @param User $user
     */
    private function buildMenuTree($menu, $user)
    {
        $data = $menu->only(['key', 'label', 'icon', 'url', 'is_title', 'badge', 'badge_icon', 'target', 'is_disabled']);

        if ($menu->children->isNotEmpty()) {
            $children = $menu->children->filter(function ($child) use ($user) {
                return $this->hasPermission($child, $user);
            })->map(function ($child) use ($user, $menu) {
                $childData = $this->buildMenuTree($child, $user);
                $childData['parent_key'] = $menu->key;
                return $childData;
            });

            if ($children->isNotEmpty()) {
                $data['children'] = $children->values();
            }
        }

        return $data;
    }
}
