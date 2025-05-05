<div?php
// Kích hoạt ghi log lỗi PHP để debug
ini_set('log_errors', 1);
ini_set('error_log', 'C:/xampp/php/php_error.log');
?>



<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="">
  <link rel="stylesheet" href="../static/css/base.css" />
  <link rel="stylesheet" href="../static/css/demo.css">
  <link rel="stylesheet" href="../static/css/style.css" />
  <link rel="stylesheet" href="../static/css/login3.css" />
  <link rel="stylesheet" href="../static/css/thanhtoan.css">
  <link rel="stylesheet" href="../static/css/giohang.css">
  <link rel="stylesheet" href="../static/css/style-mobile.css"/>
  <link rel="stylesheet" href="../static/css/course_infor.css">
  <link rel="stylesheet" href="../static/css/interface_btn.css">
  <link rel="stylesheet" href="../static/css/updateCourse.css">
  <link rel="stylesheet" href="../static/css/purchaseSumary.css">
  <link rel="stylesheet" href="../static/font/fontawesome-free-6.6.0-web/css/all.css" />
  <title>Sports shop</title>
</head>

<body>
  <div>
    <div class="header">
      <div class="header-nav">
        <div class="nav-list nav-list1">
          <button class="btn__Home_Logo" onclick="window.location.href='index.php'">
            <img src="../static/img/logo.jpg" alt="logo" class="img-logo" />
          </button>
      
        </div>
        <div class="nav-list nav-list2">
          <div class="nav-search">
            <button class="search-item icon-search" id="icon-search" onclick="searchByName()">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
            <input class="search-item input-search" id="input-search" type="text" placeholder="Tim Kiem" />

          </div>
        </div>
        <div class="nav-list nav-list3">
          <button class="nav-list3--item icon-notice">
            <i class="fa-solid fa-bell"></i>
          </button>
          <div class="nav-list3--item icon__cart-shopping">
            <div id="bulbleLength" style="color: red; position: absolute; top: 0px; right: 0px;">0</div>
            <i class="fa-solid fa-cart-shopping"></i>
          </div>

          <div class="1234 nav-list3--item">
            <button class="nav-list3--item login" id="btn-login">Đăng ký | Đăng nhập</button>
            <div class="container-1234" id="id-container-1234" style="margin-left: 50%;">
              <i class="fa-regular fa-circle-user"></i>
              <div class="inner-1234">
                <div class="inner-iu">
                  <div class="iu-inner-icon">
                    <i class="fa-regular fa-circle-user"></i>
                  </div>
                  <div class="iu-inner-name">
                    <div style="font-weight: bold;" id="1234-username">username</div>
                    <div id="1234-EP">email or phonenumber</div>
                  </div>
                </div>
                <div class="inner-ex-infor" id="infor-1234" onclick="openinfor1234();">Thông Tin Tài Khoản</div>
                <div class="inner-ex-infor" id="inforcart-1234" onclick="innerPurchaseHistory()">Lịch Sử Mua Hàng</div>
                <div class="inner-logout" id="1234-logout">
                  <p>Đăng xuất</p>
                  <i class="fa-solid fa-sign-out"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- đănh nhập đăng ký popup -->
      <!-- login -->
      <div id="login-user">
        <div class="login-container" id="login-user-inner">
          <div class="inner-login-container" id="inner-login-user">
          <div class="form-layout">
            <header>
              <button class="close-login-item" onclick="closeFormLogin();">x</button>
              <h1 class="inner-title"><span id="change-text-login-item">Đăng nhập</span> tài khoản</h1>
              <p id="inner-login-text-item">Đến với chúng tôi bạn sẽ không cảm thấy hối tiếc</p>
            </header>
            <main id="main-login-inner">
              
              <div id="inner-from-IU">
                <form name="frmSignUp" onsubmit="showSignUp(event)">
                  <div class="form-group">
                    <label for="fullname-signUp">Tên tài khoản của bạn:</label>
                    <input type="text" id="fullname-signUp" placeholder="Tên tài khoản">
                  </div>
                  <div class="form-group">
                    <label for="password-signUp">Mật khẩu của bạn:</label>
                    <input type="password" id="password-signUp" placeholder="Mật khẩu">
                  </div>
                  <button type="submit" id="btn-login" class="btn-login-UI">Đăng nhập</button>
                  <button onclick="forgetPassword(event)" class="forget-password" style="margin: 10px 0 20px 0;">Quên mật khẩu?</button>
                </div>
              </form>
              <div class="login-content-btns">
                <p>Hoặc <span id="inner-p-login-content-btns">đăng nhập</span> với:</p>
                <button class="btn-login-item-ex">
                  <i class="fa-brands fa-google"></i>
                </button>
                <button class="btn-login-item-ex">
                  <i class="fa-brands fa-facebook"></i>
                </button>
                <button class="btn-login-item-ex">
                  <i class="fa-brands fa-instagram"></i>
                </button>
                <button class="btn-login-item-ex">
                  <i class="fa-brands fa-github"></i>
                </button>
              </div>
            </main>
          </div>
          <div class="toggle-layout">
            <div class="toggle-container">
              <div class="toggle">
                  <div class="toggle-panel toggle-left">
                      <button class="hidden" id="login">Sign In</button>
                  </div>
                  <div class="toggle-panel toggle-right">
                      <div class="inner-login-logo">
                        <img src="../static/img/logo.jpg" alt="Logo">
                      </div>
                      <p>Chào mừng đến với trang web của chúng tôi</p>
                      <div class="inner-btn">
                        <p id="item-text-p" style="margin-right: 10px;">Bạn chưa có tài khoản?</p>
                        <button style="width: 30%;margin: 0;" onclick="changeIU(event)" class="btn-login-UI"
                        id="main-login-inner-btn-login" status-btn="signUP">Đăng ký</button>                  
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
      <!-- end login -->
    </div>
    <!-- banner -->
    <div class="container" id="container">
        <div class="home-wrapper">
          <div class="banner">
            <div class="banner-slide">
              <img src="../static/img/banner4.jpg" alt="Quảng cáo 1" class="fade">
              <img src="../static/img/banner5.jpg" alt="Quảng cáo 2" class="fade">
              <img src="../static/img/baner6.jpg" alt="Quảng cáo 3" class="fade">
            </div>
            <div class="banner-controls">
              <button class="prev" onclick="prevSlide()">&#10094;</button>
              <button class="next" onclick="nextSlide()">&#10095;</button>
            </div>
            <div class="dots">
              <span class="dot active" onclick="showSlide(0)"></span>
              <span class="dot" onclick="showSlide(1)"></span>
              <span class="dot" onclick="showSlide(2)"></span>
            </div>
          </div>
        </div>
