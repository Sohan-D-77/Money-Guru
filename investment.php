<?php
// investment.php

// Database connection
$host = 'localhost';
$username = 'root';  // Replace with your MySQL username
$password = '';      // Replace with your MySQL password
$dbname = 'personal_finance_db';  // Your database name

// Create connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form is submitted via POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize form inputs
    $type = $_POST['type'] ?? '';
    $date = $_POST['date'] ?? '';
    $amount = $_POST['amount'] ?? 0;
    $returns = $_POST['returns'] ?? 0;
    $description = $_POST['description'] ?? '';

    // Prepare SQL statement
    $sql = "INSERT INTO investments (type, date, amount, returns, description) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    // Bind parameters and execute query
    if ($stmt) {
        $stmt->bind_param("ssdds", $type, $date, $amount, $returns, $description);
        if ($stmt->execute()) {
            echo "Investment saved successfully!";
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
