<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
if (!hasPagePermission($_SESSION['permissions'], 'index.php?page=brand_management')) {
    header("Location: login.php"); // Chuyển hướng đến trang đăng nhập
    exit();
}
// Kiểm tra quyền truy cập
$result = checkUserPermissions($_SESSION['permissions'], 'index.php?page=brand_management');
$addPermission = $result['add'] ? '<button class="btn btn-primary" id="addBrandBtn">Thêm Thương Hiệu</button>' : '<button class="btn btn-primary d-none" id="addBrandBtn">Thêm Thương Hiệu</button>';
$updatePermission = $result['update'] ? '<button class="btn btn-warning btn-sm">Sửa</button>' : '<button class="btn btn-warning btn-sm d-none">Sửa</button>';
$deletePermission = $result['delete'] ? '<button class="btn btn-danger btn-sm">Xóa</button>' : '<button class="btn btn-danger btn-sm d-none">Xóa</button>';
?>

<h2 class="mb-4">Quản Lý Thương Hiệu</h2>
<hr class="main-hr">
<h5 class="mb-3">Danh sách Thương Hiệu</h5>
<div class="d-flex align-items-center gap-3 mb-3">
    <?php echo $addPermission; ?>
    <input type="text" id="searchInputBrand" class="form-control me-2" placeholder="Tìm Kiếm" style="width: 50%;">
</div>
<hr class="main-hr">
<div class="table-container">
    <table class="table table-bordered table-custom table-hover">
        <thead class="table-light">
            <tr class="text-center align-middle">
                <th>Mã Thương Hiệu</th>
                <th>Tên Thương Hiệu</th>
                <th>Mô Tả</th>
                <th>Thao Tác</th>
            </tr>
        </thead>
        <tbody id="tableBodyBrand">
            <tr>
                <td colspan="4" class="text-center">Đang tải dữ liệu...</td>
            </tr>
        </tbody>
    </table>
</div>

<!-- Modal Thêm Thương Hiệu -->
<div class="modal fade" id="addBrandModal" tabindex="-1" aria-labelledby="addBrandModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="addBrandModalLabel">Thêm Thương Hiệu</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="addBrandForm">
                    <div class="mb-3">
                        <label for="brandName" class="form-label">Tên Thương Hiệu</label>
                        <input type="text" class="form-control" id="brandName" name="brandName" required>
                    </div>
                    <div class="mb-3">
                        <label for="brandDescription" class="form-label">Mô Tả</label>
                        <textarea class="form-control" id="brandDescription" name="brandDescription" rows="3"></textarea>
                    </div>
                    <div class="text-end">
                        <button type="submit" class="btn btn-primary">Thêm</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- Modal Sửa Thương Hiệu -->