<!--end banner -->

<!-- side bar -->
    <div class="content-sport grid" id="content-sport">
          <div class="wrapper">
          <div class="sport-sidebar">
            <div class="sport-sidebar__title" id="sport-sidebar__title"><p onclick="showTopicOverview()">PHÂN LOẠI</p>
            <button class="search-item filter-search" id="filter-search" onclick="modeFilter()">
              <i class="fa-solid fa-filter"></i>
            </button>
            </div>
            <div class="sport-sidebar__list" id="sport-sidebar__list">
<!-- side bar - thương hiệu --> 

<div>

             
              <div class="sport-sidebar__item" id="sport-sidebar__item1">
                
                <div onclick="toggleDropdown('1__list');changeColorMainSportOnSelect('1'); displayMainSportSidebarProduct('1')">
                  Thương hiệu 
                </div>
              </div>

  
<?php
// Kết nối tới cơ sở dữ liệu

include("../static/connectDB/db.php");

// Câu truy vấn SQL để lấy giá trị không trùng lặp

$sql = "SELECT name FROM `brand`";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo '<ul class="sidebarlist 1__list" id="1__list">';
    $idCounter = 1; // Biến đếm để tạo giá trị ID duy nhất
    while ($row = $result->fetch_assoc()) {
        $name = htmlspecialchars($row["name"]); // Xử lý an toàn dữ liệu
        echo '
        <li class="sidebaritem 1__item" id="__item1_' . $idCounter . '">
            <input type="checkbox" value="1_' . $idCounter . '" class="filter__select-box child__checkbox__1 child__checkbox__" id="1_' . $idCounter . '__child__checkbox" onclick="filterProducts()">
            <a class="sidebar_item--link" onclick="handleSportButtonClick(\'1_' . $idCounter . '\');changeColorMainSportOnSelect(\'1\')">
                <div>' . $name . '</div>
                <i class="fa-solid fa-arrow-right"></i>
            </a>
        </li>';
        $idCounter++;
    }
    echo '</ul>';
} else {
    echo "<ul class='sidebarlist 1__list' id='1__list'><li>Không có dữ liệu!</li></ul>";
}

