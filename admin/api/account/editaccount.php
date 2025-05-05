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
    if ($database->isPhoneNumberDuplicate($inputData['updatePhoneNumber'], $inputData['id'])) {
        echo json_encode(["status" => "error", "message" => "Số điện thoại đã tồn tại!"]);
        exit();
    }
    if ($database->isEmailDuplicate($inputData['updateEmail'], $inputData['id'])) {
        echo json_encode(["status" => "error", "message" => "Email đã tồn tại!"]);
        exit();
    }
    $result = $database->updateUser(
        $inputData['id'],
        $inputData['updateEmail'],
        $inputData['updateRoleId'],
        $inputData['updateFullname'],
        $inputData['updatePhoneNumber'],
        $inputData['updateAvatar'],
        $inputData['updateCreated'],
    );
    if ($result) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Cập nhật tài khoản thành công"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Cập nhật tài khoản thất bại"]);
    }
}
  
?>