function innerPurchaseHistory() {
  //displayNoneFilterSearch();
  const container = document.getElementById("container");
  container.innerHTML = "";
  document.querySelector(".modal").classList.remove("show-modal");
  const purchase = document.createElement("div");
  purchase.classList.add("purchaseHistory");
  purchase.innerHTML = `
          <div class="purchase-wrapper grid">
            <div class="purchase-title">
              <i class="fa-solid fa-bag-shopping"></i> 
              <p>ĐƠN MUA</p>
            </div>
            <div class="purchase-container">
              <div class="purchase-nav">
                <div class="purchase-title__item" onclick="innerAllOrder();changeColorPurchaseNav(this)">Tất cả</div>
                <div class="purchase-title__item" onclick="filterPurchaseHistoryByStatus('pending');changeColorPurchaseNav(this)">Chờ xác nhận</div>
                <div class="purchase-title__item" onclick="filterPurchaseHistoryByStatus('processing');changeColorPurchaseNav(this)">Đang giao</div>
                <div class="purchase-title__item" onclick="filterPurchaseHistoryByStatus('shipped');changeColorPurchaseNav(this)">Đã giao</div>
                <div class="purchase-title__item" onclick="filterPurchaseHistoryByStatus('cancelled');changeColorPurchaseNav(this)">Đã hủy</div>
              </div>
              <div class="purchase-content" id="inner-purchase-order"></div>
            </div>
          </div>
          `;
  
  container.appendChild(purchase);
  const navhihi = document.querySelector('.purchase-title__item');
  changeColorPurchaseNav(navhihi);
  innerAllOrder();
  window.scrollTo(0, 0);
}

function innerAllOrder() {
  let idLogin = localStorage.getItem('idLogin');
  let orderList = order.filter(o => o.account_id === idLogin)
  console.log("Đơn hàng của user: " + orderList);
    if (orderList) {
      const reversedOrders = orderList.reverse();
      innerPurchaseHistoryOrder(reversedOrders);
    } else {
      console.error("Không tìm thấy thông tin đơn hàng!");
    }
}


function filterPurchaseHistoryByStatus(status) {
  let idLogin = localStorage.getItem('idLogin');
  let orders = order.filter(or => or.account_id === idLogin);
    if (orders) {
      const filteredOrders = orders.filter((order) => order.status === status);
      innerPurchaseHistoryOrder(filteredOrders);
    } else {
      console.error("Không tìm thấy thông tin đơn hàng!");
    }
}
function innerPurchaseHistoryOrder(orders) {
  //simulateLoading(150);
  const container = document.getElementById("inner-purchase-order");
  container.innerHTML = ""; // Xóa nội dung trước đó

  orders.forEach((order) => {
    // Tạo khung cho từng đơn hàng
    const orderElement = document.createElement("div");
    orderElement.classList.add("purchase-order");
    orderElement.style.marginTop = "10px";
    orderDetailList = orderDetail.filter(o => o.order_id = order.id);
    let status = null;
    if (order.status === 'pending') status = "Chờ xác nhận";
    else if (order.status === 'processing') status = "Đang giao";
    else if (order.status === 'shipped') status = "Đã giao";
    else if (order.status === 'cancelled') status = "Đã huỷ";
    else status = "";
    orderElement.innerHTML = `
        <div class="purchase-order__state"> 
          <div class="order__state order__state--id">Mã đơn hàng: ${order.id}</div> 
          <div class="order__state order__state--state" >${status}</div>
        </div>
        <div id="purchase-order-${order.id}" class="purchase-order__content"></div>
        <div id="inner-purchase-order-${order.id}" class="inner-purchase-order-content" onclick></div>
        <div class="purchase-order__explore">
          <div class="order__explore--totalPrice">Thành tiền: <span>${order.total}</span></div>
          <div class="order__explore--seeFull" onclick="purchaseHistoryOrderContent(${order.id},this)">XEM CHI TIẾT</div>
          <div id="cainaydungdehiennuthuydon${order.id}">
          <div class="order__explore--seeFull" onclick="cancelOrder(${order.id})">HỦY ĐƠN</div>
          </div>
          <div class="order__explore--add" onclick="replayPay(${order.id})">MUA LẠI</div>
        </div>
      `;
    
    container.appendChild(orderElement);
    if (order.status !== "pending") {
      document.getElementById(`cainaydungdehiennuthuydon${order.id}`).style.display = "none";
    }
    // Lấy container nội dung sản phẩm
    innerPurchaseHistoryOrderContent(order);
  });
  const state = document.querySelectorAll(".order__state--state");
    state.forEach(x => {
      console.log(x);
      if (x.textContent === "Chờ xác nhận" || x.textContent  === "Đã hủy") {
        x.style.color = "#ee4d2d"; 
      }
      else {
        x.style.color = "#00b67a";
      }
    });
}

