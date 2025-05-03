<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
include("../../connectDB/product.php");

// Kiểm tra nếu 'import_id' có trong query string
if (!isset($_GET['import_id']) || empty($_GET['import_id'])) {
    echo json_encode(['success' => false, 'message' => 'Vui lòng cung cấp ID phiếu nhập']);
    exit();
}

$importId = intval($_GET['import_id']);

$db = new DatabaseProduct();
$conn = $db->getConnection();

try {
    // Bắt đầu giao dịch
    $conn->begin_transaction();

    // Xóa chi tiết phiếu nhập
    $deleteDetails = $db->deleteImportDetailsByImportId($importId);
    if (!$deleteDetails) {
        throw new Exception('Không thể xóa chi tiết phiếu nhập');
    }

    // Xóa phiếu nhập
    $deleteImport = $db->deleteImport($importId);
    if (!$deleteImport) {
        throw new Exception('Không thể xóa phiếu nhập');
    }

    // Cam kết giao dịch
    $conn->commit();

    echo json_encode(['success' => true, 'message' => 'Xóa phiếu nhập thành công']);
} catch (Exception $e) {
    // Hủy giao dịch nếu có lỗi
    $conn->rollback();
    echo json_encode(['success' => false, 'message' => 'Lỗi: ' . $e->getMessage()]);
} finally {
    $conn->close();
}
?>