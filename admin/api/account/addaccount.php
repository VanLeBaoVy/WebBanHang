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

include("../../connectDB/user.php");

// Kiểm tra phương thức POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $database = new DatabaseUser();
    
    // Kiểm tra nếu không có tên tài khoản trong dữ liệu JSON
    if (!isset($inputData['username']) || $inputData['username'] == "") {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Tên tài khoản không được để trống"]);
        exit;
    }

    // Kiểm tra nếu không có mật khẩu trong dữ liệu JSON
    if (!isset($inputData['password']) || $inputData['password'] == "") {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Mật khẩu không được để trống"]);
        exit;
    }

    // Kiểm tra nếu không có email trong dữ liệu JSON
    if (!isset($inputData['email']) || $inputData['email'] == "") {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Email không được để trống"]);
        exit;
    }

    // Kiểm tra nếu không có quyền trong dữ liệu JSON
    if (!isset($inputData['role']) || $inputData['role'] == "") {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Vui lòng chọn quyền"]);
        exit;
    }

    // Kiểm tra nếu không có trạng thái trong dữ liệu JSON
    if (!isset($inputData['status']) || $inputData['status'] == "") {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Vui lòng chọn trạng thái"]);
        exit;
    }

    // Kiểm tra nếu tên tài khoản đã tồn tại
    $existingUser = $database->getUserByUsername($inputData['username']);
    if ($existingUser) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Tên tài khoản đã tồn tại"]);
        exit;
    }

    // Kiểm tra nếu email đã tồn tại
    $existingEmail = $database->getUserByEmail($inputData['email']);
    if ($existingEmail) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Email đã tồn tại"]);
        exit;
    }
    
    $result = $database->addUser($inputData['username'], $inputData['password'], $inputData['email'], $inputData['role'], $inputData['status']);

    if ($result) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Thêm tài khoản thành công"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Lỗi khi thêm tài khoản"]);
    }
    // Đóng kết nối cơ sở dữ liệu
    $database->closeConnection();
    exit;
}

// Nếu không phải là phương thức POST
http_response_code(405);
echo json_encode(["status" => "error", "message" => "Phương thức không được hỗ trợ"]);

?>