<?php
include('db_connect.php');  // Assuming db_connect.php contains the database connection code

// Fetch total income
$sql = "SELECT SUM(income) AS total_income FROM accounts";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$total_income = $row['total_income']; // Store total income

// Fetch total expenses
$sql = "SELECT SUM(amount) AS total_expenses FROM expenses";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$totalExpenses = $row['total_expenses']; // Store total expenses

// Fetch total investments
$sql = "SELECT SUM(amount) AS total_investments FROM investments";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$totalInvestments = $row['total_investments']; // Store total investments

// Fetch total balance
$sql = "SELECT SUM(balance) AS total_balance FROM accounts";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$balance = $row['total_balance']; // Store total balance

// Tax calculation
$taxPercentage = isset($_POST['taxPercentage']) ? (float)$_POST['taxPercentage'] : 15;  // Predefined 15% tax
$grossIncome = $total_income;
$taxAmount = ($taxPercentage / 100) * $grossIncome;
$netIncome = $grossIncome - $taxAmount;

// Close the database connection
$conn->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Summary - Personal Finance Management</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-900 text-white flex justify-center items-center min-h-screen">
    <header class="flex justify-between items-center w-full max-w-4xl p-4 bg-gray-800 shadow-md rounded-lg mt-8 mx-auto">
        <a href="index.html">
            <img src="logoo.png" alt="Logo" class="h-12 rounded-lg">
        </a>
        <h1 class="text-3xl font-bold text-gold">Financial Summary</h1>
        <a href="user.html">
            <img src="user.png" alt="User Icon" class="user-icon">
        </a>
    </header>

    <main class="container mx-auto max-w-4xl p-6 bg-gray-800 shadow-lg rounded-lg my-10">
        <div class="grid md:grid-cols-2 gap-6">
            <!-- Financial Overview Card -->
            <section class="glass-card">
                <h2 class="text-2xl font-bold text-gold mb-4">Financial Overview</h2>
                <div id="financial-summary" class="space-y-4 text-gray-300">
                    <p>Total Income: <?php echo "$" . number_format($total_income, 2); ?></p>
                    <p>Total Expenses: <?php echo number_format($totalExpenses, 2); ?></p>
                    <p>Total Investments: <?php echo number_format($totalInvestments, 2); ?></p>
                    <p>Total Balance: <?php echo number_format($balance, 2); ?></p>
                </div>
                
            </section>
            

            <!-- Tax Calculator Card -->
            <section class="glass-card">
                <h2 class="text-2xl font-bold text-gold mb-4">Tax Summary</h2>
                <div class="tax-results mt-4 p-4 bg-gray-700 rounded-md">
                    <h3 class="font-semibold text-gray-400 mb-2">Tax Summary</h3>
                    <p>Gross Income: $<?php echo number_format($grossIncome, 2); ?></p>
                    <p>Tax Amount (15%): $<?php echo number_format($taxAmount, 2); ?></p>
                    <p>Net Income: $<?php echo number_format($netIncome, 2); ?></p>
                </div>
            </section>
        </div>

        <!-- Action Buttons -->
        <div class="mt-6 flex justify-center space-x-4">
            <a href="transactions.html" class="back-button bg-green-600 hover:bg-green-700">View All Transactions</a>
            <a href="reports.html" class="back-button bg-purple-600 hover:bg-purple-700">Generate Reports</a>
        </div>
    </main>
</body>
</html>
