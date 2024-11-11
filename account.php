<?php
// Database connection
$host = 'localhost';
$username = 'root';
$password = ''; // Replace with your database password if set
$dbname = 'personal_finance_db';

$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare and bind parameters
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $account_name = $_POST['account_name'] ?? null;
    $income = $_POST['income'] ?? null;
    $balance = $_POST['balance'] ?? null;
    $bank = $_POST['bank'] ?? null;

    // Validate required fields
    if ($account_name && $balance) {
        $stmt = $conn->prepare("INSERT INTO accounts (account_name, income, balance, bank) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("sdds", $account_name, $income, $balance, $bank);

        if ($stmt->execute()) {
            echo "Account added successfully!";
        } else {
            echo "Error: " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "Please provide required fields.";
    }
}

$conn->close();
?>
