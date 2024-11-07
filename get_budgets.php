<?php
include 'db_connect.php';

$sql = "SELECT * FROM budgets";
$result = $connection->query($sql);

$budgets = [];
while ($row = $result->fetch_assoc()) {
    $budgets[] = $row;
}

echo json_encode($budgets);
$connection->close();
?>
