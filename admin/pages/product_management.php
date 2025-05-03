<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
if (!hasPagePermission($_SESSION['permissions'], 'index.php?page=product_management')) {
    header("Location: login.php"); // Chuyển hướng đến trang đăng nhập
    exit();
}
$result = checkUserPermissions($_SESSION['permissions'], 'index.php?page=product_management');
$addPermission = $result['add'] ? '<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProductModal">Thêm sản phẩm</button>' : '<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProductModal">Thêm sản phẩm</button>';
$updatePermission = $result['update'] ? '<button type="submit" class="btn btn-primary">Lưu Thay Đổi</button>' : '<button type="submit" class="btn btn-primary">Lưu Thay Đổi</button>';
$deletePermission = $result['delete'] ? '<button type="button" class="btn btn-danger" id="deleteProductButton" data-product-id="">Xóa Sản Phẩm</button>' : '<button type="button" class="btn btn-danger" id="deleteProductButton" data-product-id="">Xóa Sản Phẩm</button>';
?>

<h2 class="mb-4">Quản Lý Sản Phẩm</h2>
<hr class="main-hr">
<h5 class="mb-3">Danh sách Sản Phẩm</h5>
<div class="d-flex align-items-center gap-3 mb-3">
    <?php echo $addPermission; ?>
    <input type="text" id="searchInputProduct" class="form-control me-2" placeholder="Tìm Kiếm" style="width: 50%;">
</div>
<hr class="main-hr">
<div class="table-container">
    <table class="table table-bordered table-custom table-hover">
        <thead class="table-light">
            <tr class="text-center align-middle">
                <th>Tên Sản Phẩm</th>
                <th>Loại Sản Phẩm</th>
                <th>Hãng Sản Phẩm</th>
                <th>Giá Sản Phẩm</th>
                <th>Size Sản Phẩm</th>
                <th>Số Lượng</th>
                <th>Trạng Thái</th>
            </tr>
        </thead>
        <tbody id="productTableBody">
            <tr>
                <td colspan="7" class="text-center">Đang tải dữ liệu...</td>
            </tr>
        </tbody>
    </table>
</div>
</div>


