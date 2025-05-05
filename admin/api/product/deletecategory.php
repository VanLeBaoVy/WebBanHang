<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
include("../../connectDB/product.php");


// Kết nối tới cơ sở dữ liệu
$db = new DatabaseProduct();
$conn = $db->getConnection();
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Kiểm tra nếu 'id' có trong query string
    if (isset($_GET['categoryId']) && !empty($_GET['categoryId'])) {
        $id = intval($_GET['categoryId']);  // Chuyển id thành số nguyên để tránh lỗi SQL injection
        if ($db->checkCategoryExistProduct($id)) {
            // Kiểm tra xem loại sản phẩm có sản phẩm liên quan không
            echo json_encode(['success' => false, 'message' => 'Không thể xóa thương hiệu vì có sản phẩm liên quan']);
            exit();
        }
            // Xóa sản phẩm
            $deleteProduct = $db->deleteCategory($id);  

            if ($deleteProduct) {
                echo json_encode(["success" => true, "message" => "Xóa loại sản phẩm thành công."]);
            } else {
                echo json_encode(["success" => false, "message" => "Không thể xóa loại sản phẩm."]);
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
?>