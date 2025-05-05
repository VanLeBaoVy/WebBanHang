document.addEventListener('DOMContentLoaded', () => {
    const link = new URLSearchParams(window.location.search).get('page');
    if (link === 'role_management') {
        fetchPermissions();
    }
});

const tableBodyRole = document.getElementById('tableBodyRole');

function closeModal(idModal) {
    const modalInstance = bootstrap.Modal.getInstance(idModal);
    modalInstance.hide();
}
async function fetchPermissions() {
    try {
        const response = await fetch('../admin/api/role/roleall.php', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const roles = await response.json();
        renderTable(roles);
    } catch (error) {
        console.error('Error fetching permissions:', error);
        const tableBodyRole = document.getElementById('tableBodyRole');
        tableBodyRole.innerHTML = '<tr><td colspan="2">Failed to load data</td></tr>';
    }
}

function renderTable(roles) {
    if (roles.length === 0) {
        tableBodyRole.innerHTML = '<tr><td colspan="2">No data available</td></tr>';
        return;
    }
    console.log(roles);
    // const permissionNames = Object.freeze([
    //     "Quản lý tài khoản",
    //     "Quản lý sản phẩm",
    //     "Quản lý đơn hàng",
    //     "Thống kê"
    // ]);

    // // Template cho ô quyền có checkbox (dành cho Quản lý tài khoản, sản phẩm, đơn hàng)
    // const createPermissionCellWithCheckboxes = ({ add, update, delete: del, status }) => `
    //     <td class="align-middle text-center">
    //         <input class="form-check-input" type="checkbox" ${add ? 'checked' : ''} disabled>
    //     </td>
    //     <td class="align-middle text-center">
    //         <input class="form-check-input" type="checkbox" ${update ? 'checked' : ''} disabled>
    //     </td>
    //     <td class="align-middle text-center">
    //         <input class="form-check-input" type="checkbox" ${del ? 'checked' : ''} disabled>
    //     </td>`;

    // // Template cho ô quyền không có checkbox (dành cho Thống kê, Quản lý quyền)
    // const createPermissionCellWithoutCheckboxes = ({ add, update, delete: del, status }) => `
    //     <td class="align-middle text-center">
    //         <input class="form-check-input" type="checkbox" ${(status === 1) ? 'checked' : ''} disabled>
    //     </td>`;

    // // Template cho cột Thao tác

    tableBodyRole.innerHTML = ''; // Xóa loading
    console.log("skjdhviuds",roles);
    roles.forEach(role => {
        const row = document.createElement('tr');
        let roleBtn = role.role_id !== '1' ? `
        <td class="text-center align-middle">
            <button class="btn btn-danger btn-sm delete-role-btn" onclick="deleteRole(${role.role_id}, '${role.role_name}', event)">Xóa</button>
            <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editRoleModal" onclick="loadRoleDetails(${role.role_id}, '${role.role_name}', event)">Sửa</button>
        </td>` : `<td class="text-center align-middle">hihi</td>`;
        const roleCell = `<td>${role.role_name}</td>`;
        // const permissionsMap = Object.fromEntries(
        //     role.permissions.map(perm => [
        //         perm.permission_name,
        //         { add: perm.add, delete: perm.delete, update: perm.update, status: perm.status }
        //     ])
        // );
        // let permissionCells = permissionNames.map(name => {
        //     if (name === "Thống kê") {
        //         return createPermissionCellWithoutCheckboxes(permissionsMap[name] || { add: false, update: false, delete: false, status: 0 });
        //     }
        //     return createPermissionCellWithCheckboxes(
        //         permissionsMap[name] || { add: false, update: false, delete: false, status: 0 }
        //     );
        // }).join('');
        // if (role.role_id === '1') {
        //     permissionCells += `<td class="align-middle text-center">
        //     <input class="form-check-input" type="checkbox" checked disabled>
        // </td>`;
        // } else {
        //     permissionCells += `<td class="align-middle text-center">
        //     <input class="form-check-input" type="checkbox" disabled>
        // </td>`;
        // }
            row.innerHTML = roleCell + roleBtn;
            tableBodyRole.appendChild(row);
        });


}

document.getElementById('addRoleForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    // Lấy dữ liệu từ form
    const formData = new FormData(e.target);
    const roleData = {
        roleName: '',
        permissions: {}
    };

    // Lấy tên quyền
    roleData.roleName = formData.get('roleName');

    // Lấy dữ liệu permissions
    formData.forEach((value, key) => {
        const match = key.match(/permissions\[(\d+)\]\[(\w+)\]/); // Tìm các key dạng permissions[1][add]
        if (match) {
            const permissionId = match[1]; // ID của quyền (1, 2, 3, 4, ...)
            const action = match[2]; // Hành động (add, update, delete, status)

            // Khởi tạo object cho permission nếu chưa có
            if (!roleData.permissions[permissionId]) {
                roleData.permissions[permissionId] = {
                    add: 0,
                    update: 0,
                    delete: 0,
                    status: 0
                };
            }

            // Gán giá trị (1 nếu checked, 0 nếu không)
            roleData.permissions[permissionId][action] = value === '1' ? 1 : 0;
        }
    });

    console.log('Dữ liệu từ form:', roleData);
    // Gọi hàm thêm quyền
    if (roleData.roleName && Object.keys(roleData.permissions).length > 0) {
        document.getElementById('addRoleError').style.display = 'none'; // Ẩn thông báo lỗi
        fecthAddRole(roleData.roleName, roleData.permissions);
    } else {
        document.getElementById('addRoleError').textContent = 'Vui lòng nhập tên quyền và chọn ít nhất một quyền.';
        document.getElementById('addRoleError').style.display = 'block';
    }
});

