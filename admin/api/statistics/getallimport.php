<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

include("../../connectDB/product.php");

$db = new DatabaseProduct();

try {
    // Lấy tất cả phiếu nhập
    $imports = $db->getAllImports();

    // Lấy chi tiết phiếu nhập cho từng phiếu nhập
    foreach ($imports as &$import) {
        $import['details'] = $db->getImportDetails($import['import_id']);
    }

    // Trả về kết quả
    echo json_encode(['success' => true, 'data' => $imports]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Lỗi: ' . $e->getMessage()]);
} finally {
    $db->closeConnection();
}
?>