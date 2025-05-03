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
        JOIN webbanhang.brand b ON p.brand = b.id
        WHERE p.attributes != '0';";
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
    public function addProduct($name, $price, $description, $url, $category_id, $brand, $attributes, $supplier_id)
    {
        $stmt = $this->connection->prepare(
            "INSERT INTO webbanhang.product (name, price, description, url, category_id, brand, attributes, supplier_id)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
        );
        // Kiểm tra kiểu dữ liệu của các biến tương ứng với kiểu cột trong cơ sở dữ liệu
        $stmt->bind_param("sdssissi", $name, $price, $description, $url, $category_id, $brand, $attributes, $supplier_id);
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
    public function updateProduct($id, $name, $price, $description, $url, $category_id, $brand, $attributes, $supplier_id)
    {
        $stmt = $this->connection->prepare("UPDATE webbanhang.product SET name = ?, price = ?, description = ?, url = ?, category_id = ?, brand = ?, attributes = ?, supplier_id = ? WHERE id = ?;");
        $stmt->bind_param("sdssissii", $name, $price, $description, $url, $category_id, $brand, $attributes, $supplier_id,  $id);
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
    public function deleteSizeByProductId($productId)
    {
        $stmt = $this->connection->prepare("DELETE FROM webbanhang.size WHERE product_id = ?;");
        $stmt->bind_param("i", $productId);
        return $stmt->execute();
    }
    public function deleteSize($id)
    {
        $stmt = $this->connection->prepare("DELETE FROM webbanhang.size WHERE id = ?;");
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }
    public function checkProductExistBillDetail($id)
    {
        $stmt = $this->connection->prepare("SELECT * FROM webbanhang.order_detail WHERE product_id = ?;");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->num_rows > 0;
    }
    public function addCategory($name)
    {
        $stmt = $this->connection->prepare("INSERT INTO webbanhang.category (name) VALUES (?);");
        $stmt->bind_param("s", $name);
        return $stmt->execute();
    }
    public function updateCategory($id, $name)
    {
        $stmt = $this->connection->prepare("UPDATE webbanhang.category SET name = ? WHERE id = ?;");
        $stmt->bind_param("si", $name, $id);
        return $stmt->execute();
    }

    public function deleteCategory($id)
    {
        $stmt = $this->connection->prepare("DELETE FROM webbanhang.category WHERE id = ?;");
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }
    public function getCategoryById($id)
    {
        $stmt = $this->connection->prepare("SELECT * FROM webbanhang.category WHERE id = ?;");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            return $result->fetch_assoc();
        }
        return null;
    }
    public function checkCategoryExistProduct($id)
    {
        $stmt = $this->connection->prepare("SELECT * FROM webbanhang.product WHERE category_id = ?;");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->num_rows > 0;
    }
    public function getProductsByCategoryId($categoryId)
    {
        $stmt = $this->connection->prepare("SELECT * FROM webbanhang.product WHERE category_id = ?and attributes != '0';");
        $stmt->bind_param("i", $categoryId);
        $stmt->execute();
        $result = $stmt->get_result();
        $products = array();
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $products[] = $row;
            }
        }
        return $products;
    }
    public function checkDuplicateCategoryName($name)
    {
        $stmt = $this->connection->prepare("SELECT * FROM webbanhang.category WHERE name = ?;");
        $stmt->bind_param("s", $name);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->num_rows > 0;
    }
    public function addBrand($name, $description)
    {
        $stmt = $this->connection->prepare("INSERT INTO webbanhang.brand (name, description) VALUES (?, ?);");
        $stmt->bind_param("ss", $name, $description);
        return $stmt->execute();
    }
    public function updateBrand($id, $name, $description)
    {
        $stmt = $this->connection->prepare("UPDATE webbanhang.brand SET name = ?, description = ? WHERE id = ?;");
        $stmt->bind_param("ssi", $name, $description, $id);
        return $stmt->execute();
    }
    public function deleteBrand($id)
    {
        $stmt = $this->connection->prepare("DELETE FROM webbanhang.brand WHERE id = ?;");
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }
    public function getBrandById($id)
    {
        $stmt = $this->connection->prepare("SELECT * FROM webbanhang.brand WHERE id = ?;");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            return $result->fetch_assoc();
        }
        return null;
    }
    public function checkBrandExistProduct($id)
    {
        $stmt = $this->connection->prepare("SELECT * FROM webbanhang.product WHERE brand = ?;");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->num_rows > 0;
    }
    public function getProductsByBrandId($brandId)
    {
        $stmt = $this->connection->prepare("SELECT * FROM webbanhang.product WHERE brand = ? and attributes != '0';");
        $stmt->bind_param("i", $brandId);
        $stmt->execute();
        $result = $stmt->get_result();
        $products = array();
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $products[] = $row;
            }
        }
        return $products;
    }
    public function checkDuplicateBrandName($name)
    {
        $stmt = $this->connection->prepare("SELECT * FROM webbanhang.brand WHERE name = ?;");
        $stmt->bind_param("s", $name);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->num_rows > 0;
    }

    public function getSuppliers()
    {
        $sql = "SELECT * FROM webbanhang.supplier where status = 'active' ;";
        $result = $this->connection->query($sql);
        $suppliers = array();
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $suppliers[] = $row;
            }
        }
        return $suppliers;
    }
    public function addSupplier($name, $tax, $contact_name, $phone_number, $email)
    {
        $stmt = $this->connection->prepare("INSERT INTO webbanhang.supplier (name, tax, contact_name, phone_number, email) VALUES (?, ?, ?, ?, ?);");
        $stmt->bind_param("sssss", $name, $tax, $contact_name, $phone_number, $email);
        return $stmt->execute();
    }

    public function updateSupplier($id, $name, $tax, $contact_name, $phone_number, $email)
    {
        $stmt = $this->connection->prepare("UPDATE webbanhang.supplier SET name = ?, tax = ?, contact_name = ?, phone_number = ?, email = ? WHERE id = ?;");
        $stmt->bind_param("sssssi", $name, $tax, $contact_name, $phone_number, $email, $id);
        return $stmt->execute();
    }

    public function deleteSupplier($id)
    {
        $stmt = $this->connection->prepare("DELETE FROM webbanhang.supplier WHERE id = ?;");
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }

    public function checkSupplierExistProduct($id)
    {
        $stmt = $this->connection->prepare("SELECT * FROM webbanhang.product WHERE supplier_id = ?;");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->num_rows > 0;
    }
    public function getSupplierById($id)
    {
        $stmt = $this->connection->prepare("SELECT * FROM webbanhang.supplier WHERE id = ?;");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            return $result->fetch_assoc();
        }
        return null;
    }
    public function updateSupplierStatus($id, $status)
    {
        $stmt = $this->connection->prepare("UPDATE webbanhang.supplier SET status = ? WHERE id = ?;");
        $stmt->bind_param("si", $status, $id);
        return $stmt->execute();
    }
    public function getImport()
    {
        $sql = "SELECT * FROM webbanhang.import;";
        $result = $this->connection->query($sql);
        $receipts = array();
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $receipts[] = $row;
            }
        }
        return $receipts;
    }
    public function addImport($supplier_id, $user_id, $total_price, $status)
    {
        $stmt = $this->connection->prepare("INSERT INTO webbanhang.import (supplier_id, employee_id, price, status) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("iids", $supplier_id, $user_id, $total_price, $status);
        if ($stmt->execute()) {
            return $this->connection->insert_id; // Trả về ID phiếu nhập vừa thêm
        }
        return false;
    }
    public function deleteImport($id)
    {
        $stmt = $this->connection->prepare("DELETE FROM webbanhang.import WHERE id = ?;");
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }
    public function getProductBySupplierId($supplierId)
    {
        $stmt = $this->connection->prepare("SELECT * FROM webbanhang.product WHERE supplier_id = ? and attributes != '0';");
        $stmt->bind_param("i", $supplierId);
        $stmt->execute();
        $result = $stmt->get_result();
        $products = array();
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $products[] = $row;
            }
        }
        return $products;
    }

    public function addImportDetail($import_id, $product_id, $size_id, $price, $quantity, $total)
    {
        $stmt = $this->connection->prepare("INSERT INTO webbanhang.import_detail (import_id, product_id, size_id, import_price, amount, final_price) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("iiidid", $import_id, $product_id, $size_id, $price, $quantity, $total);
        return $stmt->execute();
    }

    public function getImportById($importId)
    {
        $stmt = $this->connection->prepare("SELECT i.id, i.supplier_id, s.name AS supplier_name, i.employee_id, a.username AS employee_name, i.price, i.status, i.created_at
                                        FROM webbanhang.import i
                                        JOIN webbanhang.supplier s ON i.supplier_id = s.id
                                        JOIN webbanhang.account a ON i.employee_id = a.id
                                        WHERE i.id = ?");
        $stmt->bind_param("i", $importId);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 0) {
            return null; // Không tìm thấy phiếu nhập
        }

        return $result->fetch_assoc(); // Trả về thông tin phiếu nhập
    }
    public function getImportDetailsById($importId)
    {
        $stmt = $this->connection->prepare("SELECT id.id, id.product_id, p.name AS product_name, id.size_id, s.size_number, id.import_price, id.amount, id.final_price
                                        FROM webbanhang.import_detail id
                                        JOIN webbanhang.product p ON id.product_id = p.id
                                        JOIN webbanhang.size s ON id.size_id = s.id
                                        WHERE id.import_id = ?");
        $stmt->bind_param("i", $importId);
        $stmt->execute();
        $result = $stmt->get_result();

        $details = [];
        while ($row = $result->fetch_assoc()) {
            $details[] = $row;
        }

        return $details; // Trả về danh sách chi tiết phiếu nhập
    }

    public function updateImport($id, $supplier_id, $employee_id, $total_price, $status)
    {
        $stmt = $this->connection->prepare("UPDATE webbanhang.import SET supplier_id = ?, employee_id = ?, price = ?, status = ? WHERE id = ?");
        $stmt->bind_param("iidsi", $supplier_id, $employee_id, $total_price, $status, $id);
        return $stmt->execute();
    }
    public function deleteImportDetailsByImportId($importId)
    {
        $stmt = $this->connection->prepare("DELETE FROM webbanhang.import_detail WHERE import_id = ?");
        $stmt->bind_param("i", $importId);
        return $stmt->execute();
    }
    public function updateImportDetail($id, $product_id, $size_id, $price, $quantity, $total)
    {
        $stmt = $this->connection->prepare("UPDATE webbanhang.import_detail SET product_id = ?, size_id = ?, import_price = ?, amount = ?, final_price = ? WHERE id = ?");
        $stmt->bind_param("iididi", $product_id, $size_id, $price, $quantity, $total, $id);
        return $stmt->execute();
    }
    public function deleteImportDetail($id)
    {
        $stmt = $this->connection->prepare("DELETE FROM webbanhang.import_detail WHERE id = ?");
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }
    public function getImportDetailsByImportId($importId)
    {
        $stmt = $this->connection->prepare("SELECT id, product_id, size_id, import_price, amount, final_price FROM webbanhang.import_detail WHERE import_id = ?");
        $stmt->bind_param("i", $importId);
        $stmt->execute();
        $result = $stmt->get_result();

        $details = [];
        while ($row = $result->fetch_assoc()) {
            $details[] = $row;
        }

        return $details;
    }
    public function updateSizeQuantity($sizeId, $quantity)
    {
        $stmt = $this->connection->prepare("UPDATE webbanhang.size SET amount = ? WHERE id = ?");
        $stmt->bind_param("ii", $quantity, $sizeId);
        return $stmt->execute();
    }
    public function getSizeQuantityById($sizeId)
    {
        $stmt = $this->connection->prepare("SELECT amount FROM webbanhang.size WHERE id = ?");
        $stmt->bind_param("i", $sizeId);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            return $row['amount'];
        }
        return null; // Trả về null nếu không tìm thấy
    }
}
