<?php
include 'db_connect.php';

$sql = "SELECT * FROM investments";
$result = $connection->query($sql);

$investments = [];
while ($row = $result->fetch_assoc()) {
    $investments[] = $row;
}

echo json_encode($investments);
$connection->close();
?>