async function fecthAddRole(roleName, permissions) {
    console.log(JSON.stringify({ roleName, permissions }));
    try {
        const response = await fetch('../admin/api/role/roleadd.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ roleName, permissions }),
        });
        const result = await response.json();
        if (result.status === "success") {
            fetchPermissions(); // Refresh the table after adding a role
            document.getElementById('addRoleForm').reset(); // Reset the form
            const modal = document.getElementById('addRoleModal');
            document.getElementById('addRoleError').style.display = 'none'; // Ẩn thông báo lỗi
            closeModal(modal);
        } else {
            document.getElementById('addRoleError').textContent = result.message || 'Lỗi khi thêm quyền';
            document.getElementById('addRoleError').style.display = 'block';
        }
    } catch (error) {
        console.error('Error adding role:', error);
    }
}

async function loadRoleDetails(roleId, name, event) {
    event.stopImmediatePropagation();
    event.preventDefault();
    const checkboxes = document.querySelectorAll('#editRoleForm input[type="checkbox"]');
    document.getElementById('editRoleName').value = name;
    document.getElementById('editRoleName').setAttribute('data-role-id', roleId); // Lưu ID quyền vào thuộc tính data-role-id
    console.log('Loading role details for ID:', roleId);
    document.getElementById('editRoleError').style.display = 'none';
    document.getElementById('editRoleError').textContent = '';
    checkboxes.forEach(checkbox => {
        checkbox.checked = false; // Reset all checkboxes to unchecked
        checkbox.disabled = false; // Enable all checkboxes
    });
    try {
        const response = await fetch(`../admin/api/role/roleFindById.php?id=${roleId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const roleDetails = await response.json();
        console.log('Role details fetched successfully:', roleDetails);

        // Đặt trạng thái checkbox


        roleDetails.data.forEach(permission => {
            ['add', 'update', 'delete'].forEach(action => {
                const checkbox = document.querySelector(`#editRoleForm input[name="permissions[${permission.id}][${action}]"]`);
                if (checkbox) {
                    console.log(permission[action]);
                    checkbox.checked = permission[action];
                }
            });

            // Xử lý status (nếu có, ví dụ cho "Thống kê")
            if (permission.status !== null) {
                const statusCheckbox = document.querySelector(`#editRoleForm input[name="permissions[${permission.id}][status]"]`);
                if (statusCheckbox) {
                    statusCheckbox.checked = permission.status; // Tích chọn nếu status là true
                }
            }
        });

    } catch (error) {
        console.error('Error fetching role details:', error);
    }
}

