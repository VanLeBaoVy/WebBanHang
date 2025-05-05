<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

include("../../connectDB/role.php");

// Kiểm tra phương thức DELETE
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $database = new DatabaseRole();

    // Lấy tham số id từ URL
    $roleId = isset($_GET['id']) ? $_GET['id'] : null;

    // Kiểm tra nếu không có ID
    if (!$roleId) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "ID không hợp lệ"]);
        exit;
    }

    // Xóa quyền trong cơ sở dữ liệu
    $result = $database->deleteRole($roleId);
    
    // Kiểm tra kết quả thêm quyền
    if ($result) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Xóa quyền thành công"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Lỗi khi Xóa quyền"]);
    }

    // Đóng kết nối cơ sở dữ liệu
    $database->closeConnection();
    exit;
}

// Nếu không phải là phương thức POST
http_response_code(405);
echo json_encode(["status" => "error", "message" => "Phương thức không được hỗ trợ"]);

?>