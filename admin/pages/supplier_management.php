<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
if (!hasPagePermission($_SESSION['permissions'], 'index.php?page=supplier_management')) {
    header("Location: login.php"); // Chuyển hướng đến trang đăng nhập
    exit();
}
$result = checkUserPermissions($_SESSION['permissions'], 'index.php?page=supplier_management');
$addPermission = $result['add'] ? '<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addSupplierModal">Thêm Nhà Cung Cấp</button>' : '<button class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#addSupplierModal">Thêm Nhà Cung Cấp</button>';
$updatePermission = $result['update'] ? '<button class="btn btn-warning btn-sm">Sửa</button>' : '<button class="btn btn-warning btn-sm d-none">Sửa</button>';
$deletePermission = $result['delete'] ? '<button class="btn btn-danger btn-sm">Xóa</button>' : '<button class="btn btn-danger btn-sm d-none">Xóa</button>';
?>

<!-- Tiêu đề -->
<h2 class="mb-4">Quản Lý Nhà Cung Cấp</h2>
<hr class="main-hr">
<!-- Thanh tìm kiếm và nút thêm nhà cung cấp -->
<h5 class="mb-3">Danh sách Nhà Cung Cấp</h5>
<div class="d-flex align-items-center gap-3 mb-3">
<?php echo $addPermission; ?>
    <input type="text" id="searchInputSupplier" class="form-control me-2" placeholder="Tìm Kiếm" style="width: 50%;">
</div>
 <hr class="main-hr">
<!-- Bảng danh sách nhà cung cấp -->
<div class="table-container">
    <table class="table table-bordered table-custom table-hover">
        <thead class="table-light">
            <tr class="text-center align-middle">
                <th>Tên Nhà Cung Cấp</th>
                <th>Tax</th>
                <th>Tên người liên hệ</th>
                <th>Số Điện Thoại</th>
                <th>Email</th>
                <th>Ngày Tạo</th>
                <th>Thao Tác</th>
            </tr>
        </thead>
        <tbody id="tableBodySupplier">
            <tr>
                <td colspan="6">Đang tải dữ liệu...</td>
            </tr>
        </tbody>
    </table>
</div>
<!-- Modal Thêm Nhà Cung Cấp -->
<div class="modal fade" id="addSupplierModal" tabindex="-1" aria-labelledby="addSupplierModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form id="addSupplierForm">
                <div class="modal-header">
                    <h5 class="modal-title" id="addSupplierModalLabel">Thêm Nhà Cung Cấp</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="supplierName" class="form-label">Tên Nhà Cung Cấp</label>
                        <input type="text" class="form-control" id="supplierName" name="name" required>
                    </div>
                    <div class="mb-3">
                        <label for="supplierTax" class="form-label">Tax</label>
                        <input type="text" class="form-control" id="supplierTax" name="tax" required>
                    </div>
                    <div class="mb-3">
                        <label for="contactName" class="form-label">Tên Người Liên Hệ</label>
                        <input type="text" class="form-control" id="contactName" name="contact_name" required>
                    </div>
                    <div class="mb-3">
                        <label for="supplierPhone" class="form-label">Số Điện Thoại</label>
                        <input type="text" class="form-control" id="supplierPhone" name="phone" required>
                    </div>
                    <div class="mb-3">
                        <label for="supplierEmail" class="form-label">Email</label>
                        <input type="email" class="form-control" id="supplierEmail" name="email" required>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button type="submit" class="btn btn-primary">Thêm</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Modal Sửa Nhà Cung Cấp -->
<div class="modal fade" id="editSupplierModal" tabindex="-1" aria-labelledby="editSupplierModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form id="editSupplierForm">
                <div class="modal-header">
                    <h5 class="modal-title" id="editSupplierModalLabel">Sửa Nhà Cung Cấp</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="editSupplierId" name="id">
                    <div class="mb-3">
                        <label for="editSupplierName" class="form-label">Tên Nhà Cung Cấp</label>
                        <input type="text" class="form-control" id="editSupplierName" name="name" required>
                    </div>
                    <div class="mb-3">
                        <label for="editSupplierTax" class="form-label">Tax</label>
                        <input type="text" class="form-control" id="editSupplierTax" name="tax" required>
                    </div>
                    <div class="mb-3">
                        <label for="editContactName" class="form-label">Tên Người Liên Hệ</label>
                        <input type="text" class="form-control" id="editContactName" name="contact_name" required>
                    </div>
                    <div class="mb-3">
                        <label for="editSupplierPhone" class="form-label">Số Điện Thoại</label>
                        <input type="text" class="form-control" id="editSupplierPhone" name="phone" required>
                    </div>
                    <div class="mb-3">
                        <label for="editSupplierEmail" class="form-label">Email</label>
                        <input type="email" class="form-control" id="editSupplierEmail" name="email" required>
                    </div>
                    <div class="mb-3">
                        <label for="editSupplierCreatedAt" class="form-label">Ngày Tạo</label>
                        <h7 id="editSupplierCreatedAt" class="form-text"></h7>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button type="submit" class="btn btn-primary">Lưu Thay Đổi</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
    document.addEventListener("DOMContentLoaded", function () {
        fetchSuppliers(); // Fetch suppliers when the page loads
    });
