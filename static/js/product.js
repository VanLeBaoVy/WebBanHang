let productCategories = [
    {
      productCategoryId: "PC001",
      name: "Giày Chạy Bộ",
      brand: "Nike",
      description: "Dòng giày chuyên dành cho hoạt động chạy bộ, êm ái và linh hoạt."
    },
    {
      productCategoryId: "PC002",
      name: "Giày Bóng Đá",
      brand: "Adidas",
      description: "Thiết kế đinh tán bám sân cỏ, hỗ trợ tăng tốc và đổi hướng nhanh."
    },
    {
      productCategoryId: "PC003",
      name: "Giày Bóng Rổ",
      brand: "Jordan",
      description: "Đệm khí, hỗ trợ bật nhảy và bảo vệ mắt cá dành cho vận động viên bóng rổ."
    },
    {
      productCategoryId: "PC004",
      name: "Giày Tennis",
      brand: "Wilson",
      description: "Giày nhẹ, linh hoạt, có độ bền cao phù hợp cho mặt sân cứng."
    },
    {
      productCategoryId: "PC005",
      name: "Giày Thời Trang",
      brand: "Puma",
      description: "Thiết kế hiện đại, phù hợp phối đồ streetwear, dạo phố hằng ngày."
    },
    {
      productCategoryId: "PC006",
      name: "Giày Chạy Địa Hình",
      brand: "Salomon",
      description: "Chống trơn trượt, bám đường tốt, phù hợp cho đường núi và địa hình gồ ghề."
    }
  ];
  localStorage.setItem("productCategories", JSON.stringify(productCategories));
products = [
    {
      id: "P001",
      name: "Nike Air Zoom Mercurial Superfly 10 Academy TF Mad Ambition 2929000",
      url: "../static/img/giay da bong/nike/Nike Air Zoom Mercurial Superfly 10 Academy TF Mad Ambition 2929000.jpg",
      productCategoryId: "PC001",
      brand: "Nike",
      price: 2590000,
      quantity: 10,
      description: "Phiên bản giày chạy bộ với công nghệ Air Zoom mới nhất.",
      size: [36, 37, 38, 41, 42]
    },
    {
      id: "P002",
      name: "Nike Air Zoom Mercurial Superfly 10 Academy TF United 3003000",
      url: "../static/img/giay da bong/nike/Nike Air Zoom Mercurial Superfly 10 Academy TF United 3003000.jpg",
      productCategoryId: "PC001",
      brand: "Nike",
      price: 2890000,
      quantity: 12,
      description: "Đệm React êm ái, Flyknit thoáng khí, hỗ trợ chạy đường dài.",
      size: [36, 37, 38, 41, 42]
    },
    {
      id: "P003",
      name: "Nike Air Zoom Mercurial Superfly 9 Academy TF Dream Speed 8 2349000",
      url: "../static/img/giay da bong/nike/Nike Air Zoom Mercurial Superfly 9 Academy TF Dream Speed 8 2349000.jpg",
      productCategoryId: "PC001",
      brand: "Nike",
      price: 2100000,
      quantity: 8,
      description: "Thiết kế vân 3D kiểm soát bóng tốt, phù hợp sân cỏ tự nhiên.",
      size: [36, 37, 38, 41, 42]
    },
    {
      id: "P004",
      name: "Nike Air Zoom Mercurial Vapor 16 Academy TF Shadow 2629000",
      url: "../static/img/giay da bong/nike/Nike Air Zoom Mercurial Vapor 16 Academy TF Shadow 2629000.jpg",
      productCategoryId: "PC001",
      brand: "Nike",
      price: 3200000,
      quantity: 5,
      description: "Trọng lượng siêu nhẹ, hỗ trợ tăng tốc tối đa trên sân cỏ.",
      size: [36, 37, 38, 41, 42]
    },
    {
      id: "P005",
      name: "Nike Mercurial Vapor 15 Club TF Mad Ready 1669000.jpg",
      url: "../static/img/giay da bong/nike/Nike Mercurial Vapor 15 Club TF Mad Ready 1669000.jpg",
      productCategoryId: "PC001",
      brand: "Nike",
      price: 3500000,
      quantity: 6,
      description: "Thiết kế cổ điển, da cao cấp, đệm khí êm ái cho bóng rổ.",
      size: [36, 37, 38, 41, 42]
    },
    {
      id: "P006",
      name: "Nike Phantom GT Pro TF Spectrum 3519000",
      url: "../static/img/giay da bong/nike/Nike Phantom GT Pro TF Spectrum 3519000.jpg",
      productCategoryId: "PC001",
      brand: "Nike",
      price: 2900000,
      quantity: 9,
      description: "Sử dụng đệm React, hỗ trợ bật nhảy, phù hợp lối chơi linh hoạt.",
      size: [36, 37, 38, 41, 42]
    },
    {
      id: "P007",
      name: "Nike Phantom GX Academy DF TF Peak Ready 2929000",
      url: "../static/img/giay da bong/nike/Nike Phantom GX Academy DF TF Peak Ready 2929000.jpg",
      productCategoryId: "PC001",
      brand: "Nike",
      price: 2400000,
      quantity: 4,
      description: "Công nghệ 4D Support Chassis, tăng độ ổn định khi di chuyển trên sân.",
      size: [36, 37, 38, 41, 42]
    },
    {
      id: "P008",
      name: "Nike Phantom GX II Pro TF Mad Voltage 4109000",
      url: "../static/img/giay da bong/nike/Nike Phantom GX II Pro TF Mad Voltage 4109000.jpg",
      productCategoryId: "PC001",
      brand: "Nike",
      price: 1900000,
      quantity: 15,
      description: "Thiết kế da lộn cổ điển, phù hợp phối đồ street style.",
      size: [36, 37, 38, 41, 42]
    },
    {
      id: "P009",
      name: "Nike Tiempo Legend 10 Pro TF Mad Ambition 4103000.jpg",
      url: "../static/img/giay da bong/nike/Nike Tiempo Legend 10 Pro TF Mad Ambition 4103000.jpg",
      productCategoryId: "PC001",
      brand: "Nike",
      price: 2100000,
      quantity: 7,
      description: "Dáng chunky hiện đại, đế cao su bền, thời trang và năng động.",
      size: [36, 37, 38, 41, 42]
    },
    {
      id: "P010",
      name: "Nike Tiempo Legend 10 Pro TF Mad Voltage 4109000",
      url: "../static/img/giay da bong/nike/Nike Tiempo Legend 10 Pro TF Mad Voltage 4109000.jpg",
      productCategoryId: "PC001",
      brand: "Nike",
      price: 3300000,
      quantity: 3,
      description: "Đế vấu lớn, bám đường tốt, dành cho chạy địa hình và trail.",
      size: [36, 37, 38, 41, 42]
    }
  ];
  localStorage.setItem("products", JSON.stringify(products));
