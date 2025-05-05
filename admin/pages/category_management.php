<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
if (!hasPagePermission($_SESSION['permissions'], 'index.php?page=category_management')) {
    header("Location: login.php"); // Chuyển hướng đến trang đăng nhập
    exit();
}
$result = checkUserPermissions($_SESSION['permissions'], 'index.php?page=category_management');
$addPermission = $result['add'] ? '<button class="btn btn-primary" id="addCategoryBtn">Thêm Loại</button>' : '<button class="btn btn-primary d-none" id="addCategoryBtn">Thêm Loại</button>';
$updatePermission = $result['update'] ? '<button class="btn btn-warning btn-sm">Sửa</button>' : '<button class="btn btn-warning btn-sm d-none">Sửa</button>';
$deletePermission = $result['delete'] ? '<button class="btn btn-danger btn-sm">Xóa</button>' : '<button class="btn btn-danger btn-sm d-none">Xóa</button>';
?>

<h2 class="mb-4">Quản Lý Loại</h2>
<hr class="main-hr">
<h5 class="mb-3">Danh sách Loại</h5>
<div class="d-flex align-items-center gap-3 mb-3">
    <?php echo $addPermission; ?>
    <input type="text" id="searchInputCategory" class="form-control me-2" placeholder="Tìm Kiếm" style="width: 50%;">
