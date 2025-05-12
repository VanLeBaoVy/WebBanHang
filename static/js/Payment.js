
function callBackdata(callback) {
    fetch('../static/dvhcvn.json').then(response => {
        if (!response.ok) {
            console.log("lỗi load file dvhcvn.json");
        }
        // console.log(response.json());
        return response.json();
    }).then(data => {
        // jsonAddress = data;
        // console.log(jsonAddress);
        return callback(data);
        Tinh(data);
    }).catch(error => {
        console.log(error);
    });
}
//jsonAddress.data[1].level2s[2].level3s
function Tinh(dataAddress) {
    const tmp = document.getElementById('tinh_address');
    let index = 0;
    dataAddress.data.forEach(element => {
        tmp.innerHTML += `<option value="${index++}">${element.name}</option>`;
    });
}

function Huyen(dataAddress, index) {
    const tmp = document.getElementById('huyen_address');
    tmp.innerHTML = '<option value="" disabled selected>Quận/Huyện</option>';
    let index2 = 0;
    dataAddress.data[index].level2s.forEach(element => {
        tmp.innerHTML += `<option value="${index2++}">${element.name}</option>`;
    });
}

function Xa(dataAddress, index, index2) {
    const tmp = document.getElementById('xa_address');
    tmp.innerHTML = '<option value="" disabled selected>Phường/Xã</option>';
    let index3 = 0;
    dataAddress.data[index].level2s[index2].level3s.forEach(element => {
        tmp.innerHTML += `<option value="${index3++}">${element.name}</option>`;
    });
}

function run_address() {

    callBackdata(function (data) {
        Tinh(data);
    });

    function alo() {

        console.log(document.getElementById("tinh_address").value);
        console.log(document.getElementById("huyen_address").value);
        console.log(document.getElementById("xa_address").value);
        console.log(document.getElementById("diachi").value);

        if (document.getElementById("tinh_address").value === "") {
            showNotification("Vui lòng nhập địa chỉ", "warning");
            return;
        }
        if (document.getElementById("huyen_address").value === "") {
            showNotification("Vui lòng nhập địa chỉ", "warning");
            return;
        }
        if (document.getElementById("xa_address").value === "") {
            showNotification("Vui lòng nhập địa chỉ", "warning");
            return;
        }
        if (document.getElementById("diachi").value === "") {
            showNotification("Vui lòng nhập địa chỉ", "warning");
            return;
        }
        // showNotification("Vui lòng nhập địa chỉ", "warning");
    }

    document.getElementById("Save_Address").addEventListener("click", function () {
        alo();
    });
    document.getElementById("tinh_address").addEventListener("change", function () {
        const index = this.value;
        console.log(index);
        callBackdata(function (data) {
            Huyen(data, index);
            // alo(document.getElementById('huyen_address').value);
            document.getElementById('huyen_address').addEventListener("change", function () {
                const index2 = this.value;
                console.log(index2);
                callBackdata(function (data) {
                    Xa(data, index, index2);
                    // alo();
                    document.getElementById('xa_address').addEventListener("change", function () {
                        const index3 = this.value;
                        console.log(this.value + " " + index + " " + index2);
                        callBackdata(function (data) {
                            const diachi = document.getElementById('diachi');
                            // console.log(diachi);
                            // console.log(data.data[index].name);
                            // console.log(data.data[index].level2s[index2].name);
                            // console.log(data.data[index].level2s[index2].level3s[index3].name);
                            document.getElementById("Save_Address").addEventListener("click", function () {
                                showNotification("Đã lưu địa chỉ", "success");
                                const newAddress = diachi.value + ", " + data.data[index].name + ", " + data.data[index].level2s[index2].name + ", " + data.data[index].level2s[index2].level3s[index3].name;
                                // console.log(newAddress);
                                let customers = JSON.parse(localStorage.getItem('customers')) || [];
                                console.log("NNNNNNNNNNNN"+customers);
                                let userCurrent = localStorage.getItem("userCurrent");
                                let idLogin = userCurrent.idLogin || null;
                                let user = customers.find(customer => customer.accountId === idLogin);
                                console.log("NNNNNNNNNNNN"+user);
                                if (!user) {
                                    showNotification("Không tìm thấy người dùng trong danh sách", "error");
                                    return;
                                } else {
                                    user.address.push(newAddress);
                                    for(let i = 0; i < customers.length; i++) {
                                        if (customers[i].accountId === userCurrent.idLogin) {
                                            customers[i] = user;
                                            break;
                                        }
                                    }
                                    localStorage.setItem('customers', JSON.stringify(customers));
                                }
                                queryUserByUsername(localStorage.getItem('idLogin'), function (user) {
                                    user.address.push(newAddress);
                                    upDateUser(localStorage.getItem('idLogin'), user);
                                    thanhtoan_showaddress();
                                });
                            });
                        });
                    });
                });
                // Xa(data, index, index2);
            });
        });
        // Huyen(jsonAddress, index);
    });
}

