<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
if (!hasPagePermission($_SESSION['permissions'], 'index.php?page=order_management')) {
    header("Location: login.php"); // Chuyển hướng đến trang đăng nhập
    exit();
}
?>

<h2 class="mb-4">Quản Lý Đơn Hàng</h2>
  <hr class="main-hr">
  <h5 class="mb-3">Danh sáchĐơn Hàng</h5>
  <div class="d-flex align-items-center gap-3 mb-3">
    <input type="text" id="searchInputAccount" class="form-control me-2" placeholder="Tìm Kiếm" style="width: 50%;">
  </div>
  <hr class="main-hr">

    <div class="table-container">
        <table class="table table-bordered table-custom table-hover">
        <thead class="table-light">
            <tr class="text-center align-middle">
            <th>Mã Đơn Hàng</th>
            <th>Tên Khách Hàng</th>
            <th>Địa Chỉ Giao Hàng</th>
            <th>Ngày Tạo</th>
            <th>Ngày Cập Nhật</th>
            <th>Trạng Thái</th>
            </tr>
        </thead>
        <tbody id="tableBodyAccount">
            <tr>
            <td colspan="6">Đang tải dữ liệu...</td>
            </tr>
        </tbody>
        </table>