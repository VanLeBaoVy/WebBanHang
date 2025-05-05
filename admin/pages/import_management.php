<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
if (!hasPagePermission($_SESSION['permissions'], 'index.php?page=import_management')) {
    header("Location: login.php"); // Chuyển hướng đến trang đăng nhập
    exit();
}
$result = checkUserPermissions($_SESSION['permissions'], 'index.php?page=import_management');
$addPermission = $result['add'] ? '<button class="btn btn-primary" id="btnAddImport">Thêm phiếu nhập</button>' : '<button class="btn btn-primary d-none" id="btnAddImport">Thêm phiếu nhập</button>';
$updatePermission = $result['update'] ? '<button type="button" class="btn btn-primary" id="saveEditImportBtn">Lưu Thay Đổi</button>' : '<button type="button" class="btn btn-primary d-none" id="saveEditImportBtn">Lưu Thay Đổi</button>';
$deletePermission = $result['delete'] ? '<button type="button" class="btn btn-danger" id="deleteImportBtn">Xóa</button>' : '<button type="button" class="btn btn-danger d-none" id="deleteImportBtn">Xóa</button>';
?>
<h2>Quản Lý Nhập Hàng</h2>
<hr class="main-hr">
<h5 class="mb-3">Danh sách Phiếu nhập</h5>
<div class="d-flex align-items-center gap-3 mb-3">
    <?php echo $addPermission; ?>
    <input type="text" id="searchInputImport" class="form-control me-2" placeholder="Tìm Kiếm" style="width: 50%;">
</div>
<hr class="main-hr">
<div class="table-container">
    <table class="table table-bordered table-custom table-hover">
        <thead class="table-light">
            <tr class="text-center align-middle">
                <th>Mã phiếu nhập</th>
                <th>Nhà cung cấp</th>
                <th>Người nhập</th>
                <th>Ngày nhập</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
            </tr>
        </thead>
        <tbody id="tableBodyImport">
            <tr>
                <td colspan="6">Đang tải dữ liệu...</td>
            </tr>
        </tbody>
    </table>
</div>
<!-- Modal Thêm Phiếu Nhập -->
<div class="modal fade" id="addImportModal" tabindex="-1" aria-labelledby="addImportModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl"> <!-- mở rộng khung lớn hơn -->
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="addImportModalLabel">Thêm Phiếu Nhập</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Đóng"></button>
            </div>
            <div class="modal-body">
                <form id="addImportForm">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="supplierSelect" class="form-label">Nhà Cung Cấp</label>
                            <select class="form-select" id="supplierSelect" required>
                                <?php
                                $apiUrl = "http://localhost/PHP-code/webbanhang/admin/api/product/getallsupplier.php";
                                $suppliers = [];
                                try {
                                    $response = file_get_contents($apiUrl);
                                    $suppliers = json_decode($response, true);
                                } catch (Exception $e) {
                                    echo "<option value=''>Không thể tải danh sách nhà cung cấp</option>";
                                }
                                if (!empty($suppliers) && is_array($suppliers)) {
                                    foreach ($suppliers as $supplier) {
                                        echo "<option value='" . htmlspecialchars($supplier['id']) . "'>" . htmlspecialchars($supplier['name']) . "</option>";
                                    }
                                } else {
                                    echo "<option value=''>Không có nhà cung cấp nào</option>";
                                }
                                ?>
                            </select>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="employeeInput" class="form-label">Người Nhập</label>
                            <input type="text" class="form-control" id="employeeInput" value="<?php echo $_SESSION['username']; ?>" readonly>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="statusSelect" class="form-label">Trạng Thái</label>
                            <select class="form-select" id="statusSelect" disabled>
                                <option value="processing" selected>Đang xử lý</option>
                                <option value="complete">Hoàn thành</option>
                            </select>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="importDetails" class="form-label">Chi Tiết Phiếu Nhập</label>
                        <div id="importDetailsContainer" style="padding: 10px 10px 20px 10px; border-radius: 5px; background-color: rgb(237, 235, 235); margin: 10px 0; height: 150px; overflow-y: auto;">
                            <!-- JS sẽ thêm dòng chi tiết tại đây -->
                        </div>
                        <button type="button" class="btn btn-primary" id="btnAddImportDetail">+ Thêm chi tiết</button>
                    </div>
                    <div class="col-md-12 mb-3">
                        <label for="totalPrice" class="form-label">Tổng Tiền</label>
                        <input type="number" class="form-control" id="totalPrice" readonly>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                <button type="button" class="btn btn-primary" id="saveImportBtn">Lưu</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal Sửa Phiếu Nhập -->
