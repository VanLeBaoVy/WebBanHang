<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");
include("../../connectDB/role.php");
// GET: Trả về danh sách phân quyền
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $database = new DatabaseRole();
    $result = $database->getAllRolesGrouped();
    if ($result == null) {
        http_response_code(200);
        echo json_encode([]);
    } else {
        http_response_code(200);
        echo json_encode($result);
    }
    $database->closeConnection();
    exit;
}


http_response_code(405);
echo json_encode(["status" => "error", "message" => "Phương thức không được hỗ trợ"]);
?>