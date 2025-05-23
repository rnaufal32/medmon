<?php

namespace App\Http\Middleware;

use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
            ],
            'category' => $request->session()->get('category') ?? 'news',
            'date' => [
                'start' => $request->session()->get('start_date') ?? now()->subDays(7),
                'end' => $request->session()->get('end_date') ?? now(),
            ],
            'user_targets' => function () use ($request) {
                if ($request->user()) {
                    $idUser = $request->user()->id;
                    $userTargetsFromDb = DB::table('user_targets as ut')
                        ->join('target_type as tt', 'ut.type', '=', 'tt.id')
                        ->where('ut.id_user', '=', $idUser)
                        ->select(
                            'ut.id as user_target_id',
                            'ut.name as user_target_name',
                            // Kolom lain dari ut yang mungkin ingin Anda tampilkan per target
                            // 'ut.keywords',
                            // 'ut.status',
                            'tt.id as target_type_id', // ID dari target_type
                            'tt.name as target_type_name',
                            'tt.color as target_type_color',
                            'tt.id_parent as target_type_id_parent' // Jika ada parent
                        )
                        ->orderBy('tt.name', 'asc') // Urutkan berdasarkan nama tipe dulu
                        ->orderBy('ut.name', 'asc') // Kemudian berdasarkan nama target
                        ->get();

                    if ($userTargetsFromDb->isEmpty()) {
                        return response()->json([
                            'message' => 'Tidak ada data target untuk user ini.',
                            'data' => []
                        ], 404); // Bisa juga 200 dengan data kosong jika lebih disukai
                    }

                    // 3. Mengelompokkan hasil di sisi aplikasi (PHP)
                    $groupedData = [];
                    foreach ($userTargetsFromDb as $target) {
                        // Buat key untuk grup jika belum ada
                        if (!isset($groupedData[$target->target_type_name])) {
                            $groupedData[$target->target_type_name] = [
                                'target_type_name' => $target->target_type_name,
                                'target_type_color' => $target->target_type_color,
                            ];
                        }

                    }

                    // Mengubah array asosiatif $groupedData menjadi array numerik untuk output JSON
                    $finalGroupedResult = array_values($groupedData);
                    return $finalGroupedResult;
                }
                return [];
            }
        ];
    }
}