// Đóng kết nối
$conn->close();
?>
</div>

<!-- end side bar - thương hiệu --> 


<!-- side bar - Loại Giày -->

<div>
              <div class="sport-sidebar__item" id="sport-sidebar__item1">
                
                <div onclick="toggleDropdown('2__list');changeColorMainSportOnSelect('2'); displayMainSportSidebarProduct('2')">
                  Loại Giày 
                </div>
              </div>
              <?php
// Kết nối tới cơ sở dữ liệu

include("../static/connectDB/db.php");

// Câu truy vấn SQL để lấy giá trị không trùng lặp
$sql = "SELECT name FROM category";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo '<ul class="sidebarlist 2__list" id="2__list">';
    $idCounter = 1; // Biến đếm để tạo giá trị ID duy nhất
    while ($row = $result->fetch_assoc()) {
        $name = htmlspecialchars($row["name"]); // Xử lý an toàn dữ liệu
        echo '
        <li class="sidebaritem 2__item" id="__item2_' . $idCounter . '">
            <input type="checkbox" value="2_' . $idCounter . '" class="filter__select-box child__checkbox__2 child__checkbox__" id="2_' . $idCounter . '__child__checkbox" onclick="filterProducts()">
            <a class="sidebar_item--link" onclick="handleSportButtonClick(\'2_' . $idCounter . '\');changeColorMainSportOnSelect(\'2\')">
                <div>' . $name . '</div>
                <i class="fa-solid fa-arrow-right"></i>
            </a>
        </li>';
        $idCounter++;
    }
    echo '</ul>';
} else {
    echo "<ul class='sidebarlist 2__list' id='2__list'><li>Không có dữ liệu!</li></ul>";
}

// Đóng kết nối
$conn->close();
?>
</div>

<!-- end side bar - Loại Giày --> 


<!-- side bar - Kích thước -->

<div> 
              <div class="sport-sidebar__item" id="sport-sidebar__item3">
                
                <div onclick="toggleDropdown('3__list');changeColorMainSportOnSelect('3'); displayMainSportSidebarProduct('3')">
                  Kích thước
                </div>
              </div>
              <?php
// Kết nối tới cơ sở dữ liệu

include("../static/connectDB/db.php");

// Câu truy vấn SQL để lấy giá trị không trùng lặp
$sql = "SELECT DISTINCT size_number FROM size";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo '<ul class="sidebarlist 3__list" id="3__list">';
    $idCounter = 1; // Biến đếm để tạo giá trị ID duy nhất
    while ($row = $result->fetch_assoc()) {
        $size = htmlspecialchars($row["size_number"]);
        echo '
        <li class="sidebaritem 3__item" id="__item3_' . $idCounter . '">
            <input type="checkbox" value="' . $size . '" class="filter__select-box child__checkbox__3 child__checkbox__" id="3_' . $idCounter . '__child__checkbox" onclick="filterProducts()">
            <a class="sidebar_item--link" onclick="handleSportButtonClick(\'3_' . $idCounter . '\');changeColorMainSportOnSelect(\'3\')">
                <div>' . $size . '</div>
                <i class="fa-solid fa-arrow-right"></i>
            </a>
        </li>';
        $idCounter++;
    }
    echo '</ul>';
} else {
    echo "<ul class='sidebarlist 3__list' id='3__list'><li>Không có dữ liệu!</li></ul>";
}

// Đóng kết nối
$conn->close();
?>
</div>

<!-- end side bar - Kích thước --> 
            </div>
          </div>
          <div class="sport-maincontent">
            <div class="sport-maincontent__title" id="sport-maincontent__title">Các sản phẩm hiện có</div>
              <div class="filter--choose" id="filter--choose">
                <div class="filter--choose__item"> Khoảng giá: <input class="filter--choose__input" type="number" id="loctheogiadau" placeholder="từ: vnd "/> - <input class="filter--choose__input" type="number" id="loctheogiaduoi" placeholder="Đến: vnd"/> </div>
                <div class="filter--choose__item filter--choose__item2"> Giá: <i onclick="sortByPrice('ASC')" class="fa-solid fa-arrow-up-wide-short"></i><i onclick="sortByPrice('DESC')" class="fa-solid fa-arrow-down-wide-short"></i></div>
              </div>


<!-- danh sách sản phẩm -->
<div class="ProductList" >
  <div class="ProductList_pagination">
    <?php include("../static/connectDB/pagination.php"); ?> 
  </div>
    <?php include("../static/connectDB/productList.php"); ?> 
