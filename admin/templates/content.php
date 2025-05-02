<?php
include('utils/roleUtil.php');
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
if (!isset($_SESSION['username'])) {
    header("Location: login.php"); // Chuyển hướng đến trang đăng nhập
    exit();
} else {
    $page = isset($_GET['page']) ? $_GET['page'] : 'home';
    switch ($page) {
        case "home":
            include(__DIR__ . '/../pages/home.php');
            break;
        case "account_management":
            include(__DIR__ . '/../pages/account_management.php');
            break;
        case "product_management":
            include(__DIR__ . '/../pages/product_management.php');
            break;
        case "order_management":
            include(__DIR__ . '/../pages/order_management.php');
            break;
        case "statistics":
            include(__DIR__ . '/../pages/statistics.php');
            break;
        case "role_management":
            include(__DIR__ . '/../pages/role_management.php');
            break;
        default:
            include(__DIR__ . '/../pages/home.php');
            break;
    };
}
