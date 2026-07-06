<?php

namespace App\Services;

class LoanCalculationService
{
    /**
     * Calculate Loan EMI and generate amortization schedule.
     *
     * @param float $principal
     * @param float $annualRate
     * @param int $tenureMonths
     * @return array
     */
    public function calculate(float $principal, float $annualRate, int $tenureMonths): array
    {


        // Monthly interest rate R = Annual Rate / 12 / 100
        $monthlyRate = $annualRate / 12 / 100;

        // If interest rate is 0, EMI is simply principal / tenure
        if ($monthlyRate == 0.0) {
            $emi = $principal / $tenureMonths;
        } else {
            $emi = ($principal * $monthlyRate * pow(1 + $monthlyRate, $tenureMonths)) / (pow(1 + $monthlyRate, $tenureMonths) - 1);
        }

        $schedule = [];
        $remainingBalance = $principal;

        for ($month = 1; $month <= $tenureMonths; $month++) {
            // Interest paid this month = remaining balance * monthly rate (unrounded)
            $interestPaid = $remainingBalance * $monthlyRate;

            if ($month === $tenureMonths) {
                // For the last month, principal paid is exactly the remaining balance to reach 0.00
                $principalPaid = $remainingBalance;
                $remainingBalance = 0.0;
            } else {
                $principalPaid = $emi - $interestPaid;
                $remainingBalance -= $principalPaid;
            }

            $schedule[] = [
                'month' => $month,
                'principal_paid' => round($principalPaid, 2),
                'interest_paid' => round($interestPaid, 2),
                'balance' => round($remainingBalance, 2),
            ];
        }

        // Sum of all schedule payments to get exact total payment and interest
        $totalPayment = array_sum(array_map(fn($item) => $item['principal_paid'] + $item['interest_paid'], $schedule));
        $totalInterest = $totalPayment - $principal;

        return [
            'emi' => round($emi, 2),
            'total_interest' => round($totalInterest, 2),
            'total_payment' => round($totalPayment, 2),
            'schedule' => $schedule,
        ];
    }
}
