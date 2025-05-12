<?php
header('Content-Type: application/json');
require_once __DIR__ . '/ConnectDataBase.php';
$db   = new Database();
$conn = $db->conn;

$data = json_decode(file_get_contents("php://input"), true);

$product_id = $data['product_id'];
$size_number = $data['size_number'];

try {
    $stmt = $conn->prepare("SELECT id FROM size WHERE product_id = ? AND size_number = ?");
    $stmt->bind_param("ii", $product_id, $size_number);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        echo json_encode([
            "success" => true,
            "size_id" => $row['id']
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "error" => "Không tìm thấy size phù hợp."
        ]);
    }
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "error" => $e->getMessage()
    ]);
}
?>