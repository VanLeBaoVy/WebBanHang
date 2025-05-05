<?php
header('Content-Type: application/json');
require_once __DIR__ . '/ConnectDataBase.php';
$db = new Database();
$conn = $db->conn;

// Lấy dữ liệu JSON từ request
$data = json_decode(file_get_contents("php://input"), true);

$idLogin = $data['idLogin'];
$newPassword = $data['newPassword'];

try {
    // Update password cho account có id tương ứng
    $stmt = $conn->prepare("
        UPDATE account
        SET password = ? , updated = NOW()
        WHERE id = ?
    ");
    $stmt->bind_param("si", $newPassword, $idLogin);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo json_encode([
            "success" => true,
            "message" => "Đổi mật khẩu thành công"
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Không tìm thấy tài khoản hoặc mật khẩu không thay đổi"
        ]);
    }
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "error"   => $e->getMessage()
    ]);
}
?>