<div class="modal fade" id="addProductModal" tabindex="-1" aria-labelledby="addProductModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="addProductModalLabel">Thêm Sản Phẩm</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Đóng"></button>
            </div>
            <div class="modal-body">
                <form id="addProductForm" enctype="multipart/form-data">
                    <div class="row g-3">
                        <!-- Ảnh và Xem trước ảnh -->
                        <div class="col-md-4">
                            <label for="productImage" class="form-label">Ảnh Sản Phẩm</label>
                            <input type="file" class="form-control" id="productImage" name="imageFile" accept="image/*">
                            <div class="mt-3">
                                <img id="productImagePreview" src="#" alt="Xem trước ảnh sản phẩm"
                                    style="max-width: 100%; height: auto; display: none; border: 1px solid #ddd; padding: 5px; border-radius: 5px;">
                            </div>
                        </div>

                        <!-- Thông tin cơ bản -->
                        <div class="col-md-8">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label for="productName" class="form-label">Tên Sản Phẩm</label>
                                    <input type="text" class="form-control" id="productName" name="name" required>
                                </div>
                                <div class="col-md-6">
                                    <label for="productPrice" class="form-label">Giá ($)</label>
                                    <input type="number" class="form-control" id="productPrice" name="price" required>
                                </div>
                                <div class="col-md-6">
                                    <label for="productCategory" class="form-label">Loại Sản Phẩm</label>
                                    <select class="form-select" id="productCategory" name="category_id" required>
                                        <?php
                                        $apiUrl = "http://localhost/PHP-code/webbanhang/admin/api/product/getallcategory.php";
                                        $categories = [];
                                        try {
                                            $response = file_get_contents($apiUrl);
                                            $categories = json_decode($response, true);
                                        } catch (Exception $e) {
                                            echo "<option value=''>Không thể tải danh sách loại sản phẩm</option>";
                                        }
                                        if (!empty($categories) && is_array($categories)) {
                                            foreach ($categories as $category) {
                                                echo "<option value='" . htmlspecialchars($category['id']) . "'>" . htmlspecialchars($category['name']) . "</option>";
                                            }
                                        } else {
                                            echo "<option value=''>Không có loại sản phẩm nào</option>";
                                        }
                                        ?>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label for="productBrand" class="form-label">Hãng Sản Phẩm</label>
                                    <select class="form-select" id="productBrand" name="brand" required>
                                        <?php
                                        $apiUrl = "http://localhost/PHP-code/webbanhang/admin/api/product/getallbrand.php";
                                        $brands = [];
                                        try {
                                            $response = file_get_contents($apiUrl);
                                            $brands = json_decode($response, true);
                                        } catch (Exception $e) {
                                            echo "<option value=''>Không thể tải danh sách hãng</option>";
                                        }
                                        if (!empty($brands) && is_array($brands)) {
                                            foreach ($brands as $brand) {
                                                echo "<option value='" . htmlspecialchars($brand['id']) . "'>" . htmlspecialchars($brand['name']) . "</option>";
                                            }
                                        } else {
                                            echo "<option value=''>Không có hãng nào</option>";
                                        }
                                        ?>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label for="productStatus" class="form-label">Trạng Thái</label>
                                    <select class="form-select" id="productStatus" name="status" required>
                                        <option value="{}">Đang bán</option>
                                        <option value="1">Ngưng bán</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label for="productSupplier" class="form-label">Nhà Cung Cấp</label>
                                    <select class="form-select" id="productSupplier" name="supplier_id" required>
                                        <?php
                                        $apiUrl = "http://localhost/PHP-code/webbanhang/admin/api/product/getallsupplier.php";
                                        $suppliers = [];
                                        try {
                                            $response = file_get_contents($apiUrl);
                                            $suppliers = json_decode($response, true);
                                        } catch (Exception $e) {
                                            echo "<option value=''>Không thể tải danh sách nhà cung cấp</option>";
                                        }
                                        if (!empty($suppliers) && is_array($suppliers)) {
                                            foreach ($suppliers as $supplier) {
                                                echo "<option value='" . htmlspecialchars($supplier['id']) . "'>" . htmlspecialchars($supplier['name']) . "</option>";
                                            }
                                        } else {
                                            echo "<option value=''>Không có nhà cung cấp nào</option>";
                                        }
                                        ?>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- Size sản phẩm -->
                        <div class="col-md-12 mt-2">
                            <label class="form-label">Chọn Size</label>
                            <div id="sizeQuantityContainer" class="border p-2 rounded" style="height: 100px; overflow-y: auto; padding: 5px; border-radius: 6px;">
                                <div class="d-flex mb-2 gap-2 size-row">
                                    <input type="text" class="form-control" name="sizes[]" placeholder="Size (ví dụ: 38, 39, M...)" required>
                                    <input type="number" class="form-control" name="quantities[]" value="0" readonly>
                                    <button type="button" class="btn btn-danger remove-size-row">X</button>
                                </div>
                            </div>
                            <button type="button" class="btn btn-secondary mt-2" id="addSizeRow">+ Thêm Size</button>
                        </div>

                        <!-- Mô tả -->
                        <div class="col-md-12 mt-2">
                            <label for="productDescription" class="form-label">Mô Tả</label>
                            <textarea class="form-control" id="productDescription" name="description" rows="2"></textarea>
                        </div>
                    </div>

                    <!-- Nút hành động -->
                    <div class="mt-4 text-end">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                        <button type="submit" class="btn btn-primary">Thêm</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>


