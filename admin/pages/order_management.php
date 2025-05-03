<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
if (!hasPagePermission($_SESSION['permissions'], 'index.php?page=order_management')) {
    header("Location: login.php"); // Chuyển hướng đến trang đăng nhập
    exit();
}
?>

<h2 class="mb-4">Quản Lý Đơn Hàng</h2>
  <hr class="main-hr">
  <h5 class="mb-3">Danh Sách Đơn Hàng</h5>
  <input type="hidden" id="currentUserId" value="<?php echo $_SESSION['user_id']; ?>">
  <div class="d-flex align-items-center gap-3 mb-3">
    <input type="text" id="searchAddress" class="form-control" placeholder="Tìm Kiếm Địa Chỉ" style="width: 30%;">
  <select id="sortOrder" class="form-select btn-primary" style="width: 13%; ">
            <option value="3">Tỉnh/Thành Phố</option>
            <option value="2">Quận/Huyện</option>
            <option value="1">Phường/Xã</option>
            <option value="0">Đường/Phố</option>
        </select> 
    </div>
  <div class="d-flex align-items-center gap-3 mb-3">
        <select id="orderStatusFilter" class="form-select" style="width: 20%;">
            <option value="">Tình Trạng Đơn Hàng</option>
            <option value="pending">Chưa Xử Lý</option>
            <option value="processing">Đang giao</option>
            <option value="shipped">Đã giao</option>
            <option value="cancelled">Đã Hủy</option>
        </select>
        <input type="date" id="startDateFilter" class="form-control" style="width: 20%;" placeholder="Từ Ngày">
        <input type="date" id="endDateFilter" class="form-control" style="width: 20%;" placeholder="Đến Ngày">   
      </div>
  <hr class="main-hr">

    <div class="table-container">
        <table class="table table-bordered table-custom table-hover">
        <thead class="table-light">
            <tr class="text-center align-middle">
            <th>Mã Đơn Hàng</th>
            <th>Tên Khách Hàng</th>
            <th>Số Điện Thoại</th>
            <th>Địa Chỉ Giao Hàng</th>
            <th>Tổng Tiền</th>
            <th>Ngày Tạo</th>
            <th>Tình Trạng</th>
            <th>Hành Động</th>
            </tr>
        </thead>
        <tbody id="tableBodyAccount">
            <tr>
            <td colspan="10">Đang tải dữ liệu...</td>
            </tr>
        </tbody>
        </table>
    </div>

    <!-- Popup nhập lý do hủy đơn -->
    <div class="modal fade" id="cancelOrderModal" tabindex="-1" aria-labelledby="cancelOrderModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="cancelOrderModalLabel">Nhập Lý Do Hủy Đơn</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="cancelOrderForm">
                        <div class="mb-3">
                            <label for="cancelReason" class="form-label">Lý Do</label>
                            <textarea class="form-control" id="cancelReason" name="cancelReason" rows="4" placeholder="Nhập lý do hủy đơn hàng..." required></textarea>
                        </div>
                        <input type="hidden" id="orderIdToCancel" name="orderIdToCancel">
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button type="button" class="btn btn-danger" id="confirmCancelOrder">Xác Nhận Hủy</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="orderModal" tabindex="-1" aria-labelledby="orderModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
    
      <div class="modal-header">
        <h5 class="modal-title" id="orderModalLabel">Chi tiết đơn hàng #<span id="order-id"></span></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Đóng"></button>
      </div>
      
      <div class="modal-body">
        <!-- Thông tin đơn hàng -->
        <div class="row mb-4">
          <div class="col-md-6">
            <h6>Thông tin đơn hàng</h6>
            <ul class="list-group list-group-flush">
              <li class="list-group-item"><strong>Trạng thái:</strong> <span id="status"></span></li>
              <li class="list-group-item" id="d_none"><strong>Lý do:</strong> <span id="reason"></span></li>
              <li class="list-group-item"><strong>Ngày tạo:</strong> <span id="created-at"></span></li>
              <li class="list-group-item"><strong>Nhân viên xử lý:</strong> <span id="employee-id"></span></li>
              <li class="list-group-item"><strong>Tổng tiền:</strong> <span id="total"></span></li>
            </ul>
        </div>
        <div class="col-md-6">
            <h6>&nbsp;</h6>
            <ul class="list-group list-group-flush">
                <li class="list-group-item"><strong>Người đặt hàng:</strong> <span id="customer-name"></span></li>
                <li class="list-group-item"><strong>Địa chỉ giao hàng:</strong> <span id="address"></span></li>
                <li class="list-group-item"><strong>SĐT người nhận:</strong> <span id="phone-number"></span></li>
              <li class="list-group-item"><strong>Phương thức thanh toán:</strong> <span id="payment-method"></span></li>
            </ul>
          </div>
        </div>

        <!-- Chi tiết sản phẩm -->
        <h6 class="mb-3">Danh sách sản phẩm</h6>
        <div class="table-responsive">
          <table class="table table-bordered table-hover">
            <thead class="table-light">
              <tr>
                <th>#</th>
                <th>Tên sản phẩm</th>
                <th>Size</th>
                <th>Số lượng</th>
                <th>Đơn giá</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody id="order-details-body">
              <!-- JS sẽ render nội dung ở đây -->
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
      </div>

    </div>
  </div>
</div>