</div>
<!-- end danh sach san pham -->

<?php $conn->close(); ?>

          </div>
        </div>
    </div>
</div>
        <div class="view-product"></div>
    
    </div>
    
  <!-- end side bar -->

  </div>
    <div id="container_infor"></div>
    <div id="puchase_sumary"></div>
    
    <div class="footer">
      <div class="grid">
        <div class="ft_item">
          <img src="../static/img/logo.jpg" alt="" style="width: 80%;">
          <p>Dụng cụ thể thao của chúng tôi được thiết kế thông minh, 
            linh hoạt để bạn có thể nâng cao kỹ năng, sức khoẻ một cách dễ dàng và hiệu quả.</p>
          <div>
            <i style="margin: 0 5px; cursor: pointer;font-size: 2rem;" class="fa-brands fa-facebook"></i>
            <i style="margin: 0 5px; cursor: pointer;font-size: 2rem;" class="fa-brands fa-youtube"></i>
            <i style="margin: 0 5px; cursor: pointer;font-size: 2rem;" class="fa-brands fa-square-instagram"></i>
            <i style="margin: 0 5px; cursor: pointer;font-size: 2rem;" class="fa-brands fa-square-twitter"></i>
          </div>
        </div>
        <div class="ft_item">
          <h3>Về chúng tôi</h3>
          <ul>
            <li>Giới thiệu</li>
            <li>Điều khoản sử dụng</li>
            <li>Trợ giúp</li>
          </ul>
        </div>
        <div class="ft_item">
          <h3>Dụng cụ thể thao</h3>
          <ul>
            <li>Bóng thể thao</li> 
            <li>Dụng cụ tập luyện & thể hình</li>
            <li>Dụng cụ thể thao dưới nước</li> 
            <li>Dụng cụ cầu lông, tennis, bóng bàn</li> 
            <li>Dụng cụ thể thao đối kháng</li> 
            <li>Trang phục & phụ kiện thể thao</li>
          </ul>
        </div>
        <div class="ft_item">
          <h3>Thông tin liên hệ</h3>
          <ul>
            <li><i class="fa-regular fa-building"></i> 273, An Dương Vương, Phường 3, Quận 5, TP. Hồ Chí Minh</li>
            <li><i class="fa-solid fa-tty"></i> 1900.633.331 hoặc 077.567.6116 (8h30-21h thứ 2 - thứ 6, 8h30-11h30 thứ 7)</li>
            <li><i class="fa-regular fa-envelope"></i> support@sportshop.io</li>
          </ul>
        </div>
      </div>
      <div class="ft-copyright grid">
        <div style="margin-left: 20px;"> 
          Bản quyền © 2024 Sports store Group Ltd
        </div>
        <div class="ft-copyrightLast">
          <div>Điều khoản</div>
          <div>Chính sách</div>
          <div>Bảo mật</div>
        </div>
      </div>
    </div>
    <div class="iconfooter">
    </div>
    <div id="notification-container"></div>
    <div id="set-infor-1234"></div>

    <!-- Giỏ hàng -->
    <div class="modal">
      <div class="cart show-cart">
          <div class="content-cart">
              <div class="title-cart">
                  = Giỏ hàng =
                  <i class="fa-solid fa-cart-shopping"></i>
              </div>
              <div class="list-cart-item">
                  <div class="empty-cart" style="height: 400px; display: flex; align-items: center; justify-content: center; flex-direction: column;">
                      <img src="../static/img/rb_5858.png" alt="" style="height: 300px; width: 300px; display: block;">
                      <h1 style="font-size: 20px; font-weight: 500;">Rất tiếc, bạn chưa chọn món!</h1>
                  </div>
              </div>
              <div class="payment">
                  <div class="total-payment">
                    <span class="total-price-cart-label">Tổng số lượng</span>
                    <span class="total-quantity-cart"  id="totalProduct">0</span>
                    <span>Tổng tiền</span>
                    <span class="total-price-cart" id="totalPrice">0 đ</span>
                  </div>
                  <button class="btnPayment" id="btnPayment" onclick="payCart();">Thanh toán</button>
              </div>
          </div>
      </div>
    </div>
    
  
  </div>
 
    <script src="../static/js/branchs.js"></script>
    <script src="../static/js/login3.js"></script>
    <script src="../static/connectDB/purchaseHistoryEvent.js"></script>
    <script src="../static/connectDB/loginEvent.js"></script>
    <script src="../static/js/product.js"></script>
    <script src="../static/js/purchaseHistory2.js"></script>
    <script src="../static/js/Payment.js"></script>
    <script src="../static/js/toast-msg.js"></script>
    <!-- Nghĩa - xử lý giao diện -->
    <script>
        const dots = document.querySelectorAll(".dot");
        const slidesContainer = document.querySelector(".banner-slide");
        const prevButton = document.querySelector(".prev");
        const nextButton = document.querySelector(".next");

      const slides = document.querySelectorAll(".banner-slide img");
      const totalSlides = slides.length;

      // Tạo bản sao của hình đầu tiên và thêm vào cuối danh sách
      const firstClone = slides[0].cloneNode(true);
      slidesContainer.appendChild(firstClone);

      let currentIndex = 0;
      let isTransitioning = false; // Tránh spam click khi đang chuyển slide

      // Hàm hiển thị slide
      function showSlide(index) {
        if (isTransitioning) return; // Ngăn chặn spam click
        isTransitioning = true;

        currentIndex = index;
        slidesContainer.style.transition = "transform 0.5s ease-in-out";
        slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, i) => {
                dot.classList.remove('active');
                if (i === currentIndex) {
                    dot.classList.add('active');
                }
            });

        // Nếu đến bản sao của hình đầu tiên, reset lại vị trí mà không có hiệu ứng
        setTimeout(() => {
          if (currentIndex === totalSlides) {
              slidesContainer.style.transition = "none"; // Tắt animation
              slidesContainer.style.transform = "translateX(0)"; // Đặt lại vị trí
              currentIndex = 0;
              dots.forEach((dot) => dot.classList.remove('active')); // Xóa tất cả các dấu chấm
              dots[0].classList.add('active'); // Đánh dấu dấu chấm đầu tiên là active
          }
          isTransitioning = false;
        }, 500);
      }

      // Hàm để chuyển đến slide tiếp theo
      function nextSlide() {
        showSlide(currentIndex + 1);
      }

      // Hàm để chuyển đến slide trước đó
      function prevSlide() {
      if (currentIndex === 0) {
        currentIndex = totalSlides - 1; // Quay về cuối danh sách (vòng lặp)
        slidesContainer.style.transition = "none"; // Tắt animation
        slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        setTimeout(() => {
            showSlide(currentIndex - 1);
        }, 50);
      } else {
        showSlide(currentIndex - 1);
      }
    }

    // Tự động chuyển slide mỗi 3 giây
    setInterval(nextSlide, 3000);

        const filterProduct = document.getElementById("filter-search");
        filterProduct.addEventListener("click", () => {
            const productContent = document.querySelector(".content-sport");
            const fixedPosition = window.pageYOffset + productContent.getBoundingClientRect().top - 90;
            window.scrollTo({ top: fixedPosition, behavior: "smooth" });  
        });
    </script>

    <!-- Vy - xử lý phân trang + lọc sản phẩm --> 



