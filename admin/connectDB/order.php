<?php
class DatabaseOrder
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
    public function getAllOrders()
    {
        $sql = "SELECT * FROM webbanhang.orders";
        $result = $this->connection->query($sql);
        $orders = [];

        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $orders[] = $row;
            }
            return $orders;
        } else {
            return null;
        }
    }
    public function getOrderById($orderId)
    {
        $sql = "SELECT * FROM webbanhang.orders WHERE id = ?";
        $stmt = $this->connection->prepare($sql);
        $stmt->bind_param("i", $orderId);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_assoc();
    }
    public function getOrderById2($orderId)
    {
        $stmt = $this->connection->prepare("SELECT * FROM webbanhang.orders WHERE id = ?");
        $stmt->bind_param("i", $orderId);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_assoc();
    }

    public function getOrderById3()
    {
        $stmt = $this->connection->prepare("SELECT * FROM webbanhang.orders");
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_assoc();
    }

    public function updateOrderStatus($orderId, $status, $employee_id)
    {
        $sql = "UPDATE webbanhang.orders SET status = ?, employee_id = ?, updated_at = Now() WHERE id = ?";
        $stmt = $this->connection->prepare($sql);
        $stmt->bind_param("sii", $status, $employee_id, $orderId);
        return $stmt->execute();
    }
    public function getOrderDetails($orderId)
    {
        $stmt = $this->connection->prepare("SELECT product_id, size, amount FROM webbanhang.order_detail WHERE order_id = ?");
        $stmt->bind_param("i", $orderId);
        $stmt->execute();
        $result = $stmt->get_result();

        $details = [];
        while ($row = $result->fetch_assoc()) {
            $details[] = $row;
        }

        return $details;
    }

    public function getOrderDetails2($orderId)
    {
        $stmt = $this->connection->prepare("SELECT 
                                                od.product_id,
                                                p.name AS product_name,
                                                s.size_number,
                                                od.amount,
                                                p.price
                                            FROM webbanhang.order_detail od
                                            JOIN webbanhang.product p ON od.product_id = p.id
                                            JOIN webbanhang.size s ON od.size = s.id
                                            WHERE od.order_id = ?");
        $stmt->bind_param("i", $orderId);
        $stmt->execute();
        $result = $stmt->get_result();

        $details = [];
        while ($row = $result->fetch_assoc()) {
            $details[] = $row;
        }

        return $details;
    }

    public function updateProductStock($productId, $sizeId, $quantity)
    {
        $stmt = $this->connection->prepare("UPDATE webbanhang.size SET amount = amount + ? WHERE product_id = ? AND id = ?");
        $stmt->bind_param("iii", $quantity, $productId, $sizeId);
        return $stmt->execute();
    }

    public function getAllOrders4()
    {
        $stmt = $this->connection->prepare("
            SELECT 
                o.id AS order_id,
                o.address_id,
                o.status,
                o.created_at,
                o.updated_at,
                o.total,
                o.payment_method,
                o.reason,
                o.employee_id,
                e.fullname AS employee_name,
                o.account_id AS customer_id,
                c.fullname AS customer_name,
                c.phone_number AS customer_phone,
                a1.email AS customer_email,
                CONCAT(addr.street, ', ', addr.ward, ', ', addr.district, ', ', addr.city) AS full_address,
                addr.street AS street,
                addr.ward AS ward,
                addr.district AS district,
                addr.city AS city                
            FROM orders o
            -- JOIN cho người đặt hàng
            JOIN account a1 ON o.account_id = a1.id
            JOIN profile c ON c.id = a1.id
            -- JOIN cho nhân viên xử lý đơn hàng
            LEFT JOIN account a2 ON o.employee_id = a2.id
            LEFT JOIN profile e ON e.id = a2.id
            -- JOIN địa chỉ giao hàng
            LEFT JOIN address addr ON o.address_id = addr.id
            WHERE o.status = 'shipped'
            ORDER BY o.total DESC
        ");
        $stmt->execute();
        $result = $stmt->get_result();
    
        $orders = [];
        while ($row = $result->fetch_assoc()) {
            $orders[] = $row;
        }
    
        return $orders;
    }
    
    
    

    public function getOrderDetails4($orderId)
    {
        $stmt = $this->connection->prepare("
            SELECT 
                od.product_id, 
                p.name AS product_name, 
                s.size_number, 
                od.amount,
                od.price AS product_price
            FROM order_detail od
            JOIN product p ON od.product_id = p.id
            JOIN size s ON od.size = s.id
            WHERE od.order_id = ?
        ");
        $stmt->bind_param("i", $orderId);
        $stmt->execute();
        $result = $stmt->get_result();
    
        $details = [];
        while ($row = $result->fetch_assoc()) {
            $details[] = $row;
        }
    
        return $details;
    }
    
    
}
