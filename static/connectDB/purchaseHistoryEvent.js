let order = [];
let orderDetail = [];
let products = [];
let dataLoaded = false;
async function fetchPurchase() {
	order = [];
    orderDetail = [];
    products = [];
    try {
        const [orderRes,orderDetailRes,productsRes] = await Promise.all([
            fetch('../static/connectDB/get_order.php'),
            fetch('../static/connectDB/get_orderDetail.php'),
            fetch('../static/connectDB/get_product.php')
        ]);

        if (!orderRes.ok || !orderDetailRes.ok || !productsRes.ok) {
            throw new Error("Có lỗi khi fetch một trong các file PHP");
        }

        const [orderData,orderDetailData,productsData] = await Promise.all([
            orderRes.json(),
            orderDetailRes.json(),
            productsRes.json()
        ]);

        // Lưu vào biến toàn cục hoặc dùng tiếp
        order = orderData;
        console.log(order);
        orderDetail = orderDetailData;
        console.log(orderDetail);
        products = productsData;
        console.log(products);
        dataLoaded = true;
    } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
    }
}
function updateOrder(order) {
    fetch('../static/connectDB/updateStatusOrder.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({status: order.status, id: order.id,reason:order.reason})
    })
    .then(response => response.json())
    .then(data => {
        console.log('Kết quả update:', data);
        if (data.success) {
            fetchPurchase();
            showNotification('Cập nhật thông tin thành công', 'success');
        } else {
            showNotification('Cập nhật thông tin không thành công', 'warning');
        }
    })
    .catch(error => {
        console.error('Lỗi khi cập nhật:', error);
        showNotification('Lỗi máy chủ khi cập nhật', 'error');
    });
};