<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

// Get input data
$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['id'])) {
    echo json_encode(["success" => false, "message" => "Account ID is required"]);
    exit;
}

include("../../connectDB/user.php");
$database = new DatabaseUser();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Toggle account status
    $result = $database->toggleAccountStatus($input['id'], $input['status']);
    if ($result) {
        echo json_encode(["success" => true, "message" => "Account status toggled successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to toggle account status"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}
?>