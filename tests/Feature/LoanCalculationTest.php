<?php

namespace Tests\Feature;

use Tests\TestCase;

class LoanCalculationTest extends TestCase
{
    /**
     * Test successful loan calculation with valid inputs.
     */
    public function test_successful_loan_calculation(): void
    {
        $response = $this->postJson('/api/loan/calculate', [
            'principal' => 500000,
            'annual_rate' => 10.5,
            'tenure_months' => 24,
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'emi',
                'total_interest',
                'total_payment',
                'schedule' => [
                    '*' => [
                        'month',
                        'principal_paid',
                        'interest_paid',
                        'balance',
                    ]
                ]
            ])
            ->assertJson([
                'emi' => 23188.02,
                'total_interest' => 56512.50,
                'total_payment' => 556512.50,
            ]);

        // Check if schedule has exactly 24 months
        $this->assertCount(24, $response->json('schedule'));

        // Check first month values
        $this->assertEquals(1, $response->json('schedule.0.month'));
        $this->assertEquals(4375.00, $response->json('schedule.0.interest_paid'));
        $this->assertEquals(18813.02, $response->json('schedule.0.principal_paid'));
        $this->assertEquals(481186.98, $response->json('schedule.0.balance'));

        // Check last month values (balance should be 0.0)
        $this->assertEquals(24, $response->json('schedule.23.month'));
        $this->assertEquals(0.0, $response->json('schedule.23.balance'));
    }

    /**
     * Test calculation fails validation when inputs are invalid.
     */
    public function test_loan_calculation_validation_fails(): void
    {
        $response = $this->postJson('/api/loan/calculate', [
            'principal' => 500, // min is 1000
            'annual_rate' => 55, // max is 50
            'tenure_months' => 0, // min is 1
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['principal', 'annual_rate', 'tenure_months']);
    }
}
