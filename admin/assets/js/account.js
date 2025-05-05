const now = new Date().toISOString().slice(0, 19).replace("T", " ");
document.addEventListener('DOMContentLoaded', () => {
    const link = new URLSearchParams(window.location.search).get('page');
    if (link === 'account_management') {
        fetchAccountData();
    }
});

function closeModal(idModal) {
    const modalInstance = bootstrap.Modal.getInstance(idModal);
    modalInstance.hide();
}

const tableBodyAccount = document.getElementById('tableBodyAccount');
async function fetchAccountData() {
    console.log('Fetching account data...');
    try {
        const response = await fetch('../admin/api/account/accountall.php', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        console.log(data);
        if (data) {
            renderAccount(data);
        } else {
            tableBodyAccount.innerHTML = '<tr><td colspan="5" class="text-center">Không có dữ liệu</td></tr>';
        }
    } catch (error) {
        console.error('Error fetching account data:', error);
        tableBodyAccount.innerHTML = '<tr><td colspan="5" class="text-center">Không có dữ liệu</td></tr>';
    }
}

async function renderAccount(accounts) {
    if (!accounts || accounts.length === 0) {
        tableBodyAccount.innerHTML = '<tr><td colspan="5" class="text-center">Không có dữ liệu</td></tr>';
        return;
    }

    const rows = accounts.map(account => `
        <tr data-bs-toggle="modal" data-bs-target="#updateAccountModal" data-id="${account.id}" data-role-id="${account.role_id}">
            <td>${account.username}</td>
            <td>${account.email}</td>
            <td>${account.role}</td>
            <td class="text-center">
                <span class="badge ${account.status === 'active' ? 'bg-success' : 'bg-danger'}">${account.status === "active" ? "Hoạt động" : "Khóa tài khoản"}</span>
            </td>
            <td>${account.created_at}</td>
            <td>${account.updated_at}</td>
        </tr>`).join('');
    tableBodyAccount.innerHTML = rows;
}

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInputAccount');
    const tableBodyAccount = document.getElementById('tableBodyAccount');

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const rows = tableBodyAccount.querySelectorAll('tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            let match = false;
            cells.forEach(cell => {
                if (cell.textContent.toLowerCase().includes(searchTerm)) {
                    match = true;
                }
            });
            row.style.display = match ? '' : 'none';
        });
    });
});

document.getElementById('addAccountForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log('Form data:', Object.fromEntries(formData.entries()));
    const data = Object.fromEntries(formData.entries());
    for (const key in data) {
        if (data[key] === '') {
            console.log('Missing field:', key);
            document.getElementById('addAccountError').textContent = 'Vui lòng điền đầy đủ thông tin: ' + (key === "role" ? "Quyền" : key === "status" ? "Trạng thái" : key);
            document.getElementById('addAccountError').style.display = 'block';
            return;
        } else {
            document.getElementById('addAccountError').style.display = 'none';
        }
        // them check email, phone, username bang regex
    }
    fetchAddAccount(data);
});

