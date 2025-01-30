<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SelectTypeMediaController extends Controller
{
    public function store(Request $request)
    {
        $request->session()->flash('type', $request->input('type'));

        return redirect()->back();
    }
}
