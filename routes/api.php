<?php

use App\Http\Controllers\LoanController;
use Illuminate\Support\Facades\Route;

Route::post('/loan/calculate', [LoanController::class, 'calculate']);