let listProduct = []; 
listProduct = products;
let pageCurrent = 1;
let totalPage = 1;
const perPage = 5;

window.onload = loadDataProduct();

function loadDataProduct() {
    totalPage = Math.ceil(listProduct.length / perPage);
    //renderBtnPage();
    renderProducts(listProduct);
    let Size=0
    let idLogin = localStorage.getItem("idLogin") || null;
    let userCurrent = localStorage.getItem("userCurrent") ? JSON.parse(localStorage.getItem("userCurrent")) : null;
    if(userCurrent !== null && idLogin !== null) {
      userCurrent.cart.forEach(product => {
        Size += product.quantity;
      });
    }
    document.getElementById("bulbleLength").textContent = Size;
}  

function formatPrice(price) {
    return price.toLocaleString('vi-VN') + " ₫";
}

// Hàm hiển thị sản phẩm
function renderProducts(productsToRender) {
    const productContainer = document.getElementsByClassName("sport-maincontent__show-product")[0];
    productContainer.innerHTML = "";
    let txtHtml = "";
    let start = (pageCurrent - 1) * perPage;
    let end = (pageCurrent - 1) * perPage + perPage;
    if (end > productsToRender.length) { 
        end = productsToRender.length;
    }
    for (let i = start; i < end; i++) {
        const product = productsToRender[i];
        txtHtml += `<div class="product-item" onclick="openProductDetail(${i})">
            <div class="img-product">
                <img src="${product.url}" alt="${product.name}">
            </div>
            <div class="info-product">
            <h3 class="name-product">${product.name}</h3>
                <div class="bottom-product">
                    <h3 class="price-product">${formatPrice(product.price)}</h3>
                    <button class="btn">
                        <i class="fa-solid fa-cart-plus"></i> Thêm
                    </button>
                </div>
            </div>
        </div>`;
    }
    productContainer.innerHTML = txtHtml;
    renderPagination(listProduct);
}
function renderPagination(productsToRender) {
    const paginationContainer = document.querySelector(".pagination");
    let txt = "";

    for (let i = 1; i <= totalPage; i++) {
        txt += `<button class="page-btn ${i === pageCurrent ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }

    paginationContainer.innerHTML = txt;

    // Gắn sự kiện chuyển trang
    const pageButtons = document.querySelectorAll(".page-btn");
    pageButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            pageCurrent = parseInt(this.getAttribute("data-page"));
            renderProducts(productsToRender);
        });
    });
}

// Hàm mở form chi tiết sản phẩm
function openProductDetail(index) {
    const product = listProduct[index];
    if (product.quantity === 0) { 
        alert("Sản phẩm đã hết hàng.");
        return;
    };
    const txt = `
        <div class="product-detail-content"
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
    document.getElementById("container_infor").style.display = "flex";
    document.getElementById("container").style.display = "none";
    const basePrice = product.price;
    updateTotalPrice(basePrice);
``
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
    if (userCurrent.idLogin === null) {
        alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
        return;
    }
    else if (account.status === "Bị khoá") { 
        alert("Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên.");
        return;
    }
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
  // function interface_cart(gia, sl, item) {
  //   item.forEach((lengthProduct, id) => {
  //     console.log(lengthProduct, "----------", id);
  //   });
  //   let idLogin = localStorage.getItem("idLogin") || null;
  //   let customers = [];
  //   customers = JSON.parse(localStorage.getItem("customers")) || [];
  //   let user = customers.find(customer => customer.accountId === idLogin);
  //     if (user.name === null || user.name === "" || user.phoneNumber === null || user.phoneNumber === "" || user.address === null || user.address === "") {
  //       showNotification('Vui lòng cập nhật thông tin cá nhân để thanh toán', 'error');
  //     } else {
  //       printThanhToan(gia, sl, item);
  //     }
  // }
  function interface_cart(gia, sl, item) {
    if (!dataLoaded) {
      showNotification("Đang tải dữ liệu, vui lòng đợi...", "warning");
      return false;
    }
    item.forEach((lengthProduct, id) => {
      console.log(lengthProduct, "----------", id);
    });
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