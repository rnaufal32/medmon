<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Auth;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    private $user;

    public function __construct() {
        $this->user = Auth::user();
    }

    public function exportToExcel() {
        return [];   
    }
}
