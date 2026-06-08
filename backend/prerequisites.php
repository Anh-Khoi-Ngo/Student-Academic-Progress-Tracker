<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

require "db.php";

$sql = "
    SELECT 
        TRIM(UPPER(course_code)) AS Course_code,
        TRIM(UPPER(requisite_code)) AS Requisite_code,
        TRIM(type) AS Type
    FROM progresstracker.prerequisites
";

$result = $conn->query($sql);

if (!$result) {
    echo json_encode(["sql_error" => $conn->error, "query" => $sql]);
    exit;
}

$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
$conn->close();
