<?php
// Database connection
$host = 'localhost';
$username = 'root';
$password = ''; // Replace with your MySQL password if set
$dbname = 'personal_finance_db'; // Replace with your database name

$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Insert budget data into the database
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $category = $_POST['category'] ?? '';
    $amount = $_POST['amount'] ?? 0;

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO budgets (category, amount) VALUES (?, ?)");
    $stmt->bind_param("sd", $category, $amount);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Budget added successfully!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
    }

    $stmt->close();
}

$conn->close();
?>
