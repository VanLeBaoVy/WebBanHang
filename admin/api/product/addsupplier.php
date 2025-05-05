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
if (empty($data['name']) || empty($data['tax']) || empty($data['contact_name']) || empty($data['phone']) || empty($data['email'])) {
    echo json_encode(['success' => false, 'message' => 'Vui lòng điền đầy đủ thông tin nhà cung cấp']);
    exit();
}

// Lấy dữ liệu từ request
$name = $data['name'];
$tax = $data['tax'];
$contact_name = $data['contact_name'];
$phone = $data['phone'];
$email = $data['email'];

// Kết nối cơ sở dữ liệu
$db = new DatabaseProduct();
$conn = $db->getConnection();

try {
    // Thêm nhà cung cấp vào cơ sở dữ liệu
    $result = $db->addSupplier($name, $tax, $contact_name, $phone, $email);
    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Thêm nhà cung cấp thành công']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Không thể thêm nhà cung cấp']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Lỗi: ' . $e->getMessage()]);
} finally {
    $conn->close();
}
?>