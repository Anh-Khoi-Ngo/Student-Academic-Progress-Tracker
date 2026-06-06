<?php
require "db.php";

$sql = "SELECT Course_code, Program_id, Title FROM Courses";
$result = $conn->query($sql);

$courses = [];

while ($row = $result->fetch_assoc()) {
    $courses[] = $row;
}

echo json_encode($courses);
$conn->close();
?>
