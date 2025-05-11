function showNotification(message, type = 'success') {
	const container = document.getElementById('notification-container');
	const notification = document.createElement('div');

	// Tạo icon tùy theo loại thông báo
	let icon = '';
	if (type === 'success') {
		icon = `<svg class="icon" viewBox="0 0 24 24"><path d="M9 19l-7-7 1.4-1.4L9 16.2l11.6-11.6L22 6z"></path></svg>`; // Icon checkmark (success)
	} else if (type === 'error') {
		icon = `<svg class="icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"></path></svg>`; // Icon error (cross)
	} else if (type === 'info') {
		icon = `<svg class="icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"></path></svg>`; // Icon info
	} else if (type === 'warning') {
		icon = `<svg class="icon" viewBox="0 0 24 24"><path d="M1 21h22L12 2z"></path></svg>`; // Icon warning
	}

	// Tạo thông báo
	notification.className = `notification ${type}`;
	notification.innerHTML = icon + message;

	// Thêm thông báo vào container
	container.appendChild(notification);

	// Xóa thông báo sau 4 giây
	setTimeout(() => {
		notification.remove();
	}, 4000);
}


document.addEventListener('DOMContentLoaded', () => {
const getUserByUsername = (id) => {
    const user = accounts.find(account => account.id === id);
    console.log(user); 
    return user;
};

    // Kiểm tra xem đã đăng nhập hay chưa
    const idLogin = localStorage.getItem('idLogin');
    if (idLogin !== null) {
        const user = getUserByUsername(idLogin);
        if (user && user.status === 'Bị khóa') {
            logout1234();
        }
        document.getElementById('btn-login').style.display = 'none';
        document.getElementById('id-container-1234').style.display = 'block';
    } else {
        document.getElementById('btn-login').style.display = 'block';
        document.getElementById('id-container-1234').style.display = 'none';
    }
});
function showFormLogin() {
	document.getElementById('login-user-inner').style.display = "block";
}

function closeFormLogin() {
	document.getElementById('login-user-inner').style.display = "none";
}

let isPopupOpen = false; // Trạng thái popup
let isPopup1234 = false; // Trạng thái popup

function toggleFormLogin() {
	isPopupOpen = !isPopupOpen;

	if (isPopupOpen) {
		showFormLogin(); // Hiển thị popup
	} else {
		closeFormLogin(); // Đóng popup
	}
}
function toggleForm1234() {
	isPopup1234 = !isPopup1234;

	if (isPopup1234) {
		open1234(); // Hiển thị popup
	} else {
		document.getElementsByClassName('inner-1234')[0].style.display = 'none'; // Đóng popup
	}
}

document.addEventListener('click', (event) => {
	const innerLogin = document.getElementById('inner-login-user');
	if (isPopupOpen && !innerLogin.contains(event.target)) {
		toggleFormLogin(); // Đóng popup
		closeFormLogin();
	}
});
document.addEventListener('click', (event) => {
	const inner1234 = document.getElementsByClassName('inner-1234')[0];
	if (isPopup1234 && !inner1234.contains(event.target)) {
		toggleForm1234(); // Đóng popup
		inner1234.style.display = 'none';
	}
});


//Mở popup
document.getElementById('btn-login').addEventListener('click', (event) => {
	toggleFormLogin();
	event.stopPropagation();
});
document.getElementById('id-container-1234').addEventListener('click', (event) => {
	toggleForm1234();
	event.stopPropagation();
});

