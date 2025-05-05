<?php
header('Content-Type: application/json');
require_once __DIR__ . '/ConnectDataBase.php';
$db = new Database();
$conn = $db->conn;

try {
    $data = json_decode(file_get_contents("php://input"), true);

    $id = $data['id'];
    $updatedUser = $data['updatedUser'];

    if (!$id || !$updatedUser) {
        echo json_encode(["success" => false, "message" => "Thiếu dữ liệu cần thiết"]);
        exit;
    }

    $fullname = $updatedUser['fullname'];
    $email = $updatedUser['email'];
    $phone_number = $updatedUser['phone_number'];

    // Cập nhật bảng profile
    $updateProfile = $conn->prepare("
        UPDATE profile
        SET fullname = ?, phone_number = ?
        WHERE id = ?
    ");
    $updateProfile->bind_param("ssi", $fullname, $phone_number, $id);
    $updateProfile->execute();

    // Cập nhật bảng account
    $updateAccount = $conn->prepare("
        UPDATE account
        SET email = ?
        WHERE id = ?
    ");
    $updateAccount->bind_param("si", $email, $id);
    $updateAccount->execute();

    echo json_encode(["success" => true, "message" => "Cập nhật thành công"]);
}
catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "error" => $e->getMessage()
    ]);
}