// Xử lý lưu dữ liệu khi nhấn nút "Lưu"
document.getElementById('editRoleForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Ngăn hành động mặc định của form

    const roleId = document.getElementById('editRoleName').getAttribute('data-role-id'); // Lấy ID quyền từ thuộc tính data-role-id
    const roleName = document.getElementById('editRoleName').value;
    let permissions = Array.from(
        document.querySelectorAll('#editRoleForm input[type="checkbox"]:checked')
    ).map(input => {
        const name = input.getAttribute('name'); // Lấy tên đầy đủ, ví dụ: permissions[2][add]
        const matches = name.match(/permissions\[(\d+)\]\[(\w+)\]/); // Phân tích permission_id và action
        if (matches) {
            const permissionId = matches[1]; // Ví dụ: "2"
            const action = matches[2];       // Ví dụ: "add"
            return {
                permission_id: permissionId,
                action: action,
                value: input.value             // Giá trị của checkbox, thường là "1"
            };
        }
        return null; // Trả về null nếu không khớp
    }).filter(item => item !== null); // Loại bỏ các giá trị null

    permissions = permissions.reduce((acc, curr) => {
        const id = curr.permission_id;
        let permission = acc.find(p => p.permission_id === id);
        if (!permission) {
            permission = { permission_id: id, add: 0, update: 0, delete: 0, status: 0 };
            acc.push(permission);
        }
        if (curr.value === '1') {
            permission[curr.action] = 1; // Nếu checkbox được chọn, gán giá trị 1
        }
        return acc;
    }, []);

    console.log('Role ID:sDgdfjnfgmghmc  ', roleId); // In ra ID quyền để kiểm tra  
    console.log('Tên quyền:', roleName);
    console.log('Quyền:', permissions);

    if (roleName && permissions.length > 0) {
        try {
            await fetchEditRole(roleId, roleName, permissions);
            console.log('Role edit completed successfully.');
            const modal = document.getElementById('editRoleModal');
            closeModal(modal);
        } catch (error) {
            console.error('Error during role edit:', error);
        }
    } else {
        document.getElementById('editRoleError').textContent = 'Vui lòng nhập tên quyền và chọn ít nhất một quyền.';
        document.getElementById('editRoleError').style.display = 'block';
    }
});

async function fetchEditRole(roleId, roleName, permissions) {
    console.log(JSON.stringify({ roleId, roleName, permissions }));
    try {
        const response = await fetch('../admin/api/role/roleEdit.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ roleId, roleName, permissions }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log('Cập nhật quyền thành công:', result);
        fetchPermissions(); // Refresh the table after editing a role
    } catch (error) {
        console.error('Error editing role:', error);
    }
}

function deleteRole(roleId, rolename, event) {
    event.stopImmediatePropagation();
    event.preventDefault();
    const confirmDeleteModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
    confirmDeleteModal.show();
    document.getElementById('deleteRoleName').textContent = `Bạn có chắc chắn muốn xóa quyền ${rolename} không?`;
    document.getElementById('confirmDeleteButton').onclick = async function () {
        try {
            const response = await fetch(`../admin/api/role/roleDelete.php?id=${roleId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            console.log('Xóa quyền thành công:', result);
            fetchPermissions(); // Refresh the table after deleting a role
            confirmDeleteModal.hide();
        } catch (error) {
            console.error('Error deleting role:', error);
        }
    };
}

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInputRole');
    const tableBodyRole = document.getElementById('tableBodyRole');

    searchInput.addEventListener('input', function () {
        const filter = searchInput.value.toLowerCase();
        const rows = tableBodyRole.getElementsByTagName('tr');
        Array.from(rows).forEach(row => {
            const cells = row.getElementsByTagName('td');
            let match = false;

            Array.from(cells).forEach(cell => {
                if (cell.textContent.toLowerCase().includes(filter)) {
                    match = true;
                }
            });

            row.style.display = match ? '' : 'none';
        });
    });
});