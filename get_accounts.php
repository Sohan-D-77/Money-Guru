<?php
$connection = new mysqli("localhost", "root", "", "personal_finance_db");
if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

$sql = "SELECT * FROM accounts";
$result = $connection->query($sql);

$accounts = [];
while ($row = $result->fetch_assoc()) {
    $accounts[] = $row;
}

echo json_encode($accounts);
$connection->close();
?>