function cancelOrder(orderId) {
  // Tạo popup hỏi lý do hủy bằng innerHTML
  const popupHTML = `
      <div id="cancelPopup" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 20px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5); z-index: 1000;">
        <h3>Lý do hủy đơn hàng</h3>
        <textarea id="cancelReason" placeholder="Nhập lý do..." style="width: 100%; height: 80px; margin-bottom: 10px;"></textarea>
        <button id="confirmCancel" style="margin-right: 10px;">Xác nhận</button>
        <button id="closePopup">Hủy</button>
      </div>
      <div id="popupOverlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); z-index: 999;"></div>
    `;

  // Gắn nội dung popup vào body
  document.body.insertAdjacentHTML("beforeend", popupHTML);

  // Xử lý khi nhấn nút "Xác nhận"
  document.getElementById("confirmCancel").onclick = function () {
    const reason = document.getElementById("cancelReason").value.trim();
    if (!reason) {
      showNotification("Vui lòng nhập lý do hủy đơn hàng", "error");
      return;
    }
    
    // Cập nhật trạng thái đơn hàng
    let idLogin = localStorage.getItem("idLogin");
    let ord = order.find(o => o.account_id == idLogin && o.id == orderId); 
    if (!order || !Array.isArray(order)) {
      showNotification("Lỗi không thể xoá đơn hàng!", "error");
      return;
    }   
      if (ord) {
          ord.status = "cancelled";
          ord.reason = reason; // Lưu lý do hủy
          updateOrder(ord);
          innerPurchaseHistory();
          showNotification("Đã hủy đơn hàng", "success");
          document.getElementById(`cainaydungdehiennuthuydon${orderId}`).style.display = "none";
        }
    // Xóa popup sau khi xử lý
    document.getElementById("cancelPopup").remove();
    document.getElementById("popupOverlay").remove();
  };

  // Xử lý khi nhấn nút "Hủy"
  document.getElementById("closePopup").onclick = function () {
  document.getElementById("cancelPopup").remove();
  document.getElementById("popupOverlay").remove();
};
}
function purchaseHistoryOrderContent(orderID, element) {
  const innerContainer = document.getElementById(`purchase-order-${orderID}`);
  if (!dataLoaded) {
    showNotification("Đang tải dữ liệu, vui lòng đợi...", "warning");
    return false;
  }
  console.log("Đơn hàng cần xem chi tiết: " + orderID);
  if (element.textContent === "XEM CHI TIẾT") {
    innerContainer.classList.add("vienTren");
    // Hiển thị sản phẩm trong đơn hàng
    const idLogin = localStorage.getItem('idLogin');
    console.log(order);
    order.forEach((order1) => {
        if (order1.id == orderID && order1.account_id == idLogin) {
          console.log(order1);
          console.log(profiles);
          let profile = profiles.find(pro => pro.id === idLogin);
          console.log(order1.address_id);
          let AD = address.find(ad => ad.id === order1.address_id);
          console.log(AD);
          let string = AD.street + ', ' + AD.ward + ', ' + AD.district + ', ' + AD.city;
          innerContainer.innerHTML = `
    <div style="padding: 0 10px;text-align: center;margin-top: 30px;font-size: 2.5rem; font-weight: bold;">Thông Tin Đơn Hàng</div>
    <div class="chitiet">
          <div class="inner-chitiet">
              <div class="chitiet-text" id="chitiet-fullname">
              <i class="fa-solid fa-user"></i>
              <span  id="chitiet-fullname">${profile.fullname}</span>
              </div>
              <div class="chitiet-text" id="chitiet-phone">
              <i class="fa-solid fa-phone"></i>
              <span  id="chitiet-address">${profile.phone_number}</span>
              </div>
              <div class="chitiet-text">
              <i class="fa-solid fa-location-dot"></i>
              <span  id="chitiet-address">${string}</span>
              </div>
          </div>
          <div class="inner-chitiet">
              <div class="chitiet-text" id="chitiet-time">${order1.created_at}</div>
              <div class="chitiet-text" id="chitiet-method">${order1.payment_method}</div>
          </div>
          <div style="width: 100% ;display: flex;justify-content: center;" id="timeline-${order1.id}"></div>
      </div>
      `;
          if (order1.status === "cancelled") {
            document.getElementById(`timeline-${order1.id}`).innerHTML = `
            <div class="timeline">
                  <div class="step completed">
                    <div class="icon" id="icon-color-1-${order1.id}">
                      <i class="fa-solid fa-face-sad-tear"></i>
                    </div>
                    <div class="content">
                      <p>Đã hủy</p>
                      <span>${order1.updated_at}</span>
                      <br>
                      <span>Lý do: ${order1.reason}</span>
                    </div>
                  </div>
            </div>
            `;
          } else {
            document.getElementById(`timeline-${order1.id}`).innerHTML = `
            <div class="timeline">
          <div class="step completed">
              <div class="icon" id="icon-color-1-${order1.id}">
              <i class="fa-solid fa-hourglass-start"></i>
              </div>
              <div class="content">
                  <p>Chờ xác nhận</p>
                  <span>${order1.created_at}</span>
              </div>
          </div>
          <div class="step completed">
              <div class="icon" id="icon-color-2-${order1.id}">
              <i class="fa-solid fa-truck-fast"></i>
              </div>
              <div class="content">
                  <p>Đang giao</p>
                  <span id="inner-danggiao-${order1.id}"></span>
              </div>
          </div>
          <div class="step completed">
              <div class="icon" id="icon-color-3-${order1.id}">
              <i class="fa-solid fa-box"></i>
              </div>
              <div class="content">
                  <p>Đã nhận</p>
                  <span id="inner-dagiao-${order1.id}"></span>
              </div>
          </div>
      </div>
            `;
            setColorIcon(order);
          }
        }
      });
    element.textContent = "ẨN CHI TIẾT";
  } else {
    innerContainer.innerHTML = "";
    innerContainer.classList.remove("vienTren");
    element.textContent = "XEM CHI TIẾT";
  }
}