document.getElementById('1234-logout').addEventListener('click', () => {
	logout1234();
});
function changeIU(event) {
	event.preventDefault();
	event.stopPropagation();
	const userLogin = document.getElementById('main-login-inner-btn-login');
	const statusBtn = event.target.getAttribute('status-btn');
	if (statusBtn === 'signIn') {
		document.getElementById('item-text-p').textContent = 'Bạn chưa có tài khoản?';
		userLogin.setAttribute('status-btn', 'signUp');
		userLogin.textContent = 'Đăng Ký';
		document.getElementById('change-text-login-item').textContent = 'Đăng nhập';
		document.getElementById('inner-p-login-content-btns').textContent = 'đăng nhập';
		document.getElementById('inner-login-text-item').textContent = 'Đến với chúng tôi bạn sẽ không cảm thấy hối tiếc';
		document.querySelector('.inner-login-container').classList.remove('active');
		loginAccountUser(event, 0);
	} else {
		document.getElementById('item-text-p').textContent = 'Bạn đã có tài khoản?';
		userLogin.setAttribute('status-btn', 'signIn');
		userLogin.textContent = 'Đăng nhập';
		document.getElementById('change-text-login-item').textContent = 'Đăng ký';
		document.getElementById('inner-p-login-content-btns').textContent = 'đăng ký';
		document.getElementById('inner-login-text-item').textContent = 'Sẽ thật đáng tiết nếu bạn không đến với chúng tôi';
		document.querySelector('.inner-login-container').classList.add('active');
		loginAccountUser(event, 1);
	}
}
function loginAccountUser(event, index) {
	event.preventDefault();
	event.stopPropagation();
	if (index === 1) {
		document.getElementById('inner-from-IU').innerHTML = `
                    <form name="frmSignIn" onsubmit="showSignIn(event)">
                        <div class="form-group">
                          <label for="fullname-signIn">Tên tài khoản của bạn:</label>
                          <input type="text" id="fullname-signIn" placeholder="Tên tài khoản" >
                        </div>
                        <div class="form-group" id="emailPhoneNumber">
                          <label for="email-signIn">Email của bạn:</label>
                          <input type="email" id="email-signIn" placeholder="Địa chỉ email" >
                        </div>
						<div class="form-group" id="emailPhoneNumber">
						  <label for="phoneNumber-signIn">Số điện thoại của bạn:</label>
                          <input type="text" id="phoneNumber-signIn" placeholder="Số điện thoại" >
                        </div>
						<div class="form-group">
                          <label for="password-signIn">Mật khẩu của bạn:</label>
                          <input type="password" id="password-signIn" placeholder="Mật khẩu" >
                          <label for="recordpassword-signIn">Nhập lại mật khẩu của bạn:</label>
                          <input type="password" id="recordpassword-signIn" placeholder="Nhập lại mật khẩu" >
                        </div>
                        <button type="submit" class="btn-login-UI">Đăng ký</button>
                      </form>
        `;
	} else {
		document.getElementById('inner-from-IU').innerHTML = `
                    <form name="frmSignUp" onsubmit="showSignUp(event)">
                        <div class="form-group">
                          <label for="fullname-signUp">Tên tài khoản của bạn:</label>
                          <input type="text" id="fullname-signUp" placeholder="Tên tài khoản" >
                        </div>
                        <div class="form-group">
                          <label for="password-signUp">Mật khẩu của bạn:</label>
                          <input type="password" id="password-signUp" placeholder="Mật khẩu" >
                        </div>
                        <button type="submit" class="btn-login-UI">Đăng nhập</button>
                        <button onclick="forgetPassword(event)" class="forget-password" style="margin: 10px 0; text-decoration: underline;">Quên mật khẩu?</button>
                      </form>
        `;
	}
}