<div class="modal fade" id="editProductModal" tabindex="-1" aria-labelledby="editProductModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editProductModalLabel">Sửa Sản Phẩm</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Đóng"></button>
            </div>
            <div class="modal-body">
                <form id="editProductForm" enctype="multipart/form-data">
                    <input type="hidden" id="editProductId" name="id">
                    <div class="row g-3">
                        <!-- Ảnh và Xem trước ảnh -->
                        <div class="col-md-4">
                            <label for="editProductImage" class="form-label">Ảnh Sản Phẩm</label>
                            <input type="file" class="form-control" id="editProductImage" name="imageFile" accept="image/*">
                            <div class="mt-3">
                                <img id="editProductImagePreview" src="#" alt="Xem trước ảnh sản phẩm"
                                    style="max-width: 100%; height: auto; display: none; border: 1px solid #ddd; padding: 5px; border-radius: 5px;">
                            </div>
                        </div>

                        <!-- Thông tin cơ bản -->
                        <div class="col-md-8">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label for="editProductName" class="form-label">Tên Sản Phẩm</label>
                                    <input type="text" class="form-control" id="editProductName" name="name" required>
                                </div>
                                <div class="col-md-6">
                                    <label for="editProductPrice" class="form-label">Giá ($)</label>
                                    <input type="number" class="form-control" id="editProductPrice" name="price" required>
                                </div>
                                <div class="col-md-6">
                                    <label for="editProductCategory" class="form-label">Loại Sản Phẩm</label>
                                    <select class="form-select" id="editProductCategory" name="category_id" required>
                                        <?php
                                        $apiUrl = "http://localhost/PHP-code/webbanhang/admin/api/product/getallcategory.php";
                                        $categories = [];
                                        try {
                                            $response = file_get_contents($apiUrl);
                                            $categories = json_decode($response, true);
                                        } catch (Exception $e) {
                                            echo "<option value=''>Không thể tải danh sách loại sản phẩm</option>";
                                        }
                                        if (!empty($categories) && is_array($categories)) {
                                            foreach ($categories as $category) {
                                                echo "<option value='" . htmlspecialchars($category['id']) . "'>" . htmlspecialchars($category['name']) . "</option>";
                                            }
                                        } else {
                                            echo "<option value=''>Không có loại sản phẩm nào</option>";
                                        }
                                        ?>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label for="editProductBrand" class="form-label">Hãng Sản Phẩm</label>
                                    <select class="form-select" id="editProductBrand" name="brand" required>
                                        <?php
                                        $apiUrl = "http://localhost/PHP-code/webbanhang/admin/api/product/getallbrand.php";
                                        $brands = [];
                                        try {
                                            $response = file_get_contents($apiUrl);
                                            $brands = json_decode($response, true);
                                        } catch (Exception $e) {
                                            echo "<option value=''>Không thể tải danh sách hãng</option>";
                                        }
                                        if (!empty($brands) && is_array($brands)) {
                                            foreach ($brands as $brand) {
                                                echo "<option value='" . htmlspecialchars($brand['id']) . "'>" . htmlspecialchars($brand['name']) . "</option>";
                                            }
                                        } else {
                                            echo "<option value=''>Không có hãng nào</option>";
                                        }
                                        ?>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label for="editProductStatus" class="form-label">Trạng Thái</label>
                                    <select class="form-select" id="editProductStatus" name="status" required>
                                        <option value="{}">Đang bán</option>
                                        <option value="1">Ngưng bán</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label for="editProductSupplier" class="form-label">Nhà Cung Cấp</label>
                                    <select class="form-select" id="editProductSupplier" name="supplier_id" required>
                                        <?php
                                        $apiUrl = "http://localhost/PHP-code/webbanhang/admin/api/product/getallsupplier.php";
                                        $suppliers = [];
                                        try {
                                            $response = file_get_contents($apiUrl);
                                            $suppliers = json_decode($response, true);
                                        } catch (Exception $e) {
                                            echo "<option value=''>Không thể tải danh sách nhà cung cấp</option>";
                                        }
                                        if (!empty($suppliers) && is_array($suppliers)) {
                                            foreach ($suppliers as $supplier) {
                                                echo "<option value='" . htmlspecialchars($supplier['id']) . "'>" . htmlspecialchars($supplier['name']) . "</option>";
                                            }
                                        } else {
                                            echo "<option value=''>Không có nhà cung cấp nào</option>";
                                        }
                                        ?>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <!-- Size sản phẩm -->
                        <div class="col-md-12 mt-2">
                            <label class="form-label">Chọn Size</label>
                            <div id="editSizeQuantityContainer" class="border p-2 rounded" style="height: 100px; overflow-y: auto; padding: 5px; border-radius: 6px;">
                                <div class="row g-2 align-items-center mb-2 size-row">
                                </div>
                            </div>
                            <button type="button" class="btn btn-secondary mt-2" id="addEditSizeRow">+ Thêm Size</button>
                        </div>

                        <!-- Mô tả -->
                        <div class="col-md-12 mt-2">
                            <label for="editProductDescription" class="form-label">Mô Tả</label>
                            <textarea class="form-control" id="editProductDescription" name="description" rows="2"></textarea>
                        </div>
                    </div>

                    <!-- Nút hành động -->
                    <div class="mt-4 text-end">
                        <?php echo $deletePermission; ?>
                        <?php echo $updatePermission; ?>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>