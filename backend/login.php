<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");
include(__DIR__ . "/db.php");

$data = json_decode(file_get_contents("php://input"), true);

$email = trim($data["email"] ?? "");
$password = trim($data["password"] ?? "");

if (!$email || !$password) {
    echo json_encode(["error" => "Email and password are required"]);
    exit;
}

$stmt = $conn->prepare("
    SELECT Instructor_id, Password, First_Name, Last_Name
    FROM Instructors
    WHERE Email = ?
");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["error" => "Invalid email"]);
    exit;
}

$user = $result->fetch_assoc();

if (!password_verify($password, $user["Password"])) {
    echo json_encode(["error" => "Invalid password"]);
    exit;
}

if (password_needs_rehash($user["Password"], PASSWORD_DEFAULT)) {
    $newHash = password_hash($password, PASSWORD_DEFAULT);
    $update = $conn->prepare("UPDATE Instructors SET Password = ? WHERE Instructor_id = ?");
    $update->bind_param("si", $newHash, $user["Instructor_id"]);
    $update->execute();
}

echo json_encode([
    "success" => true,
    "token" => "demo-token",
    "user" => [
        "id" => $user["Instructor_id"],
        "firstName" => $user["First_Name"],
        "lastName" => $user["Last_Name"],
        "email" => $email
    ]
]);
