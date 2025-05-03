<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
include("../../connectDB/product.php");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Chỉ hỗ trợ phương thức POST']);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);

if (empty($data['brandName'])) {
    echo json_encode(['success' => false, 'message' => 'Vui lòng điền đầy đủ thông tin thương hiệu']);
    exit();
}

$brandName = $data['brandName'];
$brandDescription = $data['brandDescription'] ?? '';

$db = new DatabaseProduct();
$conn = $db->getConnection();
if ($db->checkDuplicateBrandName($brandName)) {
    echo json_encode(['success' => false, 'message' => 'Tên thương hiệu đã tồn tại']);
    exit();
}
$result = $db->addBrand($brandName, $brandDescription);
if ($result) {
    echo json_encode(['success' => true, 'message' => 'Thêm thương hiệu thành công']);
} else {
    echo json_encode(['success' => false, 'message' => 'Không thể thêm thương hiệu']);
}
$conn->close();
?>