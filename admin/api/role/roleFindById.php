<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");
include("../../connectDB/role.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $database = new DatabaseRole();
    // Lấy ID từ tham số truy vấn
    $roleId = isset($_GET['id']) ? $_GET['id'] : null;
    if ($roleId === null) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "ID không hợp lệ"]);
        exit;
    }
    // Lấy thông tin quyền từ cơ sở dữ liệu
    $role = $database->findById($roleId);
    if ($role) {
        http_response_code(200);
        echo json_encode(["status" => "success", "data" => $role]);
    } else {
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "Không tìm thấy quyền với ID: $roleId"]);
    }
}
?>