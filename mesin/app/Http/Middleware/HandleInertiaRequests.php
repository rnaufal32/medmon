<?php

namespace App\Http\Middleware;

use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $menus = [];
        $roles = [];
        $permissions = [];

        if (Auth::user()) {
            $user = Auth::user();
            $roles = $user->getRoleNames();
            $permissions = $user->getPermissionNames();
            $menus = Menu::query()->where('type', 'menu')->orderBy('position')->get()->map(function ($menu) use ($user) {
                if ($user->can($menu->permission)) {
                    return [
                        'title' => $menu->name,
                        'type' => $menu->type,
                        'is_active' => \Illuminate\Support\Facades\Route::is($menu->menu_all),
                        'url' => $menu->route != null ? route($menu->route) : null,
                        'icon' => $menu->icon,
                    ];
                }
                return null;
            })->filter()->values()->toArray();

        }

        return [
            ...parent::share($request),
            'auth' => fn() => $request->user() ? [
                'user' => $request->user()->only('name', 'dashboard_logo'),
                'roles' => $roles,
                'permissions' => $permissions,
                'menus' => $menus,
            ] : null,
            'flash' => [
                'message' => fn() => $request->session()->get('message'),
                'success' => fn() => $request->session()->get('success'),
                'error' => fn() => $request->session()->get('error'),
            ],
            'urls' => [
                'query' => $request->query(),
                'params' => $request->route()->parameters(),
            ]
        ];
    }
}
