function insertContent(id) {
    let content = document.getElementById("inner-content");
    switch (id) {
        case 1:
            content.innerHTML = `
                <h1>Dashboard</h1>
                <p>Welcome to the dashboard!</p>
            `;
            break;
        case 2:
            content.innerHTML = `
                <h1>Products</h1>
                <p>Manage your products here.</p>
            `;
            break;
        case 3:
            content.innerHTML = `
                <h1>Orders</h1>
                <p>View and manage your orders here.</p>
            `;
            break;
        case 4:
            content.innerHTML = `
                 <div class="container mt-5">
        <h2 class="text-center mb-4">Quản Lý Tài Khoản</h2>

        <!-- Button mở modal thêm tài khoản -->
        <button class="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#userModal" onclick="openModal()">Thêm tài khoản</button>

        <!-- Danh sách tài khoản -->
        <table class="table table-bordered bg-white">
            <thead class="table-dark">
                <tr>
                    <th>#</th>
                    <th>Tên tài khoản</th>
                    <th>Email</th>
                    <th>static</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody id="userTable">
                <!-- Danh sách sẽ được thêm vào đây -->
            </tbody>
        </table>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="userModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalTitle">Thêm tài khoản</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" onclick="closeModal('userModal');"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="userId">
                    <div class="mb-3">
                        <label class="form-label">Tên tài khoản</label>
                        <input type="text" id="username" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Email</label>
                        <input type="email" id="email" class="form-control">
                    </div>
                    <div id="status-id" class="mb-3" style="display: none;">
                        <label class="form-label">Trạng thái</label>
                        <select id="status" class="form-control">
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="closeModal('userModal');">Hủy</button>
                    <button type="button" class="btn btn-primary" id="saveBtn" onclick="saveUser()">Lưu</button>
                </div>
            </div>
        </div>
    </div>
            `;
            renderUsers();
            break;
        default:
            break;
    }
}


