<?php

namespace App\Http\Controllers;

use App\Models\NewsSource;
use App\Models\User;
use App\Models\UserValue;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsSourceController extends Controller
{
    public function store(Request $request)
    {
        $id = $request->input('id');
        $tier = $request->input('tier');

        NewsSource::find($id)->update([
            'tier' => $tier
        ]);

        session()->flash('success', 'News source tier updated successfully');
    }

    public function index(Request $request)
    {
        $user = $request->input('user');

        return Inertia::render('Admin/Source/News/Index', [
            'users' => fn() => User::query()
                ->select('id', 'name')
                ->where('type', 'client')
                ->where('status', '1')->get(),
            'user_value' => Inertia::lazy(function () use ($user) {
                if ($user) {
                    return UserValue::query()
                        ->where('id_user', $user)
                        ->get();
                }
                return null;
            }),
            'news_sources' => fn() => NewsSource::query()
                ->select('id', 'name', 'site', 'tier')
                ->paginate(10)
        ]);
    }
}
