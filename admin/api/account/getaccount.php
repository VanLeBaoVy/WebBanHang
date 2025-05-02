<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");
include("../../connectDB/user.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $database = new DatabaseUser();
    // Lấy ID từ tham số truy vấn
    $userId = isset($_GET['id']) ? $_GET['id'] : null;
    if ($userId === null) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "ID không hợp lệ"]);
        exit;
    }
    // Lấy thông tin tài khoản từ cơ sở dữ liệu
    $user = $database->getUserById($userId);
    if ($user) {
        http_response_code(200);
        echo json_encode(["status" => "success", "data" => $user]);
    } else {
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "Không tìm thấy tài khoản với ID: $userId"]);
    }
}
?>