<div class="modal fade" id="editImportModal" tabindex="-1" aria-labelledby="editImportModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editImportModalLabel">Xem/Sửa Phiếu Nhập</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Đóng"></button>
            </div>
            <div class="modal-body">
                <form id="editImportForm">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <input type="hidden" id="editImportId" value="">
                            <label for="editSupplierSelect" class="form-label">Nhà Cung Cấp</label>
                            <select class="form-select" id="editSupplierSelect" disabled>
                                <?php
                                $apiUrl = "http://localhost/PHP-code/webbanhang/admin/api/product/getallsupplier.php";
                                $suppliers = [];
                                try {
                                    $response = file_get_contents($apiUrl);
                                    $suppliers = json_decode($response, true);
                                } catch (Exception $e) {
                                    echo "<option value=''>Không thể tải danh sách nhà cung cấp</option>";
                                }
                                if (!empty($suppliers) && is_array($suppliers)) {
                                    foreach ($suppliers as $supplier) {
                                        echo "<option value='" . htmlspecialchars($supplier['id']) . "'>" . htmlspecialchars($supplier['name']) . "</option>";
                                    }
                                } else {
                                    echo "<option value=''>Không có nhà cung cấp nào</option>";
                                }
                                ?>
                            </select>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="editEmployeeInput" class="form-label">Người sửa</label>
                            <input type="text" class="form-control" id="editEmployeeInput" value="<?php echo $_SESSION['username']; ?>" readonly>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="editStatusSelect" class="form-label">Trạng Thái</label>
                            <select class="form-select" id="editStatusSelect">
                                <option value="processing">Đang xử lý</option>
                                <option value="complete">Hoàn thành</option>
                            </select>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="editCreatedAt" class="form-label">Ngày Nhập</label>
                            <input type="text" class="form-control" id="editCreatedAt" readonly>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="editImportDetails" class="form-label">Chi Tiết Phiếu Nhập</label>
                        <div id="editImportDetailsContainer" style="padding: 10px 10px 20px 10px; border-radius: 5px; background-color: rgb(237, 235, 235); margin: 10px 0; height: 150px; overflow-y: auto;">
                            <!-- JS will dynamically populate rows here -->
                        </div>
                        <button type="button" class="btn btn-primary" id="btnEditAddImportDetail">+ Thêm chi tiết</button>
                    </div>
                    <div class="col-md-12 mb-3">
                        <label for="editTotalPrice" class="form-label">Tổng Tiền</label>
                        <input type="number" class="form-control" id="editTotalPrice" value="0" readonly>
                    </div>
                </form>
            </div>
            <div class="modal-footer" id="editImportModalFooter">
                <div id="dungdenone">
                    <?php echo $deletePermission; ?>
                    <?php echo $updatePermission; ?>
                </div>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
            </div>
        </div>
    </div>
