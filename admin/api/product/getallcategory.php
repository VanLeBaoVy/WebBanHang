<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

// Kết nối đến cơ sở dữ liệu
include("../../connectDB/product.php");
$db = new DatabaseProduct();
$categories = $db->getCategory();
echo json_encode($categories);
$db->closeConnection();
?>