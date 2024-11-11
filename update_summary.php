<?php
$servername = "localhost";
$username = "root"; // DB username
$password = ""; // DB password
$dbname = "personal_finance_db"; // DB name

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Calculate totals from each relevant table
$totalIncomeQuery = "SELECT SUM(amount) AS total_income FROM transactions WHERE amount > 0";
$totalIncomeResult = $conn->query($totalIncomeQuery);
$total_income = ($totalIncomeResult->num_rows > 0) ? $totalIncomeResult->fetch_assoc()['total_income'] : 0;

$totalExpensesQuery = "SELECT SUM(amount) AS total_expenses FROM transactions WHERE amount < 0";
$totalExpensesResult = $conn->query($totalExpensesQuery);
$total_expenses = ($totalExpensesResult->num_rows > 0) ? abs($totalExpensesResult->fetch_assoc()['total_expenses']) : 0;

$totalInvestmentsQuery = "SELECT SUM(amount) AS total_investments FROM investments";
$totalInvestmentsResult = $conn->query($totalInvestmentsQuery);
$total_investments = ($totalInvestmentsResult->num_rows > 0) ? $totalInvestmentsResult->fetch_assoc()['total_investments'] : 0;

$totalBudgetQuery = "SELECT SUM(amount) AS total_budget FROM budgets";
$totalBudgetResult = $conn->query($totalBudgetQuery);
$total_budget = ($totalBudgetResult->num_rows > 0) ? $totalBudgetResult->fetch_assoc()['total_budget'] : 0;

$total_balance = $total_income - $total_expenses;

// Update summary table
$updateQuery = "REPLACE INTO summary (summary_id, total_income, total_expenses, total_balance, total_budget, total_investments) 
                VALUES (1, '$total_income', '$total_expenses', '$total_balance', '$total_budget', '$total_investments')";
$conn->query($updateQuery);

$conn->close();
?>
