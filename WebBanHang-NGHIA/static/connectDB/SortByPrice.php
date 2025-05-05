<?php
// Kích hoạt ghi log lỗi PHP để debug
ini_set('log_errors', 1);
ini_set('error_log', 'C:/xampp/php/php_error.log');

include("db.php");

// Nhận dữ liệu từ AJAX
$sortOrder = isset($_POST["sortOrder"]) && $_POST["sortOrder"] === "DESC" ? "DESC" : "ASC";
$pageCurrent = isset($_POST["page"]) ? (int)$_POST["page"] : 1;
$perPage = 8;
$start = ($pageCurrent - 1) * $perPage;

// Xây dựng truy vấn SQL với phân trang
$sql = "SELECT p.ID AS product_id, p.Name AS product_name, p.url AS product_url, 
        b.Name AS brand_name, p.price, 
        GROUP_CONCAT(s.size_number ORDER BY s.size_number SEPARATOR ', ') AS sizes, 
        p.description 
        FROM product p 
        JOIN brand b ON p.brand = b.ID 
        JOIN size s ON p.ID = s.product_id 
        GROUP BY p.ID, p.Name, p.url, b.Name, p.price, p.description 
        ORDER BY p.price $sortOrder 
        LIMIT $start, $perPage";

error_log("🛠️ SQL Query from sort by price (phân trang): " . $sql);

$result = $conn->query($sql);

// Truy vấn tổng số sản phẩm
$sqlTotal = "SELECT COUNT(DISTINCT p.ID) AS total
             FROM product p
             JOIN brand b ON p.brand = b.ID
             JOIN size s ON p.ID = s.product_id";

$totalResult = $conn->query($sqlTotal);
$totalRow = $totalResult->fetch_assoc();
$totalPage = ceil($totalRow["total"] / $perPage);

error_log("🛠️ TỔNG TRANG : " . $totalPage);

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
        <button class="page-btn product-list" data-page="<?= $i; ?>" onclick="loadPage_sortByPrice('<?= $sortOrder; ?>', <?= $i; ?>)">
            <?= $i; ?>
        </button>
    <?php } ?>
</div>

