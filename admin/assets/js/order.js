document.addEventListener('DOMContentLoaded', () => {
    const link = new URLSearchParams(window.location.search).get('page');
    console.log(link);
    if (link === 'order_management') {
        fetchOrders();
    }
});

async function fetchOrders() {
    try {
        const response = await fetch('../admin/api/order/getallorder.php', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }

        });
        const data = await response.json();
        if (data.success) {
            rederOrder(data.data);
        } else {
            console.error('Error fetching orders:', data.message);
        }
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return null;
    }
}

async function rederOrder(data) {
    data.sort((a, b) => b.id - a.id);
    const tableBody = document.getElementById('tableBodyAccount');
    tableBody.innerHTML = ''; // Xóa nội dung cũ

    if (data.length > 0) {
        data.forEach(async (order) => {
            const fullname = await fetchfullname(order.account_id);
            const address = await fetchaddress(order.address_id);
            const row = document.createElement('tr');
            row.setAttribute('data-order-id', order.id); // Thêm thuộc tính data-order-id vào hàng
            row.innerHTML = `
    <td>${order.id}</td>
    <td>${fullname == null ? N / A : fullname}</td>
    <td>${order.phone_number}</td>
    <td>${address === null ? N / A : address}</td>
    <td>${parseInt(order.total).toLocaleString()} đ</td>
    <td>${order.created_at}</td>
    <td>
        <select class="form-select order-status" data-order-id="${order.id}" data-current-status="${order.status}">
            <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Chưa xử lý</option>
            <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Đang giao</option>
            <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Đã giao</option>
            <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Đã hủy</option>
        </select>
    </td>
    <td>
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#orderModal" onclick="fecthOrderDetail(${order.id}).then(renderOrderDetail)">Xem chi tiết</button>
    </td>
`;            
            tableBody.appendChild(row);
        });
    } else {
        tableBody.innerHTML = '<tr><td colspan="10" class="text-center">Không có dữ liệu</td></tr>';
    }
}

document.addEventListener('change', async function (e) {
    if (e.target.classList.contains('order-status')) {
        const select = e.target;
        const orderId = select.dataset.orderId;
        const newStatus = select.value;
        const currentStatus = select.dataset.currentStatus;

        // Nếu chọn "Hủy", hiển thị popup nhập lý do
        if (newStatus === 'cancelled') {
            const cancelModal = new bootstrap.Modal(document.getElementById('cancelOrderModal'));
            document.getElementById('orderIdToCancel').value = orderId; // Gán ID đơn hàng vào hidden input
            cancelModal.show();

            // Reset trạng thái dropdown về trạng thái cũ nếu đóng popup
            document.getElementById('cancelOrderModal').addEventListener('hidden.bs.modal', () => {
                select.value = currentStatus;
            });

            return; // Không tiếp tục xử lý trạng thái khác
        }

        // Hiển thị hộp thoại xác nhận cho các trạng thái khác
        const confirmChange = showConfirm(`Bạn có chắc chắn muốn thay đổi trạng thái đơn hàng từ "${getStatusLabel(currentStatus)}" thành "${getStatusLabel(newStatus)}"?`);
        if (!confirmChange) {
            select.value = currentStatus; // Reset về trạng thái cũ
            return;
        }

        // Gửi cập nhật đến server
        try {
            const response = await fetch('../admin/api/order/updatestatusorder.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    order_id: orderId,
                    status: newStatus,
                    employee_id: document.getElementById('currentUserId').value
                }),
            });

            const result = await response.json();

            if (result.success) {
                showToast('Cập nhật trạng thái thành công', 'success');
                fetchOrders();
            } else {
                showToast(result.message, 'error');
                fetchOrders();
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái:', error);
            select.value = currentStatus; // Reset về trạng thái cũ
        }
    }
});

// Xử lý khi xác nhận hủy đơn hàng
document.getElementById('confirmCancelOrder').addEventListener('click', async () => {
    const orderId = document.getElementById('orderIdToCancel').value;
    const reason = document.getElementById('cancelReason').value.trim();

    if (!reason) {
        alert('Vui lòng nhập lý do hủy đơn hàng.');
        return;
    }

    try {
        const response = await fetch('../admin/api/order/updatestatusorder.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                order_id: orderId,
                status: 'cancelled',
                employee_id: document.getElementById('currentUserId').value,
                reason: reason,
            }),
        });

        const result = await response.json();

        if (result.success) {
            showToast('Đơn hàng đã được hủy thành công', 'success');
            const cancelModal = bootstrap.Modal.getInstance(document.getElementById('cancelOrderModal'));
            cancelModal.hide(); // Đóng popup
            fetchOrders();
        } else {
            showToast(result.message, 'error');
        }
    } catch (error) {
        console.error('Lỗi khi hủy đơn hàng:', error);
        alert('Có lỗi xảy ra khi hủy đơn hàng.');
    }
});

function getStatusLabel(status) {
    switch (status) {
        case 'pending': return 'Chưa xử lý';
        case 'processing': return 'Đang giao';
        case 'shipped': return 'Đã giao';
        case 'cancelled': return 'Đã hủy';
        default: return status;
    }
}

