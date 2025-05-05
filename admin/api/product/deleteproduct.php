<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
include("../../connectDB/product.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Kiểm tra nếu 'id' có trong query string
    if (isset($_GET['id']) && !empty($_GET['id'])) {
        $id = intval($_GET['id']);  // Chuyển id thành số nguyên để tránh lỗi SQL injection

        // Kết nối tới cơ sở dữ liệu
        $db = new DatabaseProduct();
        $conn = $db->getConnection();

        if ($db->checkProductExistBillDetail($id)) {
            $oldProduct = $db->getProductById($id);  // Lấy thông tin sản phẩm cũ
            $db->updateProduct($id, $oldProduct['name'], $oldProduct['price'], $oldProduct['description'], $oldProduct['url'], $oldProduct['category_id'], $oldProduct['brand'], 0, $oldProduct['supplier_id']);  // Cập nhật sản phẩm
        } else {
            // Xóa sản phẩm
            $deleteProduct = $db->deleteProduct($id);  // Gọi hàm deleteProduct với id

            if ($deleteProduct) {
                if ($db->deleteSizeByProductId($id)) {  // Xóa kích thước liên quan
                    echo json_encode(["success" => true, "message" => "Product deleted successfully."]);
                } else {
                    echo json_encode(["success" => false, "message" => "Failed to delete product sizes."]);
                }
            } else {
                echo json_encode(["success" => false, "message" => "Failed to delete product."]);
            }
        }
    } else {
        echo json_encode(["success" => false, "message" => "ID không hợp lệ."]);
        exit;
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
}

// Đóng kết nối cơ sở dữ liệu
$conn->close();
