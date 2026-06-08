<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

include "db.php";

$studentId = $_POST['studentId'] ?? null;
$courseCode = $_POST['courseCode'] ?? null;
$status = $_POST['status'] ?? null;

if (!$studentId || !$courseCode || !$status) {
    echo json_encode(["error" => "Missing parameters"]);
    exit;
}

$stmt = $conn->prepare("CALL UpdateEnrollmentStatus(?, ?, ?)");
$stmt->bind_param("iss", $studentId, $courseCode, $status);
$stmt->execute();

echo json_encode([
    "success" => true,
    "message" => "Status updated successfully"
]);
