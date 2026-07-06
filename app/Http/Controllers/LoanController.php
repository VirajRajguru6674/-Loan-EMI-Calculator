<?php

namespace App\Http\Controllers;

use App\Http\Requests\CalculateLoanRequest;
use App\Services\LoanCalculationService;
use Illuminate\Http\JsonResponse;

class LoanController extends Controller
{
    protected LoanCalculationService $calculationService;

    public function __construct(LoanCalculationService $calculationService)
    {
        $this->calculationService = $calculationService;
    }

    /**
     * Calculate loan EMI and repayment schedule.
     *
     * @param CalculateLoanRequest $request
     * @return JsonResponse
     */
    public function calculate(CalculateLoanRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $result = $this->calculationService->calculate(
            (float) $validated['principal'],
            (float) $validated['annual_rate'],
            (int) $validated['tenure_months']
        );

        return response()->json($result);
    }
}