function payCart() {
    const userJSON = localStorage.getItem('userCurrent');

    const user = JSON.parse(userJSON);
    
    const cartObject = user.cart || {};
    console.log(user.cart);
    // Chuyển object -> Map để xử lý
    const cart = new Map(Object.entries(cartObject));
    fetch('../static/connectDB/insertCart.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            cart: user.cart          
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            // Gọi xử lý giao diện
            const tmpgia = document.getElementById("totalPrice").textContent;
            const tmpsl = document.getElementById("totalProduct").textContent;
            interface_cart(tmpgia, tmpsl, cart);

            document.querySelector(".modal").classList.remove("show-modal");
            closeFormLogin();
        } else {
            alert("Lỗi khi thêm giỏ hàng: " + data.error);
        }
    })
    .catch(err => {
        console.error(err);
        alert("Đã xảy ra lỗi khi gửi dữ liệu.");
    });
  }
  
function changecontent() {

    const content = document.getElementById('phuongthuc').value;
    console.log(content);
    if (content === "ck") {
        document.getElementById('chuyenkhoan').style.display = 'block';
        document.getElementById('theVisa').style.display = 'none';
    }
    if (content === "visa") {
        document.getElementById('chuyenkhoan').style.display = 'none';
        document.getElementById('theVisa').style.display = 'block';
        thanhtoan_showcard();
    }
    if (content === "tienmat") {
        document.getElementById('chuyenkhoan').style.display = 'none';
        document.getElementById('theVisa').style.display = 'none';
    }
}


function thanhtoan__showitem(item_p, sl) {
    const content_item = `
            <div class="thanhtoan-item__product">
                <div class="thanhtoan-item__product__inforPr">
                    <img class="thanhtoan-item__product__img" src="${item_p.url}" alt="">
                    <div class="thanhtoan-item__product__name">${item_p.name}</div>
                </div>
                <div class="thanhtoan-item__product__price">${item_p.price}đ</div>
                <div class="thanhtoan-item__product__soluong">${sl}</div>
                <div class="thanhtoan-item__product__thanhtien">${item_p.price * sl}đ</div>
            </div>
    `;

    document.getElementById("thanhtoan__listProduct").innerHTML += content_item;
}


function thanhtoan__showlist(key, val) {
/*     console.log("item: ", key);
    console.log("value: ", val); */
    thanhtoan__showitem(val, val.quantity);
}

// mở popop thêm địa chỉ
function show__address() {
    document.getElementById('address_popup-thanhtoan').style.display = 'block';
    run_address();
}

function none__address() {
    document.getElementById('address_popup-thanhtoan').style.display = 'none';
}

function SaveCard() {
    // Lấy giá trị từ các trường nhập liệu dựa trên id
    const cardNumber = document.getElementById('IDsothe');
    const expiryDate = document.getElementById('IDdate');
    const cvv = document.getElementById('IDcvv');
    const cardHolderName = document.getElementById('IDname');

    // Kiểm tra hợp lệ cơ bản
    if (!cardNumber.value.trim()){
        showNotification("Vui lòng nhập số thẻ", "warning");
        cardNumber.focus();
        return;
    }
    if (!expiryDate.value.trim()){
        showNotification("Vui lòng nhập ngày hết hạn", "warning");
        expiryDate.focus();
        return;
    }
    if (!cvv.value.trim()){
        showNotification("Vui lòng nhập mã CVV", "warning");
        cvv.focus();
        return;
    }
    if (!cardHolderName.value.trim()){
        showNotification("Vui lòng nhập tên chủ thẻ", "warning");
        cardHolderName.focus();
        return;
    }

    // Tạo đối tượng lưu thông tin
    const cardDetails = {
        cardNumber: cardNumber.value.trim(),
        expiryDate: expiryDate.value.trim(),
        cvv: cvv.value.trim(),
        cardHolderName: cardHolderName.value.trim()
    };

    // In đối tượng ra console
    console.log("Thông tin thẻ:", cardDetails);

    // Lưu thông tin thẻ vào cơ sở dữ liệu
    localStorage.getItem('idLogin'), function (user) {
        if (!Array.isArray(user.cards)) {
            user.cards = [];
        }
        user.cards.push(cardDetails);
        upDateUser(localStorage.getItem('idLogin'), user);
        thanhtoan_showcard();
    };

    // Thông báo thành công
    showNotification("Thêm thẻ thành công", "success");
}
















function contentInfor() {
    let customers = JSON.parse(localStorage.getItem('customers')) || []; 
    let userCurrent = []; 
    userCurrent = localStorage.getItem("userCurrent") 
        ? JSON.parse(localStorage.getItem("userCurrent")) 
        : null;
    let idLogin = userCurrent.idLogin || null;
    let user = customers.find(customer => customer.accountId === idLogin);
    if (!user) {
        showNotification("Không tìm thấy người dùng trong danh sách", "error");
        return;
    }
        const content = `
                <div class="inforThanhToan_Location__header" ><i class="fa-solid fa-location-dot" style="color: #00b67a"></i> <div> Địa chỉ nhận hàng</div> </div>
                <div class="thanhtoan_item__location">
                    <div>
                        <div>Họ Tên: <b>${user.name}</b></div>
                        <div style="display: flex;margin-top: 5px;">Số điện thoại:
                            <input type="text" id="phone-infor" value="${user.phoneNumber}" disabled
                            style="border: none;font-size: 1.6rem; color: #21253c ;width: 130px; font-weight: bold; ">
                            <div onclick="sua(this)">
                                <i style="font-size: 1.4rem;" class="fa-solid fa-pen"></i>
                            </div>
                        </div>
                    </div>
                    <div class="thanhtoan_item__address">
                        <div class="thanhtoan_item__address_select">
                            <div style="padding: 0 5px"> Địa chỉ nhận hàng</div>
                            <div style="margin-top: 5px">
                                <select id="AddressThanhToan">
                                </select>
                            </div>
                        </div>
                        <div class="thanhtoan_item__address_add" onclick="show__address()">Thêm địa chỉ</div>
                    </div>
                </div>`
            ;
        document.getElementById("infor-thanhtoan").innerHTML = content;
        thanhtoan_showaddress();
    }

