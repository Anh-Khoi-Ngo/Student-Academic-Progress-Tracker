<?php
require "db.php";

$sql = "SELECT Program_id, Program_code, Name FROM Programs";
$result = $conn->query($sql);

$programs = [];

while ($row = $result->fetch_assoc()) {
    $programs[] = $row;
}

echo json_encode($programs);
$conn->close();
?>
