<?php
include("db.php");

// Kiểm tra nếu request là AJAX
$isAjax = isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';

// Số sản phẩm mỗi trang
$perPage = 8;
$pageCurrent = isset($_POST["page"]) ? (int)$_POST["page"] : 1;
$start = ($pageCurrent - 1) * $perPage;

// Truy vấn sản phẩm
$sql = "SELECT p.ID AS product_id, p.Name AS product_name, p.url AS product_url, 
        b.Name AS brand_name, p.price, 
        GROUP_CONCAT(s.size_number ORDER BY s.size_number SEPARATOR ', ') AS sizes, 
        p.description 
        FROM product p 
        JOIN brand b ON p.brand = b.ID 
        JOIN size s ON p.ID = s.product_id 
        GROUP BY p.ID, p.Name, p.url, b.Name, p.price, p.description
        LIMIT $start, $perPage";

$result = $conn->query($sql);
$productList = [];

// Chuyển dữ liệu sản phẩm sang mảng
while ($row = $result->fetch_assoc()) {
    $productList[] = [
        "id" => $row["product_id"],
        "name" => $row["product_name"],
        "url" => $row["product_url"],
        "brand" => $row["brand_name"],
        "price" => (int) $row["price"],
        "description" => $row["description"],
        "size" => explode(", ", $row["sizes"]),
        
    ];
}

// Nếu request từ AJAX, trả về JSON
if ($isAjax) {
    header('Content-Type: application/json');
    echo json_encode($productList, JSON_UNESCAPED_UNICODE);
    exit;
}

// Nếu truy cập trực tiếp, render HTML
?>

<div class="sport-maincontent__show-product">
    <?php foreach ($productList as $product) { ?>
        <div class="product-item" onclick="openProductDetail(<?= $product['id'] ?>)">
            <div class="img-product">
                <img src="<?= htmlspecialchars($product["url"]); ?>" alt="<?= htmlspecialchars($product["name"]); ?>">
            </div>
            <div class="info-product">
                <h3 class="name-product"><?= htmlspecialchars($product["name"]); ?></h3>
                <div class="bottom-product">
                    <h3 class="price-product"><?= number_format($product["price"], 0, ",", ".") . " ₫"; ?></h3>
                    <button class="btn">
                        <i class="fa-solid fa-cart-plus"></i> Thêm
                    </button>
                </div>
            </div>
        </div>
    <?php } ?>
</div>
