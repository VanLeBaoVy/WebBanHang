<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

include("../../connectDB/order.php");

$db = new DatabaseOrder();
$conn = $db->getConnection();

try {
    $orders = $db->getAllOrders();
    if ($orders) {
        echo json_encode(["success" => true, "data" => $orders]);
    } else {
        echo json_encode(["success" => false, "message" => "Không có đơn hàng nào."]);
    }
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Lỗi: " . $e->getMessage()]);
} finally {
    $db->closeConnection();
}
?>