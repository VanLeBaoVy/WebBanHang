<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
if (!hasPagePermission($_SESSION['permissions'], 'index.php?page=statistics')) {
    header("Location: login.php"); // Chuyển hướng đến trang đăng nhập
    exit();
}
?>

<h2 class="mb-4">Thống Kê Khách Hàng</h2>
<hr class="main-hr">

<!-- Bộ lọc thời gian -->
<div class="d-flex align-items-center gap-3 mb-3">
    <input type="date" id="startDate" class="form-control" style="width: 20%;" placeholder="Từ Ngày">
    <input type="date" id="endDate" class="form-control" style="width: 20%;" placeholder="Đến Ngày">
    <button class="btn btn-primary" id="filterButton">Thống Kê</button>
    <button class="btn btn-primary" id="chitieuButton">Chi tiêu</button>
</div>
<!-- Thống kê thu, chi, lợi nhuận -->
<div class="d-flex align-items-center mb-3">
    <div class="card me-3" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Tổng Doanh Thu</h5>
            <p class="card-text" id="totalIncome">0</p>
        </div>
    </div>
    <div class="card me-3" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Tổng Chi Phí</h5>
            <p class="card-text" id="totalExpense">0</p>
        </div>
    </div>
    <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Lợi Nhuận</h5>
            <p class="card-text" id="totalProfit">0</p>
        </div>
    </div>
</div>

<hr class="main-hr">

<!-- Bảng thống kê -->
<div class="table-container">
    <table class="table table-bordered table-custom table-hover">
        <thead class="table-light">
            <tr class="text-center align-middle">
                <th>Hạng</th>
                <th>Tên Khách Hàng</th>
                <th>Số Điện Thoại</th>
                <th>Tổng Tiền Mua</th>
                <th>Chi Tiết Đơn Hàng</th>
            </tr>
        </thead>
        <tbody id="statisticsTableBody">
            <tr>
                <td colspan="5" class="text-center">Đang tải dữ liệu...</td>
            </tr>
        </tbody>
    </table>
</div>


<!-- Modal hiển thị danh sách hóa đơn của khách hàng -->
<div class="modal fade" id="orderDetailsModal" tabindex="-1" aria-labelledby="orderDetailsModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="orderDetailsModalLabel">Chi Tiết Đơn Hàng</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div id="orderDetails" style="max-height: 400px; overflow-y: auto;">
                    <!-- Nội dung chi tiết đơn hàng sẽ được thêm vào đây bằng JavaScript -->
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="orderModal" tabindex="-1" aria-labelledby="orderModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
        <div class="modal-content">

            <div class="modal-header">
                <h5 class="modal-title" id="orderModalLabel">Chi tiết đơn hàng #<span id="order-id"></span></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Đóng"></button>
            </div>

            <div class="modal-body">
                <!-- Thông tin đơn hàng -->
                <div class="row mb-4">
                    <div class="col-md-6">
                        <h6>Thông tin đơn hàng</h6>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><strong>Trạng thái:</strong> <span id="status"></span></li>
                            <li class="list-group-item" id="d_none"><strong>Lý do:</strong> <span id="reason"></span></li>
                            <li class="list-group-item"><strong>Ngày tạo:</strong> <span id="created-at"></span></li>
                            <li class="list-group-item"><strong>Nhân viên xử lý:</strong> <span id="employee-id"></span></li>
                            <li class="list-group-item"><strong>Tổng tiền:</strong> <span id="total"></span></li>
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <h6>&nbsp;</h6>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><strong>Người đặt hàng:</strong> <span id="customer-name"></span></li>
                            <li class="list-group-item"><strong>Địa chỉ giao hàng:</strong> <span id="address"></span></li>
                            <li class="list-group-item"><strong>SĐT người nhận:</strong> <span id="phone-number"></span></li>
                            <li class="list-group-item"><strong>Phương thức thanh toán:</strong> <span id="payment-method"></span></li>
                        </ul>
                    </div>
                </div>

                <!-- Chi tiết sản phẩm -->
                <h6 class="mb-3">Danh sách sản phẩm</h6>
                <div class="table-responsive">
                    <table class="table table-bordered table-hover">
                        <thead class="table-light">
                            <tr>
                                <th>#</th>
                                <th>Tên sản phẩm</th>
                                <th>Size</th>
                                <th>Số lượng</th>
                                <th>Đơn giá</th>
                                <th>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody id="order-details-body">
                            <!-- JS sẽ render nội dung ở đây -->
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
            </div>

        </div>
    </div>
</div>

