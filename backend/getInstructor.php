<?php
require "db.php";

$id = $_GET["id"] ?? 0;

$stmt = $conn->prepare("
    SELECT FirstName, LastName, Email
    FROM Instructors
    WHERE Instructor_id = ?
");
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

echo json_encode([
  "name" => $row["FirstName"] . " " . $row["LastName"],
  "email" => $row["Email"]
]);
?>
