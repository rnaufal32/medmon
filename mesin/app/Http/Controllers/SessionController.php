<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;

class SessionController extends Controller
{

    public function setCategorySession(Request $request)
    {
        $request->session()->put('category', $request->input('category'));
        return redirect()->back();
    }

    public function setDateRangeSession(Request $request)
    {
        $start = $request->input('start');
        $end = $request->input('end');

        $request->session()->put('start_date', Carbon::parse($start)->timezone("Asia/Jakarta")->format('Y-m-d'));
        $request->session()->put('end_date', Carbon::parse($end)->timezone("Asia/Jakarta")->format('Y-m-d'));

        return redirect()->back();
    }
}