async function fetchfullname(id) {
    try {
        const response = await fetch(`../admin/api/account/getfullnamebyuserid.php?user_id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (data.success) {
            console.log(data.fullname);
            return data.fullname;
        } else {
            console.error('Error fetching fullname:', data.message);
            return id;
        }
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return id;
    }
}

async function fetchaddress(id) {
    try {
        const response = await fetch(`../admin/api/account/getaddressbyidaddress.php?address_id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (data.success) {
            console.log(data.address);
            return data.address;
        } else {
            console.error('Error fetching fullname:', data.message);
            return null;
        }
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return null;
    }
}

async function fecthOrderDetail(id) {
    try {
        const response = await fetch(`../admin/api/order/getorderbyid.php?order_id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (data.success) {
            console.log(data);
            return data;
        } else {
            console.error('Error fetching fullname:', data.message);
        }
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

 async function renderOrderDetail(orderData) {
    document.getElementById('order-id').innerText = orderData.order.id;
    document.getElementById('status').innerText = getStatusLabel(orderData.order.status);
    document.getElementById('created-at').innerText = orderData.order.created_at;
    document.getElementById('employee-id').innerText = await fetchfullname(orderData.order.employee_id);
    document.getElementById('total').innerText = orderData.order.total;

    document.getElementById('address').innerText = await fetchaddress(orderData.order.address_id);
    document.getElementById('customer-name').innerText = await fetchfullname(orderData.order.account_id);
    document.getElementById('phone-number').innerText = orderData.order.phone_number;
    document.getElementById('payment-method').innerText = orderData.order.payment_method;
    document.getElementById('reason').innerText = orderData.order.reason;
    if (orderData.order.status !== 'cancelled') {
        document.getElementById('d_none').classList.add('d-none'); // Ẩn lý do hủy đơn hàng nếu trạng thái không phải là "Đã hủy"
    } else{
        document.getElementById('d_none').classList.remove('d-none'); // Hiện lý do hủy đơn hàng nếu trạng thái là "Đã hủy"
    }
        
    // Đặt lại giá trị của lý do hủy đơn hàng về mặc định
    
    // Chi tiết sản phẩm
    const tbody = document.getElementById('order-details-body');
    tbody.innerHTML = ""; // Xoá cũ

    orderData.details.forEach((item, index) => {
        const tol = item.price * item.amount;
        const row = `
        <tr>
          <td>${index + 1}</td>
          <td>${item.product_name}</td>
          <td>${item.size_number}</td>
          <td>${item.amount}</td>
          <td>${item.price}</td>
            <td>${tol}</td>
        </tr>
      `;
        tbody.insertAdjacentHTML('beforeend', row);
    });
}


document.getElementById('orderStatusFilter').addEventListener('change', async (e) => {
    const selectedStatus = e.target.value;
    console.log(selectedStatus);
    try {
        const response = await fetch('../admin/api/order/getallorder.php', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (data.success) {
            let filteredOrders = data.data;

            if (selectedStatus !== '') {
                filteredOrders = filteredOrders.filter(order => order.status === selectedStatus);
            }

            rederOrder(filteredOrders);
        } else {
            console.error('Error fetching orders:', data.message);
        }
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
});

document.getElementById('startDateFilter').addEventListener('input', filterOrdersByDate);
document.getElementById('endDateFilter').addEventListener('input', filterOrdersByDate);

async function filterOrdersByDate() {
    const startDate = document.getElementById('startDateFilter').value;
    const endDate = document.getElementById('endDateFilter').value;

    try {
        const response = await fetch('../admin/api/order/getallorder.php', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (data.success) {
            const filteredOrders = data.data.filter(order => {
                const orderDate = new Date(order.created_at);
                const isAfterStartDate = startDate ? orderDate >= new Date(startDate) : true;
                const isBeforeEndDate = endDate ? orderDate <= new Date(endDate) : true;
                return isAfterStartDate && isBeforeEndDate;
            });

            rederOrder(filteredOrders);
        } else {
            console.error('Error fetching orders:', data.message);
        }
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const sortOrder = document.getElementById('sortOrder');
    const searchAddress = document.getElementById('searchAddress');
    const tableBody = document.getElementById('tableBodyAccount');

    // Lắng nghe sự kiện thay đổi trên dropdown và input
    sortOrder.addEventListener('change', filterTable);
    searchAddress.addEventListener('input', filterTable);

    function filterTable() {
        const selectedField = sortOrder.value; // Lấy giá trị được chọn từ dropdown
        const searchTerm = searchAddress.value.trim().toLowerCase(); // Lấy giá trị từ input

        // Lấy tất cả các hàng trong bảng
        const rows = tableBody.querySelectorAll('tr');

        rows.forEach(row => {
            const addressCell = row.querySelector('td:nth-child(4)');
            const addressText = addressCell ? addressCell.textContent.trim().toLowerCase() : '';
            const addressArray = addressText.split(',').map(item => item.trim()); // trim từng phần tử
        
            const fieldValue = addressArray[selectedField] || ''; // tránh undefined
            console.log("So sánh:", fieldValue, "<->", searchTerm);
        
            if (searchTerm === '' || fieldValue.toLowerCase().includes(searchTerm.toLowerCase())) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
        
    }
});