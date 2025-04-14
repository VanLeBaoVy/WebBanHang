const accounts = [
    {
        accountId: 'ACC001',
        password: 'pass123',
        username: 'user1',
        status: 'active',
    },
    {
        accountId: 'ACC002',
        password: 'pass456',
        username: 'user2',
        status: 'active',
    },
    {
        accountId: 'ACC003',
        password: 'pass789',
        username: 'user3',
        status: 'active',
    }
];
let customers = [
    {
        id: 1,
        name: 'Nguyễn Văn A',
        address: 'Hà Nội',
        phoneNumber: '0912345678',
        accountId: 'ACC001',
        email: 'customer1@example.com',
    },
    {
        id: 2,
        name: 'Trần Thị B',
        address: 'TP.HCM',
        phoneNumber: '0987654321',
        accountId: 'ACC002',
        email: 'customer2@example.com',
    },
    {
        id: 3,
        name: 'Lê Văn C',
        address: 'Đà Nẵng',
        phoneNumber: '0123456789',
        accountId: 'ACC003',
        email: 'customer3@example.com',
    }
];
localStorage.setItem('accounts', JSON.stringify(accounts));
localStorage.setItem('customers', JSON.stringify(customers));
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
	// if (localStorage.getItem('idLogin') !== null) {
	// 	queryUserByUsername(localStorage.getItem('idLogin'), (user)=> {
	// 		if (user.status === 'Bị khóa') {
	// 			logout1234();
	// 		}
	// 	});
	// 	document.getElementById('btn-login').style.display = 'none';
	// 	document.getElementById('id-container-1234').style.display = 'block';
	// } else {
	// 	document.getElementById('btn-login').style.display = 'block';
	// 	document.getElementById('id-container-1234').style.display = 'none';
	// }
	// queryUserByUsername(localStorage.getItem('idLogin'), (user) => {
	// 	document.getElementById("bulbleLength").textContent = user.cart.size; // Cập nhật số lượng sản phẩm trong giỏ hàng
	// }
	// );
    const getUserByUsername = (username) => {
        return accounts.find(account => account.username === username);
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
                        <div class="form-group">
                          <label for="password-signIn">Mật khẩu của bạn:</label>
                          <input type="password" id="password-signIn" placeholder="Mật khẩu" >
                          <label for="recordpassword-signIn">Nhập lại mật khẩu của bạn:</label>
                          <input type="password" id="recordpassword-signIn" placeholder="Nhập lại mật khẩu" >
                        </div>
                        <button type="submit" class="btn-login-UI">Đăng ký</button>
                        <button onclick="methodNE(event)" id="change-method-NE" status-method-NE="numberPhone" style="text-decoration: underline; margin: 10px 0;">Sử dụng số điện thoại để đăng kí</button>
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

function methodNE(event) {
	const changeMethodNE = document.getElementById('change-method-NE');
	event.preventDefault();
	event.stopPropagation();
	if (changeMethodNE.getAttribute('status-method-NE') === 'numberPhone') {
		changeMethodNE.setAttribute('status-method-NE', 'email');
		changeMethodNE.textContent = 'Sử dụng email để đăng kí';
		document.getElementById('emailPhoneNumber').innerHTML = `
    <label for="phoneNumber-signIn">Số điện thoại của bạn:</label>
                          <input type="text" id="phoneNumber-signIn" placeholder="Số điện thoại" >
    `;
	} else {
		changeMethodNE.setAttribute('status-method-NE', 'numberPhone');
		changeMethodNE.textContent = 'Sử dụng số điện thoại để đăng kí';
		document.getElementById('emailPhoneNumber').innerHTML = `
    <label for="email-signIn">Email của bạn:</label>
                          <input type="email" id="email-signIn" placeholder="Địa chỉ email" >
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
                      <input type="text" id="fullname-ForgetPassWord" placeholder="Tên tài khoản" >
                    </div>
                      <div class="form-group" id="emailPhoneNumber-ForgetPassWord">
                    <label for="email-ForgetPassWrod">Email đã đăng kí của bạn:</label>
                    <input type="email" id="email-ForgetPassWord" placeholder="Địa chỉ email" >
                    </div>
                    <button type="submit" class="btn-login-UI">Lấy lại mật khẩu</button>
                  </form>
                  <div style="display: flex;">
                    <button onclick="backForgetPassword(event)" class="btn-login-UI" style="width: 30%;"><i class="fa-solid fa-backward"></i>Quay lại</button>
                    <button onclick="methodForgetPassword(event)" id="change-method-NE-ForgetPassWord" status-method-NE="numberPhone" style="text-decoration: underline; margin: 10px 0; width: 70%;">Sử dụng số điện thoại</button>
                  </div>
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
	const frm = document.forms['frmForgetPassWord'];
		frm.addEventListener('submit', function(e) {
			e.preventDefault();
			e.stopPropagation();
					
			// Lấy username từ input "fullname-ForgetPassWord"
			const username = document.getElementById('fullname-ForgetPassWord').value.trim();
			if (!username) {
				showNotification("Vui lòng nhập tên tài khoản", "error");
				return;
			}
					
			// Lấy trạng thái phương thức liên hệ (email hay số điện thoại)
			// Lưu ý: Ban đầu, status-method-NE-ForgetPassWord có giá trị "numberPhone"
			// => Hiển thị input email. Nếu chuyển đổi, giá trị sẽ thành "email" và hiển thị input số điện thoại.
			const methodBtn = document.getElementById('change-method-NE-ForgetPassWord');
			const method = methodBtn.getAttribute('status-method-NE');
					
			let contactValue = "";
			if (method === 'numberPhone') {
				// Nếu status là "numberPhone", giao diện hiển thị input email
				contactValue = document.getElementById('email-ForgetPassWord').value.trim();
			} else {
				// Ngược lại, giao diện hiển thị input số điện thoại
				contactValue = document.getElementById('phoneNumber-ForgetPassWord').value.trim();
			}
					
			if (!contactValue) {
				showNotification("Vui lòng nhập thông tin liên hệ", "error");
				return;
			}
					
			// Tìm tài khoản trong mảng accounts (so sánh username với accountId)
			const account = accounts.find(acc => acc.username === username);
			const accountIndex = accounts.findIndex(acc => acc.username === username);
			if (!account) {
				showNotification("không tìm thấy username", "error");
				return;
			}
					
			// Tìm thông tin khách hàng trong mảng customers dựa trên accountId
			const customer = customers.find(cus => cus.accountId === account.accountId);
			if (!customer) {
				showNotification("không tìm thấy username", "error");
				return;
			}
					
			// Kiểm tra thông tin liên hệ: 
			// Nếu đang dùng email (method === 'numberPhone') thì so sánh với customer.email
			// Nếu đang dùng số điện thoại (method === 'email') thì so sánh với customer.phoneNumber
			if (method === 'numberPhone') {
				if (customer.email !== contactValue) {
					showNotification("không tìm thấy username", "error");
					return;
				}
			} else {
				if (customer.phoneNumber !== contactValue) {
					showNotification("không tìm thấy username", "error");
					return;
				}
			}
					
			// Nếu kiểm tra đúng, tạo mật khẩu mới ngẫu nhiên
			const newPassword = generateRandomPassword();
			// Cập nhật mật khẩu mới vào mảng accounts
			accounts[accountIndex] = { ...accounts[accountIndex], password: newPassword };
					
			// Thông báo mật khẩu mới cho người dùng
			showNotification(`Mật khẩu mới của bạn là: ${newPassword}`, "success");
		});
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
// Hàm tạo mật khẩu mới ngẫu nhiên (mặc định 8 ký tự)
function generateRandomPassword(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
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
function showSignUp(event) {
	event.preventDefault();
	event.stopPropagation();
	const fullNameSignUp = document.forms['frmSignUp']['fullname-signUp'];
	const passwordSignUp = document.forms['frmSignUp']['password-signUp'];
	if (checkFrm(fullNameSignUp, 'Tên tài khoản không được rỗng', 'Tên tài khoản') === false) return false;
	if (checkFrm(passwordSignUp, 'Mật khẩu không được rỗng', 'Mật khẩu') === false) return false;
		// queryUser((users) => {
		// 	let check = false;
		// 	users.forEach((user) => {
		// 		if (user.username === fullNameSignUp.value && user.password === passwordSignUp.value ) {
		// 			if (user.status	=== "Bị khóa") {
		// 			showNotification('Tài khoản của bạn bị khóa', 'error');
		// 			} else {
		// 				localStorage.setItem('idLogin', user.username);
		// 			document.getElementById('btn-login').style.display = 'none';
		// 			document.getElementById('id-container-1234').style.display = 'block';
		// 			check = true;
		// 			document.forms['frmSignUp'].reset();
		// 			showNotification('Đăng nhập thành công', 'success');
		// 			closeFormLogin();
		// 			}
		// 		}
		// 	});
		// 	if (!check) {
		// 		fullNameSignUp.classList.add('error');
		// 		fullNameSignUp.setAttribute('placeholder', 'Tên tài khoản hoặc mật khẩu không đúng');
		// 		fullNameSignUp.value = '';
		// 		fullNameSignUp.focus();
		// 		passwordSignUp.value = '';
		// 	}
		// });
		const account = accounts.find(acc => 
			acc.username === fullNameSignUp.value && acc.password === passwordSignUp.value
		);
	
		if (account) {
			if (account.status === "Bị khóa") {
				showNotification('Tài khoản của bạn bị khóa', 'error');
			} else {
				// Nếu cần, bạn vẫn có thể lưu thông tin đăng nhập vào localStorage hoặc xử lý theo ý muốn khác
				localStorage.setItem('idLogin', account.accountId);
				document.getElementById('btn-login').style.display = 'none';
				document.getElementById('id-container-1234').style.display = 'block';
				document.forms['frmSignUp'].reset();
				showNotification('Đăng nhập thành công', 'success');
				closeFormLogin();
			}
		} else {
			fullNameSignUp.classList.add('error');
			fullNameSignUp.setAttribute('placeholder', 'Tên tài khoản hoặc mật khẩu không đúng');
			fullNameSignUp.value = '';
			fullNameSignUp.focus();
			passwordSignUp.value = '';
		}
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
function showSignIn(event) {
	event.preventDefault();
	event.stopPropagation();
	const fullNameSignIn = document.forms['frmSignIn']['fullname-signIn'];
	const passwordSignIn = document.forms['frmSignIn']['password-signIn'];
	const recordPasswordSignIn = document.forms['frmSignIn']['recordpassword-signIn'];
	const changeMethodNE = document.getElementById('change-method-NE');
	let emailSignIn, phoneNumberSignIn;
	if (checkFrm(fullNameSignIn, 'Tên tài khoản không được rỗng', 'Tên tài khoản') === false) return false;

	if (changeMethodNE.getAttribute('status-method-NE') === 'numberPhone') {
		emailSignIn = document.forms['frmSignIn']['email-signIn'];
		if (!checkEmail(emailSignIn.value)){
			// console.log("emailSignIn:", emailSignIn);
			showNotification('Email không đúng định dạng', 'warning');
			return false;
		}
		if (checkFrm(emailSignIn, 'Email không được rỗng', 'Email') === false) return false;
	} else {
		phoneNumberSignIn = document.forms['frmSignIn']['phoneNumber-signIn'];
		if (checkFrm(phoneNumberSignIn, 'Số điện thoại không được rỗng', 'Số điện thoại') === false) return false;
		if (isNaN(phoneNumberSignIn.value)) {
			phoneNumberSignIn.classList.add('error');
			phoneNumberSignIn.setAttribute('placeholder', 'Vui lòng nhập số');
			phoneNumberSignIn.value = '';
			phoneNumberSignIn.focus();
			return false;
		}
		if (phoneNumberSignIn.value.toString().length !== 10) {
			phoneNumberSignIn.classList.add('error');
			phoneNumberSignIn.setAttribute('placeholder', 'Vui lòng nhập số điện thoại 10 số');
			phoneNumberSignIn.value = '';
			phoneNumberSignIn.focus();
			return false;
		}
	}
	if (checkFrm(passwordSignIn, 'Mật khẩu không được rỗng', 'Mật khẩu') === false) return false;
	if (checkFrm(recordPasswordSignIn, 'Nhập lại mật khẩu không được rỗng', 'Nhập lại mật khẩu') === false) return false;
	if (passwordSignIn.value !== recordPasswordSignIn.value) {
		recordPasswordSignIn.classList.add('error');
		recordPasswordSignIn.setAttribute('placeholder', 'Nhập lại mật khẩu không khớp');
		recordPasswordSignIn.value = '';
		recordPasswordSignIn.focus();
		return false;
	} else {
		recordPasswordSignIn.classList.remove('error');
		recordPasswordSignIn.setAttribute('placeholder', 'Nhập lại mật khẩu');
	}
	// Kiểm tra tài khoản đã tồn tại chưa
	// checkUserName(fullNameSignIn.value, (result) => {	
	// Nếu tài khoản chưa tồn tại, tạo user và lưu vào DB
	//let check = false;
	// queryUser((users) => {
	// 	users.forEach((user) => {
	// 		if (user.username === fullNameSignIn.value) {
	// 			check = true;
	// 		}
	// 	});
	// 	if (check) {
	// 		fullNameSignIn.classList.add('error');
	// 		fullNameSignIn.setAttribute('placeholder', 'Tên tài khoản đã tồn tại');
	// 		fullNameSignIn.value = '';
	// 		fullNameSignIn.focus();
	// 	} else {
	// 		fullNameSignIn.classList.remove('error');
	// 		fullNameSignIn.setAttribute('placeholder', 'Tên tài khoản');
	// 		const userLogin = changeMethodNE.getAttribute('status-method-NE') === 'numberPhone'
	// 			? new user(fullNameSignIn.value, passwordSignIn.value, emailSignIn.value, null, [], [], [], [], null, "Hoạt Động", getUTCPlus7Date())
	// 			: new user(fullNameSignIn.value, passwordSignIn.value, null, phoneNumberSignIn.value, [], [], [], [], null, "Hoạt Động", getUTCPlus7Date());
	// 		console.log("Dữ liệu user:", userLogin);
	// 		// saveUserToDB(user);
	// 		connectUserDB((db) => {
	// 			addUser(db, userLogin);
	// 		});
	// 		document.forms['frmSignIn'].reset();
	// 		loginAccountUser(event, 0);
	// 		closeFormLogin();
	// 		showNotification('Đăng ký thành công', 'success');
	// 	}
	// });
	const isExisting = accounts.some(acc => acc.username === fullNameSignIn.value);
    if (isExisting) {
		fullNameSignIn.classList.add('error');
		fullNameSignIn.setAttribute('placeholder', 'Tên tài khoản đã tồn tại');
		fullNameSignIn.value = '';
		fullNameSignIn.focus();
		return false;
	}
	// Tạo accountId mới
	const nextId = accounts.length + 1;
	const newAccountId = `ACC${String(nextId).padStart(3, '0')}`;

	// Thêm vào mảng accounts
	accounts.push({
		accountId: newAccountId,
		password: passwordSignIn.value,
		username: fullNameSignIn.value,
		status: 'active',
	});

	// Thêm vào mảng customers
	customers.push({
		id: nextId,
		name: fullNameSignIn.value,
		address: '',
		phoneNumber: phoneNumberSignIn ? phoneNumberSignIn.value : '',
		accountId: newAccountId,
		email: emailSignIn ? emailSignIn.value : '',
	});

	console.log("Thêm account:", accounts[accounts.length - 1]);
	console.log("Thêm customer:", customers[customers.length - 1]);
	document.forms['frmSignIn'].reset();
	showNotification('Đăng ký thành công', 'success');
	closeFormLogin();
}
/////////////////////////////////////////////////////////////////////////////////////////

function open1234() {
	document.getElementsByClassName('inner-1234')[0].style.display = 'block';
	// queryUserByUsername(localStorage.getItem('idLogin'), (user) => {
	// 	console.log("User:", user);
	// 	if (user.fullname === null || user.fullname === '') {
	// 		document.getElementById('1234-username').textContent = user.username;
	// 	} else {
	// 		document.getElementById('1234-username').textContent = user.fullname;
	// 	}
	// 	if (user.email !== null) {
	// 		document.getElementById('1234-EP').textContent = user.email;
	// 	} else {
	// 		document.getElementById('1234-EP').textContent = user.phone;
	// 	}
	// });
	const idLogin = localStorage.getItem('idLogin');
	// Tìm user trong mảng accounts
	const account = accounts.find(acc => acc.accountId === idLogin);

	// Tìm thông tin bổ sung trong mảng customers (dựa theo accountId)
	const customer = customers.find(cus => cus.accountId === idLogin);

	if (!account || !customer) {
		console.warn("Không tìm thấy user hoặc customer tương ứng với idLogin:", idLogin);
		return;
	}

	// Ưu tiên hiển thị fullname nếu có, nếu không thì dùng accountId
	if (!customer.name || customer.name.trim() === '') {
		document.getElementById('1234-username').textContent = account.username;
	} else {
		document.getElementById('1234-username').textContent = customer.name;
	}

	// Ưu tiên hiển thị email, nếu không có thì dùng phoneNumber
	if (customer.email && customer.email.trim() !== '') {
		document.getElementById('1234-EP').textContent = customer.email;
	} else {
		document.getElementById('1234-EP').textContent = customer.phoneNumber;
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
	document.forms['frminfor']['username-infor'].value = localStorage.getItem('idLogin');
	// queryUserByUsername(localStorage.getItem('idLogin'), (user) => {
	// 	document.forms['frminfor']['fullname-infor'].textContent = user.fullname;
	// 	if (user.fullname === null) { document.forms['frminfor']['fullname-infor'].value = ''; } else { document.forms['frminfor']['fullname-infor'].value = user.fullname; }
	// 	if (user.email === null) { document.forms['frminfor']['email-infor'].value = ''; } else { document.forms['frminfor']['email-infor'].value = user.email; }
	// 	if (user.phone === null) { document.forms['frminfor']['phone-infor'].value = ''; } else { document.forms['frminfor']['phone-infor'].value = user.phone; }
	// });
	let userCurrent = JSON.parse(localStorage.getItem('userCurrent'));
	const idLogin = userCurrent.idLogin || null;
	// Tìm user trong mảng accounts
	let customers = JSON.parse(localStorage.getItem('customers')) || [];	
	const account = accounts.find(acc => acc.accountId === idLogin);
	const customer = customers.find(cus => cus.accountId === idLogin);
	const user = {
        fullname: (customer && customer.name) ? customer.name : '',
        email: (customer && customer.email) ? customer.email : '',
        phone: (customer && customer.phoneNumber) ? customer.phoneNumber : ''
    };
	if (user.fullname === null) { document.forms['frminfor']['fullname-infor'].value = ''; } else { document.forms['frminfor']['fullname-infor'].value = user.fullname; }
	if (user.email === null) { document.forms['frminfor']['email-infor'].value = ''; } else { document.forms['frminfor']['email-infor'].value = user.email; }
	if (user.phone === null) { document.forms['frminfor']['phone-infor'].value = ''; } else { document.forms['frminfor']['phone-infor'].value = user.phone; }
	showaddress();
	window.scrollTo(0,0);
}

function changepassword1234(event) {
	event.preventDefault();
	event.stopPropagation();
	const oldpassword = document.forms['frmChangePassword']['password-infor'];
	const newpassword = document.forms['frmChangePassword']['new-password-infor'];
	const renewpassword = document.forms['frmChangePassword']['re-new-password-infor'];
	if (checkFrm(oldpassword, 'Mật khẩu cũ không được rỗng', 'Mật khẩu cũ') === false) return false;
	if (checkFrm(newpassword, 'Mật khẩu mới không được rỗng', 'Mật khẩu mới') === false) return false;
	if (checkFrm(renewpassword, 'Nhập lại mật khẩu mới không được rỗng', 'Nhập lại mật khẩu mới') === false) return false;
	if (newpassword.value !== renewpassword.value) {
		renewpassword.classList.add('error');
		renewpassword.setAttribute('placeholder', 'Nhập lại mật khẩu không khớp');
		renewpassword.value = '';
		renewpassword.focus();
		return false;
	} else {
		renewpassword.classList.remove('error');
		renewpassword.setAttribute('placeholder', 'Nhập lại mật khẩu mới');
	}
	// queryUserByUsername(localStorage.getItem('idLogin'), (user) => {
	// 	if (user.password === oldpassword.value) {
	// 		user.password = newpassword.value;
	// 		upDateUser(user.username, user);
	// 		document.forms['frmChangePassword'].reset();
	// 		showNotification('Đổi mật khẩu thành công', 'success');
	// 	} else {
	// 		oldpassword.classList.add('error');
	// 		oldpassword.setAttribute('placeholder', 'Mật khẩu cũ không đúng');
	// 		oldpassword.value = '';
	// 		oldpassword.focus();
	// 	}
	// });
	const idLogin = localStorage.getItem('idLogin');
	// Tìm user trong mảng accounts
	const account = accounts.find(acc => acc.accountId === idLogin);
	if (!account) {
		console.warn("Không tìm thấy user tương ứng với idLogin:", idLogin);
		return;
	}
	if (account.password === oldpassword.value) {
		account.password = newpassword.value;
		upDateUser(account.idLogin, account);
		document.forms['frmChangePassword'].reset();
		showNotification('Đổi mật khẩu thành công', 'success');
	} else {
 		oldpassword.classList.add('error');
 		oldpassword.setAttribute('placeholder', 'Mật khẩu cũ không đúng');
 		oldpassword.value = '';
 		oldpassword.focus();
 	}

}
function upDateUser(id, updatedUser) {
    // Tìm vị trí user trong mảng accounts theo accountId
    const accountIndex = accounts.findIndex(acc => acc.accountId === id);
    if (accountIndex === -1) {
        console.error("Không tìm thấy user với id:", idLogin);
        showNotification('Không tìm thấy user với username', 'error');
        return;
    }
    
    // Cập nhật thông tin trong accounts (merge dữ liệu cũ với dữ liệu mới)
    accounts[accountIndex] = { ...accounts[accountIndex], ...updatedUser };

    // Tìm và cập nhật thông tin trong mảng customers (giả sử các thuộc tính cần cập nhật cũng có trong customer)
    const customerIndex = customers.findIndex(cus => cus.accountId === id);
    if (customerIndex !== -1) {
        customers[customerIndex] = { ...customers[customerIndex], ...updatedUser };
		localStorage.setItem('customers', JSON.stringify(customers));
    }
	localStorage.setItem('accounts', JSON.stringify(accounts));
    console.log("Cập nhật thành công cho account:", accounts[accountIndex]);
    if (customerIndex !== -1) {
        console.log("Cập nhật thành công cho customer:", customers[customerIndex]);
    }
}
function updateinfor1234(event) {
	event.preventDefault();
	event.stopPropagation();
	let check = true;
	const fullname = document.forms['frminfor']['fullname-infor'];
	const email = document.forms['frminfor']['email-infor'];
	const phone = document.forms['frminfor']['phone-infor'];
	if (checkFrm(fullname, 'Họ và tên không được rỗng', 'Họ và tên') === false) check = false;
	if (checkFrm(email, 'Email không được rỗng', 'Email') === false) check = false;
	if (checkFrm(phone, 'Số điện thoại không được rỗng', 'Số điện thoại') === false) check = false;
	// console.log(check);
	if (isNaN(phone.value)) {
		phone.classList.add('error');
		phone.setAttribute('placeholder', 'Vui lòng nhập số');
		phone.value = '';
		phone.focus();
		check = false;
	}
	if (phone.value.toString().length !== 10) {
		phone.classList.add('error');
		phone.setAttribute('placeholder', 'Vui lòng nhập số điện thoại 10 số');
		phone.value = '';
		phone.focus();
		check = false;
	}
	// console.log(check);
	// if (check) {
	// 	queryUserByUsername(localStorage.getItem('idLogin'), (user) => {
	// 		user.fullname = fullname.value;
	// 		user.email = email.value;
	// 		user.phone = phone.value;
	// 		console.log(user.address.length);
	// 		if (user.address.length > 0) {
	// 			upDateUser(user.username, user);
	// 			showNotification('Cập nhật thông tin thành công', 'success');
	// 		} else {
	// 			showNotification('Cập nhật thông tin không thành công, vui lòng thêm địa chỉ', 'warning');
	// 			document.forms['frminfor']['diachi'].focus();
	// 		}
	// 	});
	// } else {
	// 	showNotification('Cập nhật thông tin không thành công', 'warning');
	// }
	const idLogin = localStorage.getItem('idLogin');
	// Tìm user trong mảng accounts
	if (check) {
		const account = accounts.find(acc => acc.accountId === idLogin);
		const customer = customers.find(cus => cus.accountId === idLogin);
		if (!account || !customer) {
			console.warn("Không tìm thấy user hoặc customer tương ứng với idLogin:", idLogin);
			return;
		}
		// Cập nhật thông tin trong mảng accounts (merge dữ liệu cũ với dữ liệu mới)
		customer.name = fullname.value;
		customer.email = email.value;
		customer.phoneNumber = phone.value;
		if (customer.address.length > 0) {
			upDateUser(account.accountId, account);
			showNotification('Cập nhật thông tin thành công', 'success');
		} else {
			showNotification('Cập nhật thông tin không thành công, vui lòng thêm địa chỉ', 'warning');
			document.forms['frminfor']['diachi'].focus();
		}
	} else {
	 	showNotification('Cập nhật thông tin không thành công', 'warning');
	}
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
	const diachiField = document.forms['frminfor']['diachi']; // Trường địa chỉ số nhà, đường

	document.getElementById('diachi').addEventListener("change", function () {


		callBackdata(function (data) {
			Tinh(data);
		});

		document.getElementById("tinh_address").addEventListener("change", function () {
			const index = this.value;
			console.log(index);
			callBackdata(function (data) {
				Huyen(data, index);
				document.getElementById('huyen_address').addEventListener("change", function () {
					const index2 = this.value;
					console.log(index2);
					callBackdata(function (data) {
						Xa(data, index, index2);
						document.getElementById('xa_address').addEventListener("change", function () {
							const index3 = this.value;
							console.log(this.value + " " + index + " " + index2);
							callBackdata(function (data) {
								console.log(data.data[index].name);
								console.log(data.data[index].level2s[index2].name);
								console.log(data.data[index].level2s[index2].level3s[index3].name);
								document.getElementById('saveaddress-1234').addEventListener("click", function (event) {
									const cc = document.forms['frminfor']['diachi'].value;
									console.log(cc);
									let address = cc + ", " + data.data[index].name + ", " + data.data[index].level2s[index2].name + ", " + data.data[index].level2s[index2].level3s[index3].name;
									if (cc !== "") {
										localStorage.getItem('idLogin'), (user) => {
											if (!Array.isArray(user.address)) {
												user.address = []; // Nếu không phải mảng, khởi tạo mảng trống
											}
											console.log(user.address);
											user.address.push(address);
											upDateUser(user.username, user);
											showNotification('Thêm địa chỉ thành công', 'success');
											showaddress();

										};
										document.getElementById('id-ex-infor-address').style.display = 'none';
										// openinfor1234();
										document.getElementById('id-show-infor-address').style.display = "";
										document.getElementById('diachi').value = "";
										// showaddress();
									}
								});
							});
						});
					});
					// Xa(data, index, index2);
				});
			});
			// Huyen(jsonAddress, index);
		});
	});
}

function deleteaddress1234() {
	const address = document.forms['frminfor']['addree-infor-1234'];
	const index = address.value;
	// dlelete address index
	localStorage.getItem('idLogin'), (user) => {
		user.address.splice(index, 1);
		upDateUser(user.username, user);
		showNotification('Xóa địa chỉ thành công', 'success');
		showaddress();
	};
}

function showaddress() {
	const address = document.forms['frminfor']['addree-infor-1234'];
	address.innerHTML = ``;
	localStorage.getItem('idLogin'), (user) => {
		console.log('showaddress', user.address.length);
		if (Array.isArray(user.address)) {
			user.address.forEach((item, index) => {
				address.innerHTML += `<option value="${index}">${item}</option>`;
			});
		}
	};
}

function showpupupaddress() {
	const exaddress = document.getElementById('id-ex-infor-address');
	exaddress.style.display = 'block';
	document.getElementById('id-show-infor-address').style.display = 'none';
	console.log("showpupupaddress");
	runAddress();
}
// Lấy các phần tử cần thao tác
const header = document.querySelector('.form-layout header');
const toggleLayout = document.querySelector('.toggle-layout');
const innerBtn = document.querySelector('.toggle-right .inner-btn');

// Hàm di chuyển nút từ toggle-right lên header
function moveButtonToHeader() {
    if (innerBtn && header) {
        header.appendChild(innerBtn); // Di chuyển nút lên header
        innerBtn.style.visibility = 'visible'; // Hiển thị nút
    }
}

// Hàm di chuyển nút trở lại toggle-right
function moveButtonToRight() {
    const toggleRight = document.querySelector('.toggle-right');
    if (innerBtn && toggleRight) {
        toggleRight.appendChild(innerBtn); // Di chuyển nút về toggle-right
        innerBtn.style.visibility = 'visible'; // Hiển thị nút (trong trường hợp toggle-right hiện)
    }
}

// Hàm kiểm tra và cập nhật vị trí nút
function updateButtonPosition() {
    if (window.innerWidth <= 600) {
        moveButtonToHeader();
    } else {
        moveButtonToRight();
    }
}

// Lắng nghe sự kiện thay đổi kích thước
window.addEventListener('resize', updateButtonPosition);

// Thực hiện kiểm tra ngay khi trang được tải
updateButtonPosition();