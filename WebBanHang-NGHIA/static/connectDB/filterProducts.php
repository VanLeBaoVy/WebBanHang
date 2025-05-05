<?php
// Kích hoạt ghi log lỗi PHP để debug
ini_set('log_errors', 1);
ini_set('error_log', 'C:/xampp/php/php_error.log');

include("db.php");

// Nhận dữ liệu từ AJAX
$pageCurrent = isset($_POST["page"]) ? (int)$_POST["page"] : 1;
$brandFilter = isset($_POST["brand"]) ? explode(",", $_POST["brand"]) : [];
$categoryFilter = isset($_POST["category"]) ? explode(",", $_POST["category"]) : [];
$sizeFilter = isset($_POST["size"]) ? explode(",", $_POST["size"]) : [];
$priceMin = isset($_POST["priceMin"]) ? (int)$_POST["priceMin"] : 0;
$priceMax = isset($_POST["priceMax"]) ? (int)$_POST["priceMax"] : 999999999;

// Số sản phẩm mỗi trang
$perPage = 8;
$start = ($pageCurrent - 1) * $perPage;

// Xây dựng điều kiện lọc cho truy vấn SQL
$whereConditions = ["p.price BETWEEN $priceMin AND $priceMax"];

if (!empty($brandFilter) && $brandFilter[0] !== "") {
    $brandConditions = array_map(fn($b) => "b.ID = '$b'", $brandFilter);
    $whereConditions[] = "(" . implode(" OR ", $brandConditions) . ")";
}

if (!empty($categoryFilter) && $categoryFilter[0] !== "") {
    $categoryConditions = array_map(fn($c) => "c.ID = '$c'", $categoryFilter);
    $whereConditions[] = "(" . implode(" OR ", $categoryConditions) . ")";
}

if (!empty($sizeFilter) && $sizeFilter[0] !== "") {
    $sizeConditions = array_map(fn($s) => "s.size_number = '$s'", $sizeFilter);
    $whereConditions[] = "(" . implode(" OR ", $sizeConditions) . ")";
}

$whereSQL = !empty($whereConditions) ? implode(" AND ", $whereConditions) : "1=1";

// Truy vấn để lấy số lượng sản phẩm đã lọc
$sqlTotal = "SELECT COUNT(DISTINCT p.ID) AS total
             FROM product p
             JOIN brand b ON p.brand = b.ID
             JOIN size s ON p.ID = s.product_id
             WHERE $whereSQL";

$totalResult = $conn->query($sqlTotal);
$totalRow = $totalResult->fetch_assoc();
$totalPage = ceil($totalRow["total"] / $perPage);

// Truy vấn chính để lấy sản phẩm theo bộ lọc
$sql = "SELECT p.ID AS product_id, p.Name AS product_name, p.url AS product_url, 
        b.Name AS brand_name, p.price, 
        GROUP_CONCAT(s.size_number ORDER BY s.size_number SEPARATOR ', ') AS sizes, 
        p.description 
        FROM product p 
        JOIN brand b ON p.brand = b.ID 
        JOIN size s ON p.ID = s.product_id 
        WHERE $whereSQL 
        GROUP BY p.ID, p.Name, p.url, b.Name, p.price, p.description
        LIMIT $start, $perPage";

error_log("🛠️ SQL Query: " . $sql);

$result = $conn->query($sql);

// Xuất danh sách sản phẩm dưới dạng HTML
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo '<div class="product-item">
                <div class="img-product">
                    <img src="' . htmlspecialchars($row["product_url"]) . '" alt="' . htmlspecialchars($row["product_name"]) . '">
                </div>
                <div class="info-product">
                    <h3 class="name-product">' . htmlspecialchars($row["product_name"]) . '</h3>
                    <div class="bottom-product">
                        <h3 class="price-product">' . number_format($row["price"], 0, ",", ".") . ' ₫</h3>
                        <button class="btn">
                            <i class="fa-solid fa-cart-plus"></i> Thêm
                        </button>
                    </div>
                </div>
              </div>';
    }
} else {
    echo "<p class='no-product'>Không có sản phẩm phù hợp!</p>";
}

$conn->close();
?>

<div id="pagination" class="pagination">
    <?php for ($i = 1; $i <= $totalPage; $i++) { ?>
        <button class="page-btn product-list" data-page="<?= $i; ?>" onclick="loadPage_filterProduct(<?= $i; ?>)">
            <?= $i; ?>
        </button>
    <?php } ?>
</div>
