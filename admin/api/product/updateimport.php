<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
include("../../connectDB/product.php");
include("../../connectDB/user.php");
// Kiểm tra phương thức HTTP
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Chỉ hỗ trợ phương thức POST']);
    exit();
}

// Lấy dữ liệu JSON từ body request
$data = json_decode(file_get_contents('php://input'), true);

// Kiểm tra dữ liệu đầu vào
if (empty($data['id']) || empty($data['supplier_id']) || empty($data['employee_id']) || empty($data['total_price']) || empty($data['details'])) {
    echo json_encode(['success' => false, 'message' => 'Vui lòng điền đầy đủ thông tin phiếu nhập']);
    exit();
}

$importId = intval($data['id']);
$supplier_id = intval($data['supplier_id']);
$total_price = floatval($data['total_price']);
$status = $data['status'] ?? 'processing'; // Mặc định trạng thái là "processing"
$newDetails = $data['details']; // Danh sách chi tiết phiếu nhập mới
$userDb = new DatabaseUser();
$employee_id = $userDb->getUserId($data['employee_id']);
if ($employee_id === null) {
    echo json_encode(['success' => false, 'message' => 'Không tìm thấy nhân viên với username đã cho']);
    exit();
}
$db = new DatabaseProduct();
$conn = $db->getConnection();

try {
    // Bắt đầu giao dịch
    $conn->begin_transaction();

    // Cập nhật thông tin phiếu nhập
    $updateImport = $db->updateImport($importId, $supplier_id, $employee_id, $total_price, $status);
    if (!$updateImport) {
        throw new Exception('Không thể cập nhật phiếu nhập');
    }

    // Lấy danh sách chi tiết phiếu nhập cũ
    $oldDetails = $db->getImportDetailsByImportId($importId);
    $oldDetailIds = array_column($oldDetails, 'id');

    // Xử lý chi tiết phiếu nhập
    $newDetailIds = [];
    foreach ($newDetails as $detail) {
        $detailId = $detail['id'] ?? 0; // ID chi tiết (nếu có)
        $product_id = intval($detail['product_id']);
        $size_id = intval($detail['size_id']);
        $price = floatval($detail['price']);
        $quantity = intval($detail['quantity']);
        $total = floatval($detail['total']);

        if ($detailId > 0 && in_array($detailId, $oldDetailIds)) {
            // Cập nhật chi tiết phiếu nhập nếu đã tồn tại
            $updateDetail = $db->updateImportDetail($detailId, $product_id, $size_id, $price, $quantity, $total);
            if (!$updateDetail) {
                throw new Exception('Không thể cập nhật chi tiết phiếu nhập');
            }
            $newDetailIds[] = $detailId;
        } else {
            // Thêm chi tiết phiếu nhập mới
            $addDetail = $db->addImportDetail($importId, $product_id, $size_id, $price, $quantity, $total);
            if (!$addDetail) {
                throw new Exception('Không thể thêm chi tiết phiếu nhập mới');
            }
        }
    }

    // Xóa các chi tiết phiếu nhập cũ không có trong danh sách chi tiết mới
    foreach ($oldDetails as $oldDetail) {
        if (!in_array($oldDetail['id'], $newDetailIds)) {
            $deleteDetail = $db->deleteImportDetail($oldDetail['id']);
            if (!$deleteDetail) {
                throw new Exception('Không thể xóa chi tiết phiếu nhập cũ');
            }
        }
    }

    // Cam kết giao dịch
    $conn->commit();

    echo json_encode(['success' => true, 'message' => 'Cập nhật phiếu nhập thành công']);
} catch (Exception $e) {
    // Hủy giao dịch nếu có lỗi
    $conn->rollback();
    echo json_encode(['success' => false, 'message' => 'Lỗi: ' . $e->getMessage()]);
} finally {
    $conn->close();
}
?>