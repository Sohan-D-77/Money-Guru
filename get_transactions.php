<?php
include 'db_connect.php';

$sql = "SELECT * FROM transactions";
$result = $connection->query($sql);

$transactions = [];
while ($row = $result->fetch_assoc()) {
    $transactions[] = $row;
}

echo json_encode($transactions);
$connection->close();
?>
