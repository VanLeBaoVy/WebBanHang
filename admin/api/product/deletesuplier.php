<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
include("../../connectDB/product.php");

// Kiểm tra phương thức HTTP
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    echo json_encode(['success' => false, 'message' => 'Chỉ hỗ trợ phương thức GET']);
    exit();
}

// Kiểm tra nếu 'id' có trong query string
if (!isset($_GET['id']) || empty($_GET['id'])) {
    echo json_encode(['success' => false, 'message' => 'ID nhà cung cấp không hợp lệ']);
    exit();
}

$id = intval($_GET['id']); // Chuyển ID thành số nguyên để tránh lỗi SQL injection

$db = new DatabaseProduct();
$conn = $db->getConnection();

try {
    // Kiểm tra xem nhà cung cấp có liên quan đến sản phẩm nào không
    if ($db->checkSupplierExistProduct($id)) {
        // Chuyển trạng thái của nhà cung cấp thành "inactive" thay vì xóa
        $updateStatusResult = $db->updateSupplierStatus($id, 'inactive');
        if ($updateStatusResult) {
            echo json_encode(['success' => true, 'message' => 'Nhà cung cấp đã được xóa thành công']);
        }  else {
            echo json_encode(['success' => false, 'message' => 'Không thể xóa nhà cung cấp']);
        }
    } else {
        // Xóa nhà cung cấp
    $result = $db->deleteSupplier($id);
    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Xóa nhà cung cấp thành công']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Không thể xóa nhà cung cấp']);
    }
    }

    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Lỗi: ' . $e->getMessage()]);
} finally {
    $conn->close();
}
?>