function forgetPassword(event) {
	event.preventDefault();
	event.stopPropagation();
	document.getElementById('main-login-inner').innerHTML = `
		<div id="inner-from-IU">
			<form name="frmForgetPassWord">
				<div class="form-group">
					<label for="fullname-ForgetPassWord">Tên tài khoản của bạn:</label>
					<input type="text" id="fullname-ForgetPassWord" placeholder="Tên tài khoản">
				</div>
				<div class="form-group" id="emailPhoneNumber-ForgetPassWord">
					<label for="email-ForgetPassWord">Email đã đăng kí của bạn:</label>
					<input type="email" id="email-ForgetPassWord" placeholder="Địa chỉ email">
				</div>
				<button type="submit" class="btn-login-UI">Lấy lại mật khẩu</button>
			</form>
			<div style="display: flex;">
				<button onclick="backForgetPassword(event)" class="btn-login-UI" style="width: 30%;"><i class="fa-solid fa-backward"></i>Quay lại</button>
				<button onclick="methodForgetPassword(event)" id="change-method-NE-ForgetPassWord" status-method-NE="numberPhone" style="text-decoration: underline; margin: 10px 0; width: 70%;">Sử dụng số điện thoại</button>
			</div>
			<div class="login-content-btns">
				<p>Hoặc <span id="inner-p-login-content-btns">đăng nhập</span> với:</p>
				<button class="btn-login-item-ex"><i class="fa-brands fa-google"></i></button>
				<button class="btn-login-item-ex"><i class="fa-brands fa-facebook"></i></button>
				<button class="btn-login-item-ex"><i class="fa-brands fa-instagram"></i></button>
				<button class="btn-login-item-ex"><i class="fa-brands fa-github"></i></button>
			</div>
		</div>
	`;

	const frm = document.forms['frmForgetPassWord'];
	frm.addEventListener('submit', function(e) {
		e.preventDefault();
		e.stopPropagation();

		const username = document.getElementById('fullname-ForgetPassWord').value.trim();
		if (!username) {
			showNotification("Vui lòng nhập tên tài khoản", "error");
			return;
		}

		const methodBtn = document.getElementById('change-method-NE-ForgetPassWord');
		const method = methodBtn.getAttribute('status-method-NE');

		let contactValue = "";
		if (method === 'numberPhone') {
			contactValue = document.getElementById('email-ForgetPassWord').value.trim();
		} else {
			contactValue = document.getElementById('phoneNumber-ForgetPassWord').value.trim();
		}

		if (!contactValue) {
			showNotification("Vui lòng nhập thông tin liên hệ", "error");
			return;
		}

		const account = accounts.find(acc => acc.username === username);
		if (!account) {
			showNotification("Không tìm thấy username", "error");
			return;
		}

		const profile = profiles.find(pro => pro.id === account.id);
		if (!profile) {
			showNotification("Không tìm thấy profile của username", "error");
			return;
		}

		if (method === 'numberPhone') {
			if (account.email !== contactValue) {
				showNotification("Thông tin liên hệ không khớp", "error");
				return;
			}
		} else {
			if (profile.phone_number !== contactValue) {
				showNotification("Thông tin liên hệ không khớp", "error");
				return;
			}
		}

		function askNewPassword() {
			const newPassword = generateStructuredPassword();
			const confirmResult = confirm(`Mật khẩu mới của bạn là: ${newPassword}\nBạn có đồng ý sử dụng mật khẩu này không?`);

			if (confirmResult) {
				// Người dùng đồng ý => gửi lên database
				saveNewPasswordToDatabase(account.id, newPassword);
			} else {
				// Người dùng từ chối => cấp mật khẩu khác
				askNewPassword();
			}
		}
		askNewPassword();
	});
}

function generateStructuredPassword() {
	let randomNumbers = '';
	for (let i = 0; i < 5; i++) {
		randomNumbers += Math.floor(Math.random() * 10);
	}
	return randomNumbers;
}

