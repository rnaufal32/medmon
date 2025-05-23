<?php

namespace App\Http\Controllers\Client;

use App\Exports\WordCloudExport;
use App\Http\Controllers\Controller;
use App\Models\BlockWord;
use App\Models\MediaNews;
use App\Models\SocialPost;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use WordCounter\WordCounter;
use Carbon\CarbonPeriod;

class DashboardController extends Controller
{

    private $user;

    public function __construct()
    {
        $this->user = Auth::user();
    }

    private function globalChart($type, $startDate, $endDate)
    {
        $now = $endDate;
        $now7 = $startDate->copy();
        $dates = collect([]);

        while ($now7 <= $now) {
            $dates->push($now7->toDateString());
            $now7->addDay();
        }

        if ($type == 'News') {
            $globalAnalyticNews = DB::table('media_news')
                ->join('media_user_target', 'media_user_target.id_news', '=', 'media_news.id')
                ->join('user_targets', 'user_targets.id', '=', 'media_user_target.id_user_target')
                ->join('target_type', 'user_targets.type', '=', 'target_type.id')
                ->selectRaw('COUNT(*) AS jml, target_type.name, DATE(date) AS newDate, target_type.color')
                ->where('user_targets.id_user', $this->user->id)
                ->whereDate('media_news.created_at', '>=', $startDate->toDateString())
                ->whereDate('media_news.created_at', '<=', $endDate->toDateString())
                ->groupBy('target_type.id', 'newDate')
                ->get();

            $globalAnalyticNewsData = $globalAnalyticNews->groupBy('name')->map(function ($items, $name) {
                return [
                    'label' => $name,
                    'color' => $items->first()->color,
                    'data' => $items->pluck('jml')->toArray(),
                ];
            })->values()->toArray();

            return [
                'labels' => $dates->toArray(),
                'datasets' => $globalAnalyticNewsData,
            ];
        } else {
            $globalAnalytic = DB::table('social_posts')
                ->join('user_targets', 'user_targets.id', '=', 'social_posts.id_user_target')
                ->join('target_type', 'user_targets.type', '=', 'target_type.id')
                ->selectRaw('target_type.name, DATE(date) AS newDate, COUNT(*) AS jml')
                ->where('user_targets.id_user', $this->user->id)
                ->whereDate('date', '>=', $startDate->toDateString())
                ->whereDate('date', '<=', $endDate->toDateString())
                ->groupBy('target_type.id', 'newDate')
                ->get()
                ->groupBy('name')
                ->map(function ($items, $name) use ($dates) {
                    $data = $dates->mapWithKeys(function ($date) use ($items) {
                        $item = $items->firstWhere('newDate', $date);
                        return [$date => $item ? $item->jml : 0];
                    });
                    return [
                        'label' => $name,
                        'data' => $data->values()->toArray(),
                    ];
                })->values()->toArray();

            return [
                'labels' => $dates->toArray(),
                'datasets' => $globalAnalytic,
            ];
        }
    }

    private function totalTopic($type, $startDate, $endDate)
    {
        if ($type == "News") {
            $totalAnalytic = DB::table('media_news')
                ->join('media_user_target', 'media_user_target.id_news', '=', 'media_news.id')
                ->join('user_targets', 'user_targets.id', '=', 'media_user_target.id_user_target')
                ->join('target_type', 'user_targets.type', '=', 'target_type.id')
                ->selectRaw('COUNT(*) AS jml, target_type.name, target_type.color')
                ->where('user_targets.id_user', $this->user->id)
                ->whereDate('media_news.created_at', '>=', $startDate->toDateString())
                ->whereDate('media_news.created_at', '<=', $endDate->toDateString())
                ->groupBy('target_type.id')
                ->get();

            return [
                'labels' => $totalAnalytic->pluck('name')->toArray(),
                'datasets' => [
                    [
                        'data' => $totalAnalytic->pluck('jml')->toArray(),
                    ]
                ]
            ];
        } else {
            $totalAnalytic = DB::table('social_posts')
                ->join('user_targets', 'user_targets.id', '=', 'social_posts.id_user_target')
                ->join('target_type', 'user_targets.type', '=', 'target_type.id')
                ->selectRaw('COUNT(*) AS jml, target_type.name, target_type.color')
                ->where('user_targets.id_user', $this->user->id)
                ->whereDate('date', '>=', $startDate->toDateString())
                ->whereDate('date', '<=', $endDate->toDateString())
                ->groupBy('target_type.id')
                ->get();

            return [
                'labels' => $totalAnalytic->pluck('name')->toArray(),
                'datasets' => [
                    [
                        'data' => $totalAnalytic->pluck('jml')->toArray(),
                    ]
                ]
            ];
        }
    }

