<?php
require "db.php";

$studentId = $_GET["id"] ?? 0;

$stmt = $conn->prepare("CALL GetStudentGrades(?)");
$stmt->bind_param("i", $studentId);

if (!$stmt->execute()) {
    echo json_encode(["error" => $stmt->error]);
    exit;
}

$result = $stmt->get_result();
$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
$conn->close();
?>
