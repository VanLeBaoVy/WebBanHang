<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

include("../../connectDB/user.php");

// Kiểm tra nếu 'user_id' có trong query string
if (!isset($_GET['user_id']) || empty($_GET['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Vui lòng cung cấp user_id']);
    exit();
}

$userId = intval($_GET['user_id']);

$db = new DatabaseUser();
try {
    $fullname = $db->getFullnameById($userId);
    if ($fullname) {
        echo json_encode(['success' => true, 'fullname' => $fullname]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Không tìm thấy tên đầy đủ cho user_id: ' . $userId]);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Lỗi: ' . $e->getMessage()]);
} finally {
    $db->closeConnection();
}