function thanhtoan_showaddress(){
    const address1 = document.getElementById('AddressThanhToan');
    address1.innerHTML = '';
    console.log('showaddress', address1);
    let customers = JSON.parse(localStorage.getItem('customers')) || []; 
    let userCurrent = localStorage.getItem("userCurrent") 
        ? JSON.parse(localStorage.getItem("userCurrent")) 
        : null;

    if (!userCurrent) {
        showNotification("Không tìm thấy thông tin người dùng", "error");
        return;
    }
    let idLogin = userCurrent.idLogin || null;
    let user = customers.find(customer => customer.accountId === idLogin);
    if (!user) {
        showNotification("Không tìm thấy người dùng trong danh sách", "error");
        return;
    }
	console.log('showaddress', user.address.length);
	if (Array.isArray(user.address)) {
		user.address.forEach((item, index) => {
			address1.innerHTML += `<option value="${index}">${item}</option>`;
		});
	}
}

function thanhtoan_showcard(){
    const card1 = document.getElementById('visaList');
    card1.innerHTML = '';
    localStorage.getItem('idLogin'), (user) => {
        if (Array.isArray(user.cards)) {
            user.cards.forEach((item, index) => {
                // console.log('showcard', item);
                // card1.innerHTML += `<option value="${index}">${item.cardNumber}</option>`;
                const content = `
                <div style="display: flex; align-items: center;">
                    <input type="radio" name="visa" id="visa_${index}" value="${index}">
                    <label for="visa1" style="margin-left: 5px;">${item.cardHolderName} ${item.cardNumber}</label>
                </div>`;
                document.getElementById('visaList').innerHTML += content;
            });
        }
    };
}



