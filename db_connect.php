<?php
$servername = "localhost";  // Server name, usually "localhost"
$username = "root";         // MySQL username (default for XAMPP is "root")
$password = "";             // MySQL password (default for XAMPP is an empty string)
$dbname = "personal_finance_db";  // Database name (change to your actual database name)

// Create the connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
