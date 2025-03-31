let users = [
    { id: 1, username: "admin", email: "admin@example.com" , status:"active"},
    { id: 2, username: "user1", email: "user1@example.com", status:"active"},
];

function renderUsers() {
    const table = document.getElementById("userTable");
    table.innerHTML = "";

    users.forEach((user, index) => {
        table.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.status}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="openModal(${user.id})">
                        <i class="fas fa-edit"></i> Sửa
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">
                        <i class="fas fa-trash"></i> Xóa
                    </button>
                </td>
            </tr>
        `;
    });
}


function openModal(id = null) {
    const modalTitle = document.getElementById("modalTitle");
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const userIdInput = document.getElementById("userId");

    if (id) {
        const user = users.find(user => user.id === id);
        userIdInput.value = id;
        usernameInput.value = user.username;
        emailInput.value = user.email;
        const statusInput = document.getElementById("status-id");
        statusInput.value = user.status;
        statusInput.style.display = "block"; // Hiện trạng thái
        modalTitle.textContent = "Chỉnh sửa tài khoản";
    } else {    
        userIdInput.value = "";
        usernameInput.value = "";
        emailInput.value = "";
        modalTitle.textContent = "Thêm tài khoản";
    }

    const modal = new bootstrap.Modal(document.getElementById("userModal"));
    modal.show();
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) {
        console.error(`Modal với ID "${modalId}" không tồn tại!`);
        return;
    }

    const bsModal = bootstrap.Modal.getInstance(modal);
    if (bsModal) {
        bsModal.hide();
    }

    document.querySelectorAll(".modal-backdrop").forEach(el => el.remove());

    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
}


function saveUser() {
    const id = document.getElementById("userId").value;
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const status = document.getElementById("status").value;

    if (username === "" || email === "") {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    if (id) {
        const user = users.find(user => user.id == id);
        user.username = username;
        user.email = email;
        user.status = status;
    } else {
        const newUser = {
            id: users.length + 1,
            username,
            email,
            status: "active"
        };
        users.push(newUser);
    }

    renderUsers();
    closeModal('userModal');
}

function deleteUser(id) {
    if (confirm("Bạn có chắc chắn muốn xóa tài khoản này?")) {
        users = users.filter(user => user.id !== id);
        renderUsers();
    }
}
