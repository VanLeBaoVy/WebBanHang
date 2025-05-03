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
if (empty($data['brandId']) || empty($data['brandName'])) {
    echo json_encode(['success' => false, 'message' => 'Vui lòng điền đầy đủ thông tin thương hiệu']);
    exit();
}

$brandId = intval($data['brandId']);
$brandName = $data['brandName'];
$brandDescription = $data['brandDescription'] ?? '';

$db = new DatabaseProduct();
$conn = $db->getConnection();

// Cập nhật thương hiệu
$result = $db->updateBrand($brandId, $brandName, $brandDescription);
if ($result) {
    echo json_encode(['success' => true, 'message' => 'Cập nhật thương hiệu thành công']);
} else {
    echo json_encode(['success' => false, 'message' => 'Không thể cập nhật thương hiệu']);
}

$conn->close();
?>