<?php
// Database connection configuration
$host = "localhost";
$dbname = "personal_finance_db";
$username = "root";
$password = "";

// Create connection
$connection = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}
?>
