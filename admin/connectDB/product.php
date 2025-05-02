<?php
class DatabaseProduct
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
    public function getAllProducts()
    {
        $sql = "SELECT p.id AS product_id, 
        p.name AS product_name, 
        p.price, 
        p.description, 
        p.url, 
        c.name AS category_name, 
        b.name AS brand_name,
        p.attributes
        FROM webbanhang.product p
        JOIN webbanhang.category c ON p.category_id = c.id
        JOIN webbanhang.brand b ON p.brand = b.id;";
        $result = $this->connection->query($sql);
        $products = array();
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $products[] = $row;
            }
        }
        return $products;
    }
    public function getSize()
    {
        $sql = "SELECT * FROM webbanhang.size;";
        $result = $this->connection->query($sql);
        $sizes = array();
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $sizes[] = $row;
            }
        }
        return $sizes;
    }
    public function getCategory()
    {
        $sql = "SELECT * FROM webbanhang.category;";
        $result = $this->connection->query($sql);
        $categories = array();
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $categories[] = $row;
            }
        }
        return $categories;
    }
    public function getBrand()
    {
        $sql = "SELECT * FROM webbanhang.brand;";
        $result = $this->connection->query($sql);
        $brands = array();
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $brands[] = $row;
            }
        }
        return $brands;
    }
    public function getProductById($id)
    {
        $stmt = $this->connection->prepare("SELECT * FROM webbanhang.product WHERE id = ?;");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            return $result->fetch_assoc();
        }
        return null;
    }
    public function getSizeByProductId($productId)
    {
        $stmt = $this->connection->prepare("SELECT * FROM webbanhang.size WHERE product_id = ?;");
        $stmt->bind_param("i", $productId);
        $stmt->execute();
        $result = $stmt->get_result();
        $sizes = array();
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $sizes[] = $row;
            }
        }
        return $sizes;
    }
    public function addProduct($name, $price, $description, $url, $category_id, $brand, $attributes)
    {
        $stmt = $this->connection->prepare("INSERT INTO webbanhang.product (name, price, description, url, category_id, brand, attributes) VALUES (?, ?, ?, ?, ?, ?, ?);");
        $stmt->bind_param("sdssiss", $name, $price, $description, $url, $category_id, $brand, $attributes);
        return $stmt->execute();
    }
    public function addSize($productId, $sizeNumber, $amount)
    {
        $stmt = $this->connection->prepare("INSERT INTO webbanhang.size (product_id, size_number, amount) VALUES (?, ?, ?);");
        $stmt->bind_param("isi", $productId, $sizeNumber, $amount);
        return $stmt->execute();
    }
    public function getLastInsertId()
    {
        return $this->connection->insert_id;
    }
    public function updateProduct($id, $name, $price, $description, $url, $category_id, $brand)
    {
        $stmt = $this->connection->prepare("UPDATE webbanhang.product SET name = ?, price = ?, description = ?, url = ?, category_id = ?, brand = ? WHERE id = ?;");
        $stmt->bind_param("sdssisi", $name, $price, $description, $url, $category_id, $brand, $id);
        return $stmt->execute();
    }
    public function updateSize($id, $sizeNumber, $amount)
    {
        $stmt = $this->connection->prepare("UPDATE webbanhang.size SET size_number = ?, amount = ? WHERE id = ?;");
        $stmt->bind_param("ssi", $sizeNumber, $amount, $id);
        return $stmt->execute();
    }
    public function deleteProduct($id)
    {
        $stmt = $this->connection->prepare("DELETE FROM webbanhang.product WHERE id = ?;");
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }
    public function deleteSize($id)
    {
        $stmt = $this->connection->prepare("DELETE FROM webbanhang.size WHERE id = ?;");
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }
}
