<?php
class DatabaseUser
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

    public function checkUser($username, $password)
    {
        $stmt = $this->connection->prepare("SELECT role_id, status FROM webbanhang.account WHERE username = ? AND password = ?");
        $stmt->bind_param("ss", $username, $password);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            if ($row['status'] === 'active') {
                return $row['role_id'];
            } else {
                return 'banned'; // hoặc 'inactive', tùy bạn muốn kiểm soát ở frontend như thế nào
            }
        }
        return null;
    }
    

    public function getUserPermissions($username)
    {
        $stmt = $this->connection->prepare("SELECT p.name, p.icon, p.link, rp.add, rp.update, rp.delete 
            FROM webbanhang.account u
            JOIN webbanhang.roles r ON u.role_id = r.id
            JOIN webbanhang.role_permission rp ON r.id = rp.role_id
            JOIN webbanhang.permissions p ON rp.permission_id = p.id
            WHERE u.username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        $permissions = array();
        while ($row = $result->fetch_assoc()) {
            $permissions[] = array(
                'name' => $row['name'],
                'icon' => $row['icon'],
                'link' => $row['link'],
                'add' => (bool)$row['add'],    // Chuyển thành boolean nếu cần
                'update' => (bool)$row['update'],
                'delete' => (bool)$row['delete']
            );
        }
        return $permissions;
    }

    public function getAllUsers()
    {
        $sql = "SELECT u.id, u.username, u.email, r.id as role_id, r.name as role_name, u.status, u.created, u.updated
                FROM webbanhang.account u
                JOIN webbanhang.roles r ON u.role_id = r.id
               ";
        $stmt = $this->connection->prepare($sql);
        $stmt->execute();
        $result = $stmt->get_result();
        $users = array();
        while ($row = $result->fetch_assoc()) {
            $users[] = array(
                'id' => $row['id'],
                'username' => $row['username'],
                'email' => $row['email'],
                'role_id' => $row['role_id'],
                'role' => $row['role_name'],
                'status' => $row['status'],
                'created_at' => $row['created'],
                'updated_at' => $row['updated']
            );
        }
        return $users;
    }

    function addUser($username, $password, $email, $role, $status)
    {
        $stmt = $this->connection->prepare("INSERT INTO webbanhang.account (username, password, email, role_id, status, created, updated) VALUES (?, ?, ?, ?, ?, NOW(), NOW())");
        $stmt->bind_param("sssis", $username, $password, $email, $role, $status);
        if ($stmt->execute()) {
            $accountId = $this->connection->insert_id;
            $stmt2 = $this->connection->prepare("INSERT INTO webbanhang.profile (id) VALUES (?)");
            $stmt2->bind_param("i", $accountId);
            if ($stmt2->execute()) {
                $stmt3 = $this->connection->prepare("INSERT INTO webbanhang.address (profile_id) VALUES (?)");
                $stmt3->bind_param("i", $accountId);
                $stmt3->execute();
                return true; // Thêm tài khoản thành công
            } else {
                return false; // Thêm thông tin cá nhân thất bại
            }
        } else {
            return false;
        }
    }

    function getUserByUsername($username)
    {
        $stmt = $this->connection->prepare("SELECT * FROM webbanhang.account WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_assoc();
    }

    function getUserByEmail($email)
    {
        $stmt = $this->connection->prepare("SELECT * FROM webbanhang.account WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_assoc();
    }

    function getUserByPhoneNumber($phoneNumber)
    {
        $stmt = $this->connection->prepare("SELECT *
            FROM webbanhang.account a
            JOIN webbanhang.profile p ON a.id = p.id
            WHERE p.phone_number = ?");
        $stmt->bind_param("s", $phoneNumber);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_assoc();
    }

    function getUserById($userId)
    {
        $stmt = $this->connection->prepare("SELECT 
                    a.id,
                    a.username,
                    a.email,
                    r.id as role_id,
                    r.name as role_name,
                    a.status,
                    a.created,
                    a.updated,
                    p.fullname,
                    p.phone_number,
                    p.avatar
            FROM webbanhang.account a
            JOIN webbanhang.profile p ON a.id = p.id
            JOIN webbanhang.roles r ON a.role_id = r.id
            where a.id = ?");
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_assoc();
    }

    function getAddressById($userId)
    {
        $stmt = $this->connection->prepare("
                    select * from webbanhang.address r where r.profile_id = ?");
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    function updateUser($userId, $email, $role, $fullname, $phone_number, $created)
    {
        $stmt = $this->connection->prepare("UPDATE webbanhang.account SET email = ?, role_id = ?, created = ?, updated = NOW() WHERE id = ?");
        $stmt->bind_param("sisi", $email, $role, $created, $userId);
        if ($stmt->execute()) {
                $stmt2 = $this->connection->prepare("UPDATE webbanhang.profile SET fullname = ?, phone_number = ?, avatar = null WHERE id = ?");
                $stmt2->bind_param("ssi", $fullname, $phone_number, $userId);
                if ($stmt2->execute()) {
                    return true; // Cập nhật thông tin cá nhân thành công
                } else {
                    return false; // Cập nhật thông tin cá nhân thất bại
                }
        } else {
            return false;
        }
    }

    function toggleAccountStatus($userId, $status)
    {
        $stmt = $this->connection->prepare("UPDATE webbanhang.account SET status = ? WHERE id = ?");
        $stmt->bind_param("si", $status, $userId);
        return $stmt->execute();
    }

    public function isPhoneNumberDuplicate($phoneNumber, $userId) {
        $stmt = $this->connection->prepare("SELECT a.id FROM webbanhang.account  a
                                            join webbanhang.profile p on p.id = a.id
                                            WHERE p.phone_number = ? AND a.id != ?");
        $stmt->bind_param("si", $phoneNumber, $userId);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->num_rows > 0;
    }

    public function isEmailDuplicate($email, $userId) {
        $stmt = $this->connection->prepare("SELECT id FROM webbanhang.account WHERE email = ? AND id != ?");
        $stmt->bind_param("si", $email, $userId);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->num_rows > 0;
    }
    
    public function getUserId($username) {
        $stmt = $this->connection->prepare("SELECT id FROM webbanhang.account WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            return $result->fetch_assoc()['id'];
        }
        return null;
    }

    public function getFullnameById($userId)
    {
        $stmt = $this->connection->prepare("SELECT fullname FROM webbanhang.profile WHERE id = ?");
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_assoc()['fullname'];
    }

    public function getAddresbyIdaddress($addressId)
    {
        $stmt = $this->connection->prepare("SELECT CONCAT(a.street, ', ', a.ward, ', ', a.district, ', ', a.city) AS full_address FROM address a WHERE a.id = ?");
        $stmt->bind_param("i", $addressId);
        $stmt->execute();
        $result = $stmt->get_result();
            return $result->fetch_assoc()['full_address'];
    }
}
