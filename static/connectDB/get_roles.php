<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    include 'ConnectDataBase.php'; // Kết nối đến cơ sở dữ liệu
    $db = new Database();
    $roles = $db->getAllRole();
    echo json_encode($roles); // Trả về dữ liệu dưới dạng JSON
?>