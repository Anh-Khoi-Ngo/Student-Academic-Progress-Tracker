<?php
header("Content-Type: application/json");

$program = $_GET["program"] ?? "";

$conn = new mysqli("localhost", "root", "", "progresstracker");

if ($conn->connect_error) {
    die(json_encode(["error" => $conn->connect_error]));
}

$stmt = $conn->prepare("CALL GetProgramStudentGrid(?)");
$stmt->bind_param("s", $program);
$stmt->execute();

$result = $stmt->get_result();
$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);

$conn->close();
?>
