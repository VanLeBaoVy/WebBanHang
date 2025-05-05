
// Hàm mở form chi tiết sản phẩm
    let listProduct = []; 
    let pageCurrent = 1;
    let totalPage = 1;
    const perPage = 5;

    // Load dữ liệu sản phẩm từ productList.php khi tải trang
    window.onload = loadDataProduct;

    function loadDataProduct() {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", "../static/connectDB/productList_JSON.php", true);
      xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
              
  
              if (xhr.status === 200) {
                  try {
                      let data = JSON.parse(xhr.responseText);
                      
                      listProduct = data;
                      
                      totalPage = Math.ceil(listProduct.length / perPage);
                      xhr.open("GET", "../static/connectDB/productList.php", true);
                  } catch (e) {
                      console.error("❌ Lỗi khi parse JSON:", e);
                  }
              } else {
                  console.error(`❌ Lỗi HTTP: ${xhr.status}`);
              }
          }
      };
      xhr.send();
  }
  


    function formatPrice(price) {
      return price.toLocaleString('vi-VN') + " ₫";
    }

    // Hàm mở form chi tiết sản phẩm
    function openProductDetail(index) {
      const product = listProduct[index - 78];
      
      console.log("✅ sản phẩm", index);

      const txt = `
          <div class="product-detail-content">
              <div class="product-detail-left">
                  <img class="image-detail" id="product-image" src="${product.url}" alt="Product Image">
              </div>
              <div class="product-detail-right">
                  <h2 id="product-name">${product.name}</h2>
                  <p class="product-brand">Thương hiệu: ${product.brand}</p>
                  <p class="product-price" id="product-price">Giá: ${formatPrice(product.price)}</p>
                  <p id="product-description">${product.description}</p>
                  <label for="note">Ghi chú:</label>
                  <textarea id="note" placeholder="Ghi chú cho đơn hàng..."></textarea>
                  <div class="quantity-area">
                      <div class="quantity-wrapper">
                          <span>Số lượng:</span><br>
                          <div class="btnCustom" value="details-product">
                              <button class="btnCustomAsc" onclick="decreaseQuantity(this, ${index})">-</button>
                              <input type="text" class="txtCustom quantity" id="quantity-product-details" value="1" min="1"
                                  oninput="inputQuantity(this, ${index})">
                              <button class="btnCustomDesc" onclick="increaseQuantity(this, ${index})">+</button>
                          </div>
                      </div>
                      <div class="size-wrapper">
                          <span>Size:</span>
                          <select id="size-product-details">
                              ${product.size.map(size => `<option value="${size}">${size}</option>`).join("")}
                          </select>
                      </div>
                  </div>
                  <div class="total-price">
                      <p>Thành tiền: <span id="total-price"></span></p>
                  </div>
                  <button class="btn add-to-cart" onclick="addToCart()">Thêm vào giỏ hàng</button>
                  <button class="__foot__buy" onclick="buyNow(event, '${product.id}')">Mua ngay</button>
              </div>
              <span class="close-btn" onclick="closeProductDetail()">Trở lại</span>
          </div>`;
      
      document.getElementById("container_infor").innerHTML = txt;
      console.log(txt);
      document.getElementById("container_infor").style.display = "flex";
      document.getElementById("container").style.display = "none";
      const basePrice = product.price;
      updateTotalPrice(basePrice);
    }

// Hàm tổng thanh toán
function updateTotalPrice(basePrice) {
    const quantity = parseInt(document.getElementById("quantity-product-details").value);
    const totalPrice = basePrice * quantity;
    document.getElementById("total-price").textContent = formatPrice(totalPrice);
}

// đóng form chi tiết sản phẩm
function closeProductDetail() {
    document.getElementById("container_infor").style.display = "none";
    document.getElementById("container").style.display = "flex";
}
let userCurrent = {
    idLogin: localStorage.getItem("idLogin") || null,
    cart: []
}
console.log("✅ Biến userCurrent:", userCurrent);