// / thnah toán 
function printThanhToan(gia, sl, item) {
/*     console.log("printThanhToan"); */
    const content = `
    <div id="thanhtoan">
        <div class="grid">
            <div class= "header__thanhtoan" > 
                <i style="font-size: 3.2rem; padding: 0; margin: 0;line-height: 3;" class="fa-solid fa-money-check-dollar"></i>
                <h1> THANH TOÁN</h1>
            </div>
            <div id="infor-thanhtoan" class="thanhtoan-item grid" >   
            </div>
            <div class="thanhtoan-item" style="display: flex; flex-direction: column; padding:10px 20px; font-size: 1.4rem">
                <div class="thanhtoan__listProduct__header">
                    <div class="__listProduct__header1">Sản phẩm</div>
                    <div class="__listProduct__header2">Đơn giá</div>
                    <div class="__listProduct__header3">Số lượng</div>
                    <div class="__listProduct__header4">Thành tiền</div>
                </div>
                <div id="thanhtoan__listProduct">

                </div>                
                <div class="thanhtoan-item__productTotal">
                    <div>Tổng số lượng sản phẩm (${sl}): </div>
                    <div>${parsePrice(gia)} VNĐ</div>
                </div>
            </div>
            <div class="thanhtoan-item thanhtoan_phuongthuc" style="padding: 30px 40px;">
                Phương thức thanh toán
                <select id="phuongthuc" onchange="changecontent()">
                    <option value="tienmat">Thanh toán khi nhận hàng</option>
                    <option value="ck">Chuyển Khoản</option>
                    <option value="visa">Thẻ VISA</option>
                </select>
            </div>
            
            <div class="thanhtoan-item" id="chuyenkhoan" style="display: none;">
                <span>Chuyển Khoản</span>
                <div >
                    <input type="radio" name="bank" id="mbbank" value="MbBank">
                    <label for="mbbank" style="margin-left: 5px;">MbBank 123456789</label>
                </div>
                <div >
                    <input type="radio" name="bank" id="tpbank" value="TpBank">
                    <label for="tpbank" style="margin-left: 5px;">TpBank 123456789</label>
                </div>
                <div >
                    <input type="radio" name="bank" id="taobank" value="TaoBank">
                    <label for="taobank" style="margin-left: 5px;">TaoBank 123456789</label>
                </div>
            </div>
            <div class="thanhtoan-item" id="theVisa" style="display: none;">
                Thẻ VISA
                <i class="fa-brands fa-cc-mastercard"></i>
                <i class="fa-brands fa-cc-visa"></i>
                <div id="visaList"></div>
                <!-- <button>Thêm</button> -->
                <button onclick="show()">+</button>
            </div>
            <div class="thanhtoan-item thanhtoan__dathang">
                <div>Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo <span style="color: #00b67a; margin-left: 5px; cursor: pointer">  Điều khoản SPORT SHOP</span></div>
                <button id="thanhtoanSubmit" class="submit__btn">Đặt hàng</button>
            </div>
            <!--  -->

            <div id="address_popup-thanhtoan">
                <!-- <div class="address_item"> -->
                <!-- <h1>Nhập thông tin địa chỉ</h1> -->
                <div style="font-size: 2rem; margin: 10px;"><b>Nhập thông tin địa chỉ</b></div>
                <input value="" id="diachi" type="text" placeholder="Địa chỉ">
                <!-- </div> -->
                <div style="display: flex;flex-direction: column;width: 100%;">
                    <div class="address_item">
                        <select name="tinh" id="tinh_address">
                            <option value="" disabled selected>Tỉnh/Thành phố</option>
                        </select>
                    </div>
                    <div class="address_item">
                        <select id="huyen_address">
                            <option value="" disabled selected>Quận/Huyện</option>
                        </select>
                    </div>
                    <div class="address_item">
                        <!-- <ul id="xa_address"></ul> -->
                        <select id="xa_address">
                            <option value="" disabled selected>Phường/Xã</option>
                        </select>
                    </div>
                </div>
                <div style="display: flex;justify-content: right;">
                    <!-- <div style="flex: 1;"></div> -->
                    <div >
                        <button onclick="none__address()" style="border: 1px solid black; height: 25px;width: 70px;border-radius: 10px;">Trở lại</button>
                        <button id="Save_Address" style="border: 1px solid black; height: 25px;width: 70px;border-radius: 10px;background-color: brown;">Lưu</button>
                    </div>
                </div>
            </div>

            <!-- visa -->
            <div id="popup-addVisa">
                <div>Thêm Thẻ Tín dụng/Ghi nợ</div>
                <div style="border: 1px solid green;padding: 12px;background:#f7fffe;margin: 10px 0px;">
                    <div style="display: flex;">
                        <div style="padding-right:10px;"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M18.3967 3.16068C18.6982 3.25569 18.8995 3.44565 18.8995 3.73051H18.8995C18.8995 3.73848 18.9023 3.76656 18.907 3.81329C18.9585 4.32277 19.234 7.04877 18.4974 10.0938C17.9946 12.0883 17.0897 13.7978 15.9835 15.2221C14.5755 16.9317 12.665 18.1666 10.3521 18.9263C10.0505 19.0212 9.84935 19.0212 9.64811 18.9263C7.33535 18.1664 5.42467 16.9317 4.01674 15.2221C2.81003 13.7978 2.00547 12.0883 1.50272 10.0938C0.765904 7.04916 1.04149 4.32328 1.09304 3.81341C1.09777 3.76661 1.10062 3.73848 1.10062 3.73049C1.201 3.44554 1.30161 3.25559 1.60334 3.16068L9.54758 1.07127C9.74871 0.976243 10.1508 0.976243 10.4527 1.07127L18.3967 3.16068ZM9.95022 17.5966C13.671 16.4569 16.0842 13.7975 17.0899 9.80867L17.0899 9.80869C17.6933 7.43454 17.5927 5.15512 17.4923 4.2053L9.95022 2.21094L2.40832 4.2053C2.30781 5.15512 2.20719 7.33941 2.81055 9.80867C3.81611 13.7975 6.22951 16.3618 9.95022 17.5966Z"
                                    fill="#30B566"></path>
                                <path d="M6 8.92308L8.69238 11.6413C8.88802 11.8389 9.20722 11.8389 9.40286 11.6413L14 7"
                                    stroke="#30B566" stroke-width="1.5"></path>
                            </svg>
                        </div>
                        <div class="">
                            <div>
                                <div style="font-size: 1.6rem;padding-bottom: 5px;">Thông tin thẻ của bạn được bảo vệ.</div>
                                <div style="font-size: 1.4rem;color: rgba(0, 0, 0, 0.5);">Chúng tôi hợp tác với các đơn vị
                                    cung cấp dịch vụ thanh toán uy tín để
                                    đảm bảo thông tin thẻ của bạn được an toàn và bảo mật tuyệt đối. SPORT SHOP sẽ
                                    không có quyền truy cập vào thông tin thẻ của bạn.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div style="display: flex;justify-content: space-between;color: rgba(0, 0, 0, 0.5);">
                        Chi tiết thẻ
                        <div>
                            <i class="fa-brands fa-cc-mastercard"></i>
                            <i class="fa-brands fa-cc-visa"></i>
                        </div>
                    </div>
                    <div>
                        <div class="from-input">
                            <div class="buton-input">
                                <input type="number" id="IDsothe" onchange="test(this)">
                                <label for="" class="input-label-item">Số thẻ</label>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <div style="flex: 2;">
                            <div class="from-input">
                                <div class="buton-input">
                                    <input type="text" id="IDdate" onchange="test(this)">
                                    <label for="" class="input-label-item">Ngày hết hạn(MM/YY)</label>
                                </div>
                            </div>
                        </div>
                        <div style="flex: 1;">
                            <div class="from-input">
                                <div class="buton-input">
                                    <input type="password" id="IDcvv" onchange="test(this)">
                                    <label for="" class="input-label-item">Mã CVV</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="from-input">
                            <div class="buton-input">
                                <input type="text" id="IDname" onchange="test(this)">
                                <label for="" class="input-label-item">Họ và tên chủ thẻ</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div style="display: flex;justify-content: end;margin-top: 20px;">
                        <button onclick="none_add()"
                            style="margin: 10px;width: 70px;height: 30px;border: 1px solid rgba(0, 0, 0, 0.3);">Trở
                            lại</button>
                        <button onclick="SaveCard()"
                            style="margin: 10px;width: 70px;height: 30px;border: 1px solid rgba(0, 0, 0, 0.3);background-color: coral;">Thêm</button>
                    </div>
                </div>
            </div>
            <div id="popup_thanhtoan-index"></div>
        </div>
        `
        ;
    document.getElementById("container").innerHTML = content;
    contentInfor();
    item.forEach((val, key) => {
    /*     console.log("item: ", key, val); */
        thanhtoan__showlist(key, val);
    });
    document.getElementById('thanhtoanSubmit').addEventListener('click', function () {
        submitthanhtoan(item, gia,sl);
    });
}

