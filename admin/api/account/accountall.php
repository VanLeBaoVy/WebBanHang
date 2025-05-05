<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

// Kết nối đến cơ sở dữ liệu
include("../../connectDB/user.php");

$db = new DatabaseUser();
$result = $db->getAllUsers();
if ($result == null) {
    http_response_code(200);
    echo json_encode([]);
} else {
    http_response_code(200);
    echo json_encode($result);
}
?>