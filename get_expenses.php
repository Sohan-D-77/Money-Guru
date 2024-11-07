<?php
include 'db_connect.php';

$sql = "SELECT * FROM expenses";
$result = $connection->query($sql);

$expenses = [];
while ($row = $result->fetch_assoc()) {
    $expenses[] = $row;
}

echo json_encode($expenses);
$connection->close();
?>