// printThanhToan();

function buyNow(event, idProduct) {
    window.scrollTo(0, 0);
    event.stopPropagation();
    const idLogin = localStorage.getItem('idLogin');
    if (idLogin === null) {
        showNotification("Vui lòng đăng nhập để mua hàng", "warning");
        return;
    }

    fetch('../static/connectDB/getProductById.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: idProduct })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            const item = data.product;
            const productCheckout = {};
            productCheckout.name = item.name;
            productCheckout.quantity = 1;
            // alert(document.getElementById("quantity").value);
            // productCheckout.price = parsePrice(document.getElementById("product-price").textContent);
            productCheckout.price = parsePrice(document.getElementById("product-price").textContent);
            productCheckout.url = item.url;
            productCheckout.product_id = item.id;
            productCheckout.profile_id = idLogin;
            let size = parseInt(document.getElementById('size-product-details').value);
            fetch('../static/connectDB/getSizeId.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                product_id: item.id,
                size_number: size
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                productCheckout.size = data.size_id;
                // Tiếp tục thêm sản phẩm vào giỏ như ban đầu
                const findProduct = userCurrent.cart.find(p => p.name === productCheckout.name && p.size === data.size_id);
                if (findProduct !== undefined) {
                    findProduct.quantity += productCheckout.quantity;
                } else {
                    userCurrent.cart.push(productCheckout);
                }

                alert(`Đã thêm ${productCheckout.quantity} x ${productCheckout.name} vào giỏ hàng.`);
                localStorage.setItem("userCurrent", JSON.stringify(userCurrent));

                // Cập nhật số lượng hiển thị
                userCurrent = JSON.parse(localStorage.getItem("userCurrent"));
                let totalProduct = 0;
                userCurrent.cart.forEach(product => {
                totalProduct += product.quantity;
                });
                document.getElementById("bulbleLength").textContent = totalProduct;
            } else {
                alert("Lỗi khi tìm size: " + data.error);
            }
            interface_cart(item.sale_price, 1, cart); // hoặc item.price nếu không có sale
        } else {
            showNotification(data.error || "Không tìm thấy sản phẩm", "error");
        }
    })
    .catch(() => {
        showNotification("Lỗi khi truy vấn sản phẩm", "error");
    });
}
    

// visa thanh toán hóa đơn bla bla 
function thanhtoanvisa(){
    const content = `
    <div id="popup_thanhtoan">
        <div>
            <div style="display: flex;justify-content: space-around;">
                <!-- <div>Thanh toán thành công</div> -->
                <div>
                    <i style="font-size: 5rem;color: green;margin: 10px;" class="fa-solid fa-check"></i>
                 </div>
                <div style="margin: 10px;">Đơn hàng của bạn đã được thanh toán thành công. Chúng tôi sẽ gửi thông tin đơn hàng đến email của bạn
                    trong thời gian sớm nhất.</div>
            </div>
            <div style="display: flex;justify-content: flex-end;">
                <div class="sauthanhtoan" onclick="thanhtoan_interface__Home()" style="padding: 10px;">Trang chủ</div>
                <div class="sauthanhtoan" onclick="thanhtoan_interface__order()" style="padding: 10px;">Xem lại hóa đơn</div>
            </div>
        </div>
    </div>
    `;
    document.getElementById("popup_thanhtoan-index").innerHTML = content;
}

