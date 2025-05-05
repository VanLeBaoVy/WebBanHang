let order = [];
let orderDetail = [];
let products = [];
let size = [];
let dataLoaded = false;
async function fetchPurchase() {
	order = [];
    orderDetail = [];
    products = [];
    size = [];
    try {
        const [orderRes,orderDetailRes,productsRes,sizeRes] = await Promise.all([
            fetch('../static/connectDB/get_order.php'),
            fetch('../static/connectDB/get_orderDetail.php'),
            fetch('../static/connectDB/get_product.php'),
            fetch('../static/connectDB/get_size.php')
        ]);

        if (!orderRes.ok || !orderDetailRes.ok || !productsRes.ok || !sizeRes.ok) {
            throw new Error("Có lỗi khi fetch một trong các file PHP");
        }

        const [orderData,orderDetailData,productsData,sizeData] = await Promise.all([
            orderRes.json(),
            orderDetailRes.json(),
            productsRes.json(),
            sizeRes.json()
        ]);

        // Lưu vào biến toàn cục hoặc dùng tiếp
        order = orderData;
        console.log(order);
        orderDetail = orderDetailData;
        console.log(orderDetail);
        products = productsData;
        console.log(products);
        size = sizeData;
        console.log(size);
        dataLoaded = true;
    } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
    }
}
function updateOrder(order) {
    let OrderDetail = orderDetail.filter(od => od.order_id == order.id);
    let returnProduct = [];

    OrderDetail.forEach(od => {
        // Tìm size hiện tại trong bảng size
        let matchedSize = size.find(s => s.product_id == od.product_id && s.size_number == od.size_number);
        if (matchedSize) {
            console.log(matchedSize);
            let newAmount = matchedSize.amount + od.amount;
            returnProduct.push({
                product_id: od.product_id,
                size_number: od.size_number,
                amount: newAmount
            });
        }
    });
    console.log(returnProduct);
    fetch('../static/connectDB/updateStatusOrder.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            status: order.status,
            id: order.id,
            reason: order.reason,
            returnProduct: returnProduct
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Kết quả update:', data);
        if (data.success) {
            fetchPurchase();
            showNotification('Cập nhật thông tin thành công', 'success');
        } else {
            showNotification('Cập nhật không thành công', 'warning');
        }
    })
    .catch(error => {
        console.error('Lỗi khi cập nhật:', error);
        showNotification('Lỗi máy chủ khi cập nhật', 'error');
    });
}