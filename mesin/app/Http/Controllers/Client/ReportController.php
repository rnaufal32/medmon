<?php

namespace App\Http\Controllers\Client;

use App\Exports\AnalyticExport;
use App\Http\Controllers\Controller;
use Auth;
use Carbon\Carbon;
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

        return Inertia::render('Client/Excel', [
            'targets'   => $targets,
        ]);
    }

    public function exportToExcel(Request $request) {
        $startDate  = Carbon::parse($request->input('start_date', now()->subDays(7)->toDateString()))->toDateString();
        $endDate    = Carbon::parse($request->input('end_date', now()->toDateString()))->toDateString();
        $target     = $request->input('target', null);
        $sentiment  = $request->input('sentiment', null);
        $source     = $request->input('source', 'News');
        $platforms  = $request->input('platforms', '');

        $platformIds = explode(',', $platforms);

        $targetName = "";
        if($target) {
            $targetName = DB::table('target_type')
            ->join('user_targets', 'user_targets.type', '=', 'target_type.id')
            ->selectRaw('name')
            ->where('user_targets.id_user', $this->user->id)
            ->where('id', $target)
            ->groupBy('target_type.id')
            ->first();
        }

        return Excel::download(new AnalyticExport($this->user, $source, $target, $sentiment, $startDate, $endDate, $platformIds),  "report-analytic-$startDate-$endDate-$targetName-$source-".($sentiment ? "$sentiment-" : "") .time(). ".xlsx");
    }
}
