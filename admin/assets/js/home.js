
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.style.display = 'block'; // Initially hide the toast
    let icon = '';
    if (type === 'success') icon = '✅';
    else if (type === 'error') icon = '❌';
    else if (type === 'warning') icon = '⚠️';

    toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.animation = 'slideIn 0.5s forwards, fadeOut 0.5s 2.5s forwards';
    });

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

async function fetchDataFromAPI() {
    try {
        const response = await fetch('../admin/api/statistics/getallorder.php');
        const data = await response.json();
        if (data.success) {
            return data.data; // Return the data for further processing
        } else {
            console.error('Error', data.message);
        }
    } catch (error) {
        console.error('Error fetching data from API:', error);
        showToast('Failed to fetch data from API', 'error');
        return null;
    }
}

function reduceOrdershome(orders) {
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

function reduceProducts(orders) {
    const groupedByProduct = {};

    orders.forEach(order => {
        order.details.forEach(item => {
            const productId = item.product_id;

            if (!groupedByProduct[productId]) {
                groupedByProduct[productId] = {
                    product_id: productId,
                    product_name: item.product_name,
                    total_amount: 0,
                    total_revenue: 0,
                    orders: []
                };
            }

            groupedByProduct[productId].total_amount += item.amount;
            groupedByProduct[productId].total_revenue += item.amount * item.product_price;
            groupedByProduct[productId].orders.push({
                order_id: order.order_id,
                customer_name: order.customer_name,
                created_at: order.created_at,
                amount: item.amount,
                price: item.product_price
            });
        });
    });

    // Chuyển object thành mảng và sắp xếp theo tổng số lượng bán giảm dần
    const result = Object.values(groupedByProduct)
        .sort((a, b) => b.total_amount - a.total_amount);

    return result;

};

function reduceMonth(orders, year = new Date().getFullYear()) {
    const revenueByMonth = Array(12).fill(0); // Khởi tạo 12 tháng với giá trị 0

    orders.forEach(order => {
        const date = new Date(order.created_at);
        const orderYear = date.getFullYear();
        const monthIndex = date.getMonth(); // 0 -> 11

        if (orderYear === year) {
            order.details.forEach(item => {
                revenueByMonth[monthIndex] += item.amount * item.product_price;
            });
        }
    });

    return revenueByMonth; // [Tháng 1, Tháng 2, ..., Tháng 12]
}


document.addEventListener('DOMContentLoaded', async () => {
    const link = new URLSearchParams(window.location.search).get('page');
    if (link === null) {
        const data = await fetchDataFromAPI();
        if (data) {
            console.log(data); // Log the data to see the structure
            const topCustomers = reduceOrdershome(data).slice(0, 5); // Lấy 5 người có total_spent cao nhất
            const topCustomersList = document.getElementById('topCustomersList');
            topCustomers.forEach(customer => {
                const listItem = document.createElement('li');
                listItem.textContent = `${customer.customer_name} - ${customer.total_spent} VND`;
                topCustomersList.appendChild(listItem);
            });

            const topProducts = reduceProducts(data).slice(0, 5); // Lấy 5 sản phẩm bán chạy nhất
            console.log(topProducts); // Log the data to see the structure
            const topProductsList = document.getElementById('topProductsList');
            topProducts.forEach(product => {
                const listItem = document.createElement('li');
                listItem.textContent = `${product.product_name} - SL: ${product.total_amount}`;
                topProductsList.appendChild(listItem);
            });

             //     // Example list containing revenue data and labels
        const revenueData = reduceMonth(data);
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        const ctx = document.getElementById('revenueChart').getContext('2d');
        const revenueChart = new Chart(ctx, {
            type: 'bar', // You can change this to 'line', 'pie', etc.
            data: {
                labels: months, // Use the list for labels
                datasets: [{
                    label: 'Revenue (in USD)',
                    data: revenueData, // Use the list for data
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
           
        }

    }
});