</div>
<hr class="main-hr">
<div class="table-container">
    <table class="table table-bordered table-custom table-hover">
        <thead class="table-light">
            <tr class="text-center align-middle">
                <th>Mã Loại</th>
                <th>Tên Loại</th>
                <th>Thao Tác</th>
            </tr>
        </thead>
        <tbody id="tableBodyCategory">
            <tr>
                <td colspan="3">Đang tải dữ liệu...</td>
            </tr>
        </tbody>
    </table>

    <!-- Modal Thêm Loại -->
    <div class="modal fade" id="addCategoryModal" tabindex="-1" aria-labelledby="addCategoryModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addCategoryModalLabel">Thêm Loại</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="addCategoryForm">
                        <div class="mb-3">
                            <label for="categoryName" class="form-label">Tên Loại</label>
                            <input type="text" class="form-control" id="categoryName" name="categoryName" required>
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

    <!-- Modal Sửa Loại -->
    <div class="modal fade" id="editCategoryModal" tabindex="-1" aria-labelledby="editCategoryModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editCategoryModalLabel">Sửa Loại</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="editCategoryForm">
                        <input type="hidden" id="editCategoryId" name="categoryId">
                        <div class="mb-3">
                            <label for="editCategoryName" class="form-label">Tên Loại</label>
                            <input type="text" class="form-control" id="editCategoryName" name="categoryName" required>
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
        document.addEventListener('DOMContentLoaded', function () {
            const addCategoryBtn = document.getElementById('addCategoryBtn');
            const addCategoryForm = document.getElementById('addCategoryForm');
            const apiUrl = '../admin/api/product/addcategory.php'; // Replace with your actual API endpoint

            // Show modal when "Thêm Loại" button is clicked
            addCategoryBtn.addEventListener('click', function () {
                const addCategoryModal = new bootstrap.Modal(document.getElementById('addCategoryModal'));
                addCategoryModal.show();
            });

            // Handle form submission
            addCategoryForm.addEventListener('submit', function (e) {
                e.preventDefault();

                const formData = new FormData(addCategoryForm);
                console.log('Form data:', formData.get('categoryName'));
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
                            showToast('Thêm loại thành công!', 'success');
                            location.reload(); // Reload the page to update the table
                        } else {
                            showToast('Thêm loại thất bại: ' + data.message, 'danger');
                        }
                    })
                    .catch(error => {
                        console.error('Error adding category:', error);
                        showToast('Đã xảy ra lỗi khi thêm loại.', 'danger');
                    });
            });
        });

        // Search functionality
        document.addEventListener('DOMContentLoaded', function () {
            const searchInput = document.getElementById('searchInputCategory');
            const tableBody = document.getElementById('tableBodyCategory');

            searchInput.addEventListener('input', function () {
            const searchTerm = searchInput.value.toLowerCase();

            Array.from(tableBody.children).forEach(row => {
                const categoryId = row.children[0]?.textContent.toLowerCase();
                const categoryName = row.children[1]?.textContent.toLowerCase();

                if ((categoryId && categoryId.includes(searchTerm)) || 
                (categoryName && categoryName.includes(searchTerm))) {
                row.style.display = '';
                } else {
                row.style.display = 'none';
                }
            });
            });
        });
        
        document.addEventListener('DOMContentLoaded', function () {
            const tableBody = document.getElementById('tableBodyCategory');
            const apiUrl = '../admin/api/product/getallcategory.php'; // Replace with your actual API endpoint

            // Fetch data from API
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    tableBody.innerHTML = ''; // Clear the loading row

                    if (data.length === 0) {
                        tableBody.innerHTML = '<tr><td colspan="3" class="text-center">Không có dữ liệu</td></tr>';
                        return;
                    }

                    console.log('Fetched data:', data); // Log the fetched data
                    data.forEach(category => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td class="text-center">${category.id}</td>
                            <td>${category.name}</td>
                            <td class="text-center">
                            <?php echo $updatePermission; ?>
                            <?php echo $deletePermission; ?>                         
                            </td>
                        `;
                        tableBody.appendChild(row);
                    });
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    tableBody.innerHTML = '<tr><td colspan="3" class="text-center text-danger">Lỗi khi tải dữ liệu</td></tr>';
                });
        });

        document.addEventListener('DOMContentLoaded', function () {
            const tableBody = document.getElementById('tableBodyCategory');
            const editCategoryModal = new bootstrap.Modal(document.getElementById('editCategoryModal'));
            const editCategoryForm = document.getElementById('editCategoryForm');
            const editCategoryIdInput = document.getElementById('editCategoryId');
            const editCategoryNameInput = document.getElementById('editCategoryName');
            const editApiUrl = '../admin/api/product/editcategory.php'; // Replace with your actual API endpoint

            // Add event listener for edit buttons
            tableBody.addEventListener('click', function (e) {
            if (e.target.classList.contains('btn-warning')) {
                const row = e.target.closest('tr');
                const categoryId = row.children[0].textContent.trim();
                const categoryName = row.children[1].textContent.trim();

                // Populate modal fields
                editCategoryIdInput.value = categoryId;
                editCategoryNameInput.value = categoryName;

                // Show the edit modal
                editCategoryModal.show();
            }
            });

            // Handle edit form submission
            editCategoryForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(editCategoryForm);
            console.log('Edit form data:', formData.get('categoryName'));
            console.log('Edit form data:', formData.get('categoryId'));
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
                    showToast('Cập nhật loại thành công!', 'success');
                    setTimeout(() => {
                            location.reload(); // Reload the page to update the table
                        }, 3000); // Wait for 3 seconds before reloading // Reload the page to update the table
                } else {
                    showToast('Cập nhật loại thất bại: ' + data.message, 'danger');
                }
                })
                .catch(error => {
                console.error('Error updating category:', error);
                showToast('Đã xảy ra lỗi khi cập nhật loại.', 'danger');
                });
            });
        });
        document.addEventListener('DOMContentLoaded', function () {
            const tableBody = document.getElementById('tableBodyCategory');
            const deleteApiUrl = '../admin/api/product/deletecategory.php'; // Replace with your actual API endpoint

            // Add event listener for delete buttons
            tableBody.addEventListener('click', function (e) {
            if (e.target.classList.contains('btn-danger')) {
                const row = e.target.closest('tr');
                const categoryId = row.children[0].textContent.trim();

                // Show confirmation modal
                if (showConfirm('Bạn có chắc chắn muốn xóa loại này không?')) {
                // Proceed with deletion
                fetch(`${deleteApiUrl}?categoryId=${categoryId}`, {
                    method: 'GET',
                })
                    .then(response => response.json())
                    .then(data => {
                    if (data.success) {
                        showToast('Xóa loại thành công!', 'success');
                        setTimeout(() => {
                            location.reload(); // Reload the page to update the table
                        }, 3000); // Wait for 3 seconds before reloading
                    } else {
                        showToast('Xóa loại thất bại: ' + data.message, 'danger');
                    }
                    })
                    .catch(error => {
                    console.error('Error deleting category:', error);
                    showToast('Đã xảy ra lỗi khi xóa loại.', 'danger');
                    });
                }
            }
            });
        });
    </script>