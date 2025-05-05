<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
include("../../connectDB/product.php");

// Kiểm tra phương thức HTTP
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Chỉ hỗ trợ phương thức POST']);
    exit();
}

// Lấy dữ liệu JSON từ body request
$data = json_decode(file_get_contents('php://input'), true);

// Kiểm tra dữ liệu đầu vào
if (empty($data['sizes']) || !is_array($data['sizes'])) {
    echo json_encode(['success' => false, 'message' => 'Vui lòng cung cấp danh sách size_id và số lượng']);
    exit();
}

$sizes = $data['sizes'];

$db = new DatabaseProduct();
$conn = $db->getConnection();

try {
    // Bắt đầu giao dịch
    $conn->begin_transaction();

    foreach ($sizes as $size) {
        if (empty($size['size_id']) || !isset($size['amount'])) {
            throw new Exception('Dữ liệu size_id hoặc amount không hợp lệ');
        }

        $size_id = intval($size['size_id']);
        $oldamount = $db->getSizeQuantityById($size_id);
        if ($oldamount === null) {           
            $oldamount = 0;
        }
        $amount = intval($size['amount']);

        // Cập nhật số lượng của size
        $result = $db->updateSizeQuantity($size_id, $amount + $oldamount);
        if (!$result) {
            throw new Exception("Không thể cập nhật số lượng cho size_id: $size_id");
        }
    }

    // Cam kết giao dịch
    $conn->commit();
    echo json_encode(['success' => true, 'message' => 'Cập nhật số lượng thành công']);
} catch (Exception $e) {
    // Hủy giao dịch nếu có lỗi
    $conn->rollback();
    echo json_encode(['success' => false, 'message' => 'Lỗi: ' . $e->getMessage()]);
} finally {
    $conn->close();
}
?>