// Hàm tăng số lượng
function increaseQuantity(obj, index) {
    const quantityInput = parseInt(obj.parentNode.querySelector(".quantity").value);
    newQuantity = quantityInput + 1;
    userCurrent = localStorage.getItem("userCurrent") ? JSON.parse(localStorage.getItem("userCurrent")) : null;
    if (newQuantity > listProduct[index].quantity) {
        alert("Số lượng sản phẩm không đủ.");
        return;
    }
    obj.parentNode.querySelector(".quantity").value = newQuantity;
    
    if (obj.parentNode.getAttribute('value') === 'details-product') {
        const basePrice = parsePrice(document.querySelector("#product-price").textContent);
        updateTotalPrice(basePrice);
    }
    else if (obj.parentNode.getAttribute('value') === 'checkout-product') {
        userCurrent.cart[index].quantity = newQuantity;
        let totalPrice = 0;
        userCurrent.cart.forEach((product) => {
            totalPrice += product.quantity * product.price;
        });
        let Size=0
        userCurrent.cart.forEach(product => {
          Size += product.quantity;
        });
        document.getElementById("bulbleLength").textContent = Size;
        localStorage.setItem("userCurrent", JSON.stringify(userCurrent));
        const totalPriceComponent = document.querySelector(".total-price-cart");
        document.getElementById("totalProduct").textContent = Size;
        totalPriceComponent.innerHTML = formatPrice(totalPrice);
    }
}

// Hàm giảm số lượng
function decreaseQuantity(obj, index) {
    const quantityInput = parseInt(obj.parentNode.querySelector(".quantity").value);
    let userCurrent = localStorage.getItem("userCurrent") ? JSON.parse(localStorage.getItem("userCurrent")) : null;
    if (quantityInput > 1) {
        newQuantity = quantityInput - 1;
        obj.parentNode.querySelector(".quantity").value = newQuantity;
        
        if (obj.parentNode.getAttribute('value') === 'details-product') {
            const basePrice = parsePrice(document.querySelector("#product-price").textContent);
            updateTotalPrice(basePrice);
        }
        else if (obj.parentNode.getAttribute('value') === 'checkout-product') {
            userCurrent.cart[index].quantity = newQuantity;
            let totalPrice = 0;
            userCurrent.cart.forEach((product) => {
                totalPrice += product.quantity * product.price;
            });
            let Size=0
        userCurrent.cart.forEach(product => {
          Size += product.quantity;
        });
          document.getElementById("bulbleLength").textContent = Size;
          localStorage.setItem("userCurrent", JSON.stringify(userCurrent));
            const totalPriceComponent = document.querySelector(".total-price-cart");
            totalPriceComponent.innerHTML = formatPrice(totalPrice);
            document.getElementById("totalProduct").textContent = Size;
        }
        
    }
}

function inputQuantity(obj, index) {
    setTimeout(() => {
        const quantityInput = parseInt(obj.parentNode.querySelector(".quantity").value);
        if (quantityInput < 1) {
            alert("Số lượng phải lớn hơn 0.");
            obj.parentNode.querySelector(".quantity").value = 1;
        }
        if (quantityInput > listProduct[index].quantity) {
            alert("Số lượng sản phẩm không đủ.");
            obj.parentNode.querySelector(".quantity").value = 1;
        }
        if (obj.parentNode.getAttribute('value') === 'details-product') {
            const basePrice = parsePrice(document.querySelector("#product-price").textContent);
            updateTotalPrice(basePrice);
        }
        else if (obj.parentNode.getAttribute('value') === 'checkout-product') {
            userCurrent.cart[index].quantity = quantityInput;
            let totalPrice = 0;
            let Size = 0
            userCurrent.cart.forEach((product) => {
                totalPrice += product.quantity * product.price;
                Size += product.quantity;
              });
            localStorage.setItem("userCurrent", JSON.stringify(userCurrent));
            const totalPriceComponent = document.querySelector(".total-price-cart");
            totalPriceComponent.innerHTML = formatPrice(totalPrice);
            document.getElementById("totalProduct").textContent = Size;
        }
     }, 500);
};

