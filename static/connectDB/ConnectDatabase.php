<?php
    class Database {
        private $servername = "localhost"; // Thay đổi nếu cần
        private $username = "root"; // Thay đổi với tên người dùng của bạn
        private $password = ""; // Thay đổi với mật khẩu của bạn
        private $dbname = "webbanhang"; // Thay đổi với tên cơ sở dữ liệu của bạn
        public $conn;
        public function __construct() {
            $this->conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
            if ($this->conn->connect_error) {
                die("Kết nối thất bại: " . $this->conn->connect_error);
            }
        }
        public function getAllAccount() {
            $sql = "SELECT * FROM account"; // Thay đổi tên bảng nếu cần
            $result = $this->conn->query($sql);
            $accounts = [];
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    $accounts[] = $row; // Lưu dữ liệu vào mảng
                }
            }
            return $accounts;
        }
        public function getAllProfile() {
            $sql = "SELECT * FROM profile"; // Thay đổi tên bảng nếu cần
            $result = $this->conn->query($sql);
            $profiles = [];
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    $profiles[] = $row; // Lưu dữ liệu vào mảng
                }
            }
            return $profiles;
        }
        public function getAllRole() {
            $sql = "SELECT * FROM roles"; // Thay đổi tên bảng nếu cần
            $result = $this->conn->query($sql);
            $roles = [];
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    $roles[] = $row; // Lưu dữ liệu vào mảng
                }
            }
            return $roles;
        }
        public function getAllRolePermission() {
            $sql = "SELECT * FROM role_permission"; // Thay đổi tên bảng nếu cần
            $result = $this->conn->query($sql);
            $role_permissions = [];
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    $role_permissions[] = $row; // Lưu dữ liệu vào mảng
                }
            }
            return $role_permissions;
        }
        public function getAllAddress() {
            $sql = "SELECT * FROM address";
            $result = $this->conn->query($sql);
            $address = [];
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    $address[] = $row;
                }
            }
            return $address;
        }
        public function getAllOrder() {
            $sql = "SELECT * FROM orders";
            $result = $this->conn->query($sql);
            $order = [];
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    $order[] = $row;
                }
            }
            return $order;
        }
        public function getAllOrderDetail() {
            $sql = "SELECT * FROM order_detail";
            $result = $this->conn->query($sql);
            $orderDetail = [];
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    $orderDetail[] = $row;
                }
            }
            return $orderDetail;
        }
        public function getAllProduct() {
            $sql = "SELECT * FROM product";
            $result = $this->conn->query($sql);
            $products = [];
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    $products[] = $row;
                }
            }
            return $products;
        }
    }
?>