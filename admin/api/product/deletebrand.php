<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
include("../../connectDB/product.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Kiểm tra nếu 'id' có trong query string
    if (isset($_GET['brandId']) && !empty($_GET['brandId'])) {
        $brandId = intval($_GET['brandId']); // Chuyển id thành số nguyên để tránh lỗi SQL injection

        $db = new DatabaseProduct();
        $conn = $db->getConnection();

        // Kiểm tra xem thương hiệu có sản phẩm liên quan không
        if ($db->checkBrandExistProduct($brandId)) {
            echo json_encode(['success' => false, 'message' => 'Không thể xóa thương hiệu vì có sản phẩm liên quan']);
            exit();
        }

        // Xóa thương hiệu
        $result = $db->deleteBrand($brandId);
        if ($result) {
            echo json_encode(['success' => true, 'message' => 'Xóa thương hiệu thành công']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Không thể xóa thương hiệu']);
        }

        $conn->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'ID thương hiệu không hợp lệ']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Phương thức không hợp lệ']);
}
?>