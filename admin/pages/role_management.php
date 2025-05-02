<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
if ($_SESSION['role'] != 1) {
    header("Location: login.php"); // Chuyển hướng đến trang đăng nhập
    exit();
}
?>
<div class="home-container">
    <h2 class="mb-4">Quản Lý Quyền</h2>
    <p class="text-muted">Quản lý quyền truy cập của nhân viên trong hệ thống.</p>
    <hr class="main-hr">
    <!-- <div class="button-container">
        
    </div> -->
    <h5 class="mb-3">Danh sách quyền</h5>
    <div class="d-flex align-items-left gap-3 mb-3">
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addRoleModal">Thêm quyền</button>
        <hr class="vertical-hr">
        <input type="text" id="searchInputRole" class="form-control me-5" placeholder="Tìm Kiếm" style="width: 50%;">
    </div>
    <hr class="main-hr">
    <div class="table-container">
        <table class="table table-bordered table-custom table-hover">
            <thead class="table-light">
                <tr class="text-center align-middle">
                    <th>Tên quyền</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody id="tableBodyRole">
                <tr>
                    <td colspan="2">Đang tải dữ liệu...</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<!-- Modal Thêm Quyền -->
<div class="modal fade" id="addRoleModal" tabindex="-1" aria-labelledby="addRoleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="addRoleModalLabel">Thêm Quyền</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="addRoleForm">
                    <div class="mb-3">
                        <label for="roleName" class="form-label">Tên Quyền</label>
                        <input type="text" class="form-control" id="roleName" name="roleName" placeholder="Nhập tên quyền" required>
                    </div>
                    <?php 
                    $permissionsData = json_decode(file_get_contents('http://localhost/PHP-code/my_project/admin/api/role/getpermission.php'), true);
                    $permissions = array_column($permissionsData, 'name', 'id');
                    $actions = ['add' => 'Thêm', 'update' => 'Sửa', 'delete' => 'Xóa'];
                    foreach ($permissions as $permissionId => $permissionName): 
                        if ($permissionId == 4) continue; ?>
                        <div class="mb-3 d-flex align-items-center gap-3">
                            <label class="form-label mb-0" style="min-width: 150px;"><?= $permissionName ?></label>
                            <div class="d-flex gap-3">
                                <?php foreach ($actions as $actionKey => $actionLabel): ?>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="checkbox" id="addpermission<?= $permissionId . ucfirst($actionKey) ?>" name="permissions[<?= $permissionId ?>][<?= $actionKey ?>]" value="1">
                                        <label class="form-check-label" for="addpermission<?= $permissionId . ucfirst($actionKey) ?>"><?= $actionLabel ?></label>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        </div>
                    <?php endforeach; ?>
                    <!-- Thống kê -->
                    <div class="mb-3 d-flex align-items-center gap-3">
                        <label class="form-label mb-0" style="min-width: 150px;">Thống kê</label>
                        <div class="form-check">
                            <label class="form-check-label" for="viewStatistics">Có</label>
                            <input class="form-check-input" type="checkbox" id="viewStatistics" name="permissions[4][status]" value="1">
                        </div>
                    </div>
                </form>
            </div>
            <div id="addRoleError" class="alert alert-danger" style="display: none;" role="alert"></div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                <button type="submit" class="btn btn-primary" form="addRoleForm">Lưu</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal Xem/Sửa Quyền -->
<div class="modal fade" id="editRoleModal" tabindex="-1" aria-labelledby="editRoleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editRoleModalLabel">Xem/Sửa Quyền</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="editRoleForm">
                    <div class="mb-3">
                        <label for="editRoleName" class="form-label">Tên Quyền</label>
                        <input type="text" class="form-control" id="editRoleName" name="roleName" placeholder="Nhập tên quyền" required>
                    </div>

                    <?php 
                    $permissionsData = json_decode(file_get_contents('http://localhost/PHP-code/my_project/admin/api/role/getpermission.php'), true);
                    $permissions = array_column($permissionsData, 'name', 'id');
                    $actions = ['add' => 'Thêm', 'update' => 'Sửa', 'delete' => 'Xóa'];
                    foreach ($permissions as $permissionId => $permissionName): 
                        if ($permissionId == 4) continue; ?>
                        <div class="mb-3 d-flex align-items-center gap-3">
                            <label class="form-label mb-0" style="min-width: 150px;"><?= $permissionName ?></label>
                            <div class="d-flex gap-3">
                                <?php foreach ($actions as $actionKey => $actionLabel): ?>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="checkbox" id="editpermission<?= $permissionId . ucfirst($actionKey) ?>" name="permissions[<?= $permissionId ?>][<?= $actionKey ?>]" value="1">
                                        <label class="form-check-label" for="editpermission<?= $permissionId . ucfirst($actionKey) ?>"><?= $actionLabel ?></label>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        </div>
                    <?php endforeach; ?>

                    <!-- Thống kê -->
                    <div class="mb-3 d-flex align-items-center gap-3">
                        <label class="form-label mb-0" style="min-width: 150px;">Thống kê</label>
                        <div class="form-check">
                            <label class="form-check-label" for="editViewStatistics">Có</label>
                            <input class="form-check-input" type="checkbox" id="editViewStatistics" name="permissions[4][status]" value="1">
                        </div>
                    </div>
                </form>
            </div>
            <div id="editRoleError" class="alert alert-danger d-none" role="alert"></div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                <button type="submit" class="btn btn-primary" form="editRoleForm">Lưu</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal Xóa Quyền -->
<div class="modal fade" id="confirmDeleteModal" tabindex="-1" aria-labelledby="deleteRoleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="deleteRoleModalLabel">Xóa Quyền</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-center">
                <p id="deleteRoleName" class="fw-bold"></p>
            </div>
            <div id="deleteRoleError" class="alert alert-danger d-none" role="alert"></div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                <button type="button" class="btn btn-danger" id="confirmDeleteButton">Xóa</button>
            </div>
        </div>
    </div>