// chuyen khoản  thôi nào
function chuyenkhoanthoinao(){
    const content = `
    <div id="popup_thanhtoan">
            <div>
                <div class="d-flex-center"><B>Quét mã QR hoặc nhập nội dung chuyển khoản</B></div>
                <div class="d-flex-center">
                    <img src="../static/img/qrcode_chrome.png" alt="" style="width: 100%">
                </div>
                <div >
                    <div class="popup_thanhtoan-item">
                        <div>Họ và tên: </div>
                        <div>Huỳnh Thanh Tiến</div>
                    </div>
                    <div class="popup_thanhtoan-item">
                        <div>Tên ngân hàng: </div>
                        <div>Mbbank</div>
                    </div>
                    <div class="popup_thanhtoan-item">
                        <div>Số tài khoản: </div>
                        <div>4890357890745</div>
                    </div>
                    <div class="popup_thanhtoan-item">
                        <div>Nội dung chuyển khoản: </div>
                        <div>904583435908</div>
                    </div>
                    <div class="popup_thanhtoan-item">
                        <div>Số tiền: </div>
                        <div>90834298043 VNĐ</div>
                    </div>
                </div>
            </div>
    </div>`;
    document.getElementById("popup_thanhtoan-index").innerHTML = content;
    setTimeout(function() {
        thanhtoanvisa();
    }, 5000);
}
// intetface home
function thanhtoan_interface__Home(){
    innerHomeContent();
};

function thanhtoan_interface__order(){
    innerPurchaseHistory(); 
}



function sua(element) {
    // Tìm thẻ input gần nhất
    console.log(element.parentElement);
    const input = element.previousElementSibling;
    // Bỏ disabled để cho phép chỉnh sửa
    input.disabled = false;
    input.addEventListener('change', function () {
        checkFrm(input, 'Số điện thoại không được rỗng', 'Số điện thoại');
        if (isNaN(input.value)) {
            input.classList.add('error');
            input.setAttribute('placeholder', 'Vui lòng nhập số');
            input.value = '';
            input.focus();
            return false;
        }
        if (input.value.toString().length !== 10) {
            input.classList.add('error');
            input.setAttribute('placeholder', 'Vui lòng nhập số điện thoại 10 số');
            input.value = '';
            input.focus();
            return false;
        }
    });
    // Thay đổi kiểu viền để người dùng biết input đang được chỉnh sửa
    input.style.border = "1px solid #000";

    // Đặt con trỏ vào input
    input.focus();

    // Lắng nghe sự kiện khi người dùng nhấn phím Enter hoặc Esc
    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            // Lưu giá trị và khóa input lại
            input.disabled = true;
            input.style.border = "none";
        } else if (event.key === "Escape") {
            // Hủy chỉnh sửa, khôi phục giá trị cũ và khóa input
            input.value = input.defaultValue;
            input.disabled = true;
            input.style.border = "none";
        }
    });
}
function none_add() {
    document.getElementById('popup-addVisa').style.display = 'none';
};
function show() {
    document.getElementById('popup-addVisa').style.display = 'block';
    // const cardHolderName = document.getElementById('IDname');
    localStorage.getItem('idLogin'), function (user) {
        document.getElementById('IDname').value = user.fullname ;
        test(document.getElementById('IDname'));
        // document.getElementById('IDname').changecontent();
    };
};

function test(e) {
    const label = e.nextElementSibling;
    if (e.value) {
        label.classList = 'has-value';
    } else {
        label.classList = 'input-label-item';
    }
}

function submitthanhtoan(item, gia,sl) {
    console.log("submitthanhtoan");    
    // const card = document.getElementById('visaList').value;
    // const selectedRadio = document.querySelector('input[name="visa"]:checked').value;
    let chitietbank;

    if (phuongthuc === "visa") {
        if (document.querySelector('input[name="visa"]:checked') === null) {
            showNotification("Vui lòng chọn thẻ", "warning");
            return;
        }
        const index = document.querySelector('input[name="visa"]:checked').value;
        chitietbank = index;
        console.log(chitietbank);
    } else if (phuongthuc === "ck") {
        if (document.querySelector('input[name="bank"]:checked') === null) {
            showNotification("Vui lòng chọn ngân hàng", "warning");
            return;
        }
        chitietbank = document.querySelector('input[name="bank"]:checked').value;
        console.log(chitietbank);
    } else if (phuongthuc === "tienmat") {
        chitietbank = "shipCOD";
    }
    

    innerPurchaseSumary(gia, sl, item,chitietbank);

    
}
order = [];

function themDonHangVaoDB(item, gia, chitietbank) {
    const address = document.getElementById('AddressThanhToan').value;
    const phuongthuc = document.getElementById('phuongthuc').value;
    let phone = document.getElementById('phone-infor').value;

    localStorage.getItem('idLogin'), function (user) {
        // Tạo đối tượng hóa đơn mới lưu ở trong cơ sở dữ liệu của acccout 
        // tổng tiền
        if (phuongthuc === "visa") {
            chitietbank = user.cards[chitietbank];
        }

        Object = {
            id: Date.now(),
            name: user.fullname,
            phone: phone,
            productID: item,
            date: new Date().toLocaleString(),
            status: "Chờ xác nhận",
            address: user.address[address],
            phuongthuc: phuongthuc,
            chitietbank: chitietbank,
            totalAmount: gia
        };
        console.log(Object);
        // Thêm hóa đơn vào cơ sở dữ liệu
        if (!Array.isArray(user.orders)) {
            orders = [];
        }
        orders.push(Object);
        localStorage.setItem('orders', JSON.stringify(orders));
        console.log(user);
        upDateUser(localStorage.getItem('idLogin'), user);
        if (phuongthuc === "ck") {
            simulateLoading(1000);
            // chờ 1s
            setTimeout(() => {
                chuyenkhoanthoinao();
            }, 900);
            // chuyenkhoanthoinao();
            return;
        }
        if (phuongthuc === "visa" || phuongthuc === "tienmat") {
            simulateLoading(1000);
            setTimeout(() => {
                thanhtoanvisa();
            }, 900);
            // thanhtoanvisa();
        }
        showNotification("Đặt hàng thành công", "success");
        localStorage.getItem('idLogin'), function (user) {
            let userCurrent = JSON.parse(localStorage.getItem("userCurrent"));
            userCurrent.deleteCart(item);
              upDateUser(user.accountId, user);
              document.getElementById("bulbleLength").textContent = user.cart.size;
            };
    }; 
}


