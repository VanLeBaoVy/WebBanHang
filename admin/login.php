<?php
session_start();
ob_start();
include 'connectDB/user.php';
if ((isset($_POST['login'])) && $_POST['login'] == 'Login') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Kiểm tra rỗng
    if (empty($username) || empty($password)) {
        $loginError = "Vui lòng nhập tên đăng nhập và mật khẩu!";
    } else {
        $db = new DatabaseUser();
        $role = $db->checkUser($username, $password);

        if (is_numeric($role) && $role > 0) {
            // Đăng nhập thành công
            $_SESSION['username'] = $username;
            $_SESSION['role'] = $role;
            $_SESSION['permissions'] = $db->getUserPermissions($username);
            $_SESSION['user_id'] = $db->getUserId($username);
            header("Location: index.php");
            exit();
        } elseif ($role === 'banned') {
            $loginError = "Tài khoản của bạn đã bị khóa!";
        } elseif ($role === 0) {
            $loginError = "Tài khoản của bạn không có quyền truy cập!";
        } else {
            $loginError = "Tên đăng nhập hoặc mật khẩu không đúng!";
        }

        $db->closeConnection();
    }
}


?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header text-center">
                        <h4>Login</h4>
                    </div>
                    <div class="card-body">
                        <form action="<?php $_SERVER['PHP_SELF'] ?>" method="POST">
                            <div class="mb-3">
                                <label for="username" class="form-label">Username</label>
                                <input type="text" class="form-control" id="username" name="username">
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" class="form-control" id="password" name="password">
                            </div>
                            <div class="d-grid">
                                <input type="submit" name="login" class="btn btn-primary" value="Login">
                            </div>
                            <?php if (isset($loginError)) { ?>
                                <div class="alert alert-danger mt-3" role="alert">
                                    <?php echo $loginError; ?>
                                </div>
                            <?php } ?>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>