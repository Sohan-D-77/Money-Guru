<?php
// expense.php

// Database connection
$host = 'localhost';
$username = 'root'; // Change 'root' if you have a different username
$password = ''; // Leave empty if there is no password in XAMPP
$dbname = 'personal_finance_db'; // Make sure this is the correct database name

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve and sanitize form inputs
$type = $_POST['type'] ?? '';
$expense_id = $_POST['expense_id'] ?? '';
$date = $_POST['date'] ?? '';
$amount = $_POST['amount'] ?? 0;
$description = $_POST['description'] ?? '';

// Prepare and execute the SQL statement
$sql = "INSERT INTO expenses (type, expense_id, date, amount, description) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssds", $type, $expense_id, $date, $amount, $description);

if ($stmt->execute()) {
    echo "Expense saved successfully!";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