function innerPurchaseSumary(gia, sl, item,chitietbank) {

    let puchase_sumary = document.getElementById("puchase_sumary");
    puchase_sumary.style.display = "flex";
    puchase_sumary.innerHTML = `
        <div class="grid">
            <div class= "header__thanhtoan" > 
                <i style="font-size: 3.2rem; padding: 0; margin: 0;line-height: 3;" class="fa-solid fa-money-check-dollar"></i>
                <h1>TÓM TẮT THANH TOÁN</h1>
            </div>
            <div id="infor-thanhtoanSumary" class="thanhtoan-item grid" >
            </div>
            <div class="thanhtoan-item" style="display: flex; flex-direction: column; padding:10px 20px; font-size: 1.4rem">
                <div class="thanhtoan__listProduct__header">
                    <div class="__listProduct__header1">Sản phẩm</div>
                    <div class="__listProduct__header2">Đơn giá</div>
                    <div class="__listProduct__header3">Số lượng</div>
                    <div class="__listProduct__header4">Thành tiền</div>
                </div>
                <div id="thanhtoan__listProductSumary">

                </div>                
                <div class="thanhtoan-item__productTotal">
                    <div>Tổng số lượng sản phẩm (${sl}): </div>
                    <div>${formatPrice(gia)} VNĐ</div>
                </div>
            </div>
            <div class="thanhtoan-item thanhtoan_phuongthuc" style="padding: 30px 40px;">
                Phương thức thanh toán
                <select id="phuongthucSumary" >
                    <option value="tienmat">Thanh toán khi nhận hàng</option>
                    <option value="ck">Chuyển Khoản</option>
                    <option value="visa">Thẻ VISA</option>
                </select>
            </div>
            
            <div class="thanhtoan-item" id="chuyenkhoanSumary" style="display: none;">
                <span>Chuyển Khoản</span>
                <div >
                    <input type="radio" name="bankSumary" id="mbbankSumary" value="MbBank">
                    <label for="mbbankSumary" style="margin-left: 5px;">MbBank 123456789</label>
                </div>
                <div >
                    <input type="radio" name="bankSumary" id="tpbankSumary" value="TpBank">
                    <label for="tpbankSumary" style="margin-left: 5px;">TpBank 123456789</label>
                </div>
                <div >
                    <input type="radio" name="bankSumary" id="taobankSumary" value="TaoBank">
                    <label for="taobankSumary" style="margin-left: 5px;">TaoBank 123456789</label>
                </div>
            </div>
            <div class="thanhtoan-item" id="theVisaSumary" style="display: none;">
                Thẻ VISA
                <i class="fa-brands fa-cc-mastercard"></i>
                <i class="fa-brands fa-cc-visa"></i>
                <div id="visaListSumary"></div>
            </div>
            <div class="thanhtoan-item thanhtoan__dathang">
                <div>Nhấn "Xác nhận" để hoàn thành quá trình<span style="color: #00b67a; margin-left: 5px; cursor: pointer"> Đặt hàng</span></div>

                <div>
                  <button id="quaylaibtn" class="cancel__btn" onclick="displayNone('puchase_sumary')">Quay lại</button>
                  <button id="xacNhanMua" class="submit__btn ">Xác nhận</button>
                </div> 
            </div>
        </div>
    `; 
    contentInforPurchaseSumary();
    
    item.forEach((val, key) => {
        console.log("item: ", key);
        console.log("value: ", val);
        thanhtoan__showitemSumary(val, val.quantity);
    });
    const address = document.getElementById('AddressThanhToan').value;
    let phone = document.getElementById('phone-infor').value;
    const phuongthuc = document.getElementById('phuongthuc').value;
    const ptSumary = document.getElementById('phuongthucSumary');
    ptSumary.value = phuongthuc;
    ptSumary.disabled = true;

    changecontentSumary();


    if (phuongthuc === "ck") {
        const ptchoose = document.querySelector('input[name="bank"]:checked').value;
        let listVisa = document.querySelectorAll('input[name="bankSumary"]');
        listVisa.forEach(x => {
            console.log(x.value);
            if (x.value === ptchoose){ 
                x.checked = true;
            }
            else x.parentElement.style.display = "none";

        });

    };

    document.getElementById('xacNhanMua').addEventListener('click', function () {
        displayNone("puchase_sumary");
        localStorage.getItem('idLogin'), function (user) {
            // Tạo đối tượng hóa đơn mới lưu ở trong cơ sở dữ liệu của acccout 
            // tổng tiền
            if (phuongthuc === "visa") {
                chitietbank = user.cards[chitietbank];
            }
            // if (phone === undefined) {
            //     phone = user.phone;
            // }
            Object = {
                id: Date.now(),
                name: user.fullname,
                phone: phone,
                productID: item,
                date: new Date().toLocaleString(),
                status: "Chờ xác nhận",
                address: user.address[address],
                phuongthuc: phuongthuc,
                chitietbank: chitietbank,
                totalAmount: gia
            };
            console.log(Object);
            // Thêm hóa đơn vào cơ sở dữ liệu
            if (!Array.isArray(orders)) {
                orders = [];
            }
            orders.push(Object);
            console.log(user);
            if (phuongthuc === "ck") {
                simulateLoading(1000);
                // chờ 1s
                setTimeout(() => {
                    chuyenkhoanthoinao();
                }, 900);
                // chuyenkhoanthoinao();
                return;
            }
            if (phuongthuc === "visa" || phuongthuc === "tienmat") {
                simulateLoading(1000);
                setTimeout(() => {
                    thanhtoanvisa();
                }, 900);
                // thanhtoanvisa();
            }
            showNotification("Đặt hàng thành công", "success");
            localStorage.getItem('idLogin'), function (user) {
                item.forEach((value, key) => {
                    user.cart.delete(key);
                    });
                    upDateUser(user.username, user);
                    document.getElementById("bulbleLength").textContent = user.cart.size;
                };
        }; 
    });
}

