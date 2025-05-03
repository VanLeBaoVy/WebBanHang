<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

include("../../connectDB/user.php");

// Kiểm tra nếu 'user_id' có trong query string
if (!isset($_GET['address_id']) || empty($_GET['address_id'])) {
    echo json_encode(['success' => false, 'message' => 'Vui lòng cung cấp']);
    exit();
}

$Id = intval($_GET['address_id']);

$db = new DatabaseUser();
try {
    $address = $db->getAddresbyIdaddress($Id);
    if ($address) {
        echo json_encode(['success' => true, 'address' => $address]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Không tìm thấy địa chỉ cho address_id: ' . $Id]);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Lỗi: ' . $e->getMessage()]);
} finally {
    $db->closeConnection();
}