function methodForgetPassword(event) {
	event.preventDefault();
	event.stopPropagation();
	const changeMethodNE = document.getElementById('change-method-NE-ForgetPassWord');
	if (changeMethodNE.getAttribute('status-method-NE') === 'numberPhone') {
		changeMethodNE.setAttribute('status-method-NE', 'email');
		changeMethodNE.textContent = 'Sử dụng email';
		document.getElementById('emailPhoneNumber-ForgetPassWord').innerHTML = `
    <label for="phoneNumber-ForgetPassWord">Số điện thoại của bạn:</label>
                          <input type="text" id="phoneNumber-ForgetPassWord" placeholder="Số điện thoại" >
    `;
	} else {
		changeMethodNE.setAttribute('status-method-NE', 'numberPhone');
		changeMethodNE.textContent = 'Sử dụng số điện thoại';
		document.getElementById('emailPhoneNumber-ForgetPassWord').innerHTML = `
    <label for="email-ForgetPassWord">Email của bạn:</label>
                          <input type="email" id="email-ForgetPassWord" placeholder="Địa chỉ email" >
    `;
	}
}
function backForgetPassword(event) {
	event.preventDefault();
	event.stopPropagation();
	document.getElementById('main-login-inner').innerHTML = `
                    <div style="display: flex; justify-content: center; align-items: center; margin-top: 5px;">
                      <p id="item-text-p" style="margin-right: 10px;">Bạn chưa có tài khoản?</p>
                      <button style="width: 30%;margin: 0;" onclick="changeIU(event)" class="btn-login-UI" id="main-login-inner-btn-login" status-btn="signUP">Đăng ký</button>
                    </div>
                    <div id="inner-from-IU">
                      <form name="frmSignUp" onsubmit="showSignUp(event)">
                          <div class="form-group">
                            <label for="fullname-signUp">Tên tài khoản của bạn:</label>
                            <input type="text" id="fullname-signUp" placeholder="Tên tài khoản" >
                          </div>
                          <div class="form-group">
                            <label for="password-signUp">Mật khẩu của bạn:</label>
                            <input type="password" id="password-signUp" placeholder="Mật khẩu" >
                          </div>
                          <button type="submit" class="btn-login-UI">Đăng nhập</button>
                          <button onclick="forgetPassword(event)" class="forget-password" style="margin: 10px 0 20px 0;">Quên mật khẩu?</button> </div>
                        </form>
                <div class="login-content-btns" >
                  <p>Hoặc <span  id="inner-p-login-content-btns">đăng nhập</span> với:</p>
                  <button class="btn-login-item-ex">
                    <i class="fa-brands fa-google"></i>
                  </button>
                  <button class="btn-login-item-ex">
                    <i class="fa-brands fa-facebook"></i> 
                  </button>
                  <button class="btn-login-item-ex">
                    <i class="fa-brands fa-instagram"></i>
                  </button>
                  <button class="btn-login-item-ex">
                      <i class="fa-brands fa-github"></i>  
                    </button>
                </div>
                `;
}
function checkFrm(nameid, strText, str2Text) {
	if (nameid.value === "") {
		nameid.classList.add('error');
		nameid.setAttribute('placeholder', strText);
		nameid.focus();
		return false;
	} else {
		nameid.classList.remove('error');
		nameid.setAttribute('placeholder', str2Text);
	}
	return true;
}
function checkEmail(val){
    var regex = [
        /^([0-9]|[a-z])+@gmail.com$/i,
        /^([0-9]|[a-z])+@sv.sgu.edu.vn$/i,
    ];
    for(var i = 0; i < regex.length; i++){
        if(regex[i].test(val)){
            return true;
        }
    }
    return false;
}
function open1234() {
	document.getElementsByClassName('inner-1234')[0].style.display = 'block';
	const idLogin = localStorage.getItem('idLogin');
	// Tìm user trong mảng accounts
	const account = accounts.find(acc => acc.id === idLogin);

	// Tìm thông tin bổ sung trong mảng customers (dựa theo accountId)
	const profile = profiles.find(pro => pro.id === idLogin);

	if (!account || !profile) {
		console.warn("Không tìm thấy user hoặc customer tương ứng với idLogin:", idLogin);
		return;
	}

	// Ưu tiên hiển thị fullname nếu có, nếu không thì dùng accountId
	if (!profile.fullname || profile.fullname.trim() === '') {
		document.getElementById('1234-username').textContent = account.username;
	} else {
		document.getElementById('1234-username').textContent = profile.fullname;
	}

	// Ưu tiên hiển thị email, nếu không có thì dùng phoneNumber
	if (account.email && account.email.trim() !== '') {
		document.getElementById('1234-EP').textContent = account.email;
	} else {
		document.getElementById('1234-EP').textContent = profile.phone_number;
	}
}
function logout1234() {
	localStorage.removeItem('idLogin');
	document.getElementById('btn-login').style.display = 'block';
	document.getElementById('id-container-1234').style.display = 'none';
	window.location.reload();
	showNotification('Đăng xuất thành công', 'success');
}
function displayNoneFilterSearch() {
    document.getElementById("filter-search").style.display = "none";
}

