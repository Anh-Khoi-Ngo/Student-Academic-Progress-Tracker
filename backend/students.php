<?php
require "db.php";

$sql = "SELECT Student_id AS studentId, First_Name AS firstName, Last_Name AS lastName, Email AS email FROM Students";
$result = $conn->query($sql);

$students = [];

while ($row = $result->fetch_assoc()) {
    $students[] = $row;
}

echo json_encode($students);
$conn->close();
?>