<div class="modal fade" id="supplierModal" tabindex="-1" aria-labelledby="supplierModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

            <div class="modal-header">
                <h5 class="modal-title" id="supplierModalLabel">Thống Kê Nhập Hàng Theo Nhà Cung Cấp</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Đóng"></button>
            </div>

            <div class="modal-body">
                <div class="table-responsive">
                    <table class="table table-bordered table-striped align-middle">
                        <thead class="table-primary">
                            <tr>
                                <th>Mã nhà cung cấp</th>
                                <th>Tên nhà cung cấp</th>
                                <th>Tổng số tiền nhập hàng</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody id="supplierTableBody">
                            <!-- Nội dung sẽ được đổ bằng JavaScript -->
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>
</div>

<div class="modal fade" id="importListModal" tabindex="-1" aria-labelledby="importListModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">

            <div class="modal-header">
                <h5 class="modal-title" id="importListModalLabel">Danh Sách Phiếu Nhập</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Đóng"></button>
            </div>

            <div class="modal-body">
                <p><strong>Nhà cung cấp:</strong> <span id="importSupplierName">---</span></p>
                <table class="table table-bordered table-hover table-striped">
                    <thead class="table-secondary">
                        <tr>
                            <th>Mã Phiếu Nhập</th>
                            <th>Ngày Tạo</th>
                            <th>Tổng Tiền</th>
                            <th>Trạng Thái</th>
                        </tr>
                    </thead>
                    <tbody id="importListTableBody">
                        <!-- Dữ liệu sẽ được thêm bằng JavaScript -->
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', async () => {
        try {
            const incomeResponse = await fetch(`../admin/api/statistics/getallorder.php`);
            const expenseResponse = await fetch(`../admin/api/statistics/getallimport.php`);

            const incomeData = await incomeResponse.json();
            const expenseData = await expenseResponse.json();

            if (incomeData.success && expenseData.success) {
                const totalIncome = incomeData.data.reduce((sum, order) => sum + order.total, 0);
                const totalExpense = expenseData.data.reduce((sum, entry) => sum + entry.total_price, 0);
                const totalProfit = totalIncome - totalExpense;

                // Cập nhật HTML
                document.getElementById('totalIncome').innerText = totalIncome.toLocaleString() + ' đ';
                document.getElementById('totalExpense').innerText = totalExpense.toLocaleString() + ' đ';
                document.getElementById('totalProfit').innerText = totalProfit.toLocaleString() + ' đ';

            } else {
                console.error('Error fetching income or expense data.');
            }
        } catch (error) {
            console.error('Error calculating income, expense, or profit:', error);
        }
    });


    document.addEventListener('DOMContentLoaded', () => {
        const link = new URLSearchParams(window.location.search).get('page');
        console.log(link);
        if (link === 'statistics') {
            fetchOrderStatistics();
        }
    });
    async function fetchOrderStatistics() {
        try {
            const response = await fetch(`../admin/api/statistics/getallorder.php`);
            const data = await response.json();
            if (data.success) {
                console.log(data.data); // Log the data to see the structure
                renderStatisticsTable(data.data);
            } else {
                console.error('Error fetching order statistics:', data.message);
            }
        } catch (error) {
            console.error('Error fetching order statistics:', error);
        }

    }

    function renderStatisticsTable(orders) {
        const data = reduceOrders(orders);
        console.log(data); // Log the reduced data to see the structure
        const tableBody = document.getElementById('statisticsTableBody');
        tableBody.innerHTML = ''; // Clear existing rows

        if (data.length === 0) {
            const noDataRow = document.createElement('tr');
            noDataRow.innerHTML = `<td colspan="5" class="text-center">Không có dữ liệu</td>`;
            tableBody.appendChild(noDataRow);
            return;
        }

        data.forEach((customer, index) => {
            const row = document.createElement('tr');
            row.classList.add('text-center', 'align-middle');

            row.innerHTML = `
            <td>${index + 1}</td>
            <td>${customer.customer_name}</td>
            <td>${customer.customer_phone}</td>
            <td>${customer.total_spent.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
            <td>
                <button class="btn btn-primary" onclick="viewOrderDetails(${customer.customer_id})">
                Xem Chi Tiết
                </button>
            </td>
            `;

            tableBody.appendChild(row);
        });
    }

    function reduceOrders(orders) {
        // Nhóm đơn hàng theo khách hàng
        const groupedByCustomer = {};

        orders.forEach(order => {
            const customerId = order.customer_id;

            if (!groupedByCustomer[customerId]) {
                groupedByCustomer[customerId] = {
                    customer_id: customerId,
                    customer_name: order.customer_name,
                    customer_email: order.customer_email,
                    customer_phone: order.customer_phone,
                    orders: [],
                    total_spent: 0
                };
            }

            groupedByCustomer[customerId].orders.push(order);
            groupedByCustomer[customerId].total_spent += order.total;
        });

        // Chuyển object thành mảng và sắp xếp theo tổng tiền mua giảm dần
        const result = Object.values(groupedByCustomer)
            .sort((a, b) => b.total_spent - a.total_spent);

        return result;
    }

    async function viewOrderDetails(customerId) {
        const orderDetailsModal = new bootstrap.Modal(document.getElementById('orderDetailsModal'));
        const orderDetailsContainer = document.getElementById('orderDetails');
        orderDetailsContainer.innerHTML = ''; // Clear existing content
        try {
            const response = await fetch(`../admin/api/statistics/getallorder.php`);
            const data = await response.json();
            if (data.success) {
                console.log(data.data); // Log the data to see the structure
                const customerOrders = data.data.filter(order => order.customer_id === customerId);
                if (customerOrders.length > 0) {
                    const orderDetailsHtml = customerOrders.map(order => `
                        <div class="mb-3 border-bottom pb-3">
                            <div class="d-flex justify-content-between align-items-center">
                                <h5>Đơn hàng #${order.order_id}</h5>
                                <p><strong>Ngày tạo:</strong> ${new Date(order.created_at).toLocaleDateString('vi-VN')}</p>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <p><strong>Trạng thái:</strong> ${order.status}</p>
                                <p><strong>Tổng tiền:</strong> ${order.total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                            </div>
                                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#orderModal" onclick="fecthOrderDetailS(${order.id})">Xem chi tiết</button>
                        </div>
                        `).join('');
                    orderDetailsContainer.innerHTML = orderDetailsHtml;
                }
            } else {
                console.error('Error fetching order statistics:', data.message);
            }
        } catch (error) {
            console.error('Error fetching order statistics:', error);
        }
        orderDetailsModal.show();
    }

    async function fecthOrderDetailS(id) {

        try {
            const response = await fetch(`../admin/api/statistics/getallorder.php`);
            const data = await response.json();
            if (data.success) {
                console.log(data.data); // Log the data to see the structure
                const orderData = reduceOrders(data.data).find(order => order.id === id);
                console.log(orderData); // Log the data to see the structure
                if (orderData) {
                    renderOrderDetail2(orderData.orders.find(order => order.id === id));
                } else {
                    console.error('Order not found:', id);
                }
            } else {
                console.error('Error fetching order statistics:', data.message);
            }
        } catch (error) {
            console.error('Error fetching order statistics:', error);
        }
    }

    async function renderOrderDetail2(orderData) {
        console.log(orderData);
        document.getElementById('order-id').innerText = orderData.order_id;
        document.getElementById('status').innerText = getStatusLabel(orderData.status);
        document.getElementById('created-at').innerText = orderData.created_at;
        document.getElementById('employee-id').innerText = orderData.employee_name;
        document.getElementById('total').innerText = orderData.total;

        document.getElementById('address').innerText = orderData.full_address;
        document.getElementById('customer-name').innerText = orderData.customer_name;
        document.getElementById('phone-number').innerText = orderData.customer_phone;
        document.getElementById('payment-method').innerText = orderData.payment_method;
        document.getElementById('reason').innerText = orderData.reason;
        if (orderData.status !== 'cancelled') {
            document.getElementById('d_none').classList.add('d-none'); // Ẩn lý do hủy đơn hàng nếu trạng thái không phải là "Đã hủy"
        } else {
            document.getElementById('d_none').classList.remove('d-none'); // Hiện lý do hủy đơn hàng nếu trạng thái là "Đã hủy"
        }

        //     // Đặt lại giá trị của lý do hủy đơn hàng về mặc định

        //     // Chi tiết sản phẩm
        const tbody = document.getElementById('order-details-body');
        tbody.innerHTML = ""; // Xoá cũ

        orderData.details.forEach((item, index) => {
            const tol = item.product_price * item.amount;
            const row = `
        <tr>
          <td>${index + 1}</td>
          <td>${item.product_name}</td>
          <td>${item.size_number}</td>
          <td>${item.amount}</td>
          <td>${item.product_price}</td>
            <td>${tol}</td>
        </tr>
      `;
            tbody.insertAdjacentHTML('beforeend', row);
        });
    }

    document.getElementById('filterButton').addEventListener('click', async () => {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;

        if (!startDate || !endDate) {
            showToast('Vui lòng chọn khoảng thời gian để lọc dữ liệu!', 'error');
            return;
        }

        try {
            const response = await fetch(`../admin/api/statistics/getallorder.php`);
            const data = await response.json();
            if (data.success) {
                console.log(data.data); // Log the data to see the structure
                const filteredOrders = data.data.filter(order => {
                    const orderDate = new Date(order.created_at).toISOString().split('T')[0];
                    return orderDate >= startDate && orderDate <= endDate;
                }).slice(0, 5);
                renderStatisticsTable(filteredOrders);
            } else {
                console.error('Error fetching order statistics:', data.message);
            }
        } catch (error) {
            console.error('Error fetching order statistics:', error);
        }
    });

    function groupBySupplier(imports) {
        const grouped = {};

        imports.forEach(entry => {
            const supplierId = entry.supplier_id;

            if (!grouped[supplierId]) {
                grouped[supplierId] = {
                    supplier_id: supplierId,
                    supplier_name: entry.supplier_name,
                    total_price: 0,
                    imports: []
                };
            }

            grouped[supplierId].total_price += entry.total_price;
            grouped[supplierId].imports.push(entry); // Giữ nguyên mỗi phiếu và chi tiết của nó
        });

        return Object.values(grouped);
    }

    document.getElementById('chitieuButton').addEventListener('click', async () => {
        try {
            const response = await fetch(`../admin/api/statistics/getallimport.php`);
            const data = await response.json();
            if (data.success) {
                console.log(data.data); // Log the data to see the structure
                const groupedImports = groupBySupplier(data.data);
                renderSupplierTable(groupedImports);
                const supplierModal = new bootstrap.Modal(document.getElementById('supplierModal'));
                supplierModal.show();
            } else {
                console.error('Error fetching order statistics:', data.message);
            }
        } catch (error) {
            console.error('Error fetching order statistics:', error);
        }
    });

    function renderSupplierTable(data) {
        const tbody = document.getElementById('supplierTableBody');
        tbody.innerHTML = ''; // Clear cũ nếu có

        data.forEach(supplier => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${supplier.supplier_id}</td>
            <td>${supplier.supplier_name}</td>
            <td>${supplier.total_price.toLocaleString()} đ</td>
        `;
            tbody.appendChild(row);
        });
    }

    function renderSupplierTable(data) {
        const tbody = document.getElementById('supplierTableBody');
        tbody.innerHTML = '';

        data.forEach(supplier => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${supplier.supplier_id}</td>
            <td>${supplier.supplier_name}</td>
            <td>${supplier.total_price.toLocaleString()} đ</td>
            <td>
                <button class="btn btn-sm btn-info" onclick="viewSupplierDetail(${supplier.supplier_id})">
                    Xem chi tiết
                </button>
            </td>
        `;
            tbody.appendChild(row);
        });
    }

    function showImportsBySupplier(supplierId, data) {
        // Lọc các phiếu nhập theo nhà cung cấp
        const supplierImports = data.filter(item => item.supplier_id === supplierId);

        if (supplierImports.length === 0) {
            showToast('Không có dữ liệu cho nhà cung cấp này!', 'error');
            return;
        }

        // Dùng tên nhà cung cấp từ bản ghi đầu tiên
        const supplierName = supplierImports[0].supplier_name;

        // Hiển thị tên nhà cung cấp trong modal
        document.getElementById('importSupplierName').innerText = supplierName;

        // Render table
        const tbody = document.getElementById('importListTableBody');
        tbody.innerHTML = ''; // clear old rows

        supplierImports.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${item.import_id}</td>
            <td>${new Date(item.created_at).toLocaleString()}</td>
            <td>${item.total_price.toLocaleString()} đ</td>
            <td>${formatStatus2(item.status)}</td>
        `;
            tbody.appendChild(row);
        });

        // Hiển thị modal
        const modal = new bootstrap.Modal(document.getElementById('importListModal'));
        modal.show();
    }

    function viewSupplierDetail(supplierId) {

        fetch(`../admin/api/statistics/getallimport.php`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showImportsBySupplier(supplierId, data.data);
                } else {
                    console.error('Error fetching supplier details:', data.message);
                }
            })
            .catch(error => console.error('Error fetching supplier details:', error));
    }

    function formatStatus2(status) {
            switch (status.toLowerCase()) {
                case 'processing':
                    return '<span class="badge bg-warning text-dark">Đang xử lý</span>';
                case 'complete':
                    return '<span class="badge bg-success">Hoàn thành</span>';
                default:
                    return status;
            }
    }
</script>