<script>

/* hàm hiển thị danh sách sản phẩm mặc định */
function loadPage(page) {
    console.log(`🔹 Đang tải sản phẩm cho trang ${page}`);

    // Loại bỏ class "active" của tất cả nút phân trang
    document.querySelectorAll(".page-btn").forEach(btn => btn.classList.remove("active"));

    // Thêm class "active" vào nút được click
    document.querySelector(`.page-btn[data-page='${page}']`)?.classList.add("active");

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/WebBanHang/WebBanHang-NGHIA/WebBanHang-NGHIA/static/connectDB/productList.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("✅ Trả về từ server (loadPage):", xhr.responseText);
            document.querySelector(".sport-maincontent__show-product").innerHTML = xhr.responseText;
        }
    };

    xhr.send(`page=${page}`);
}


 /* hàm lọc sản phẩm theo lựa chọn */
 function filterProducts(page = 1) {
    console.log(`🔹 Đang gửi request lọc sản phẩm... Trang: ${page}`);
    document.querySelector(".ProductList_pagination").style.display = "none";


    let brandElements = document.querySelectorAll('.child__checkbox__1:checked');
    let categoryElements = document.querySelectorAll('.child__checkbox__2:checked');
    let sizeElements = document.querySelectorAll('.child__checkbox__3:checked');

    let brand = [...brandElements].map(el => el.getAttribute("value").split("_")[1]).join(",") || "";
    let category = [...categoryElements].map(el => el.getAttribute("value").split("_")[1]).join(",") || "";
    let size = [...sizeElements].map(el => el.getAttribute("value")).join(",") || "";

    let priceMin = document.getElementById("loctheogiadau").value || 0;
    let priceMax = document.getElementById("loctheogiaduoi").value || 999999999;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/WebBanHang/WebBanHang-NGHIA/WebBanHang-NGHIA/static/connectDB/filterProducts.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("✅ Trả về từ server:", xhr.responseText);
            document.querySelector(".sport-maincontent__show-product").innerHTML = xhr.responseText;
        }
    };

    xhr.send(`page=${page}&brand=${brand}&category=${category}&size=${size}&priceMin=${priceMin}&priceMax=${priceMax}`);

    console.log("🛠️ Dữ liệu gửi đi:", { page, brand, category, size, priceMin, priceMax });
}

