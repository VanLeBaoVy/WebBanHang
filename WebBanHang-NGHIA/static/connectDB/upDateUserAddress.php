<?php
header('Content-Type: application/json');
require_once __DIR__ . '/ConnectDataBase.php';
$db   = new Database();
$conn = $db->conn;

try {
    $data = json_decode(file_get_contents("php://input"), true);

    $id = $data['id'];
    $account = $data['updatedUser'];
    $address = $data['address'];

    if (!$id || !$account) {
        echo json_encode(["success" => false, "message" => "Thiếu dữ liệu cần thiết"]);
        exit;
    }

    // 1. Cập nhật bảng account
    $updateAccount = $conn->prepare("
        UPDATE account
        SET  updated = NOW()
        WHERE id = ?
    ");
    $updateAccount->bind_param(
        "i",
        $id
    );
    $updateAccount->execute();

    // 2. Chèn địa chỉ vào bảng address (nếu có)
    $insertAddress = $conn->prepare("
        INSERT INTO address (profile_id,phone_number,street,ward,district,city)
        VALUES (?, ?, ? , ?, ?, ?)
    ");
    $insertAddress->bind_param("isssss", $id,$data['phone'], $address['street'],$address['ward'],$address['district'],$address['city']);
    $insertAddress->execute();

    echo json_encode(["success" => true, "message" => "Cập nhật thành công"]);
}
catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "error"   => $e->getMessage()
    ]);
}
// $conn->close();
?>
