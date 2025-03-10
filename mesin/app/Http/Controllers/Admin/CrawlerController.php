<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CrawlerDetailJob;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CrawlerController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        return Inertia::render('Admin/Crawler/Index', [
            'crawlers' => fn() => CrawlerDetailJob::query()
                ->where('status', 'pending')
                ->where('type', 'sosmed')
                ->when($search, function ($query, $search) {
                    return $query->where('title', 'like', '%' . $search . '%')
                        ->where('description', 'like', '%' . $search . '%');
                })
                ->paginate(10),
        ]);
    }
}
