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
if (empty($data['supplier_id']) || empty($data['employee']) || empty($data['total_price']) || empty($data['details'])) {
    echo json_encode(['success' => false, 'message' => 'Vui lòng điền đầy đủ thông tin phiếu nhập']);
    exit();
}

$userDb = new DatabaseUser();

$supplier_id = intval($data['supplier_id']);
// Lấy ID nhân viên từ tên đăng nhập
$total_price = floatval($data['total_price']);
$status = $data['status'] ?? 'processing'; // Mặc định trạng thái là "processing"
$details = $data['details']; // Danh sách chi tiết phiếu nhập

$employee_id = $userDb->getUserId($data['employee']);
if ($employee_id === null) {
    echo json_encode(['success' => false, 'message' => 'Không tìm thấy nhân viên với username đã cho']);
    exit();
}

$db = new DatabaseProduct();
$conn = $db->getConnection();

try {
    // Thêm phiếu nhập vào cơ sở dữ liệu
    $importId = $db->addImport($supplier_id, $employee_id, $total_price, $status);
    if (!$importId) {
        echo json_encode(['success' => false, 'message' => 'Không thể thêm phiếu nhập']);
        exit();
    }

    // Thêm chi tiết phiếu nhập
    foreach ($details as $detail) {
        $product_id = intval($detail['product_id']);
        $size_id = intval($detail['size_id']);
        $price = floatval($detail['price']);
        $quantity = intval($detail['quantity']);
        $total = floatval($detail['total']);

        $result = $db->addImportDetail($importId, $product_id, $size_id, $price, $quantity, $total);
        if (!$result) {
            echo json_encode(['success' => false, 'message' => 'Không thể thêm chi tiết phiếu nhập']);
            exit();
        }
    }

    echo json_encode(['success' => true, 'message' => 'Thêm phiếu nhập thành công']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Lỗi: ' . $e->getMessage()]);
} finally {
    $conn->close();
    $userDb->closeConnection();
}
?>