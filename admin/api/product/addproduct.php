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
if (empty($data['name']) || empty($data['price']) || empty($data['category_id']) || empty($data['brand']) || empty($data['sizes'])) {
    echo json_encode(['success' => false, 'message' => 'Vui lòng điền đầy đủ thông tin sản phẩm']);
    exit();
}

// Kết nối cơ sở dữ liệu
$db = new DatabaseProduct();
$conn = $db->getConnection();

try {
    // Lưu thông tin sản phẩm
    $name = $data['name'];
    $price = $data['price'];
    $description = $data['description'] ?? '';
    $category_id = $data['category_id'];
    $brand = $data['brand'];
    $status = $data['status'];
    $supplier = $data['supplier_id'];
    $imageBase64 = $data['url'] ?? '';
    // Thêm sản phẩm vào cơ sở dữ liệu
    $result = $db->addProduct($name, $price, $description, $imageBase64, $category_id, $brand, $status, $supplier);
    if ($result) {
        // Lấy ID sản phẩm vừa thêm
        $productId = $db->getLastInsertId();

        // Lưu kích thước và số lượng
        foreach ($data['sizes'] as $sizeNumber) {
            if (!$db->addSize($productId, $sizeNumber, 0)) {
                echo json_encode(['success' => false, 'message' => 'Không thể lưu kích thước sản phẩm']);
                exit();
            }
        }


        echo json_encode(['success' => true, 'message' => 'Thêm sản phẩm thành công']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Không thể thêm sản phẩm']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Lỗi: ' . $e->getMessage()]);
} finally {
    $db->closeConnection();
}
