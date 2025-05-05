<?php
session_start();
if (!isset($_SESSION['username']) ) {
   header("Location: login.php"); // Chuyển hướng đến trang đăng nhập
   exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">
   <link rel="stylesheet" href="assets/css/style.css">
   <link rel="stylesheet" href="assets/css/c_home.css">
   <link rel="stylesheet" href="assets/css/sidebar.css">
   <link rel="stylesheet" href="assets/css/role.css">
   <title>Admin</title>
</head>
<body>
<div class="main d-flex">  
   <div class="sidebar d-flex flex-column"><?php include("templates/leftmenu.php"); ?></div>
   <div class="content">
      <?php include("templates/content.php"); ?>
   </div>
   <div class="toast-container" id="toastContainer"></div>
   <div class="modal fade" id="confirmModal" tabindex="-1" aria-labelledby="confirmModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="confirmModalLabel">Xác nhận hành động</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Đóng"></button>
      </div>
      <div class="modal-body" id="confirmMessage">
        Bạn có chắc chắn muốn thực hiện hành động này không?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
        <button type="button" class="btn btn-danger" id="confirmActionBtn">Xác nhận</button>
      </div>
    </div>
  </div>
</div>
</div>
</body>
<script src="assets/js/sidebar.js"></script>
<script src="assets/js/role.js"></script>
<script src="assets/js/account.js"></script>
<script src="assets/js/product.js"></script>
<script src="assets/js/order.js"></script>
<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="assets/js/home.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</html>
