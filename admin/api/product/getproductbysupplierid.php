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
    $result = $database->getProductBySupplierId($id);
    if ($result) {
        echo json_encode([
            "status" => "success",
            "data" => $result
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Không tìm thấy san phẩm nào của nhà cung cấp này."
        ]);
    }
}
$conn->close();
?>