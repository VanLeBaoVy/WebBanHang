<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

// Kết nối đến cơ sở dữ liệu
include("../../connectDB/product.php");

$db = new DatabaseProduct();
$product = $db->getAllProducts();
$size = $db->getSize();
foreach ($product as $key => $value) {
    $product[$key]['size'] = array();
    foreach ($size as $key1 => $value1) {
        if ($value['product_id'] == $value1['product_id']) {
            $product[$key]['size'][] = array(
                'size_number' => $value1['size_number'],
                'amount' => (int)$value1['amount']
            );
        }
    }
}

if ($product == null) {
    http_response_code(200);
    echo json_encode([]);
} else {
    http_response_code(200);
    echo json_encode($product);
}
$db->closeConnection();
?>