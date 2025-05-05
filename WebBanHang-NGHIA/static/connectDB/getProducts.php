<?php
include("ConnectDatabase.php"); // Kết nối database

$sql = "SELECT p.ID AS product_id, p.Name AS product_name, p.url AS product_url, 
        b.Name AS brand_name, p.price, 
        GROUP_CONCAT(s.size_number ORDER BY s.size_number SEPARATOR ', ') AS sizes, 
        p.description 
        FROM product p 
        JOIN brand b ON p.brand = b.ID 
        JOIN size s ON p.ID = s.product_id 
        GROUP BY p.ID, p.Name, p.url, b.Name, p.price, p.description";

$result = $conn->query($sql);
$products = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}

// Trả về dữ liệu JSON để dùng trong frontend
echo json_encode([
    "products" => $products,
    "totalPage" => $totalPage,
    "pageCurrent" => $pageCurrent
]);

$conn->close();
?>