// Hàm thêm vào giỏ hàng
function addToCart() {
    const account = accounts.find(account => account.accountId === userCurrent.idLogin);
    console.log(account);
    if (userCurrent.idLogin === null) {
        alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
        return;
    }
    /* else if (account.status === "Bị khoá") { 
        alert("Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên.");
        return;
    } */
    const productCheckout = {};
    productCheckout.name = document.getElementById("product-name").textContent;
    productCheckout.quantity = parseInt(document.getElementById("quantity-product-details").value);
    // alert(document.getElementById("quantity").value);
    // productCheckout.price = parsePrice(document.getElementById("product-price").textContent);
    productCheckout.price = parsePrice(document.getElementById("product-price").textContent);
    productCheckout.url = document.getElementById("product-image").src;

    findProduct = userCurrent.cart.find(product => product.name === productCheckout.name);
    findProductInList = listProduct.find(product => product.name === productCheckout.name);
    console.log(findProductInList);
    if (findProduct !== undefined) {

        findProduct.quantity += productCheckout.quantity;
    }
    else {
        userCurrent.cart.push(productCheckout);
    }

    alert(`Đã thêm ${productCheckout.quantity} x ${productCheckout.name} vào giỏ hàng.`);
    localStorage.setItem("userCurrent", JSON.stringify(userCurrent));
    userCurrent = JSON.parse(localStorage.getItem("userCurrent"));
    let totalPrice = 0;
    userCurrent.cart.forEach(product => {
      totalProduct += product.quantity;
    });
    document.getElementById("bulbleLength").textContent = totalProduct;
    closeProductDetail();
}
function parsePrice(priceString) {
  const price = priceString.replace(/[^\d]/g, '');
  return parseInt(price); 
}
// Xử lý hiển thị giỏ hàng
const btnCart = document.querySelector(".icon__cart-shopping");
btnCart.addEventListener("click", () => {
    const modal = document.querySelector(".modal");
    const cart = document.querySelector(".cart");

    const userCurrent = localStorage.getItem("userCurrent") ? JSON.parse(localStorage.getItem("userCurrent")) : null;
    const listItemComponent = document.querySelector(".list-cart-item");
    modal.addEventListener("click", function (event) {
        if (!cart.contains(event.target)) {
            modal.classList.remove("show-modal");
        }
    });
    if (userCurrent === null || userCurrent.cart.length === 0) {
        const cartEmpty = `
                    <div class="empty-cart"
                        style="height: 400px;display: flex;align-items: center;justify-content: center;/* flex-wrap: wrap; */flex-direction: column;">
                        <img src="../static/img/rb_5858.png" alt="" style="height: 300px; width: 300px; display: block;">
                        <h1 style="font-size: 20px;font-weight: 500;">Rất tiếc, ban chưa chọn món!</h1>
                    </div>
                    `;
        listItemComponent.innerHTML = cartEmpty;
    }
    else {
        renderCart(userCurrent.cart);
    }
    modal.classList.add("show-modal");
    cart.classList.add("show-cart");
});

function renderItemCheckout(listItem) {
    let txtHtml = "";
    let totalPrice = 0;
    listItem.forEach(product => {
        totalPrice += product.quantity * product.price;
        txtHtml += `
                    <div class="item">
                        <span class="quantity-item">${product.quantity}x</span>
                        <span class="name-item">${product.name}</span>
                        <span class="price-item">${formatPrice(product.price)}</span>
                    </div>`;
    });
    const listItemComponent = document.querySelector(".list-details");
    listItemComponent.innerHTML = txtHtml;
    const totalAmountPayment = document.querySelector(".amount-payment");
    totalAmountPayment.innerHTML = formatPrice(totalPrice);

    const totalPricePayment = document.querySelector(".total-price-payment");
    totalPricePayment.innerHTML = formatPrice(totalPrice + 50000);


}

function renderCart(cart) {
    let cartContent = "";
        cart.forEach((product, index) => {
            cartContent += `
                    <div class="cart-item">
                        <div class="img-product">
                            <img src="${product.url}" alt="">
                        </div>
                        <div class="infor-checkout">
                            <span class="name-product-checkout">${product.name}</span>
                            <div>
                                <span>Đơn giá: </span>
                                <span class="unit-product-checkout">${product.price}</span>
                            </div>
                            <span class="quantity-product-checkout">Số lượng</span>
                            <div class="btnCustom" value="checkout-product">
                                <input type="text" class="txtCustom quantity" value="${product.quantity}" oninput="inputQuantity(this, ${index})">
                                <button class="btnCustomDesc" onclick="increaseQuantity(this, ${index})">
                                    <i class="fa-solid fa-plus"></i>
                                </button>
                                <button class="btnCustomAsc" onclick="decreaseQuantity(this, ${index})">
                                    <i class="fa-solid fa-minus"></i>
                                </button>
                            </div>
                        </div>
                        <button class="btn-delete-checkout" onclick="deleteProduct(${index})">
                            <i class="fa-regular fa-trash-can"></i>
                        </button>
                    </div>`  
        });
    const listItemComponent = document.querySelector(".list-cart-item");
    listItemComponent.innerHTML = cartContent;
    let totalPrice = 0;
    let Size=0
    cart.forEach(product => {
        Size += product.quantity;
    });
    document.getElementById("bulbleLength").textContent = Size;
    cart.forEach(product => {
        totalPrice += product.quantity * product.price;
    });
    const totalPriceComponent = document.querySelector(".total-price-cart");
    totalPriceComponent.innerHTML = formatPrice(totalPrice);
    document.getElementById("totalProduct").textContent = Size;
}

