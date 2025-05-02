<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With");

include("../../connectDB/product.php");

$database = new DatabaseProduct();
$conn = $database->getConnection();

if (isset($_GET['id']) && !empty($_GET['id'])) {
    $id = intval($_GET['id']);

    // Gọi phương thức lấy thông tin sản phẩm
    $product = $database->getProductById($id);

    if ($product) {
        // Gọi thêm phương thức lấy danh sách size
        $rawSizes = $database->getSizeByProductId($id);
        $sizes = [];
        
        foreach ($rawSizes as $size) {
            $sizes[] = [
                'size_id' => $size['id'],
                'size_number' => $size['size_number'],
                'amount' => $size['amount']
            ];
        }        
        $product['sizes'] = $sizes;

        echo json_encode([
            "status" => "success",
            "data" => $product
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Không tìm thấy sản phẩm."
        ]);
    }
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Thiếu hoặc sai ID."
    ]);
}
?>
