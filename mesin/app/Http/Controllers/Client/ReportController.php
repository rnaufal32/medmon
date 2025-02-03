<?php

namespace App\Http\Controllers\Client;

use App\Exports\AnalyticExport;
use App\Http\Controllers\Controller;
use Auth;
use DB;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class ReportController extends Controller
{
    private $user;

    public function __construct() {
        $this->user = Auth::user();
    }

    public function reportView() {
        $targets = DB::table('target_type')
                    ->join('user_targets', 'user_targets.type', '=', 'target_type.id')
                    ->selectRaw('target_type.*')
                    ->where('user_targets.id_user', $this->user->id)
                    ->groupBy('target_type.id')
                    ->get();

        return Inertia::render('Client/Report', [
            'targets'   => $targets,
        ]);
    }

    public function exportToExcel() {
        return Excel::download(new AnalyticExport, time() . "-analytics_sample.xlsx");
    }
}