function setColorIcon(order) {
  const idLogin = localStorage.getItem('idLogin');
    order.forEach((order1) => {
      if (order1.id === order && order1.account_id === idLogin) {
        if (order1.status === "pending") {
          document.getElementById(`icon-color-2-${order1.id}`).style.background = "gray";
          document.getElementById(`icon-color-2-${order1.id}`).style.color = "black";
          document.getElementById(`icon-color-3-${order1.id}`).style.background = "gray";
          document.getElementById(`icon-color-3-${order1.id}`).style.color = "black";
          console.log(order);
        }
        if (order1.status === "processing") {
          document.getElementById(`icon-color-3-${order1.id}`).style.background = "gray";
          document.getElementById(`icon-color-3-${order1.id}`).style.color = "black";
          document.getElementById(`inner-danggiao-${order1.id}`).textContent = order1.dateDangGiao;

        }
        if (order1.status === "shipped") {
          document.getElementById(`inner-danggiao-${order1.id}`).textContent = order1.dateDangGiao;
          document.getElementById(`inner-dagiao-${order1.id}`).textContent = order1.dateDaGiao;
        }
      }
    });
}

function innerPurchaseHistoryOrderContent(order) {
  const innerContainer = document.getElementById(`inner-purchase-order-${order.id}`);
  let product = [];
  // Hiển thị sản phẩm trong đơn hàng
  orderDetail.forEach(od => {
    product.push(products.find(p => p.id === od.product_id));
  });
  console.log(product);
  product.forEach((p) => {
      if (p) {
        let od = orderDetail.find(od => od.product_id === p.id);
        innerContainer.innerHTML += `
              <div class="purchase-order__infor">
                <div class="order__infor order__infor__product">
                  <img class="__infor__product __infor__product--img" src="${p.url

          }" alt="${p.name}" onclick="innerCourseInfor('${p.id}')"/>
                  <div class="__infor__product __infor__product__infor">
                    <div class="__product__info __product__infor--name" onclick="innerSportInfor('${p.id}')">${p.name}</div>
                    <div class="__product__info __product__infor--description">${p.description || "Không có mô tả"}</div>
                    <div class="__product__info __product__infor--count">So luong:<strong>${od.amount}</strong></div>
                  </div>
                </div>
                <div class="order__infor order__infor__price">
                  
                  <div class="order__infor__ __infor__price--salePrice">${p.price}<span>đ</span></div>\
                </div>
              </div>
            `;
      } else {
        console.error(`Không thể tải sản phẩm với ID: ${p.id}`);
      }
    });
  }


// ----------------------------------------------------------------------------

function changeColorPurchaseNav(element) {
  const navlist = document.querySelectorAll(".purchase-title__item"); 
  navlist.forEach(x => {
    x.classList.remove("purchaseOderNavSelected"); 
  });
  element.classList.add("purchaseOderNavSelected");
}
function replayPay(idorder) {
  if (!dataLoaded) {
    showNotification("Đang tải dữ liệu, vui lòng đợi...", "warning");
    return false;
  }

  console.log("idorder:", idorder);
  let amount = 0;
  let new_cart = [];

  let or = order.find(o => o.id == idorder); // dùng == để tránh lỗi kiểu dữ liệu
  if (!or) {
    console.warn("Không tìm thấy đơn hàng với id:", idorder);
    showNotification("Không tìm thấy đơn hàng tương ứng", "error");
    return;
  }

  console.log("Đơn hàng muốn mua lại:", or);

  let orderDetails = orderDetail.filter(p => p.order_id == or.id);
  console.log("Các sản phẩm trong đơn hàng cần mua lại:", orderDetails);

  if (orderDetails.length > 0) {
    orderDetails.forEach(od => {
      let pro = products.find(p => p.id == od.product_id); 
      if (pro) {
        new_cart.push(pro);
        amount += pro.amount; 
      }
    });
  }

  interface_cart(or.total, amount, new_cart);
}