    private function sentiment($type, $startDate, $endDate)
    {
        if ($type == "News") {
            $sentimentAnalytic = DB::table('media_news')
                ->join('media_user_target', 'media_user_target.id_news', '=', 'media_news.id')
                ->join('user_targets', 'user_targets.id', '=', 'media_user_target.id_user_target')
                ->join('target_type', 'user_targets.type', '=', 'target_type.id')
                ->selectRaw('target_type.name')
                ->selectRaw('SUM(IF(sentiment = "positive", 1, 0)) AS positive')
                ->selectRaw('SUM(IF(sentiment = "negative", 1, 0)) AS negative')
                ->selectRaw('SUM(IF(sentiment = "neutral", 1, 0)) AS neutral')
                ->where('user_targets.id_user', $this->user->id)
                ->whereDate('media_news.created_at', '>=', $startDate->toDateString())
                ->whereDate('media_news.created_at', '<=', $endDate->toDateString())
                ->groupBy('target_type.id')
                ->get();

            return [
                'labels' => $sentimentAnalytic->pluck('name')->toArray(),
                'datasets' => [
                    [
                        'label' => 'Positive',
                        'data' => $sentimentAnalytic->pluck('positive')->toArray(),
                        'backgroundColor' => ['green'],
                    ],
                    [
                        'label' => 'Negative',
                        'data' => $sentimentAnalytic->pluck('negative')->toArray(),
                        'backgroundColor' => ['red'],
                    ],
                    [
                        'label' => 'Neutral',
                        'data' => $sentimentAnalytic->pluck('neutral')->toArray(),
                        'backgroundColor' => ['gray'],
                    ],
                ]
            ];
        } else {
            $sentimentAnalytic = DB::table('social_posts')
                ->join('user_targets', 'user_targets.id', '=', 'social_posts.id_user_target')
                ->join('target_type', 'user_targets.type', '=', 'target_type.id')
                ->selectRaw('target_type.name')
                ->selectRaw('SUM(IF(sentiment = "positive", 1, 0)) AS positive')
                ->selectRaw('SUM(IF(sentiment = "negative", 1, 0)) AS negative')
                ->selectRaw('SUM(IF(sentiment = "neutral", 1, 0)) AS neutral')
                ->where('user_targets.id_user', $this->user->id)
                ->whereDate('date', '>=', $startDate->toDateString())
                ->whereDate('date', '<=', $endDate->toDateString())
                ->groupBy('target_type.id')
                ->get();

            return [
                'labels' => $sentimentAnalytic->pluck('name')->toArray(),
                'datasets' => [
                    [
                        'label' => 'Positive',
                        'data' => $sentimentAnalytic->pluck('positive')->toArray(),
                        'backgroundColor' => ['green'],
                    ],
                    [
                        'label' => 'Negative',
                        'data' => $sentimentAnalytic->pluck('negative')->toArray(),
                        'backgroundColor' => ['red'],
                    ],
                    [
                        'label' => 'Neutral',
                        'data' => $sentimentAnalytic->pluck('neutral')->toArray(),
                        'backgroundColor' => ['gray'],
                    ],
                ]
            ];
        }
    }

    private function wordCloud($type, $startDate, $endDate)
    {
        $skipWords = BlockWord::all()->pluck('name')->toArray();
        $socialCaption = SocialPost::query()
            ->join('user_targets', 'user_targets.id', '=', 'social_posts.id_user_target')
            ->where('user_targets.id_user', $this->user->id)
            ->whereDate('date', '>=', $startDate->toDateString())
            ->whereDate('date', '<=', $endDate->toDateString())
            ->get();
        $captionWordCloud = new WordCounter($socialCaption->pluck('caption')->join(''));
        $captionWordCloud->skipWords($skipWords);
//        $captionWordCloud->limit(15);
        $captionWordCloud = $captionWordCloud->get();
        $captionWordCloud = array_map(function ($key, $value) {
            return [
                'text' => $key,
                'value' => $value
            ];
        }, array_keys($captionWordCloud), $captionWordCloud);

        return $captionWordCloud;
    }

