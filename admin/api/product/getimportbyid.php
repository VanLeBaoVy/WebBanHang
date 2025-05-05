<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
include("../../connectDB/product.php");

// Kiểm tra nếu 'id' có trong query string
if (!isset($_GET['id']) || empty($_GET['id'])) {
    echo json_encode(['success' => false, 'message' => 'ID phiếu nhập không hợp lệ']);
    exit();
}

$importId = intval($_GET['id']);

$db = new DatabaseProduct();
$conn = $db->getConnection();

try {
    // Lấy thông tin phiếu nhập
    $import = $db->getImportById($importId);
    if (!$import) {
        echo json_encode(['success' => false, 'message' => 'Không tìm thấy phiếu nhập']);
        exit();
    }

    // Lấy chi tiết phiếu nhập
    $details = $db->getImportDetailsById($importId);
    $import['details'] = $details;

    // Kết quả trả về
    echo json_encode(['success' => true, 'data' => $import]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Lỗi: ' . $e->getMessage()]);
} finally {
    $conn->close();
}
?>