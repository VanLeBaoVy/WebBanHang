<?php
header('Content-Type: application/json'); // Đảm bảo server chỉ trả về JSON

include("db.php");

$perPage = 8;
$pageCurrent = isset($_POST["page"]) ? (int)$_POST["page"] : 1;
$start = ($pageCurrent - 1) * $perPage;

// Lấy sản phẩm từ cơ sở dữ liệu
$sql = "SELECT p.ID AS product_id, p.Name AS product_name, p.url AS product_url, 
        b.Name AS brand_name, p.price,
        GROUP_CONCAT(s.size_number ORDER BY s.size_number SEPARATOR ', ') AS sizes,
        GROUP_CONCAT(s.amount ORDER BY s.amount SEPARATOR ', ') AS amount, 
        p.description 
        FROM product p 
        JOIN brand b ON p.brand = b.ID 
        JOIN size s ON p.ID = s.product_id 
        GROUP BY p.ID, p.Name, p.url, b.Name, p.price, p.description
        LIMIT $start, $perPage";

$result = $conn->query($sql);
$productList = [];

while ($row = $result->fetch_assoc()) {
    $productList[] = [
        "id" => $row["product_id"],
        "name" => $row["product_name"],
        "url" => $row["product_url"],
        "brand" => $row["brand_name"],
        "price" => (int) $row["price"],
        "description" => $row["description"],
        "size" => explode(", ", $row["sizes"]),
        "amount" => explode(", ", $row["amount"]),
    ];
}

// Trả về JSON
echo json_encode($productList, JSON_UNESCAPED_UNICODE);
?>
