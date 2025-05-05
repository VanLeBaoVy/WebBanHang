<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
include("../../connectDB/product.php");
// Kiểm tra phương thức HTTP
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Chỉ hỗ trợ phương thức POST']);
    exit();
}

// Lấy dữ liệu JSON từ body request
$data = json_decode(file_get_contents('php://input'), true);

// Kiểm tra dữ liệu đầu vào
if (empty($data['categoryName'])|| empty($data['categoryId'])) {
    echo json_encode(['success' => false, 'message' => 'Vui lòng điền đầy đủ thông tin loại sản phẩm']);
    exit();
}
$db = new DatabaseProduct();
$conn = $db->getConnection();
$result = $db->updateCategory($data['categoryId'], $data['categoryName']);
if ($result) {
    echo json_encode(['success' => true, 'message' => 'Thêm loại sản phẩm thành công']);
} else {
    echo json_encode(['success' => false, 'message' => 'Không thể thêm loại sản phẩm']);
}
    $conn->close();
?>