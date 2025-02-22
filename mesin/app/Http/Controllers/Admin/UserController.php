<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserTarget;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class UserController extends Controller
{
    public function update(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'id' => 'required|integer',
            'keywords' => 'required|string',
            'kata_kunci' => 'required|string',
            'includes' => 'string|nullable',
            'excludes' => 'string|nullable',
            'status' => 'required|integer',
        ]);

        if ($validate->errors()) {
            session()->flash('error', $validate->errors()->first());
            return;
        }

        session()->flash('success', 'Target has been updated');
    }

    public function index(Request $request)
    {
        $user = $request->input('user');

        return Inertia::render('Admin/Users/Index', [
            'users' => User::query()
                ->where('status', '1')
                ->where('type', 'client')
                ->select('id', 'name')
                ->get(),
            'targets' => function () use ($user) {
                if (empty($user)) {
                    return null;
                }

                return UserTarget::query()
                    ->join('target_type', 'target_type.id', '=', 'user_targets.type')
                    ->where('id_user', $user)
                    ->select('user_targets.id', 'user_targets.name', 'target_type.name as category', 'user_targets.keywords', 'user_targets.kata_kunci', 'user_targets.includes', 'user_targets.excludes', 'user_targets.status')
                    ->get();
            },
        ]);
    }
}
