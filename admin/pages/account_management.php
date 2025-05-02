<?php
if (session_status() === PHP_SESSION_NONE) {
  session_start();
}
if (!hasPagePermission($_SESSION['permissions'], 'index.php?page=account_management')) {
  header("Location: login.php"); // Chuyển hướng đến trang đăng nhập
  exit();
}
$result = checkUserPermissions($_SESSION['permissions'], 'index.php?page=account_management');
$addPermission = $result['add'] ? '<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addAccountModal">Thêm tài khoản </button>' : '';
$updatePermission = $result['update'] ? '<button type="button" id="btn_edit_update" class="btn btn-primary" onclick="submitEdit(event)">Lưu tài khoản</button>' : '';
$deletePermission = $result['delete'] ? '<button type="button" id="btn_edit_benned" class="btn btn-danger"onclick="submitBanned(event)">Mở/Khóa tài khoản</button>' : '';
?>
  <!-- Tiêu đề -->
  <h2 class="mb-4">Quản Lý Tài Khoản</h2>
  <hr class="main-hr">
  <!-- Thanh tìm kiếm và nút thêm nhân viên -->
  <h5 class="mb-3">Danh sách Tài Khoản</h5>

  <div class="d-flex align-items-center gap-3 mb-3">
    <?php echo $addPermission; ?>
    <input type="text" id="searchInputAccount" class="form-control me-2" placeholder="Tìm Kiếm" style="width: 50%;">
  </div>

  <hr class="main-hr">
  <!-- Bảng danh sách nhân viên -->
  <div class="table-container">
    <table class="table table-bordered table-custom table-hover">
      <thead class="table-light">
        <tr class="text-center align-middle">
          <th>Tên tài khoản</th>
          <th>Email</th>
          <th>Quyền</th>
          <th>Trạng thái</th>
          <th>Ngày Tạo </th>
          <th>Ngày Cập Nhật</th>
        </tr>
      </thead>
      <tbody id="tableBodyAccount">
        <tr>
          <td colspan="6">Đang tải dữ liệu...</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Modal Thêm Tài Khoản -->
  <div class="modal fade" id="addAccountModal" tabindex="-1" aria-labelledby="addAccountModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addAccountModalLabel">Thêm Tài Khoản</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="addAccountForm">
            <div class="mb-3">
              <label for="username" class="form-label">Tên tài khoản</label>
              <input type="text" class="form-control" id="username" name="username">
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Mật khẩu</label>
              <input type="password" class="form-control" id="password" name="password">
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control" id="email" name="email">
            </div>
            <div class="mb-3">
              <label for="role" class="form-label">Quyền</label>
              <select class="form-select" id="role" name="role">
                <option value="">Chọn quyền</option>
                <?php
                // Lấy danh sách quyền từ API
                $url = 'http://localhost/PHP-code/my_project/admin/api/role/getrole.php';
                $response = file_get_contents($url);
                $roles = json_decode($response, true);
                foreach ($roles as $role) {
                  echo '<option value="' . htmlspecialchars($role['id']) . '">' . htmlspecialchars($role['name']) . '</option>';
                }
                ?>
              </select>
            </div>
            <div class="mb-3">
              <label for="status" class="form-label">Trạng thái</label>
              <select class="form-select" id="status" name="status">
                <option value="active">Hoạt động</option>
                <option value="inactive">Không hoạt động</option>
              </select>
            </div>
          </form>
        </div>
        <div id="addAccountError" class="alert alert-danger" style="display: none;" role="alert"></div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          <button type="submit" form="addAccountForm" class="btn btn-primary">Thêm</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Cập Nhật Tài Khoản -->
  <div class="modal fade" id="updateAccountModal" tabindex="-1" aria-labelledby="updateAccountModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">

        <div class="modal-header">
          <h5 class="modal-title" id="updateAccountModalLabel">Thông tin tài khoản</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Đóng"></button>
        </div>

        <div class="modal-body">
          <form id="updateAccountForm">
            <div class="row g-3">
              <div class="col-12 text-center">
                <label for="updateAvatar" class="form-label">Avatar</label>
                <input type="text" class="form-control w-50 mx-auto" id="updateAvatar" name="updateAvatar">
              </div>
              <div class="col-md-6">
                <label for="updateUsername" class="form-label">Username</label>
                <input type="text" class="form-control" id="updateUsername" name="updateUsername" readonly>
              </div>
              <div class="col-md-6">
                <label for="updateEmail" class="form-label">Email</label>
                <input type="email" class="form-control" id="updateEmail" name="updateEmail">
              </div>
              <div class="col-md-6">
                <label for="updateFullname" class="form-label">Họ và tên</label>
                <input type="text" class="form-control" id="updateFullname" name="updateFullname">
              </div>
              <div class="col-md-6">
                <label for="updatePhoneNumber" class="form-label">Số điện thoại</label>
                <input type="text" class="form-control" id="updatePhoneNumber" name="updatePhoneNumber">
              </div>
              <div class="col-md-6">
                <label for="updateRoleId" class="form-label">Quyền</label>
                <select class="form-select" id="updateRoleId" name="updateRoleId">
                  <option value="">Chọn quyền</option>
                </select>
              </div>
              <div class="col-md-6">
                <label for="updateStatus" class="form-label">Trạng thái</label>
                <input type="text" class="form-control" id="updateStatus" name="updateStatus" readonly>
              </div>
              <div class="col-md-6">
                <label for="updateCreated" class="form-label">Ngày tạo</label>
                <input type="text" class="form-control" id="updateCreated" readonly name="updateCreated">
              </div>
              <div class="col-md-6">
                <label for="updateUpdated" class="form-label">Cập nhật gần nhất</label>
                <input type="text" class="form-control" id="updateUpdated" readonly>
              </div>
            </div>
            <div class="mb-3 mt-3">
              <label for="updateAddress" class="form-label">Địa chỉ</label>
              <select class="form-select" id="updateAddress">
              </select>
            </div>
          </form>
          <div id="updateAccountError" class="alert alert-danger" style="display: none;" role="alert"></div>
          <div id="updateAccountSuccess" class="alert alert-success" style="display: none;" role="alert"></div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
            <?php echo $updatePermission; ?>
            <?php echo $deletePermission; ?>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Xác Nhận Mở/Khóa Tài Khoản -->
    <div class="modal fade" id="confirmAccountModal" tabindex="-1" aria-labelledby="confirmAccountModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header custom-modal">
            <h5 class="modal-title" id="confirmAccountModalLabel">Xác Nhận</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" id="confirmAccountModalBody">          
          </div>
          <div class="modal-footer custom-modal">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
            <button type="button" id="confirmBanned" class="btn btn-danger">Xác Nhận</button>
          </div>
        </div>
      </div>
    </div>