<div class="modal fade" id="editBrandModal" tabindex="-1" aria-labelledby="editBrandModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editBrandModalLabel">Sửa Thương Hiệu</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="editBrandForm">
                    <input type="hidden" id="editBrandId" name="brandId">
                    <div class="mb-3">
                        <label for="editBrandName" class="form-label">Tên Thương Hiệu</label>
                        <input type="text" class="form-control" id="editBrandName" name="brandName" required>
                    </div>
                    <div class="mb-3">
                        <label for="editBrandDescription" class="form-label">Mô Tả</label>
                        <textarea class="form-control" id="editBrandDescription" name="brandDescription" rows="3"></textarea>
                    </div>
                    <div class="text-end">
                        <button type="submit" class="btn btn-primary">Lưu</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const addBrandBtn = document.getElementById('addBrandBtn');
        const addBrandForm = document.getElementById('addBrandForm');
        const apiUrl = '../admin/api/product/addbrand.php'; // API thêm thương hiệu

        // Hiển thị modal thêm thương hiệu
        addBrandBtn.addEventListener('click', function() {
            const addBrandModal = new bootstrap.Modal(document.getElementById('addBrandModal'));
            addBrandModal.show();
        });

        // Xử lý thêm thương hiệu
        addBrandForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(addBrandForm);
            fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Object.fromEntries(formData))
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        showToast('Thêm thương hiệu thành công!', 'success');
                        location.reload(); // Reload để cập nhật danh sách
                    } else {
                        showToast('Thêm thương hiệu thất bại: ' + data.message, 'danger');
                    }
                })
                .catch(error => {
                    console.error('Lỗi khi thêm thương hiệu:', error);
                    showToast('Đã xảy ra lỗi khi thêm thương hiệu.', 'danger');
                });
        });

        // Lấy danh sách thương hiệu
        const tableBody = document.getElementById('tableBodyBrand');
        const fetchApiUrl = '../admin/api/product/getallbrand.php'; // API lấy danh sách thương hiệu

        fetch(fetchApiUrl)
            .then(response => response.json())
            .then(data => {
                tableBody.innerHTML = ''; // Xóa dòng "Đang tải dữ liệu..."

                if (data.length === 0) {
                    tableBody.innerHTML = '<tr><td colspan="4" class="text-center">Không có dữ liệu</td></tr>';
                    return;
                }

                data.forEach(brand => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                <td class="text-center">${brand.id}</td>
                <td>${brand.name}</td>
                <td>${brand.description || ''}</td>
                <td class="text-center">
                <?php echo $updatePermission; ?>
                <?php echo $deletePermission; ?>
                </td>
            `;
                    tableBody.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Lỗi khi tải danh sách thương hiệu:', error);
                tableBody.innerHTML = '<tr><td colspan="4" class="text-center text-danger">Lỗi khi tải dữ liệu</td></tr>';
            });
    });
    // Xử lý tìm kiếm thương hiệu
    const searchInput = document.getElementById('searchInputBrand');
    searchInput.addEventListener('input', function() {
        const searchValue = searchInput.value.toLowerCase();
        const rows = document.querySelectorAll('#tableBodyBrand tr');

        rows.forEach(row => {
            const brandId = row.children[0]?.textContent.toLowerCase() || '';
            const brandName = row.children[1]?.textContent.toLowerCase() || '';
            const brandDescription = row.children[2]?.textContent.toLowerCase() || '';

            if (brandId.includes(searchValue) || brandName.includes(searchValue) || brandDescription.includes(searchValue)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
    // Xử lý sửa thương hiệu
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-warning')) {
            const row = e.target.closest('tr');
            const brandId = row.children[0].textContent;
            const brandName = row.children[1].textContent;
            const brandDescription = row.children[2].textContent;

            document.getElementById('editBrandId').value = brandId;
            document.getElementById('editBrandName').value = brandName;
            document.getElementById('editBrandDescription').value = brandDescription;

            const editBrandModal = new bootstrap.Modal(document.getElementById('editBrandModal'));
            editBrandModal.show();
        }
    });

    const editBrandForm = document.getElementById('editBrandForm');
    const editApiUrl = '../admin/api/product/editbrand.php'; // API sửa thương hiệu

    editBrandForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(editBrandForm);
        fetch(editApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Object.fromEntries(formData))
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showToast('Sửa thương hiệu thành công!', 'success');
                    location.reload(); // Reload để cập nhật danh sách
                } else {
                    showToast('Sửa thương hiệu thất bại: ' + data.message, 'danger');
                }
            })
            .catch(error => {
                console.error('Lỗi khi sửa thương hiệu:', error);
                showToast('Đã xảy ra lỗi khi sửa thương hiệu.', 'danger');
            });
    });
    // Xử lý xóa thương hiệu
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-danger')) {
            const row = e.target.closest('tr');
            const brandId = row.children[0].textContent;

            if (confirm('Bạn có chắc chắn muốn xóa thương hiệu này?')) {
                const deleteApiUrl = '../admin/api/product/deletebrand.php'; // API xóa thương hiệu

                fetch(`${deleteApiUrl}?brandId=${brandId}`, {
                        method: 'GET'
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            showToast('Xóa thương hiệu thành công!', 'success');
                            location.reload(); // Reload để cập nhật danh sách
                        } else {
                            showToast('Xóa thương hiệu thất bại: ' + data.message, 'danger');
                        }
                    })
                    .catch(error => {
                        console.error('Lỗi khi xóa thương hiệu:', error);
                        showToast('Đã xảy ra lỗi khi xóa thương hiệu.', 'danger');
                    });
            }
        }
    });
</script>