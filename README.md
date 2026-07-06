# Loan EMI Calculator

A simple, clean, full-stack Loan EMI Calculator built with a Laravel API backend and React frontend.

---

## 🛠️ Setup & Installation Instructions

Follow these steps to set up and run the application locally on your machine.

### 1. Backend Setup
1.  **Install Composer Dependencies:**
    ```bash
    composer install
    ```
2.  **Environment Setup (Env Setup):**
    Copy `.env.example` to create your `.env` file:
    ```bash
    cp .env.example .env
    ```
3.  **Generate Application Key:**
    ```bash
    php artisan key:generate
    ```
4.  **How to Run (Backend):**
    Start the Laravel development server:
    ```bash
    php artisan serve
    ```
    *The API will run at `http://127.0.0.1:8000`.*

### 2. Frontend Setup
1.  **Install NPM Dependencies:**
    ```bash
    npm install
    ```
2.  **How to Run (Frontend):**
    Start the Vite development server:
    ```bash
    npm run dev
    ```
    *Alternatively, you can compile assets for production:*
    ```bash
    npm run build
    ```

### 3. Running Tests
Run the automated test cases with:
```bash
php artisan test
```

---

## 📝 Assumptions & Trade-offs

### Assumptions
*   **Mathematical Precision:** The monthly interest rate is computed as $r = \text{annual\_rate} \div 12 \div 100$. During the amortization schedule generation loop, we keep all intermediate interest, principal, and remaining balance calculations as **unrounded floats** to prevent cumulative rounding errors. We only round values to 2 decimal places at the final output serialization stage.
*   **Dynamic Dates:** The repayment schedule months are dynamically formatted (e.g., "Jul 2026", "Aug 2026") starting from the current date rather than showing simple indexes ("Month 1", "Month 2").

### Trade-offs
*   **In-Memory Calculations:** As allowed under Section 7 of the task specifications, we process and return the calculation results instantly from memory rather than persisting them to a database.
*   **Visual Polish:** While pixel-perfect design was not strictly required, we chose to implement a responsive, modern card layout with label icons and a loading state transition to ensure the application meets professional usability standards.
# -Loan-EMI-Calculator
