<?php
header('Content-Type: application/json');
require_once __DIR__ . '/ConnectDataBase.php';
$db   = new Database();
$conn = $db->conn;

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['status'])) {
    echo json_encode(["success" => false, "message" => "Thiếu trạng thái đơn hàng"]);
    exit;
}

$id     = intval($data['id']);
$status = $data['status'];
$reason = $data['reason'];
$returnProduct = $data['returnProduct'] ?? [];

try {
    // Cập nhật trạng thái đơn hàng
    $stmt = $conn->prepare("UPDATE `orders` SET status = ?, reason = ?, updated_at = NOW() WHERE id = ?");
    $stmt->bind_param("ssi", $status, $reason, $id);
    $stmt->execute();

    // Cập nhật bảng size theo product_id + size_number
    foreach ($returnProduct as $item) {
        $productId = intval($item['product_id']);
        $sizeNumber = $item['size_number'];
        $newAmount = intval($item['amount']);

        $stmtUpdate = $conn->prepare("UPDATE size SET amount = ? WHERE product_id = ? AND size_number = ?");
        $stmtUpdate->bind_param("iis", $newAmount, $productId, $sizeNumber);
        $stmtUpdate->execute();
    }

    echo json_encode(["success" => true]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}

?>