function openinfor1234() {
	displayNoneFilterSearch();
	document.querySelector(".modal").classList.remove("show-modal");
	document.getElementById('container').innerHTML = `
	<div  style=" display: flex; margin-top: 97px; box-shadow: 0 0 8px rgba(0, 0, 0, 0.2); flex-wrap: wrap;" class="grid">
    <div style="font-size: 3rem; padding: 15px; width: 100%;">Thông tin tài khoản của bạn</div>
    <div style="font-size: 2.5rem; padding: 10px 15px; width: 100%;">Quản lí bảo mật thông tin tài khoản</div>
    <div class="inner-infor-1234">
      <form action="#" name="frminfor">
        <div class="form-infor-group">
          <label for="username-infor">Tên tài khoản của bạn:</label>
          <input type="text" id="username-infor" placeholder="Tên tài khoản" disabled>
        </div>
        <div class="form-infor-group">
          <label for="fullname-infor">Họ và tên của bạn:</label>
          <input type="text" id="fullname-infor" placeholder="Họ và tên">
        </div>
        <div class="form-infor-group">
          <label for="email-infor">Email của bạn:</label>
          <input type="email" id="email-infor" placeholder="Email">
        </div>
        <div class="form-infor-group">
          <label for="phone-infor">Số điện thoại của bạn:</label>
          <input type="text" id="phone-infor" placeholder="Số điện thoại">
        </div>
		<div style="font-size: 1.4rem; margin-left: 10px; margin-bottom: 10px;">Địa chỉ của bạn:</div>
		<div class="form-infor-ac"  id="id-show-infor-address">
		<select name="address" id="addree-infor-1234" >
		</select>
		<div class="div-btn-infor1234" onclick="showpupupaddress()">Thêm</div>
		<div class="div-btn-infor1234" onclick="deleteaddress1234()">Xóa</div>
		</div>
        <div id="id-ex-infor-address" style="display: none;">
			<div id="address_popup" class="form-infor-group">
         <div style="display: flex; width: 100%;">
          <div class="address-item-infor">
            <select name="tinh" id="tinh_address">
              <option disabled selected>Tỉnh/Thành phố</option>
            </select>
          </div>
          <div class="address-item-infor">
            <select id="huyen_address">
              <option disabled selected>Quận/Huyện</option>
            </select>
          </div>
          <div class="address-item-infor">
            <!-- <ul id="xa_address"></ul> -->
            <select id="xa_address">
              <option disabled selected>Phường/Xã</option>
            </select>
          </div>
        </div>
		<div style="display: flex; margin-top: 10px;align-items: baseline;">
		<input style=" padding: 7px;border: 1px solid black; border-radius: 16px;width: 100%; margin-top: 5px; margin-right: 5px" id="diachi" type="text" placeholder="Số nhà, đường">
		<div id="saveaddress-1234" class="div-btn-infor1234" style="padding: 10px; width: 15%; cursor: pointer;">Lưu</div>
		</div>
      </div>
        </div>
        <button type="submit" class="btn-infor1234" onclick="updateinfor1234(event)" >Cập nhật</button>
      </form>
    </div>
    <div class="inner-infor-1234">
      <form action="#" name="frmChangePassword" onsubmit="changepassword1234(event)">
        <div class="form-infor-group">
          <label for="password-infor">Mật khẩu cũ:</label>
          <input type="password" id="password-infor" placeholder="Mật khẩu cũ">
        </div>
        <div class="form-infor-group">
          <label for="new-password-infor">Mật khẩu mới:</label>
          <input type="password" id="new-password-infor" placeholder="Mật khẩu mới">
        </div>
        <div class="form-infor-group">
          <label for="re-new-password-infor">Nhập lại mật khẩu mới:</label>
          <input type="password" id="re-new-password-infor" placeholder="Nhập lại mật khẩu mới">
        </div>
        <button type="submit" class="btn-infor1234">Đổi mật khẩu</button>
      </form>
    </div>
	`;
	const idLogin = localStorage.getItem('idLogin');
	// Tìm user trong mảng accounts	
	const account = accounts.find(acc => acc.id === idLogin);
	console.log( account);
	const profile = profiles.find(cus => cus.id === idLogin);
	console.log(profile);
	document.forms['frminfor']['username-infor'].value = account.username;
	const user = {
        fullname: (profile && profile.fullname) ? profile.fullname : '',
        email: (account && account.email) ? account.email : '',
        phone: (profile && profile.phone_number) ? profile.phone_number : ''
    };
	if (user.fullname === null) { document.forms['frminfor']['fullname-infor'].value = ''; } else { document.forms['frminfor']['fullname-infor'].value = user.fullname; }
	if (user.email === null) { document.forms['frminfor']['email-infor'].value = ''; } else { document.forms['frminfor']['email-infor'].value = user.email; }
	if (user.phone === null) { document.forms['frminfor']['phone-infor'].value = ''; } else { document.forms['frminfor']['phone-infor'].value = user.phone; }
	fetchLogin();
  showaddress();
	window.scrollTo(0,0);
}