function deleteProduct(index) {
    userCurrent = JSON.parse(localStorage.getItem("userCurrent")); // Đúng key
    userCurrent.cart.splice(index, 1);
    localStorage.setItem("userCurrent", JSON.stringify(userCurrent));
    renderCart(userCurrent.cart);
}

/*--------------------- Menu -------------------------*/
function toggleDropdown(idelement) {
    const menu = document.getElementById(idelement); // Lấy phần tử dự trên ID ađược truyền vào
  
    // Kiểm tra trạng thái hiện tại của menu và thay đổi giữa 'block' và 'none'
    if (menu.style.display === "block") {
      menu.style.display = "none"; // Ẩn menu nếu đang mở
    } else {
      menu.style.display = "block"; // Hiển thị menu nếu đang ẩn
    }
  }
  function changeColorMainSportOnSelect(id) {
    let element = document.getElementById(`sport-sidebar__item${id}`);
    // Lấy tất cả các phần tử con của phần tử cha
    const classlist = document.querySelectorAll(".sport-sidebar__item.mainselected");
  
    // Đặt màu nền cho tất cả các phần tử con thành trắng
    classlist.forEach((x) => {
      x.classList.remove("mainselected");
    });
  
    // Đổi màu nền của phần tử được chọn
    element.classList.add("mainselected");
  }
  
  function changeSportTitle(element) {
    let title = element.textContent;
    let sporttitle = document.getElementById("sport-maincontent__title");
    sporttitle.textContent = title;
  }
  function displayMainSportSidebarProduct(id) {
    let title = document.getElementById('sport-maincontent__title');
    for (let i = 0; i < rootBranch.length; i++)
      if (rootBranch[i].id === id) {
        title.textContent = rootBranch[i].title;
        break;
      }
    Loc_mainCategory(id, list => {
      list = filter_arr(list);
      displayProducts(list, 1,perPage);
    });
    window.scrollTo(0, 0);
  }
  function modeFilter() {
    const listbtn = document.querySelectorAll(".filter__select-box");
    const choose = document.querySelectorAll(".filter--choose,.filter__select-box__all");
    const display = document.querySelectorAll(".sidebarlist");
    if (window.getComputedStyle(listbtn[0]).display === 'none') {
      listbtn.forEach(x => {
        x.style.display = "unset";
      });
      choose.forEach(x => {
        x.style.display = "flex";
      });
      display.forEach(x => x.style.display = "block");
    }
    else {
      listbtn.forEach(x => {
        x.style.display = "none";
      });
      choose.forEach(x => {
        x.style.display = "none";
      });
    }
  }
  function countTotalProduct() {
    let totalProduct = 0;
    let totalPrice = 0;
    let userCurrent = localStorage.getItem("userCurrent") ? JSON.parse(localStorage.getItem("userCurrent")) : null;
    userCurrent.cart.forEach(product => {
      totalProduct += product.quantity;
      totalPrice += product.quantity * product.price;
    });
    console.log(totalProduct);
    document.getElementById("totalPrice").textContent = formatPrice(totalPrice);
    document.getElementById("totalProduct").textContent = totalProduct;
  }

  function interface_cart(gia, sl, item) {
    if (!dataLoaded) {
      showNotification("Đang tải dữ liệu, vui lòng đợi...", "warning");
      return false;
    }
/*     item.forEach((lengthProduct, id) => {
      console.log(lengthProduct, "----------", id);
    }); */
    let idLogin = localStorage.getItem("idLogin") || null;
    console.log(idLogin);
    // Tìm user theo accountId
    let user = profiles.find(pro => pro.id === idLogin);
    if (!user) {
      showNotification('Không tìm thấy thông tin người dùng', 'error');
      return;
    }
    
    // Kiểm tra các thông tin bắt buộc
    if (!user.fullname || !user.phone_number) {
      showNotification('Vui lòng cập nhật thông tin cá nhân để thanh toán', 'error');
    } else {
      printThanhToan(gia, sl, item);
    }
  }