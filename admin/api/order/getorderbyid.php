<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

include("../../connectDB/order.php");

if (!isset($_GET['order_id']) || empty($_GET['order_id'])) {
    echo json_encode(['success' => false, 'message' => 'Vui lòng cung cấp order_id']);
    exit();
}

$orderId = intval($_GET['order_id']);

$db = new DatabaseOrder();
$conn = $db->getConnection();

try {
    // Lấy thông tin đơn hàng
    $order = $db->getOrderById2($orderId);
    if (!$order) {
        echo json_encode(['success' => false, 'message' => 'Không tìm thấy đơn hàng']);
        exit();
    }

    // Lấy chi tiết đơn hàng
    $orderDetails = $db->getOrderDetails2($orderId);

    // Trả về kết quả
    echo json_encode([
        'success' => true,
        'order' => $order,
        'details' => $orderDetails
    ]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Lỗi: ' . $e->getMessage()]);
} finally {
    $db->closeConnection();
}
?>