function thanhtoan__showitemSumary(item_p, sl) {
    const content_item = `
            <div class="thanhtoan-item__product">
                <div class="thanhtoan-item__product__inforPr">
                    <img class="thanhtoan-item__product__img" src="${item_p.url}" alt="">
                    <div class="thanhtoan-item__product__name">${item_p.name}</div>
                </div>
                <div class="thanhtoan-item__product__price">${formatPrice(item_p.price)}đ</div>
                <div class="thanhtoan-item__product__soluong">${sl}</div>
                <div class="thanhtoan-item__product__thanhtien">${formatPrice(item_p.price * sl)}đ</div>
            </div>
    `;

    document.getElementById("thanhtoan__listProductSumary").innerHTML += content_item;
}

function displayNone(idelement) {
    document.getElementById(idelement).style.display = "none";
}

function contentInforPurchaseSumary() {
    localStorage.getItem('idLogin'), function (user) {

        const content = `
                <div class="inforThanhToan_Location__header" ><i class="fa-solid fa-location-dot" style="color: #00b67a"></i> <div> Địa chỉ nhận hàng</div> </div>
                <div class="thanhtoan_item__location">
                    <div>
                        <div>Họ Tên: <b>${user.fullname}</b></div>
                        <div style="display: flex;margin-top: 5px;">Số điện thoại:
                            <input type="text" id="phone-infor" value="${user.phone}" disabled
                            style="border: none;font-size: 1.6rem; color: #21253c ;width: 130px; font-weight: bold; ">
                        </div>
                    </div>
                    <div class="thanhtoan_item__address">
                        <div class="thanhtoan_item__address_select">
                            <div style="padding: 0 5px"> Địa chỉ nhận hàng</div>
                            <div style="margin-top: 5px">
                                <select id="AddressThanhToanSumary">
                                </select>
                            </div>
                        </div>
                    </div>
                </div>`
            ;
        document.getElementById("infor-thanhtoanSumary").innerHTML = content;
        thanhtoan_showaddressPurchaseSumary();
    };
}

function thanhtoan_showaddressPurchaseSumary(){
    const address1 = document.getElementById('AddressThanhToanSumary');
    address1.innerHTML = '';
    console.log('showaddress', address1);
    localStorage.getItem('idLogin'), () => {
        let customer = localStorage.getItem('userCurrent') || [];
        let user = customer.find((item) => item.accountId === localStorage.getItem('idLogin'));
		console.log('showaddress', user.address.length);
		if (Array.isArray(user.address)) {
			user.address.forEach((item, index) => {
				address1.innerHTML += `<option value="${index}">${item}</option>`;
			});
		}
        // Hoặc có thể đặt trực tiếp giá trị của <select>
        address1.value = document.getElementById('AddressThanhToan').value;
        address1.disabled = true; // Vô hiệu hóa <select>
	};
}


function changecontentSumary() {

    const content = document.getElementById('phuongthucSumary').value;
    console.log(content);
    if (content === "ck") {
        document.getElementById('chuyenkhoanSumary').style.display = 'block';
        document.getElementById('theVisaSumary').style.display = 'none';
    }
    if (content === "visa") {
        document.getElementById('chuyenkhoanSumary').style.display = 'none';
        document.getElementById('theVisaSumary').style.display = 'block';
        thanhtoan_showcardSumary();
    }
    if (content === "tienmat") {
        document.getElementById('chuyenkhoanSumary').style.display = 'none';
        document.getElementById('theVisaSumary').style.display = 'none';
    }
}

function thanhtoan_showcardSumary(){
    let card1 = document.getElementById('visaListSumary');
    card1.innerHTML = "";
    card1.appendChild(document.querySelector('input[name="visa"]:checked').parentElement);    
}