    public function exportWordCloud(Request $request)
    {
        $startDate = Carbon::parse($request->input('startDate', now()->subDays(7)->toDateString()));
        $endDate = Carbon::parse($request->input('endDate', now()->toDateString()));

        return Excel::download(new WordCloudExport($this->user, $startDate, $endDate), "word-cloud-$startDate-$endDate" . time() . ".xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    public function newsGlobalChart($idUser, $startDate, $endDate)
    {
        $allRelevantTypeNames = DB::table('user_targets as ut')
            ->join('target_type as tt', 'ut.type', '=', 'tt.id')
            ->where('ut.id_user', '=', $idUser)
            ->distinct()
            ->orderBy('tt.name', 'asc')
            ->pluck('tt.name') // Mengambil hanya kolom tt.name
            ->all(); // Mengubah collection menjadi array

        // 3. Mengambil data agregat dari database
        $query = DB::table('media_news as mn')
            ->join('media_user_target as mut', 'mn.id', '=', 'mut.id_news')
            ->join('user_targets as ut', function ($join) use ($idUser) {
                $join->on('mut.id_user_target', '=', 'ut.id')
                    ->where('ut.id_user', '=', $idUser);
            })
            ->join('target_type as tt', 'ut.type', '=', 'tt.id') // JOIN ke target_type
            ->select(
                DB::raw('DATE(mn.date) as report_date'),
                'tt.name as type_name', // Gunakan tt.name sebagai type_name
                DB::raw('COUNT(mn.id) as news_count')
            )
            ->whereRaw('DATE(mn.date) BETWEEN ? AND ?', [
                $startDate->format('Y-m-d'),
                $endDate->format('Y-m-d')
            ])
            ->groupBy('report_date', 'tt.name') // Group by tanggal dan tt.name
            ->orderBy('report_date', 'asc')
            ->orderBy('tt.name', 'asc'); // Order by tt.name

        $rawData = $query->get();

        // 4. Pre-proses data dari DB untuk lookup yang lebih mudah
        $processedDbData = [];
        foreach ($rawData as $row) {
            $processedDbData[$row->report_date][$row->type_name] = $row->news_count;
        }

        // 5. Buat rentang tanggal (CarbonPeriod)
        $period = CarbonPeriod::create($startDate, $endDate);

        // 6. Bangun data chart akhir
        $chartData = [];

        foreach ($period as $date) {
            $currentDateString = $date->format('Y-m-d');
            $dailyData = ['date' => $currentDateString];

            // Untuk setiap nama TIPE TARGET yang relevan untuk user ini
            foreach ($allRelevantTypeNames as $typeName) {
                // Cek apakah ada data untuk tanggal dan TIPE TARGET ini
                if (isset($processedDbData[$currentDateString][$typeName])) {
                    $dailyData[$typeName] = (int)$processedDbData[$currentDateString][$typeName];
                } else {
                    // Jika tidak ada data, set count menjadi [0]
                    $dailyData[$typeName] = 0;
                }
            }

            // Hanya tambahkan ke chart jika ada tipe target yang relevan,
            // atau jika Anda ingin selalu menyertakan tanggal bahkan jika user tidak punya tipe target.
            if (!empty($allRelevantTypeNames)) {
                $chartData[] = $dailyData;
            } else if (empty($allRelevantTypeNames) && $period->count() > 0) {
                // Jika user tidak memiliki target_type sama sekali,
                // kita kirim array tanggal saja (atau bisa juga array kosong).
                // $chartData[] = ['date' => $currentDateString]; // Baris ini akan menghasilkan [{"date":"..."}]
            }
        }

        // Jika $allRelevantTypeNames kosong (user tidak punya target/tipe target)
        // dan $chartData masih kosong, kita mungkin ingin mengembalikan array tanggal saja.
        if (empty($allRelevantTypeNames) && empty($chartData) && $period->count() > 0) {
            foreach ($period as $date) {
                $chartData[] = ['date' => $date->format('Y-m-d')];
            }
        }

        return $chartData;
    }

    public function newsTopicChart($idUser, $startDate, $endDate)
    {
        $relevantTypesInfo = DB::table('user_targets as ut')
            ->join('target_type as tt', 'ut.type', '=', 'tt.id')
            ->where('ut.id_user', '=', $idUser)
            ->select('tt.name as type_name', 'tt.color as type_color') // Pilih nama dan warna
            ->distinct() // Pastikan kombinasi nama & warna unik jika ada duplikasi data aneh
            ->orderBy('tt.name', 'asc')
            ->get(); // Mengambil Collection of Objects

        // Jika user tidak memiliki target_type sama sekali, kembalikan array kosong.
        if ($relevantTypesInfo->isEmpty()) {
            return response()->json([]);
        }

        // 3. Mengambil data agregat (total count) dari database
        $aggregatedDataQuery = DB::table('media_news as mn')
            ->join('media_user_target as mut', 'mn.id', '=', 'mut.id_news')
            ->join('user_targets as ut', function ($join) use ($idUser) {
                $join->on('mut.id_user_target', '=', 'ut.id')
                    ->where('ut.id_user', '=', $idUser);
            })
            ->join('target_type as tt', 'ut.type', '=', 'tt.id')
            ->select(
                'tt.name as type_name', // Kita tetap butuh type_name untuk grouping dan lookup
                DB::raw('COUNT(mn.id) as total_news_count')
            )
            ->whereRaw('DATE(mn.date) BETWEEN ? AND ?', [
                $startDate->format('Y-m-d'),
                $endDate->format('Y-m-d')
            ])
            ->groupBy('tt.id', 'tt.name') // Group by ID dan nama tipe
            ->orderBy('tt.name', 'asc');

        $rawData = $aggregatedDataQuery->get();

        // 4. Pre-proses hasil query database (jumlah berita) ke dalam lookup array
        $dbCounts = [];
        foreach ($rawData as $row) {
            $dbCounts[$row->type_name] = $row->total_news_count;
        }

        // 5. Bangun data ringkasan akhir dengan format baru
        $summaryData = [];
        // Iterasi melalui informasi tipe yang relevan (yang sudah ada nama dan warnanya)
        foreach ($relevantTypesInfo as $typeInfo) {
            $typeName = $typeInfo->type_name;
            $typeColor = $typeInfo->type_color; // Ambil warna dari hasil query $relevantTypesInfo

            $count = isset($dbCounts[$typeName]) ? (int)$dbCounts[$typeName] : 0;

            $summaryData[] = [
                'target_type_name' => $typeName,
                'total_news_count' => $count,
                'fill' => $typeColor // Gunakan nilai dari kolom target_type.color
            ];
        }

        return $summaryData;
    }

    public function index(Request $request)
    {
        $this->user = Auth::user();

        if ($this->user->hasRole('Admin') || $this->user->hasRole('Super Admin')) {

            return Inertia::render('Admin/Dashboard/Index', [
                'totalNews' => fn() => MediaNews::count(),
                'todayNews' => fn() => MediaNews::whereDate('date', now()->toDateString())->count(),
                'totalSocial' => fn() => SocialPost::count(),
                'todaySocial' => fn() => SocialPost::whereDate('date', now()->toDateString())->count(),
                'latestNews' => fn() => MediaNews::with(['userTargets.userTarget.user'])->limit(5)->orderByDesc('created_at')->get(),
                'todayAnalytic' => function () {
                    $response = User::select('id', 'name')->withCount([
                        'target' => function ($query) {
                            $query->whereHas('mediaUserTargets', function ($query) {
                                $query->whereHas('news', function ($query) {
                                    $query->whereDate('date', now()->toDateString());
                                });
                            });
                        }
                    ])->where('status', '1')
                        ->where('type', 'client')
                        ->get();

                    return [
                        'labels' => $response->pluck('name')->toArray(),
                        'data' => $response->pluck('target_count')->toArray(),
                    ];
                },
            ]);

        }

        $category = session()->get('category');

        return Inertia::render('Client/Dashboard', [
            'global_analytic' => fn() => $this->newsGlobalChart(
                $this->user->id,
                Carbon::parse($request->session()->get('start_date')),
                Carbon::parse($request->session()->get('end_date')),
            ),
            'topic_analytic' => fn() => $this->newsTopicChart(
                $this->user->id,
                Carbon::parse($request->session()->get('start_date')),
                Carbon::parse($request->session()->get('end_date')),
            ),
        ]);
    }
}
