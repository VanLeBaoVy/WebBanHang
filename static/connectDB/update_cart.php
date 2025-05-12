<?php
header("Content-Type: application/json");
include "db.php"; // Kết nối database

// Nhận dữ liệu từ frontend
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data["userId"]) && isset($data["cart"])) {
    $userId = $data["userId"];
    $cartItems = $data["cart"];

    // Xóa giỏ hàng cũ của người dùng (nếu cần)
    $deleteQuery = "DELETE FROM cart WHERE profile_id = ?";
    $stmt = $conn->prepare($deleteQuery);
    $stmt->bind_param("i", $userId);
    $stmt->execute();

    // Thêm giỏ hàng mới
    foreach ($cartItems as $item) {
        // Truy vấn để lấy size_id từ bảng size dựa vào product_id và amount
        $sizeQuery = "SELECT id FROM size WHERE product_id = ? AND size_number = ?";
        $stmt = $conn->prepare($sizeQuery);
        $stmt->bind_param("ii", $item["id"], $item["size"]);
        $stmt->execute();
        $result = $stmt->get_result();
        $sizeRow = $result->fetch_assoc();
        $sizeId = $sizeRow ? $sizeRow["id"] : null; // Kiểm tra nếu có giá trị size_id

        // Nếu tìm thấy size_id, thêm sản phẩm vào giỏ hàng
        $insertQuery = "INSERT INTO cart (profile_id, product_id, size, amount) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($insertQuery);
        $stmt->bind_param("iiii", $userId, $item["id"], $sizeId, $item["quantity"]);
        $stmt->execute();
    }

    echo json_encode(["message" => "Giỏ hàng cập nhật thành công"]);
} else {
    echo json_encode(["error" => "Dữ liệu không hợp lệ"]);
}
?>