let jsonAddress = {};

function callBackdata(callback) {
	fetch('../static/dvhcvn.json').then(response => {
		if (!response.ok) {
			console.log("lỗi load file dvhcvn.json");
		}
		// console.log(response.json());
		return response.json();
	}).then(data => {
		jsonAddress = data;
		// console.log(jsonAddress);
		return callback(data);
		Tinh(data);
	}).catch(error => {
		console.log(error);
	});
}

// jsonAddress.data[1].level2s[2].level3s
function Tinh(dataAddress) {
	const tmp = document.getElementById('tinh_address');
	let index = 0;
	dataAddress.data.forEach(element => {
		tmp.innerHTML += `<option value="${index++}">${element.name}</option>`;
	});
}

function Huyen(dataAddress, index) {
	const tmp = document.getElementById('huyen_address');
	tmp.innerHTML = '<option disabled selected>Quận/Huyện</option>';
	let index2 = 0;
	dataAddress.data[index].level2s.forEach(element => {
		tmp.innerHTML += `<option value="${index2++}">${element.name}</option>`;
	});
}

function Xa(dataAddress, index, index2) {
	const tmp = document.getElementById('xa_address');
	tmp.innerHTML = '<option disabled selected>Phường/Xã</option>';
	let index3 = 0;
	dataAddress.data[index].level2s[index2].level3s.forEach(element => {
		tmp.innerHTML += `<option value="${index3++}">${element.name}</option>`;
	});
}


function runAddress() {
    const diachiField = document.forms['frminfor']['diachi']; // Trường số nhà, đường

    document.getElementById('diachi').addEventListener("change", function () {

        callBackdata(function (data) {
            Tinh(data);
        });

        document.getElementById("tinh_address").addEventListener("change", function () {
            const index = this.value;
            console.log("Tỉnh chọn:", index);

            callBackdata(function (data) {
                Huyen(data, index);

                document.getElementById('huyen_address').addEventListener("change", function () {
                    const index2 = this.value;
                    console.log("Huyện chọn:", index2);

                    callBackdata(function (data) {
                        Xa(data, index, index2);

                        document.getElementById('xa_address').addEventListener("change", function () {
                            const index3 = this.value;
                            console.log("Xã chọn:", index3);

                            callBackdata(function (data) {
                                document.getElementById('saveaddress-1234').addEventListener("click", function (event) {
                                    const soNhaDuong = diachiField.value.trim();
                                    if (soNhaDuong === "") {
                                        showNotification('Vui lòng nhập số nhà, đường', 'error');
                                        return;
                                    }

                                    const tinh = data.data[index].name;
                                    const huyen = data.data[index].level2s[index2].name;
                                    const xa = data.data[index].level2s[index2].level3s[index3].name;
                                    const city = tinh;
                                    const district = huyen;
                                    const ward = xa;
                                    const street = soNhaDuong;

                                    const idLogin = localStorage.getItem('idLogin');
									                  console.log(idLogin);
                                    const profile = profiles.find(pro => pro.id === idLogin);
                                    if (!profile) {
                                        console.warn("Không tìm thấy profile với idLogin:", idLogin);
                                        return;
                                    }

                                    const addressData = {
                                        phone_number: profile.phone_number || '',
                                        street: street,
                                        ward: ward,
                                        district: district,
                                        city: city
                                    };

                                    // Gọi hàm cập nhật user và địa chỉ
                                    upDateUserAddress(idLogin, profile, addressData);
                                    showNotification('Thêm địa chỉ thành công', 'success');
                                    document.getElementById('id-ex-infor-address').style.display = 'none';
                                    document.getElementById('id-show-infor-address').style.display = "";
                                    document.getElementById('diachi').value = "";
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

function showpupupaddress() {
	const exaddress = document.getElementById('id-ex-infor-address');
	exaddress.style.display = 'block';
	document.getElementById('id-show-infor-address').style.display = 'none';
	console.log("showpupupaddress");
	runAddress();
}