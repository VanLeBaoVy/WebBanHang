<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");
include("../../connectDB/user.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $database = new DatabaseUser();
    // Lấy ID từ tham số truy vấn
    $username = isset($_GET['username']) ? $_GET['username'] : null;
    if ($username === null) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Tên tài khoản không hợp lệ"]);
        exit;
    }
    // Lấy thông tin tài khoản từ cơ sở dữ liệu
    $id = $database->getUserId($username);
    if ($id) {
        http_response_code(200);
        echo json_encode(["status" => "success", "data" => $id]);
    } else {
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "Không tìm thấy id tài khoản với tên tài khoản: $username"]);
    }
}
?>