/* hàm xử lý phân trang cho filterProduct */
function loadPage_filterProduct(page) {
    console.log(`🔹 Đang tải sản phẩm đã lọc - Trang: ${page}`);
    document.querySelector(".ProductList_pagination").style.display = "none";
    // Loại bỏ class "active" của tất cả nút phân trang
    document.querySelectorAll(".page-btn").forEach(btn => btn.classList.remove("active"));

    // Thêm class "active" vào nút được click
    document.querySelector(`.page-btn[data-page='${page}']`)?.classList.add("active");

    // Gọi lại `filterProducts()` với trang mới
    filterProducts(page);
}

// Kiểm tra xem hàm có thực sự được gọi
document.querySelectorAll('input[name="brand"], input[name="category"], input[name="size"], #loctheogiadau, #loctheogiaduoi').forEach(input => {
    input.addEventListener("change", () => {
        console.log("🔹 Bộ lọc thay đổi, gọi filterProducts()");
        filterProducts();
    });
});



/* hàm tìm kiếm sản phẩm theo tên */
function searchByName(page = 1) {
    console.log(`🔹 Đang tìm kiếm sản phẩm... Trang: ${page}`);

    document.querySelector(".ProductList_pagination").style.display = "none";
    
    let searchQuery = document.getElementById("input-search").value.trim() || "";

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/WebBanHang/WebBanHang-NGHIA/WebBanHang-NGHIA/static/connectDB/SearchByName.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("✅ Trả về từ server:", xhr.responseText);
            document.querySelector(".sport-maincontent__show-product").innerHTML = xhr.responseText;

            // Hiển thị lại phân trang sau khi có dữ liệu
            
        }
    };

    xhr.send(`searchQuery=${searchQuery}&page=${page}`);
}
/* hàm xử lý phân trang cho searchByName */
function loadPage_searchByName(page) {
    console.log(`🔹 Đang tải sản phẩm cho trang ${page}`);
    document.querySelector(".ProductList_pagination").style.display = "none";
    // Loại bỏ class "active" của tất cả nút phân trang
    document.querySelectorAll(".page-btn").forEach(btn => btn.classList.remove("active"));

    // Thêm class "active" vào nút được click
    document.querySelector(`.page-btn[data-page='${page}']`)?.classList.add("active");

    searchByName(page);
}

/* hàm sắp xếp theo giá sản phẩm */
function sortByPrice(order, page = 1) {
    console.log(`🔹 Đang sắp xếp sản phẩm theo giá (${order}) - Trang: ${page}`);

    document.querySelector(".ProductList_pagination").style.display = "none";

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/WebBanHang/WebBanHang-NGHIA/WebBanHang-NGHIA/static/connectDB/SortByPrice.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("✅ Trả về danh sách sản phẩm đã sắp xếp:", xhr.responseText);
            document.querySelector(".sport-maincontent__show-product").innerHTML = xhr.responseText;

            // Hiển thị lại phân trang sau khi có dữ liệu
           
        }
    };

    xhr.send(`sortOrder=${order}&page=${page}`);
}
/* hàm xử lý phân trang cho sortByPrice */
function loadPage_sortByPrice(order, page) {
    console.log(`🔹 Đang tải sản phẩm được sắp xếp theo giá (${order}) - Trang: ${page}`);

    // Loại bỏ class "active" của tất cả nút phân trang
    document.querySelectorAll(".page-btn").forEach(btn => btn.classList.remove("active"));

    // Thêm class "active" vào nút được click
    document.querySelector(`.page-btn[data-page='${page}']`)?.classList.add("active");

    // Gọi lại `sortByPrice()` với trang mới
    sortByPrice(order, page);
}




</script>
    
</body>

</html>