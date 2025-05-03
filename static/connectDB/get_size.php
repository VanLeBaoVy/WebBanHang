<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    include 'ConnectDataBase.php'; // Kết nối đến cơ sở dữ liệu
    $db = new Database();
    $size = $db->getAllSize();
    echo json_encode($size); // Trả về dữ liệu dưới dạng JSON
?>