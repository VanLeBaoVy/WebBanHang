<?php
include("db.php");

// Số sản phẩm mỗi trang
$perPage = 8;
$pageCurrent = isset($_POST["page"]) ? (int)$_POST["page"] : 1;
$start = ($pageCurrent - 1) * $perPage;

// Lấy tổng số sản phẩm
$totalResult = $conn->query("SELECT COUNT(*) AS total FROM product");
$totalRow = $totalResult->fetch_assoc();
$totalPage = ceil($totalRow["total"] / $perPage);
?>

<!-- Phân trang mặc định -->
<div id = "pagination" class="pagination" >
    <?php for ($i = 1; $i <= $totalPage; $i++) { ?>
        <button class="page-btn product-list" data-page="<?= $i; ?>" onclick="loadPage(<?= $i; ?>)">
            <?= $i; ?>
        </button>
    <?php } ?>
</div>
