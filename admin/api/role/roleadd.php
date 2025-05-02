<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

// Đọc dữ liệu JSON từ body của yêu cầu
$inputData = json_decode(file_get_contents("php://input"), true);

// Kiểm tra nếu dữ liệu không hợp lệ hoặc không có dữ liệu JSON
if (!$inputData) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Dữ liệu không hợp lệ"]);
    exit;
}

include("../../connectDB/role.php");

// Kiểm tra phương thức POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $database = new DatabaseRole();
    
    // Kiểm tra nếu không có tên quyền trong dữ liệu JSON
    if (!isset($inputData['roleName']) || $inputData['roleName'] == "") {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Tên quyền không được để trống"]);
        exit;
    }

    // Kiểm tra nếu không có quyền trong dữ liệu JSON
    if (!isset($inputData['permissions']) || empty($inputData['permissions'])) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Vui lòng chọn ít nhất một quyền"]);
        exit;
    }

    // Thêm quyền vào cơ sở dữ liệu
    $result = $database->addRole($inputData['roleName'], $inputData['permissions']);
    
    // Kiểm tra kết quả thêm quyền
    if ($result) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Thêm quyền thành công"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Tên quyền đã tồn tại"]);
    }

    // Đóng kết nối cơ sở dữ liệu
    $database->closeConnection();
    exit;
}

// Nếu không phải là phương thức POST
http_response_code(405);
echo json_encode(["status" => "error", "message" => "Phương thức không được hỗ trợ"]);

?>