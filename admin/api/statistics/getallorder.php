<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

include("../../connectDB/order.php");

$db = new DatabaseOrder();

try {
    // Lấy tất cả đơn hàng
    $orders = $db->getAllOrders4();

    // Lấy chi tiết đơn hàng cho từng đơn hàng
    foreach ($orders as &$order) {
        $order['details'] = $db->getOrderDetails4($order['order_id']);
    }

    // Trả về kết quả
    echo json_encode(['success' => true, 'data' => $orders]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Lỗi: ' . $e->getMessage()]);
} finally {
    $db->closeConnection();
}
?>