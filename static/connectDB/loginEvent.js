	let accounts = [];
	let profiles = [];
	let roles = [];
	let address = [];
	let role_permissions = [];
dataLoaded = false;
	async function fetchLogin() {
		accounts = [];
		profiles = [];
		roles = [];
		address = [];
		role_permissions = [];
		try {
			const [accountsRes, addressRes, profilesRes, rolesRes, role_permissionsRes] = await Promise.all([
				fetch('../static/connectDB/get_accounts.php'),
				fetch('../static/connectDB/get_address.php'),
				fetch('../static/connectDB/get_profiles.php'),
				fetch('../static/connectDB/get_roles.php'),
				fetch('../static/connectDB/get_role_permissions.php')
			]);

			if (!accountsRes.ok || !addressRes.ok || !profilesRes.ok || !rolesRes.ok || !role_permissionsRes.ok) {
				throw new Error("Có lỗi khi fetch một trong các file PHP");
			}

			const [accountsData, addressData, profilesData, rolesData, role_permissionsData] = await Promise.all([
				accountsRes.json(),
				addressRes.json(),
				profilesRes.json(),
				rolesRes.json(),
				role_permissionsRes.json()
			]);

			// Lưu vào biến toàn cục hoặc dùng tiếp
			accounts = accountsData;
			console.log(accounts);
			address = addressData;
			console.log(address);
			profiles = profilesData;
			console.log(profiles);
			roles = rolesData;
			console.log(roles);
			role_permissions = role_permissionsData;
			console.log(role_permissions);
			dataLoaded = true;
		} catch (error) {
			console.error("Lỗi khi tải dữ liệu:", error);
		}
	}
	window.addEventListener("DOMContentLoaded", async () => {
		await fetchLogin(); // đảm bảo xong rồi mới cho người dùng thao tác
		await fetchPurchase();
	});
	function showSignUp(event) {
		if (!dataLoaded) {
			showNotification("Đang tải dữ liệu, vui lòng đợi...", "warning");
			return false;
		}
		event.preventDefault();
		event.stopPropagation();
		const fullNameSignUp = document.forms['frmSignUp']['fullname-signUp'];
		const passwordSignUp = document.forms['frmSignUp']['password-signUp'];
		if (checkFrm(fullNameSignUp, 'Tên tài khoản không được rỗng', 'Tên tài khoản') === false) return false;
		if (checkFrm(passwordSignUp, 'Mật khẩu không được rỗng', 'Mật khẩu') === false) return false;
			console.log("username:" + fullNameSignUp.value);
			console.log("pass: " + passwordSignUp.value);
			console.log("check account:" + accounts);
			const account = accounts.find(acc => 
				acc.username === fullNameSignUp.value && acc.password === passwordSignUp.value
			);
			if (account) {
				if (account.status === "banned") {
					showNotification('Tài khoản của bạn bị khóa', 'error');
				} else {
					// Nếu cần, bạn vẫn có thể lưu thông tin đăng nhập vào localStorage hoặc xử lý theo ý muốn khác
					localStorage.setItem('idLogin', account.id);
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
	function showSignIn(event) {
		if (!dataLoaded) {
			showNotification("Đang tải dữ liệu, vui lòng đợi...", "warning");
			return false;
		}
		event.preventDefault();
		event.stopPropagation();
		const fullNameSignIn = document.forms['frmSignIn']['fullname-signIn'];
		const passwordSignIn = document.forms['frmSignIn']['password-signIn'];
		const recordPasswordSignIn = document.forms['frmSignIn']['recordpassword-signIn'];
		const changeMethodNE = document.getElementById('change-method-NE');
		let emailSignIn, phoneNumberSignIn;
		if (checkFrm(fullNameSignIn, 'Tên tài khoản không được rỗng', 'Tên tài khoản') === false) return false;
		emailSignIn = document.forms['frmSignIn']['email-signIn'];
			if (!checkEmail(emailSignIn.value)){
				console.log("emailSignIn:", emailSignIn);
				showNotification('Email không đúng định dạng', 'warning');
				return false;
			}
			phoneNumberSignIn = document.forms['frmSignIn']['phoneNumber-signIn'];
			if (checkFrm(phoneNumberSignIn, 'Số điện thoại không được rỗng', 'Phone') === false) return false;
			if (checkFrm(emailSignIn, 'Email không được rỗng', 'Email') === false) return false;
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
		const isExisting = accounts.some(acc => acc.username === fullNameSignIn.value);
		if (isExisting) {
			fullNameSignIn.classList.add('error');
			fullNameSignIn.setAttribute('placeholder', 'Tên tài khoản đã tồn tại');
			fullNameSignIn.value = '';
			fullNameSignIn.focus();
			return false;
		}

		// Thêm vào mảng accounts
		let account = {
			password: passwordSignIn.value,
			username: fullNameSignIn.value,
			email: emailSignIn ? emailSignIn.value : '',
        	role_id: '1',
			status: 'active',
			created: new Date().toISOString().slice(0, 19).replace('T', ' '),
			updated: new Date().toISOString().slice(0, 19).replace('T', ' ')
		};
		let profile = {
			phone_number: phoneNumberSignIn ? phoneNumberSignIn.value : ''
		};
		console.log("account: ", account);
		console.log("profile: ", profile);
		document.forms['frmSignIn'].reset();
		fetch('../static/connectDB/insertProfileLogin.php', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
			account: account,
			phone: profile.phone_number,
			})
		})
		.then(res => res.json())
		.then(data => {
			if (data.success) {
			accounts.push(data.account);
			console.log("accounts:", accounts);
			showNotification("Đăng ký tài khoản thành công",'success');
			fetchLogin();
			} else {
			alert("Lỗi khi check-in: " + data.error);
			}
		});
		closeFormLogin();
	}
	function changepassword1234(event) {
	if (!dataLoaded) {
        showNotification("Đang tải dữ liệu, vui lòng đợi...", "warning");
        return false;
    }
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
		const idLogin = localStorage.getItem('idLogin');
		console.log("Tài khoản cần đổi mật khẩu: " + idLogin);
		console.log("Các tài khoản: " + accounts);
		// Tìm user trong mảng accounts
		const account = accounts.find(acc => acc.id === idLogin);
		if (!account) {
			console.warn("Không tìm thấy user tương ứng với idLogin:", idLogin);
			return;
		}
		if (account.password === oldpassword.value) {
			account.password = newpassword.value;
			document.forms['frmChangePassword'].reset();
			fetch('../static/connectDB/updatePassword.php', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					idLogin: idLogin,
					newPassword: account.password
				})
			})
			.then(res => res.json())
			.then(data => {
				if (data.success) {
					document.forms['frmChangePassword'].reset();
					showNotification('Đổi mật khẩu thành công', 'success');
				} else {
					showNotification('Đổi mật khẩu thất bại: ' + data.message, 'error');
				}
			})
			.catch(error => {
				console.error('Error:', error);
				showNotification('Có lỗi xảy ra', 'error');
			});
		} else {
			oldpassword.classList.add('error');
			oldpassword.setAttribute('placeholder', 'Mật khẩu cũ không đúng');
			oldpassword.value = '';
			oldpassword.focus();
		}
	}
	function upDateUserAddress(id, updatedUser, address) {
		// Cập nhật local
	if (!dataLoaded) {
        showNotification("Đang tải dữ liệu, vui lòng đợi...", "warning");
        return false;
    }
		const accountIndex = accounts.findIndex(acc => acc.id === id);
		console.log(accountIndex);
		if (accountIndex === -1) {
			console.error("Không tìm thấy user với id:", id);
			showNotification('Không tìm thấy user với id', 'error');
			return;
		}
		accounts[accountIndex] = { ...accounts[accountIndex], ...updatedUser };

		const profileIndex = profiles.findIndex(pro => pro.id === id);
		console.log(profileIndex);
		if (profileIndex !== -1) {
			profiles[profileIndex] = { ...profiles[profileIndex], ...updatedUser };
		}
		console.log("Cập nhật thành công local cho account:", accounts[accountIndex]);
		let profile = profiles.find(pro => pro.id === id);
		// Gửi dữ liệu lên server để lưu database
		fetch('../static/connectDB/updateUserAddress.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: id,
				phone: profile.phone_number,
				updatedUser: updatedUser,
				address: address
			})
		})
		.then(response => response.json())
		.then(data => {
			if (data.success) {
				showNotification('Cập nhật thành công database', 'success');
				showaddress();
			} else {
				showNotification('Lỗi cập nhật database: ' + (data.message || data.error), 'error');
			}
		})
		.catch(error => {
			console.error('Fetch error:', error);
			showNotification('Lỗi kết nối server', 'error');
		});
	}
	function updateinfor1234(event) {
		event.preventDefault();
		event.stopPropagation();
		let check = true;
	if (!dataLoaded) {
        showNotification("Đang tải dữ liệu, vui lòng đợi...", "warning");
        return false;
    }
		const fullname = document.forms['frminfor']['fullname-infor'];
		const email = document.forms['frminfor']['email-infor'];
		const phone = document.forms['frminfor']['phone-infor'];

		if (checkFrm(fullname, 'Họ và tên không được rỗng', 'Họ và tên') === false) check = false;
		if (checkFrm(email, 'Email không được rỗng', 'Email') === false) check = false;
		if (checkFrm(phone, 'Số điện thoại không được rỗng', 'Số điện thoại') === false) check = false;

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

		const idLogin = localStorage.getItem('idLogin');

		if (check) {
			const profile = profiles.find(pro => pro.id === idLogin);
			const account = accounts.find(acc => acc.id === idLogin);

			if (!account || !profile) {
				console.warn("Không tìm thấy user hoặc profile với idLogin:", idLogin);
				return;
			}

			// Gửi dữ liệu cập nhật qua API PHP
			const dataToSend = {
				id: idLogin,
				updatedUser: {
					fullname: fullname.value.trim(),
					email: email.value.trim(),
					phone_number: phone.value.trim()
				}
			};

			fetch('../static/connectDB/user_update.php', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(dataToSend)
			})
			.then(response => response.json())
			.then(data => {
				console.log('Kết quả update:', data);
				if (data.success) {
					// Cập nhật lại dữ liệu local
					profile.fullname = fullname.value.trim();
					account.email = email.value.trim();
					profile.phone_number = phone.value.trim();

					showNotification('Cập nhật thông tin thành công', 'success');
				} else {
					showNotification('Cập nhật thông tin không thành công', 'warning');
				}
			})
			.catch(error => {
				console.error('Lỗi khi cập nhật:', error);
				showNotification('Lỗi máy chủ khi cập nhật', 'error');
			});

		} else {
			showNotification('Cập nhật thông tin không thành công', 'warning');
		}
	}
	// Hàm gửi mật khẩu mới tới server PHP
	function saveNewPasswordToDatabase(accountId, newPassword) {
		console.log("account cần đổi có id: " + accountId);
		console.log("Pass mới: " + newPassword);
	if (!dataLoaded) {
        showNotification("Đang tải dữ liệu, vui lòng đợi...", "warning");
        return false;
    }
		fetch('../static/connectDB/update_password.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				accountId: accountId,
				newPassword: newPassword
			})
		})
		.then(response => response.json())
		.then(data => {
			if (data.success) {
				showNotification("Cập nhật mật khẩu thành công!", "success");
				fetchLogin();
			} else {
				showNotification("Cập nhật mật khẩu thất bại!", "error");
			}
		})
		.catch(error => {
			console.error('Lỗi khi cập nhật mật khẩu:', error);
			showNotification("Có lỗi xảy ra khi cập nhật!", "error");
		});
	}
	function deleteaddress1234() {
		const addressSelect = document.forms['frminfor']['addree-infor-1234'];
		const addressId = addressSelect.value;
	if (!dataLoaded) {
        showNotification("Đang tải dữ liệu, vui lòng đợi...", "warning");
        return false;
    }
		if (!addressId) {
			showNotification('Vui lòng chọn địa chỉ để xóa', 'error');
			return;
		}
	
		fetch('../static/connectDB/deleteUserAddress.php', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: addressId })
		})
		.then(response => response.json())
		.then(data => {
			if (data.success) {
				showNotification('Xóa địa chỉ thành công', 'success');
				fetchLogin();
				showaddress(); // Reload lại danh sách
			} else {
				showNotification('Lỗi xóa địa chỉ: ' + (data.message || data.error), 'error');
			}
		})
		.catch(error => {
			console.error('Fetch error:', error);
			showNotification('Lỗi kết nối server khi xóa địa chỉ', 'error');
		});
	}
	function showaddress() {
		const addressSelect = document.forms['frminfor']['addree-infor-1234'];
		addressSelect.innerHTML = ``;
	  if (!dataLoaded) {
        showNotification("Đang tải dữ liệu, vui lòng đợi...", "warning");
        return false;
      }
		const idLogin = localStorage.getItem('idLogin');
		if (!idLogin) {
			console.error("Không tìm thấy idLogin trong localStorage");
			return;
		}
	
		fetch('../static/connectDB/getUserAddress.php?id=' + idLogin)
			.then(response => response.json())
			.then(data => {
				if (data.success && Array.isArray(data.addresses)) {
					data.addresses.forEach((item, index) => {
						const fullAddress = `${item.street}, ${item.ward}, ${item.district}, ${item.city}`;
						addressSelect.innerHTML += `<option value="${item.id}">${fullAddress}</option>`;
					});
				} else {
					showNotification('Không tìm thấy địa chỉ', 'error');
				}
			})
			.catch(error => {
				console.error('Fetch error:', error);
				showNotification('Lỗi kết nối server khi tải địa chỉ', 'error');
			});
	}