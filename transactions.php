<?php
// transactions.php

// Database connection settings
$host = 'localhost';
$username = 'root';  // Replace with your MySQL username
$password = '';      // Replace with your MySQL password
$dbname = 'personal_finance_db';  // Replace with your database name

// Create connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form is submitted via POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize form inputs
    $transaction_id = $_POST['transaction_id'] ?? '';
    $amount = $_POST['amount'] ?? 0;
    $date = $_POST['date'] ?? '';
    $description = $_POST['description'] ?? '';

    // Prepare SQL query
    $sql = "INSERT INTO transactions (transaction_id, amount, date, description) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    // Bind parameters and execute the query
    if ($stmt) {
        $stmt->bind_param("sdss", $transaction_id, $amount, $date, $description);
        if ($stmt->execute()) {
            echo "Transaction saved successfully!";
        } else {
            echo "Error: " . $stmt->error;
        }
        $stmt->close();
    } else {
        echo "Error preparing statement: " . $conn->error;
    }
} else {
    echo "Invalid request method.";
}

$conn->close();
?>
