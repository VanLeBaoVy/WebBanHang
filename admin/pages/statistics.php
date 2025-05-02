<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
if (!hasPagePermission($_SESSION['permissions'], 'index.php?page=statistics')) {
    header("Location: login.php"); // Chuyển hướng đến trang đăng nhập
    exit();
}
?>