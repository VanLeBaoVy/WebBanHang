<?php
class DatabaseRole
{
    private $host = 'localhost';
    private $username = 'root';
    private $password = '';
    private $database = 'webbanhang';
    private $connection;

    public function __construct()
    {
        $this->connect();
    }

    private function connect()
    {
        $this->connection = new mysqli($this->host, $this->username, $this->password, $this->database);

        if ($this->connection->connect_error) {
            die("Connection failed: " . $this->connection->connect_error);
        }
    }

    public function getConnection()
    {
        return $this->connection;
    }

    public function closeConnection()
    {
        if ($this->connection) {
            $this->connection->close();
        }
    }

    public function getAllRoles()
    {
        $sql = "SELECT * FROM webbanhang.roles";
        $result = $this->connection->query($sql);
        $roles = [];

        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $roles[] = $row;
            }
            return $roles;
        } else {
            return null;
        }
    }
    
    public function getAllRolesGrouped()
    {
        $sql = "SELECT 
                    r.id AS role_id,
                    r.name AS role_name,
                    p.name AS permission_name,
                    rp.add, rp.delete, rp.update, rp.status
                FROM webbanhang.roles r
                JOIN webbanhang.role_permission rp ON r.id = rp.role_id
                JOIN webbanhang.permissions p ON rp.permission_id = p.id
                ORDER BY r.id, p.id;";

        $result = $this->connection->query($sql);
        $roles = [];

        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $role_id = $row['role_id'];

                if (!isset($roles[$role_id])) {
                    $roles[$role_id] = [
                        'role_id' => $role_id,
                        'role_name' => $row['role_name'],
                        'permissions' => []
                    ];
                }

                // Thêm thông tin chi tiết của permission
                $roles[$role_id]['permissions'][] = [
                    'permission_name' => $row['permission_name'],
                    'add' => (bool)$row['add'], // Ép kiểu về boolean
                    'delete' => (bool)$row['delete'],
                    'update' => (bool)$row['update'],
                    'status' => (int)$row['status'] // Ép kiểu về int
                ];
            }

            // Reset index để trả về là array tuần tự (không dùng key theo role_id)
            return array_values($roles);
        } else {
            return null;
        }
    }
    public function addRole($roleName, $permissions)
    {
        // Kiểm tra ten quyen đã tồn tại hay chưa
        $stmt = $this->connection->prepare("SELECT id FROM webbanhang.roles WHERE name = ?");
        $stmt->bind_param("s", $roleName);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            return false; // Tên quyền đã tồn tại
        }

            $stmt = $this->connection->prepare("INSERT INTO webbanhang.roles (name) VALUES (?)");
            $stmt->bind_param("s", $roleName);
            $stmt->execute();
            $roleId = $this->connection->insert_id;
        
            // Thêm permissions
            foreach ($permissions as $permissionId => $actions) {
                $add = $actions['add'] ?? 0;
                $update = $actions['update'] ?? 0;
                $delete = $actions['delete'] ?? 0;
                $status = $actions['status'] ?? 0;
        
                $stmt = $this->connection->prepare(
                    "INSERT INTO webbanhang.role_permission (role_id, permission_id, `add`, `update`, `delete`, `status`) VALUES (?, ?, ?, ?, ?, ?)"
                );
                $stmt->bind_param("iiiiii", $roleId, $permissionId, $add, $update, $delete, $status);
                $stmt->execute();
            }       
            return true;
    }
    public function findById($roleId)
    {
        $sql = "SELECT p.id, rp.add, rp.update, rp.delete, rp.status 
                FROM webbanhang.role_permission rp
                INNER JOIN webbanhang.permissions p ON rp.permission_id = p.id
                WHERE rp.role_id = ?";
        $stmt = $this->connection->prepare($sql);
        $stmt->bind_param("i", $roleId);
        $stmt->execute();
        $result = $stmt->get_result();
    
        $permissions = [];
        while ($row = $result->fetch_assoc()) {
            $permissions[] = [
                'id' => $row['id'],
                'add' => (bool)$row['add'],    // Chuyển sang boolean nếu cần
                'update' => (bool)$row['update'],
                'delete' => (bool)$row['delete'],
                'status' => $row['status']     // Giữ nguyên kiểu dữ liệu gốc
            ];
        }
    
        return $permissions;
    }

    public function updateRole($roleId, $roleName, $permissions)
    {
        // Bắt đầu giao dịch để đảm bảo tính toàn vẹn dữ liệu
        $this->connection->begin_transaction();
    
        try {
            // Cập nhật tên quyền
            $stmt = $this->connection->prepare("UPDATE webbanhang.roles SET name = ? WHERE id = ?");
            $stmt->bind_param("si", $roleName, $roleId);
            $stmt->execute();
    
            // Xóa tất cả quyền hiện tại của vai trò này
            $stmt = $this->connection->prepare("DELETE FROM webbanhang.role_permission WHERE role_id = ?");
            $stmt->bind_param("i", $roleId);
            $stmt->execute();
    
            // Thêm lại các quyền mới
            if (!empty($permissions)) {
                $stmt = $this->connection->prepare("
                    INSERT INTO webbanhang.role_permission (role_id, permission_id, `add`, `update`, `delete`, `status`) 
                    VALUES (?, ?, ?, ?, ?, ?)
                ");
                
                foreach ($permissions as $permission) {
                    $permissionId = $permission['permission_id'];
                    $add = isset($permission['add']) ? (int)$permission['add'] : 0;
                    $update = isset($permission['update']) ? (int)$permission['update'] : 0;
                    $delete = isset($permission['delete']) ? (int)$permission['delete'] : 0;
                    $status = isset($permission['status']) ? (int)$permission['status'] : 0;
    
                    $stmt->bind_param("iiiiii", $roleId, $permissionId, $add, $update, $delete, $status);
                    $stmt->execute();
                }
            }
    
            // Cam kết giao dịch
            $this->connection->commit();
            return true;
        } catch (Exception $e) {
            // Nếu có lỗi, hủy giao dịch
            $this->connection->rollback();
            throw $e; // Hoặc xử lý lỗi theo cách khác
            return false;
        }
    }

    public function deleteRole($roleId)
    {
        // Xóa quyền khỏi bảng role_permissions
        $stmt = $this->connection->prepare("DELETE FROM webbanhang.role_permission WHERE role_id = ?");
        $stmt->bind_param("i", $roleId);
        $stmt->execute();

        // Đặt role_id của người dùng về 0 (hoặc giá trị mặc định) trong bảng users
        $stmt = $this->connection->prepare("UPDATE webbanhang.account SET role_id = 0 WHERE role_id = ?");
        $stmt->bind_param("i", $roleId);
        $stmt->execute();

        // Xóa quyền khỏi bảng roles
        $stmt = $this->connection->prepare("DELETE FROM webbanhang.roles WHERE id = ?");
        $stmt->bind_param("i", $roleId);
        $stmt->execute();

        return true;
    }
}