</div>
<script>
    document.addEventListener('DOMContentLoaded', () => {
        const link = new URLSearchParams(window.location.search).get('page');
        console.log(link);
        if (link === 'import_management') {
            fetchImport();
        }
    });

    async function fetchImport() {
        try {
            const response = await fetch('../admin/api/product/getallimport.php');
            const data = await response.json();
            console.log(data);
            renderImportTable(data);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }
    async function renderImportTable(data) {
        const tableBody = document.getElementById("tableBodyImport");
        tableBody.innerHTML = '';

        if (!data || data.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="7" class="text-center">Không có dữ liệu</td></tr>';
            return;
        }

        data.forEach(async item => {
            const dataSuplier = await fetch(`../admin/api/product/getsupplierbyid.php?id=${item.supplier_id}`)
                .then(response => response.json())
                .then(data => data.data.name)
                .catch(error => {
                    console.error('Error fetching supplier name:', error);
                    return 'Unknown';
                });
            const dataAccount = await fetch(`../admin/api/account/getaccount.php?id=${item.employee_id}`)
                .then(response => response.json())
                .then(data => data.data.username)
                .catch(error => {
                    console.error('Error fetching account name:', error);
                    return 'Unknown';
                });
            const row = document.createElement('tr');
            row.setAttribute('data-id', item.id);
            row.innerHTML = `
                <td class="text-center">${item.id}</td>
                <td class="text-center">${dataSuplier}</td>
                <td class="text-center">${dataAccount}</td>
                <td class="text-center">${item.created_at}</td>
                <td class="text-center">${item.price} đ</td>
                <td class="text-center">${formatStatus(item.status)}</td>
            `;

            row.addEventListener('click', (event) => editImport(event));
            tableBody.appendChild(row);
        });
    }

    async function editImport(event) {
        const row = event.currentTarget;
        const editImportModal = new bootstrap.Modal(document.getElementById('editImportModal'));
        editImportModal.show();

        const importId = row.getAttribute('data-id');
        console.log(importId);
        const response = await fetch(`../admin/api/product/getimportbyid.php?id=${importId}`);
        const data = await response.json();
        console.log(data);

        if (data && data.data) {
            const importData = data.data;
            const supplierId = importData.supplier_id;
            document.getElementById('editImportId').value = importData.id;
            document.getElementById('editSupplierSelect').value = supplierId;
            document.getElementById('editCreatedAt').value = importData.created_at;
            document.getElementById('editTotalPrice').value = importData.price;
            if (importData.status === 'complete') {
                document.getElementById('dungdenone').classList.add('d-none');
                document.getElementById('editStatusSelect').disabled = true;
            } else {
                document.getElementById('dungdenone').classList.remove('d-none');
                document.getElementById('editStatusSelect').disabled = false;
            }
            document.getElementById('editStatusSelect').value = importData.status;

            const products = await fetch(`../admin/api/product/getproductbysupplierid.php?id=${supplierId}`)
                .then(response => response.json())
                .catch(error => {
                    console.error('Error fetching products:', error);
                    return {
                        data: []
                    };
                });

            // Xóa dữ liệu cũ
            document.getElementById('editImportDetailsContainer').innerHTML = '';

            for (const detail of importData.details) {
                const detailRow = document.createElement('div');
                detailRow.classList.add('row', 'g-3', 'align-items-center', 'mb-2');
                detailRow.setAttribute('data-id', detail.id);
                const optionsHtml = products.data.map(product =>
                    `<option value="${product.id}" ${product.id === detail.product_id ? 'selected' : ''}>${product.name}</option>`
                ).join('');

                detailRow.innerHTML = `
                <div class="col-md-3">
                    <select class="form-select productSelect" required>
                        <option value="">Chọn sản phẩm</option>
                        ${optionsHtml}
                    </select>
                </div>
                <div class="col-md-2">
                    <select class="form-select sizeSelect" required>
                        <option value="">Chọn kích thước</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <input type="number" class="form-control priceInput" placeholder="Giá nhập" min="0" value="${detail.import_price}" required>
                </div>
                <div class="col-md-2">
                    <input type="number" class="form-control quantityInput" placeholder="Số lượng" min="1" value="${detail.amount}" required>
                </div>
                <div class="col-md-2">
                    <input type="number" class="form-control totalInput" placeholder="Thành tiền"  value="${detail.final_price}" readonly>
                </div>
                <div class="col-md-1 d-flex justify-content-center align-items-center">
                    <button type="button" class="btn btn-danger removeDetailRow">Xóa</button>
                </div>
            `;

                const sizeSelect = detailRow.querySelector('.sizeSelect');
                const sizes = await fetch(`../admin/api/product/getsizesbyproduct.php?id=${detail.product_id}`)
                    .then(res => res.json())
                    .then(data => data.data)
                    .catch(err => {
                        console.error('Error fetching sizes', err);
                        return [];
                    });

                sizeSelect.innerHTML = '<option value="">Chọn kích thước</option>';
                sizes.forEach(size => {
                    const option = document.createElement('option');
                    option.value = size.id;
                    option.textContent = size.size_number;
                    if (size.id === detail.size_id) {
                        option.selected = true;
                    }
                    sizeSelect.appendChild(option);
                });

                // Xử lý khi chọn sản phẩm để cập nhật danh sách size
                const productSelect = detailRow.querySelector('.productSelect');
                productSelect.addEventListener('change', async () => {
                    const productId = productSelect.value;
                    if (!productId) {
                        sizeSelect.innerHTML = '<option value="">Chọn kích thước</option>';
                        return;
                    }

                    // Lấy danh sách size của sản phẩm mới
                    const sizes = await fetch(`../admin/api/product/getsizesbyproduct.php?id=${productId}`)
                        .then(res => res.json())
                        .then(data => data.data)
                        .catch(err => {
                            console.error('Error fetching sizes', err);
                            return [];
                        });

                    // Cập nhật danh sách size
                    sizeSelect.innerHTML = '<option value="">Chọn kích thước</option>';
                    sizes.forEach(size => {
                        const option = document.createElement('option');
                        option.value = size.id;
                        option.textContent = size.size_number;
                        sizeSelect.appendChild(option);
                    });
                });
                // Tính toán thành tiền khi nhập giá và số lượng
                const priceInput = detailRow.querySelector('.priceInput');
                const quantityInput = detailRow.querySelector('.quantityInput');
                const totalInput = detailRow.querySelector('.totalInput');

                const calculateTotal = () => {
                    const price = parseFloat(priceInput.value) || 0;
                    const quantity = parseInt(quantityInput.value) || 0;
                    totalInput.value = price * quantity;
                };

                priceInput.addEventListener('input', calculateTotal);
                quantityInput.addEventListener('input', calculateTotal);
                document.getElementById('editImportDetailsContainer').appendChild(detailRow);
            }
        }
    }
    document.getElementById('editImportDetailsContainer').addEventListener('input', () => {
        const detailRows = document.querySelectorAll('#editImportDetailsContainer .row');
        let totalPrice = 0;

        detailRows.forEach(row => {
            const totalInput = row.querySelector('.totalInput');
            const total = parseFloat(totalInput.value) || 0;
            totalPrice += total;
        });

        document.getElementById('editTotalPrice').value = totalPrice;
    });

    document.getElementById('editImportDetailsContainer').addEventListener('click', (event) => {
        if (event.target.classList.contains('removeDetailRow')) {
            const row = event.target.closest('.row');
            const totalInput = row.querySelector('.totalInput');
            const total = parseFloat(totalInput.value) || 0;

            // Subtract the row's total from the overall total price
            const totalPriceInput = document.getElementById('editTotalPrice');
            const currentTotalPrice = parseFloat(totalPriceInput.value) || 0;
            totalPriceInput.value = currentTotalPrice - total;

            row.remove();
        }
    });
    document.getElementById('btnEditAddImportDetail').addEventListener('click', async () => {
        const supplierId = document.getElementById('editSupplierSelect').value;

        if (!supplierId) {
            showToast('Vui lòng chọn nhà cung cấp trước', 'error');
            return;
        }
        // Lấy danh sách sản phẩm của nhà cung cấp
        const products = await fetch(`../admin/api/product/getproductbysupplierid.php?id=${supplierId}`)
            .then(response => response.json())
            .catch(error => {
                console.error('Error fetching products:', error);
                return [];
            });

        if (!products.data || products.data.length === 0) {
            showToast('Không có sản phẩm nào cho nhà cung cấp này', 'error');
            return;
        }

        // Tạo một dòng chi tiết nhập hàng
        const detailRow = document.createElement('div');
        detailRow.classList.add('row', 'g-3', 'align-items-center', 'mb-2');

        detailRow.innerHTML = `
                    <div class="col-md-3">
                        <select class="form-select productSelect" required>
                            <option value="">Chọn sản phẩm</option>
                            ${products.data.map(product => `<option value="${product.id}">${product.name}</option>`).join('')}
                        </select>
                    </div>
                    <div class="col-md-2">
                        <select class="form-select sizeSelect" required>
                            <option value="">Chọn kích thước</option>
                        </select>
                    </div>
                    <div class="col-md-2">
                        <input type="number" class="form-control priceInput" placeholder="Giá nhập" min="0" required>
                    </div>
                    <div class="col-md-2">
                        <input type="number" class="form-control quantityInput" placeholder="Số lượng" min="1" required>
                    </div>
                    <div class="col-md-2">
                        <input type="number" class="form-control totalInput" placeholder="Thành tiền" readonly>
                    </div>
                    <div class="col-md-1 d-flex justify-content-center align-items-center">
                        <button type="button" class="btn btn-danger removeDetailRow">Xóa</button>
                    </div>
                `;

        const priceInput = detailRow.querySelector('.priceInput');
        const quantityInput = detailRow.querySelector('.quantityInput');
        const totalInput = detailRow.querySelector('.totalInput');

        const calculateTotal = () => {
            const price = parseFloat(priceInput.value) || 0;
            const quantity = parseInt(quantityInput.value) || 0;
            totalInput.value = price * quantity;
        };

        priceInput.addEventListener('input', calculateTotal);
        quantityInput.addEventListener('input', calculateTotal);
        document.getElementById('editImportDetailsContainer').appendChild(detailRow);

        // Xử lý khi chọn sản phẩm để lấy danh sách size
        const productSelect = detailRow.querySelector('.productSelect');
        const sizeSelect = detailRow.querySelector('.sizeSelect');

        productSelect.addEventListener('change', async () => {
            const productId = productSelect.value;

            if (!productId) {
                sizeSelect.innerHTML = '<option value="">Chọn kích thước</option>';
                return;
            }

            // Lấy danh sách size của sản phẩm
            const sizes = await fetch(`../admin/api/product/getsizesbyproduct.php?id=${productId}`)
                .then(response => response.json())
                .catch(error => {
                    console.error('Error fetching sizes:', error);
                    return [];
                });

            sizeSelect.innerHTML = '<option value="">Chọn kích thước</option>';
            sizes.data.forEach(size => {
                sizeSelect.innerHTML += `<option value="${size.id}">${size.size_number}</option>`;
            });
        });
    });

    document.getElementById('saveEditImportBtn').addEventListener('click', async () => {
        const importId = document.getElementById('editImportId').value;
        const supplierId = document.getElementById('editSupplierSelect').value;
        const status = document.getElementById('editStatusSelect').value;
        const totalPrice = document.getElementById('editTotalPrice').value;
        const employeeId = document.getElementById('editEmployeeInput').value; // Lấy ID nhân viên từ input
        const importDetails = [];

        if (!supplierId) {
            showToast('Vui lòng điền đầy đủ thông tin', 'error');
            return;
        }

        const detailRows = document.querySelectorAll('#editImportDetailsContainer .row');
        const sizeCheck = new Set();

        for (const row of detailRows) {
            const productId = row.querySelector('.productSelect').value;
            const sizeId = row.querySelector('.sizeSelect').value;
            const price = row.querySelector('.priceInput').value;
            const quantity = row.querySelector('.quantityInput').value;
            const total = row.querySelector('.totalInput').value;
            const detailId = row.getAttribute('data-id'); // Lấy ID chi tiết nhập hàng

            if (productId && sizeId && price && quantity) {
                const uniqueKey = `${productId}-${sizeId}`;
                if (sizeCheck.has(uniqueKey)) {
                    showToast('Không được chọn trùng kích thước cho cùng một sản phẩm', 'error');
                    return;
                }
                sizeCheck.add(uniqueKey);

                importDetails.push({
                    id: detailId, // ID chi tiết nhập hàng
                    product_id: productId,
                    size_id: sizeId,
                    price: parseFloat(price),
                    quantity: parseInt(quantity),
                    total: parseFloat(total)
                });
            }
        }

        if (importDetails.length === 0) {
            showToast('Vui lòng thêm ít nhất một chi tiết phiếu nhập', 'error');
            return;
        }

        const importData = {
            id: importId,
            supplier_id: supplierId,
            employee_id: employeeId,
            status: status,
            total_price: parseFloat(totalPrice),
            details: importDetails
        };

        console.log(importData);
        if (importData.status === 'complete') {
            const confirmComplete = await showConfirm('Bạn có chắc chắn muốn hoàn thành phiếu nhập này không?');
            if (!confirmComplete) {
                return;
            } else {
                const sizes = importDetails.map(detail => ({
                    size_id: Number(detail.size_id),
                    amount: detail.quantity
                }));

                console.log('Formatted Sizes:', sizes);

                try {
                    const updateAmountResponse = await fetch('../admin/api/product/updateamount.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            sizes
                        })
                    });

                    const updateAmountResult = await updateAmountResponse.json();

                    if (!updateAmountResponse.ok) {
                        console.error('Error updating product amounts:', updateAmountResult.message || 'Unknown error');
                        return;
                    }
                } catch (error) {
                    console.error('Error updating product amounts:', error);
                }
            }
        } 
            try {
                const response = await fetch('../admin/api/product/updateimport.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(importData)
                });

                const result = await response.json();

                if (response.ok) {
                    showToast('Cập nhật phiếu nhập thành công', 'success');
                    const editImportModal = bootstrap.Modal.getInstance(document.getElementById('editImportModal'));
                    editImportModal.hide();
                    fetchImport();
                } else {
                    showToast(result.message || 'Có lỗi xảy ra', 'error');
                }
            } catch (error) {
                console.error('Error updating import:', error);
                showToast('Có lỗi xảy ra khi cập nhật phiếu nhập', 'error');
            }
        
    });

    document.getElementById('deleteImportBtn').addEventListener('click', async () => {
        const importId = document.getElementById('editImportId').value;

        if (!importId) {
            showToast('Không tìm thấy phiếu nhập để xóa', 'error');
            return;
        }

        const confirmDelete = showConfirm('Bạn có chắc chắn muốn xóa phiếu nhập này không? \nSau khi xóa, bạn sẽ không thể khôi phục lại phiếu nhập này.');
        if (!confirmDelete) {
            return;
        }

        try {
            const response = await fetch(`../admin/api/product/deleteimport.php?import_id=${importId}`, {
                method: 'GET'
            });

            const result = await response.json();

            if (response.ok) {
                showToast('Xóa phiếu nhập thành công', 'success');
                const editImportModal = bootstrap.Modal.getInstance(document.getElementById('editImportModal'));
                editImportModal.hide();
                fetchImport();
            } else {
                showToast(result.message || 'Có lỗi xảy ra', 'error');
            }
        } catch (error) {
            console.error('Error deleting import:', error);
            showToast('Có lỗi xảy ra khi xóa phiếu nhập', 'error');
        }
    });
    // Hàm đổi màu hoặc nội dung trạng thái nếu cần
    function formatStatus(status) {
        if (status.toLowerCase() === 'processing') {
            return '<span class="badge bg-warning text-dark">Đang xử lý</span>';
        } else if (status.toLowerCase() === 'complete') {
            return '<span class="badge bg-success">Hoàn thành</span>';
        }
        return status;
    }

    document.getElementById('btnAddImport').addEventListener('click', () => {
        const addImportModal = new bootstrap.Modal(document.getElementById('addImportModal'));
        addImportModal.show();
    });

    document.getElementById('btnAddImportDetail').addEventListener('click', async () => {
        const supplierId = document.getElementById('supplierSelect').value;

        if (!supplierId) {
            showToast('Vui lòng chọn nhà cung cấp trước', 'error');
            return;
        }
        console.log(supplierId);
        document.getElementById('supplierSelect').disabled = true;
        // Lấy danh sách sản phẩm của nhà cung cấp
        const products = await fetch(`../admin/api/product/getproductbysupplierid.php?id=${supplierId}`)
            .then(response => response.json())
            .catch(error => {
                console.error('Error fetching products:', error);
                return [];
            });

        console.log(products);
        if (!products.data || products.data.length === 0) {
            showToast('Không có sản phẩm nào cho nhà cung cấp này', 'error');
            return;
        }
        // Tạo một dòng chi tiết nhập hàng
        const detailRow = document.createElement('div');
        detailRow.classList.add('row', 'g-3', 'align-items-center', 'mb-2');

        detailRow.innerHTML = `
        <div class="col-md-3">
            <select class="form-select productSelect" required>
                <option value="">Chọn sản phẩm</option>
                ${products.data.map(product => `<option value="${product.id}">${product.name}</option>`).join('')}
            </select>
        </div>
        <div class="col-md-2">
            <select class="form-select sizeSelect" required>
                <option value="">Chọn kích thước</option>
            </select>
        </div>
        <div class="col-md-2">
            <input type="number" class="form-control priceInput" placeholder="Giá nhập" min="0" required>
        </div>
        <div class="col-md-2">
            <input type="number" class="form-control quantityInput" placeholder="Số lượng" min="1" required>
        </div>
        <div class="col-md-2">
            <input type="number" class="form-control totalInput" placeholder="Thành tiền" readonly>
        </div>
        <div class="col-md-1 d-flex justify-content-center align-items-center">
            <button type="button" class="btn btn-danger removeDetailRow">Xóa</button>
        </div>
    `;

        document.getElementById('importDetailsContainer').appendChild(detailRow);

        // Xử lý khi chọn sản phẩm để lấy danh sách size
        const productSelect = detailRow.querySelector('.productSelect');
        const sizeSelect = detailRow.querySelector('.sizeSelect');

        productSelect.addEventListener('change', async () => {
            const productId = productSelect.value;

            if (!productId) {
                showToast('Vui lòng chọn sản phẩm', 'error');
                return;
            }

            // Lấy danh sách size của sản phẩm
            const sizes = await fetch(`../admin/api/product/getsizesbyproduct.php?id=${productId}`)
                .then(response => response.json())
                .catch(error => {
                    console.error('Error fetching sizes:', error);
                    return [];
                });

            console.log(sizes.data);
            sizeSelect.innerHTML = '<option value="">Chọn kích thước</option>';
            sizes.data.forEach(size => {
                sizeSelect.innerHTML += `<option value="${size.id}">${size.size_number}</option>`;
            });
        });

        // Tính toán thành tiền khi nhập giá và số lượng
        const priceInput = detailRow.querySelector('.priceInput');
        const quantityInput = detailRow.querySelector('.quantityInput');
        const totalInput = detailRow.querySelector('.totalInput');

        const calculateTotal = () => {
            const price = parseFloat(priceInput.value) || 0;
            const quantity = parseInt(quantityInput.value) || 0;
            totalInput.value = price * quantity;
        };

        priceInput.addEventListener('input', calculateTotal);
        quantityInput.addEventListener('input', calculateTotal);
    });

    document.getElementById('importDetailsContainer').addEventListener('input', () => {
        const detailRows = document.querySelectorAll('#importDetailsContainer .row');
        let totalPrice = 0;

        detailRows.forEach(row => {
            const totalInput = row.querySelector('.totalInput');
            const total = parseFloat(totalInput.value) || 0;
            totalPrice += total;
        });

        document.getElementById('totalPrice').value = totalPrice;
    });
    document.getElementById('importDetailsContainer').addEventListener('click', (event) => {
        if (event.target.classList.contains('removeDetailRow')) {
            const row = event.target.closest('.row');
            const totalInput = row.querySelector('.totalInput');
            const total = parseFloat(totalInput.value) || 0;

            // Subtract the row's total from the overall total price
            const totalPriceInput = document.getElementById('totalPrice');
            const currentTotalPrice = parseFloat(totalPriceInput.value) || 0;
            totalPriceInput.value = currentTotalPrice - total;
            row.remove();
            const supplierSelect = document.getElementById('supplierSelect');
            if (document.querySelectorAll('#importDetailsContainer .row').length === 0) {
                supplierSelect.disabled = false;
            }
        }
    });
    document.getElementById('importDetailsContainer').addEventListener('click', (event) => {
        if (event.target.classList.contains('removeDetailRow')) {
            const row = event.target.closest('.row');
            row.remove();
        }
    });

    document.getElementById('saveImportBtn').addEventListener('click', async () => {
        const supplierId = document.getElementById('supplierSelect').value;
        const employee = document.getElementById('employeeInput').value;
        const totalPrice = document.getElementById('totalPrice').value;
        const status = document.getElementById('statusSelect').value;
        const importDetails = [];

        if (!supplierId) {
            showToast('Vui lòng điền đầy đủ thông tin', 'error');
            return;
        }

        const detailRows = document.querySelectorAll('#importDetailsContainer .row');
        const sizeCheck = new Set();

        for (const row of detailRows) {
            const productId = row.querySelector('.productSelect').value;
            const sizeId = row.querySelector('.sizeSelect').value;
            const price = row.querySelector('.priceInput').value;
            const quantity = row.querySelector('.quantityInput').value;
            const total = row.querySelector('.totalInput').value;

            if (productId && sizeId && price && quantity) {
                const uniqueKey = `${productId}-${sizeId}`;
                if (sizeCheck.has(uniqueKey)) {
                    showToast('Không được chọn trùng kích thước cho cùng một sản phẩm', 'error');
                    return;
                }
                sizeCheck.add(uniqueKey);

                importDetails.push({
                    product_id: productId,
                    size_id: sizeId,
                    price: parseFloat(price),
                    quantity: parseInt(quantity),
                    total: parseFloat(total)
                });
            }
        }

        if (importDetails.length === 0) {
            showToast('Vui lòng thêm ít nhất một chi tiết phiếu nhập', 'error');
            return;
        }

        const importData = {
            supplier_id: supplierId,
            employee: employee,
            status: status,
            total_price: parseFloat(totalPrice),
            details: importDetails
        };

        console.log(importData);
        try {
            const response = await fetch('../admin/api/product/createimport.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(importData)
            });

            const result = await response.json();

            if (response.ok) {
                showToast('Thêm phiếu nhập thành công', 'success');
                document.getElementById('addImportForm').reset();
                document.getElementById('importDetailsContainer').innerHTML = '';
                const addImportModal = bootstrap.Modal.getInstance(document.getElementById('addImportModal'));
                addImportModal.hide();
                document.getElementById('supplierSelect').disabled = false;
                fetchImport();
            } else {
                showToast(result.message || 'Có lỗi xảy ra', 'error');
            }
        } catch (error) {
            console.error('Error saving import:', error);
            showToast('Có lỗi xảy ra khi lưu phiếu nhập', 'error');
        }
    });
    document.getElementById("searchInputImport").addEventListener("input", function() {
        const searchTerm = this.value.toLowerCase();
        const rows = document.querySelectorAll("#tableBodyImport tr");
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
</script>