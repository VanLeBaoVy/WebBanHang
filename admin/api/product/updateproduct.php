<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");

include("../../connectDB/product.php");
// Kiểm tra phương thức HTTP
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Chỉ hỗ trợ phương thức POST']);
    exit();
}

// Lấy dữ liệu JSON từ body request
$data = json_decode(file_get_contents('php://input'), true);

// Kiểm tra dữ liệu đầu vào
if (empty($data['id']) || empty($data['name']) || empty($data['price']) || empty($data['category_id']) || empty($data['brand'])) {
    echo json_encode(['success' => false, 'message' => 'Vui lòng điền đầy đủ thông tin sản phẩm']);
    exit();
}

// Kết nối cơ sở dữ liệu
$db = new DatabaseProduct();
$conn = $db->getConnection();

try {
    // Cập nhật thông tin sản phẩm
    $id = $data['id'];
    $name = $data['name'];
    $price = $data['price'];
    $description = $data['description'] ?? '';
    $category_id = $data['category_id'];
    $brand = $data['brand'];
    $imageBase64 = $data['url'] ?? null;

    // Lưu ảnh nếu có
    $imageUrl = null;
    if ($imageBase64) {
        $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $imageBase64));
        $imageName = uniqid() . '.png';
        $imagePath = '../../../uploads/' . $imageName;

        if (file_put_contents($imagePath, $imageData)) {
            $imageUrl = 'uploads/' . $imageName;
        } else {
            echo json_encode(['success' => false, 'message' => 'Không thể lưu ảnh sản phẩm']);
            exit();
        }
    }

    // Cập nhật sản phẩm
    $updateProduct = $db->updateProduct($id, $name, $price, $description, $imageUrl, $category_id, $brand);
    if (!$updateProduct) {
        echo json_encode(['success' => false, 'message' => 'Lỗi khi cập nhật sản phẩm']);
        exit();
    }

    // Cập nhật hoặc thêm mới size
    // Lấy danh sách size cũ
    $oldSizes = $db->getSizeByProductId($id);
    $oldSizeIds = array_column($oldSizes, 'id');

    $newSizes = $data['sizes'] ?? [];
    $newSizeIds = array_column($newSizes, 'id');

    // Thêm size mới nếu size mới không có trong danh sách size cũ
    foreach ($newSizes as $size) {
        $sizeId = $size['id'];
        $sizeNumber = $size['size_number'];
        $amount = $size['amount'];

        if ($sizeId == 0 || !in_array($sizeId, $oldSizeIds)) {
            $addSize = $db->addSize($id, $sizeNumber, $amount);
            if (!$addSize) {
                echo json_encode(['success' => false, 'message' => 'Lỗi khi thêm size mới']);
                exit();
            }
        } else {
            // Cập nhật size nếu đã tồn tại
            $updateSize = $db->updateSize($sizeId, $sizeNumber, $amount);
            if (!$updateSize) {
                echo json_encode(['success' => false, 'message' => 'Lỗi khi cập nhật size']);
                exit();
            }
        }
    }

    // Xóa size cũ nếu size cũ không có trong danh sách size mới
    foreach ($oldSizes as $oldSize) {
        if (!in_array($oldSize['id'], $newSizeIds)) {
            $deleteSize = $db->deleteSize($oldSize['id']);
            if (!$deleteSize) {
                echo json_encode(['success' => false, 'message' => 'Lỗi khi xóa size cũ']);
                exit();
            }
        }
    }

    echo json_encode(['success' => true, 'message' => 'Cập nhật sản phẩm thành công']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Lỗi: ' . $e->getMessage()]);
} finally {
    $db->closeConnection();
}