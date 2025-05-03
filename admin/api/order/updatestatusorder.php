<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

include("../../connectDB/order.php");

$data = json_decode(file_get_contents('php://input'), true);

// Kiểm tra dữ liệu đầu vào
if (empty($data['order_id']) || empty($data['status'])) {
    echo json_encode(['success' => false, 'message' => 'Dữ liệu không hợp lệ']);
    exit();
}

$orderId = intval($data['order_id']);
$newStatus = $data['status'];
$reason = isset($data['reason']) ? $data['reason'] : null;
$employeeId = isset($data['employee_id']) ? $data['employee_id'] : 0;

$db = new DatabaseOrder();

try {
    // Lấy trạng thái hiện tại của đơn hàng
    $order = $db->getOrderById($orderId);
    if (!$order) {
        echo json_encode(['success' => false, 'message' => 'Không tìm thấy đơn hàng']);
        exit();
    }

    $currentStatus = $order['status'];

    // Không cho phép thay đổi trạng thái nếu đã là "cancelled"
    if ($currentStatus === 'cancelled') {
        echo json_encode(['success' => false, 'message' => 'Không thể thay đổi trạng thái sau khi đơn hàng đã bị hủy']);
        exit();
    }

    // Nếu trạng thái là "cancelled", yêu cầu lý do
    if ($newStatus === 'cancelled' && empty($reason)) {
        echo json_encode(['success' => false, 'message' => 'Vui lòng cung cấp lý do hủy đơn hàng']);
        exit();
    }

        // Nếu trạng thái là "cancelled", cộng lại số lượng sản phẩm
        if ($newStatus === 'cancelled') {
            $orderDetails = $db->getOrderDetails($orderId); // Lấy danh sách sản phẩm trong đơn hàng
    
            foreach ($orderDetails as $detail) {
                $productId = $detail['product_id'];
                $sizeId = $detail['size'];
                $quantity = $detail['amount'];
    
                // Cộng lại số lượng sản phẩm vào kho
                $updateStock = $db->updateProductStock($productId, $sizeId, $quantity);
                if (!$updateStock) {
                    echo json_encode(['success' => false, 'message' => 'Không thể cập nhật số lượng sản phẩm trong kho']);
                    exit();
                }
            }
        }

        $statusOrder = ['pending', 'processing', 'shipped'];
        $currentIndex = array_search($currentStatus, $statusOrder);
        $newIndex = array_search($newStatus, $statusOrder);
    
        if ($newIndex !== false && $currentIndex !== false && $newIndex < $currentIndex) {
            echo json_encode(['success' => false, 'message' => 'Không thể cập nhật trạng thái lùi']);
            exit();
        }

    // Cập nhật trạng thái đơn hàng
    $updateStatus = $db->updateOrderStatus($orderId, $newStatus, $employeeId);

    if ($updateStatus) {
        // Nếu trạng thái là "cancelled", lưu lý do hủy
        if ($newStatus === 'cancelled') {
            $stmt = $db->getConnection()->prepare("UPDATE orders SET reason = ? WHERE id = ?");
            $stmt->bind_param("si", $reason, $orderId);
            $stmt->execute();
        }



        echo json_encode(['success' => true, 'message' => 'Cập nhật trạng thái thành công']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Không thể cập nhật trạng thái']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Lỗi: ' . $e->getMessage()]);
} finally {
    $db->closeConnection();
}
?>