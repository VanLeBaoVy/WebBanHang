<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// if (isset($_SESSION['role']) && $_SESSION['role'] == 1) {
//     $menuItems = [
//         ['name' => 'Home', 'icon' => 'bi-house-door', 'link' => 'index.php'],
//         ['name' => 'Quản lý người dùng', 'icon' => 'bi-person', 'link' => 'index.php?page=user_management'],
//         ['name' => 'Quản lý sản phẩm', 'icon' => 'bi-box', 'link' => 'index.php?page=product_management'],
//         ['name' => 'Quản lý đơn hàng', 'icon' => 'bi-cart', 'link' => 'index.php?page=order_management'],
//         ['name' => 'Quản lý tài khoản', 'icon' => 'bi-person-circle', 'link' => 'index.php?page=account_management'],
//         ['name' => 'Thống kê', 'icon' => 'bi-graph-up', 'link' => 'index.php?page=statistics'],
//     ];
// }

// if (isset($_SESSION['role']) && $_SESSION['role'] == 2) {
//     $menuItems = [
//         ['name' => 'Home', 'icon' => 'bi-house-door', 'link' => 'index.php'],
//         ['name' => 'Quản lý sản phẩm', 'icon' => 'bi-box', 'link' => 'index.php?page=product_management'],
//         ['name' => 'Quản lý đơn hàng', 'icon' => 'bi-cart', 'link' => 'index.php?page=order_management'],
//         ['name' => 'Thống kê', 'icon' => 'bi-graph-up', 'link' => 'index.php?page=statistics'],
//     ];
// }

$menuItems = $_SESSION['permissions'];
if ($menuItems == null) {
    header("Location: login.php"); // Chuyển hướng đến trang đăng nhập
    exit();
}

// Hiển thị menu
echo '
<h4 class="d-flex align-items-center mb-3">
<img src="assets/images/logo.jpg" alt="logo" class="rounded-circle me-2" width="30" height="30"/> ' . $_SESSION['username'] . ' </h4>
    <hr class="border-light">
        <ul class="nav flex-column">
        <li class="nav-item">
            <a id="test" class="nav-link text-white" href="index.php ">
                <i class="bi bi-house-door"></i> Home
            </a>
        </li>';
// Lặp qua mảng menuItems để tạo các link
foreach ($menuItems as $item) {
    echo '
    <li class="nav-item">
        <a id="test" class="nav-link text-white" href="' . $item['link'] . '">
            <i class="bi ' . $item['icon'] . '"></i> ' . $item['name'] . '
        </a>
    </li>';
}

echo '
    </ul>
     <!-- Thêm Logout ở cuối -->
    <hr class="border-light">';

if (isset($_SESSION['role']) && $_SESSION['role'] == 2) {
        echo '<div class="nav"><a class="nav-link text-white" href="index.php?page=role_management">
                  <i class="bi bi-gear-fill"> Role</i>
              </a></div>';
}
// Thêm Logout button
echo '
    <ul class="nav flex-column mt-auto"> 
        <li class="nav-item">
    <form method="POST" action="">
        <button type="submit" name="logout" class="btn btn-link nav-link text-white">
            <i class="bi bi-box-arrow-right"></i> Logout
        </button>
    </form>
        </li>
    </ul>
';
?>

<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
// Kiểm tra nếu người dùng nhấn nút Logout
if (isset($_POST['logout'])) {
    // Hủy session
    session_unset();
    session_destroy();

    // Chuyển hướng hoặc thông báo
    header("Location: login.php");
    exit();
}
?>