document.getElementById("addSupplierForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    console.log("Form data:", Object.fromEntries(formData.entries())); // Log form data for debugging
    fetch('../admin/api/product/addsupplier.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData.entries()))
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showToast("Thêm nhà cung cấp thành công!", "success");
            document.getElementById("addSupplierForm").reset();
            const modal = bootstrap.Modal.getInstance(document.getElementById("addSupplierModal"));
            modal.hide();
            fetchSuppliers(); // Refresh the supplier list
        } else {
            showToast("Lỗi: " + data.message, "error");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        showToast("Đã xảy ra lỗi khi thêm nhà cung cấp.", "error");
    });
});



// Fetch supplier data from API
function fetchSuppliers() {
        const tableBody = document.getElementById("tableBodySupplier");
        fetch('../admin/api/product/getallsupplier.php')
            .then(response => response.json())
            .then(data => {           
                    renderSuppliers(data);
            })
            .catch(error => {
                console.error('Error fetching suppliers:', error);
                tableBody.innerHTML = `<tr><td colspan="7" class="text-center">Lỗi khi tải dữ liệu.</td></tr>`;
            });
    }

    // Render table rows
    function renderSuppliers(suppliers) {
        console.log(suppliers); // Log the suppliers data to the console for debugging
        const tableBody = document.getElementById('tableBodySupplier');
        tableBody.innerHTML = ''; // Xóa dòng "Đang tải..."

        if (!suppliers || suppliers.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="7" class="text-center">Không có dữ liệu</td></tr>';
            return;
        }

        suppliers.forEach(supplier => {
            const row = document.createElement('tr');
            row.dataset.id = supplier.id; // Set data-id attribute for the row
            row.innerHTML = `
                <td>${supplier.name}</td>
                <td class="text-center">${supplier.tax}</td>
                <td>${supplier.contact_name}</td>
                <td class="text-center">${supplier.phone_number}</td>
                <td>${supplier.email}</td>
                <td class="text-center">${supplier.created_at}</td>
                <td class="text-center">
                <?php echo $updatePermission; ?>
                <?php echo $deletePermission; ?>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Populate edit modal with supplier data
    function populateEditModal(supplier) {
        document.getElementById("editSupplierId").value = supplier.id;
        document.getElementById("editSupplierName").value = supplier.name;
        document.getElementById("editSupplierTax").value = supplier.tax;
        document.getElementById("editContactName").value = supplier.contact_name;
        document.getElementById("editSupplierPhone").value = supplier.phone_number;
        document.getElementById("editSupplierEmail").value = supplier.email;
        document.getElementById("editSupplierCreatedAt").textContent = supplier.created_at;
    }

    // Add event listener to edit buttons
    document.addEventListener("click", function (e) {
        if (e.target && e.target.classList.contains("btn-warning")) {
            const row = e.target.closest("tr");
            const supplier = {
                id: row.dataset.id,
                name: row.children[0].textContent,
                tax: row.children[1].textContent,
                contact_name: row.children[2].textContent,
                phone_number: row.children[3].textContent,
                email: row.children[4].textContent,
                created_at: row.children[5].textContent
            };
            populateEditModal(supplier);
            const editModal = new bootstrap.Modal(document.getElementById("editSupplierModal"));
            editModal.show();
        }
    });
    document.getElementById("editSupplierForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        console.log("Edit form data:", Object.fromEntries(formData.entries())); // Log form data for debugging
        fetch('../admin/api/product/editsupplier.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData.entries()))
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showToast("Cập nhật nhà cung cấp thành công!", "success");
                const modal = bootstrap.Modal.getInstance(document.getElementById("editSupplierModal"));
                modal.hide();
                fetchSuppliers(); // Refresh the supplier list
            } else {
                showToast("Lỗi: " + data.message, "error");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            showToast("Đã xảy ra lỗi khi cập nhật nhà cung cấp.", "error");
        });
    });
    // Search functionality

    document.getElementById("searchInputSupplier").addEventListener("input", function () {
        const searchTerm = this.value.toLowerCase();
        const rows = document.querySelectorAll("#tableBodySupplier tr");
        rows.forEach(row => {
            const cells = row.querySelectorAll("td");
            let found = false;
            cells.forEach(cell => {
                if (cell.textContent.toLowerCase().includes(searchTerm)) {
                    found = true;
                }
            });
            row.style.display = found ? "" : "none";
        });
    });
    // Delete supplier functionality (optional)
    document.addEventListener("click", function (e) {
        if (e.target && e.target.classList.contains("btn-danger")) {
            const row = e.target.closest("tr");
            const supplierId = row.dataset.id;
            if (showConfirm("Bạn có chắc chắn muốn xóa nhà cung cấp này?")) {
                fetch(`../admin/api/product/deletesuplier.php?id=${supplierId}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        showToast("Xóa nhà cung cấp thành công!", "success");
                        fetchSuppliers(); // Refresh the supplier list
                    } else {
                        showToast("Lỗi: " + data.message, "error");
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    showToast("Đã xảy ra lỗi khi xóa nhà cung cấp.", "error");
                });
            }
        }
    });
</script>