async function fetchAddAccount(data) {
    console.log('Adding account...');
    try {
        const response = await fetch('../admin/api/account/addaccount.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        console.log(result);
        if (result.status === 'success') {
            fetchAccountData(); // Refresh the account data
            document.getElementById('addAccountForm').reset(); // Reset the form
            const modal = document.getElementById('addAccountModal');
            closeModal(modal);
        } else {
            document.getElementById('addAccountError').textContent = result.message || 'Lỗi khi thêm tài khoản';
            document.getElementById('addAccountError').style.display = 'block';
        }
    } catch (error) {
        console.error('Error adding account:', error);
    }
}

document.getElementById('tableBodyAccount').addEventListener('click', async (event) => {
    const row = event.target.closest('tr');
    if (!row || !row.dataset.id) return;

    const accountId = row.dataset.id;
    console.log('Fetching account details for ID:', accountId);
    try {
        const response = await fetch(`../admin/api/account/getaccount.php?id=${accountId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        if (data.status === 'success') {
            const account = data.data;
            console.log('Account details:', account);
            // reset form
            document.getElementById("updateAccountForm").reset();
            document.getElementById("updateAccountError").style.display = 'none';
            rederAccountDetail(account);
        } else {
            console.error('No account data found for ID:', accountId);
        }
    } catch (error) {
        console.error('Error fetching account details:', error);
    }
});

async function fetchRoles() {
    try {
        const response = await fetch('../admin/api/role/getrole.php', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error('Error fetching roles:', error);
    }
}
async function fetchAddress(id) {
    try {
        const response = await fetch(`../admin/api/account/getaddressbyid.php?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error('Error fetching address:', error);
    }
}
async function rederAccountDetail(account) {
    if (document.getElementById("btn_edit_update")) {
        document.getElementById("btn_edit_update").setAttribute("data-id-update", account.id);
    }
    document.getElementById("updateAccountModal").setAttribute("data-id", account.id);
    document.getElementById("updateUsername").value = account.username || "";
    document.getElementById("updateEmail").value = account.email || "";
    document.getElementById("updateFullname").value = account.fullname || "";
    document.getElementById("updatePhoneNumber").value = account.phone_number || "";
    document.getElementById("updateCreated").value = account.created || "";
    document.getElementById("updateUpdated").value = account.updated || "";
    document.getElementById("updateStatus").value = account.status === "active" ? "Hoạt động" : "Khóa tài khoản";
    const data = await fetchRoles();
    const updateRoleElement = document.getElementById("updateRoleId");
    if (updateRoleElement) {
        updateRoleElement.innerHTML = ""; // Clear existing options
        data.forEach(role => {
            const option = document.createElement("option");
            option.value = role.id;
            option.textContent = role.name;
            if (parseInt(role.id) === parseInt(account.role_id)) {
                option.selected = true; // Set selected attribute for the matching role
            }
            updateRoleElement.appendChild(option);
        });
    } else {
        console.error("Element with ID 'updateRole' not found.");
    }
    const dataAddress = await fetchAddress(account.id);
    if (dataAddress === null) {
        document.getElementById("updateAddress").innerHTML = '<option value="">Không có địa chỉ</option>';
        return;
    }
    console.log(dataAddress);
    const updateAddressElement = document.getElementById("updateAddress");
    if (updateAddressElement) {
        updateAddressElement.innerHTML = ""; // Clear existing options
        dataAddress.forEach(address => {
            const option = document.createElement("option");
            option.value = address.id;
            if (address.street !== null && address.ward !== null && address.district !== null && address.city !== null) {
                let addressName = address.street + ", " + address.ward + ", " + address.district + ", " + address.city;
                option.textContent = addressName;
                updateAddressElement.appendChild(option);
            }
        });
        if (updateAddressElement.options.length === 0) {
            const option = document.createElement("option");
            option.value = "";
            option.textContent = "Không có địa chỉ";
            updateAddressElement.appendChild(option);
        }
    } else {
        console.error("Element with ID 'updateAddress' not found.");
    }
}

function submitEdit(event) {
    event.preventDefault(); // Ngăn reload 
    const form = document.getElementById("updateAccountForm");
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()); // Chuyển FormData → object 
    console.log('Form data:', data);
    for (const key in data) {
        if (data[key] === '') {
            console.log('Missing field:', key);
            document.getElementById('updateAccountError').textContent = 'Vui lòng điền đầy đủ thông tin';
            document.getElementById(key).focus();
            document.getElementById('updateAccountError').style.display = 'block';
            return;
        } else {
            document.getElementById('updateAccountError').style.display = 'none';
        }
    }
    const id = document.getElementById("btn_edit_update").getAttribute("data-id-update");
    data.id = id;
    console.log('Form data: jkasfkhsuc', data);
    fetchEditAccount(data);
}

async function fetchEditAccount(data) {
    console.log('Editing account...');
    try {
        const response = await fetch('../admin/api/account/editaccount.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        console.log(result);
        if (result.status === 'success') {
            fetchAccountData(); // Refresh the account data
            const modal = document.getElementById('updateAccountModal');
            closeModal(modal);
        } else {
            document.getElementById('updateAccountError').textContent = result.message || 'Lỗi khi sửa tài khoản';
            document.getElementById('updateAccountError').style.display = 'block';
        }
    } catch (error) {
        console.error('Error editing account:', error);
    }
}

function submitBanned(event) {
    event.preventDefault();
    console.log('Banning account...');
    const form = document.getElementById("updateAccountForm");
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()); // Chuyển FormData → object
    console.log('Form data:', data);
    const id = document.getElementById("updateAccountModal").getAttribute("data-id");
    const status = data.updateStatus === "Hoạt động" ? "banned" : "active";
    console.log("data", JSON.stringify({ id, status }));
    const confirmModal = new bootstrap.Modal(document.getElementById('confirmAccountModal'));
    confirmModal.show();
    const note = status === "banned" ? "Khóa" : "Mở khóa";
    document.getElementById('confirmAccountModalBody').textContent = `Bạn có chắc chắn muốn ${note} tài khoản này không?`;
    document.getElementById('confirmBanned').onclick = async () => {
        const confirmModalInstance = bootstrap.Modal.getInstance(document.getElementById('confirmAccountModal'));
        confirmModalInstance.hide();
        try {
            const response = await fetch('../admin/api/account/toggleaccount.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, status })
            });
            const result = await response.json();
            console.log(result);
            if (result.success) {
                try {
                    const response = await fetch(`../admin/api/account/getaccount.php?id=${id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    const data = await response.json();
                    console.log(data);
                    if (data.status === 'success') {
                        const account = data.data;
                        console.log('Account details:', account);
                        rederAccountDetail(account);
                        fetchAccountData(); // Refresh the account data
                    } else {
                        console.error('No account data found for ID:', accountId);
                    }
                } catch (error) {
                    console.error('Error fetching account details:', error);
                }

            } else {
                console.error('Error banning account:', result.message);
            }
        }
        catch (error) {
            console.error('Error banning account:', error);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const sortAccount = document.getElementById('sortAccount'); // Dropdown lọc theo quyền
    const tableBodyAccount = document.getElementById('tableBodyAccount'); // Bảng danh sách tài khoản

    // Lắng nghe sự kiện thay đổi trên dropdown
    sortAccount.addEventListener('change', () => {
        const selectedRoleId = sortAccount.value; // Lấy giá trị được chọn từ dropdown

        // Lấy tất cả các hàng trong bảng
        const rows = tableBodyAccount.querySelectorAll('tr');

        rows.forEach(row => {
            const roleId = row.getAttribute('data-role-id'); // Lấy giá trị role_id từ thuộc tính data-role-id của hàng

            // Kiểm tra xem hàng có thuộc quyền được chọn hay không
            if (selectedRoleId === '' || roleId === selectedRoleId) {
                row.style.display = ''; // Hiển thị hàng nếu thuộc quyền được chọn hoặc không có quyền nào được chọn
            } else {
                row.style.display = 'none'; // Ẩn hàng nếu không thuộc quyền được chọn
            }
        });
    });
});