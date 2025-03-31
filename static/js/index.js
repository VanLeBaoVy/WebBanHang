server_loadfile();
const productCountPerPage = 6; 

function simulateLoading(time = 300) {
  const overlay = document.getElementById('overlay');

  // Hiển thị màn hình tối khi hàm được gọi
  overlay.style.display = 'flex';

  // Sau 1 giây (1000ms), ẩn màn hình tối
  setTimeout(() => {
    overlay.style.display = 'none'; // Ẩn màn hình tối
    // Tiếp tục thực hiện các hành động khác nếu cần
    // alert('Trang đã tải xong!');
  }, time); // 1 giây (1000ms)
}

simulateLoading();

let isHovering = false; // Cờ kiểm tra trạng thái hover
let hoverTimeout; // Timeout để debounce sự kiện

function handleHover(isEnter) {
  if (isEnter) {
    if (!isHovering) {
      isHovering = true; // Đặt cờ khi chuột vào
      clearTimeout(hoverTimeout); // Hủy timeout nếu đang đợi tắt
      showHoverCart();
    }
  } else {
    if (isHovering) {
      hoverTimeout = setTimeout(() => {
        isHovering = false; // Reset cờ khi chuột ra
        hideHoverCart();
      }, 200); // Đặt thời gian trễ để tránh đóng ngay lập tức
    }
  }
}

/////////////////////////////////////// SPORT /////////////////////////////////////////////////////////////////////

function toggleDropdown(idelement) {
  const menu = document.getElementById(idelement); // Lấy phần tử dự trên ID ađược truyền vào

  // Kiểm tra trạng thái hiện tại của menu và thay đổi giữa 'block' và 'none'
  if (menu.style.display === "block") {
    menu.style.display = "none"; // Ẩn menu nếu đang mở
  } else {
    menu.style.display = "block"; // Hiển thị menu nếu đang ẩn
  }
}

// hiển thị sản phẩm có phân trang
function displayProducts(productArray, page, productCountPerPage) {
  // Xác định vị trí bắt đầu và kết thúc
  const startIndex = (page - 1) * productCountPerPage;
  const endIndex = page * productCountPerPage;

  // Lọc các sản phẩm cần hiển thị
  const productsToShow = productArray.slice(startIndex, endIndex);

  // Làm sạch màn hình hiển thị
  const productListElement = document.getElementById("product-list");
  productListElement.innerHTML = "";

  // // Hiển thị từng sản phẩm
  for (let i = 0; i < productsToShow.length; i++) {
    const productElement = document.createElement("div");
    productElement.classList.add("border-product");
    // productElement.id = `${productsToShow[i].getId()}`;
    productElement.innerHTML = `
                    <div class="product" onclick="innerSportInfor('${productsToShow[i].getId()}')">
                      <button  class="product__img-btn" ><img class="product__img" src="${productsToShow[
        i
      ].getThumbnail()}" alt="">
                      </button>
                      <div class="product__infor">
                        <div class="__infor __infor__name"><strong>${productsToShow[
        i
      ].getname()}</strong></div>
                        <div class="__infor __infor__price">
                          <div class="__price __price__start"><s>${productsToShow[
        i
      ].getprice()}<span>đ</span></s></div>
                          <div class="__price __price__final">${productsToShow[
        i
      ].getSalePrice()}<span>đ</span></div>
                        </div>
                        <div class="__infor __infor__foot">
                          <div class="__foot__count"><i class="fa-solid fa-people-group" style="padding: 0 3px;"></i>${productsToShow[
        i
      ].getBuyCount()}</div>
                          <div class="__foot__shop">
                            <button class="__foot__cart-shopping" onclick="showIDProduct(event,'${productsToShow[i].getId()}')"><i class="fa-solid fa-cart-shopping"></i></button>
                            <button class="__foot__buy" onclick="buyNow(event, '${productsToShow[i].getId()}')">Mua ngay</button>
                          </div>
                        </div>
                      </div>
                    </div>
    `;
    productListElement.appendChild(productElement);
  }
  window.scrollTo(0, 0);
  // Cập nhật nút phân trang
  updatePagination(productArray, page, productCountPerPage);
}

// Hàm hiển thị phân trang
function updatePagination(productArray, page, productCountPerPage) {
  const paginationElement = document.getElementById("pagination");
  paginationElement.innerHTML = "";

  // Tính tổng số trang
  const totalPages = Math.ceil(productArray.length / productCountPerPage);
  if (totalPages > 1) {

    // Tạo nút Previous
    const prevButton = document.createElement("button");
    prevButton.textContent = "Prev";
    prevButton.classList.toggle("disabled", page === 1);
    prevButton.addEventListener("click", () => {
      if (page > 1) displayProducts(productArray, page - 1, productCountPerPage);
    });
    paginationElement.appendChild(prevButton);

    const range = 3; // Số trang muốn hiển thị xung quanh trang hiện tại
    
    const startPage = Math.max(1, page - range);
    const endPage = Math.min(totalPages, page + range);
    // Tạo các nút số trang
    for (let i = startPage; i <= endPage; i++) {
      const pageButton = document.createElement("button");
      pageButton.textContent = i;
      pageButton.classList.toggle("disabled", i === page);
      pageButton.classList.toggle("active", i === page);
      pageButton.addEventListener("click", () => {
        displayProducts(productArray, i, productCountPerPage);
      });
      paginationElement.appendChild(pageButton);
    }

    // Tạo nút Next
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.classList.toggle("disabled", page === totalPages);
    nextButton.addEventListener("click", () => {
      if (page < totalPages)
        displayProducts(productArray, page + 1, productCountPerPage);
    });
    paginationElement.appendChild(nextButton);
  }
}

function changeColorOnSelect(id) {
  let element = document.getElementById(id);
  // Lấy tất cả các phần tử con của phần tử cha
  const classlist = document.querySelectorAll(".sidebarlist li");

  // Đặt màu nền cho tất cả các phần tử con thành trắng
  classlist.forEach((x) => {
    x.classList.remove("selected");
  });

  // Đổi màu nền của phần tử được chọn
  element.classList.add("selected");
}

function changeColorMainSportOnSelect(id) {
  let element = document.getElementById(`sport-sidebar__item${id}`);
  // Lấy tất cả các phần tử con của phần tử cha
  const classlist = document.querySelectorAll(".sport-sidebar__item.mainselected");

  // Đặt màu nền cho tất cả các phần tử con thành trắng
  classlist.forEach((x) => {
    x.classList.remove("mainselected");
  });

  // Đổi màu nền của phần tử được chọn
  element.classList.add("mainselected");
}

function changeSportTitle(element) {
  let title = element.textContent;
  let sporttitle = document.getElementById("sport-maincontent__title");
  sporttitle.textContent = title;
}

/////////////////////////TÌM KIẾM///////////////////////

function toggleCart(display) {
  const cart = document.getElementById("cart-content");
  cart.style.display = display
}

function showCart() {
  const listCart = document.getElementById("cart-list");
  const productsToShow = products[0].slice(0, 4); // Lấy sản phẩm từ mảng đúng
  let ul = '';
  productsToShow.map((item, index) => {
    ul += `
    <li class="cart-item">
      <div class="cart-item-img">
          <img src="../static/img/img_profuct/${index + 1}.png" alt="">
      </div>
       <div class="cart-item-info">
          <div class="cart-item-info-name"><strong>${item.name}</strong></div>
          <div class="cart-item-info-price">
        <div class="cart-item-info-price-final">${item.newprice}<span>đ</span></div>
       </div>
    </div>
    </li>
  `
  });
  listCart.innerHTML = ul;
}


function innerSportSidebar() {
  const sidebar = document.getElementById("sport-sidebar__list");
  rootBranch.forEach((mainItem) => {
    // Create main button
    const mainButton = document.createElement("div");
    mainButton.className = "sport-sidebar__item";
    mainButton.id = `sport-sidebar__item${mainItem.id}`;
    mainButton.innerHTML = `
      <input type="checkbox"  class="filter__select-box filter__select-box__item" id="filter__checkbox__${mainItem.id}"/> 
      <div onclick="toggleDropdown('${mainItem.id}__list');changeColorMainSportOnSelect('${mainItem.id}'); displayMainSportSidebarProduct('${mainItem.id}')">${mainItem.title}
      </div>`;
    sidebar.appendChild(mainButton);

    mainButton.addEventListener("change", function () {
      const item = mainButton.querySelector("input");
      // console.log(item.checked, mainItem.id);
      
      toggleCheckBox(mainItem.id, item.checked);
      performSearch();
    });

    // Create sub-list
    const subList = document.createElement("ul");
    subList.className = `sidebarlist ${mainItem.id}__list`;
    subList.id = `${mainItem.id}__list`;

    mainItem.branch.forEach((subItem) => {
      const listItem = document.createElement("li");
      listItem.className = `sidebaritem ${mainItem.id}__item`;
      listItem.id = `__item${subItem.id}`;
      listItem.innerHTML = `
         <input type="checkbox" value="${subItem.id}" class="filter__select-box child__checkbox__${mainItem.id} child__checkbox__" id="${subItem.id}__child__checkbox" onclick="performSearch()"/>
        <a class="sidebar_item--link" onclick="handleSportButtonClick('${subItem.id}');changeColorMainSportOnSelect('${mainItem.id}')">
           <div>${subItem.title}</div> <i class="fa-solid fa-arrow-right"></i>
        </a>
      `;
      subList.appendChild(listItem);
    });
    sidebar.appendChild(subList);
  });
}
/////////////////////////////////////////////

// in theo id
function displayProductsWithSubId(id) {
  Loc_subCategory(id, (list) => {
    list = filter_arr(list);
    displayProducts(list, 1, productCountPerPage);
  });
}
function handleSportButtonClick(subid) {
  changeColorOnSelect(`__item${subid}`);
  let title = document.getElementById('sport-maincontent__title');
  for (let i = 0; i < rootBranch.length; i++) {
    for (let j = 0; j < rootBranch[i].branch.length; j++)
      if (rootBranch[i].branch[j].id === subid) {
        console.log(rootBranch[i].branch[j].title);
        title.textContent = rootBranch[i].branch[j].title;
        break;
      }
  }
  displayProductsWithSubId(subid);
  window.scrollTo(0, 0);
}


////////////////////////////////////////////

function changeImage(imageSrc) {
  const mainImage = document.getElementById("mainImage");
  mainImage.src = imageSrc;
}

//---------------------------
// Nhận Id của sản phẩm để hiển thị tương ứng

function displaySportInfor(productId) {
  const sportName = document.getElementById('sportName--id');
  const sportDescription = document.getElementById('sportDescriptionId');
  const topicList = document.getElementById('topicListId');
  const purchaseBadge = document.getElementById('purchaseBadge');
  const inserTargetList = document.getElementById("sportInfor__target-List");

  topicList.innerHTML = "";
  queryAllProducts(function (error, list) {
    for (let i = 0; i < list.length; i++)
      if (list[i].getId() === productId) {

        // console.log(list[i]);
        sportName.textContent = list[i].getname();
        couseDescription.textContent = list[i].getDescription();
        const content = list[i].getMainContent().split("#");
        let gio, phut;
        let count = 0;
        let tongphut = 0;
        content.forEach(x => {
          let k = x.trim().split(" ").length * 30; // Tổng số phút (mỗi từ tương ứng với 30 phút)
          gio = Math.ceil(k / 60) - 1; // Chuyển số phút thành giờ
          phut = k - gio * 60; // Tính số phút còn lại
          if (x.trim() !== "") {

            tongphut += k;
            count++;
            const item = document.createElement("div");
            item.classList.add("topicItem");
            item.innerHTML = `
                      <div>${x}</div><span>${gio} giờ ${phut} phút</span>
                      `;
            topicList.appendChild(item);
          }
        })
        gio = Math.ceil(tongphut / 60) - 1; // Chuyển số phút thành giờ
        phut = tongphut - gio * 60; // Tính số phút còn lại
        if (phut === 60) {
          gio++;
          phut = 0;
        }
        purchaseBadge.innerHTML = "";
        purchaseBadge.innerHTML = `
                  <div class="image-container">
                      <!-- Large Image Display -->
                      <div class="large-image" id="large-image">
                          <img id="mainImage" src="${list[i].getThumbnail()}" alt="Large Image">
                      </div>
              
                      <!-- Thumbnail Images -->
                      <div class="thumbnail-container">
                          <img class="thumbnail" id="thumbnail--1" src="${list[i].getThumbnail()}" alt="Thumbnail 1" onclick="changeImage('${list[i].getThumbnail()}')">
                          <img class="thumbnail" id="thumbnail--2" src="${list[i].getImg()}" alt="Thumbnail 2" onclick="changeImage('${list[i].getImg()}')">
                      </div>
                  </div>
                  <div class="price">
                      <div class="price__ oldprice">${list[i].getprice()}<span>đ</span></div>
                      <div class="price__ newprice">${list[i].getSalePrice()}<span>đ</span></div>
                  </div>
                  <div style="display: flex;justify-content: space-around;">
                      <button style="flex: 1; border-radius: 10px;" onclick="showIDProduct(event, '${productId}')"><i class="fa-solid fa-cart-shopping" style="padding: 10px 40px;"></i></button>
                      <button style="flex: 2" class="buynow" onclick="buyNow(event,'${productId}')">Mua Ngay</button>
                  </div>
                  <div class="infor-overview">
                      <p><i class="fa-solid fa-layer-group"></i> Đã bán <span>${list[i].getBuyCount()}</span></p>
                      <p><i class="fa-solid fa-book"></i></i> Tổng số <span>${count}</span> bài học</p>
                      <p><i class="fa-solid fa-clock"></i> Thời lượng <span> ${gio} giờ ${phut} phút</span></p>
                      <p><i class="fa-brands fa-freebsd"></i> Học mọi lúc mọi nơi</p>
                  </div>
                  `;
        inserTargetList.innerHTML = '';
        list[i].getTarget().split("#").forEach(x => {
          if (x !== "")
            inserTargetList.innerHTML += `
                <li class="targetItem"><i class="fa-solid fa-check"></i>${x}</li>
              `;
        });
        break;
      }
  });
}

function innerSportInfor(productId) {
  displayNoneFilterSearch();
  console.log("click");
  let container = document.getElementById("container_infor");
  container.innerHTML = "";

  document.getElementById("container").style.display = "none";
  document.getElementById("sport-dropdown-btn").style.display = "none";
  document.getElementById("__back").style.display = "block";

  document.getElementById("__back").addEventListener("click", function () {
    document.getElementById("container").style.display = "block";
    displayFilterSearch();
    document.getElementById("sport-dropdown-btn").style.display = "block";
    // document.getElementById("container_infor").style.display = "none";
    container.innerHTML = "";
    document.getElementById("__back").style.display = "none";
    Window.scrollTo(0,0);
    // hủy sự kiện 
    // document.getElementById("__back").removeEventListener("click", function () { });
  });
  
  const sportInfor = document.createElement("div");
  sportInfor.classList.add("wrapper", "grid");
  sportInfor.innerHTML = `
          <div class="contain">
              <div class="row">
                  <div class="col col1">
                      <div>
                          <h1 class="sportName" id="sportName--id">
                          </h1>
                          <div class="textContent" id="sportDescriptionId">
                              <p></p>
                          </div>
                      </div>
                      <div style="display:unset;">
                          <h2 class="topicHeading targetHeading">Bạn sẽ học được?</h2>
                          <ul class="targetList">
                                  <ul class="target-List" id="sportInfor__target-List">
                                      </ul>
                          </ul>
                      </div>
                      <div class="curiculumOfSport">
                          <h2 class="topicHeading">
                              Nội dung khóa học
                          </h2>
                          <div>
                              <div class="topicList" id="topicListId">
                                  <div class="topicItem"><div>Hiểu về khái niệm SPA/MPA</div><span>10h</span></div>
      
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="col col2">
                      <div class="purchaseBadge" id="purchaseBadge">
                      </div>
                  </div>
              </div>
          </div>
  `;
  container.appendChild(sportInfor);
  window.scrollTo(0, 0);
  displaySportInfor(productId);
}

function clickSidebar(id) {
  innerSportContent();
  toggleDropdown(`${id}__list`);
  changeColorMainSportOnSelect(`${id}`);
  displayMainSportSidebarProduct(`${id}`);
  sportDropDownBtn();
}
function sportDropDownBtn() {
  document.getElementById(`sport-dropdown-btn`).click();
}
//////////////////////////////////////////show ID product////////////////////////////////////////////
function showIDProduct(event, id) {
  event.stopPropagation();
  console.log(id);
  addToCart(id);
}
function addToCart(id) {
  if (!localStorage.getItem('idLogin')) {
    showNotification('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng', 'error');
    return;
  }
  queryUserByUsername(localStorage.getItem('idLogin'), (user) => {
    if (!(user.cart instanceof Map)) {
      // Nếu giỏ hàng chưa là Map, khởi tạo Map trống
      user.cart = new Map();
    } else if (!(user.cart instanceof Map)) {
      // Nếu cart lưu trữ là Object thuần, chuyển đổi sang Map
      user.cart = new Map(Object.entries(user.cart));
    }

    console.log(user.cart); // Kiểm tra giỏ hàng hiện tại

    // Kiểm tra nếu sản phẩm đã tồn tại trong giỏ hàng
    if (user.cart.has(id)) {
      user.cart.set(id, user.cart.get(id) + 1); // Tăng số lượng sản phẩm
    } else {
      user.cart.set(id, 1); // Thêm sản phẩm mới với số lượng 1
    }

    // Cập nhật lại dữ liệu người dùng
    upDateUser(user.username, user);
    document.getElementById("bulbleLength").textContent = user.cart.size; // Cập nhật số lượng sản phẩm trong giỏ hàng
    // Hiển thị thông báo
    showNotification('Đã thêm sản phẩm vào giỏ hàng', 'success');
  });
}


//////////////////////////////////////////////
// displayHighProducts();
function displayHighProducts() {
  const productListElement = document.getElementById("homepage__sportShow");
  productListElement.innerHTML = "";
  queryAllProducts(function (error, list) {
    list.sort((a, b) => b.getBuyCount() - a.getBuyCount());
    let productsToShow = [];
    for (let i = 0; i < 6; i++) {
      productsToShow.push(list[i]);
    }
    for (let i = 0; i < productsToShow.length; i++) {
      const productElement = document.createElement("div");
      productElement.classList.add("high-product");
      productElement.innerHTML = `
                      <div class="product">
                        <button onclick="innerSportInfor('${productsToShow[i].getId()}')" class="product__img-btn"><img class="product__img" src="${productsToShow[
          i
        ].getThumbnail()}" alt="">
                        </button>
                        <div class="product__infor">
                          <div class="__infor __infor__name"><strong>${productsToShow[
          i
        ].getname()}</strong></div>
                          <div class="__infor __infor__price">
                            <div class="__price __price__start"><s>${productsToShow[
          i
        ].getprice()}<span>đ</span></s></div>
                            <div class="__price __price__final">${productsToShow[
          i
        ].getSalePrice()}<span>đ</span></div>
                          </div>
                          <div class="__infor __infor__foot">
                            <div class="__foot__count"><i class="fa-solid fa-people-group" style="padding: 0 3px;"></i>${productsToShow[
          i
        ].getBuyCount()}</div>
                            <div class="__foot__shop">
                              <button class="__foot__cart-shopping"><i class="fa-solid fa-cart-shopping" onclick="showIDProduct(event, '${productsToShow[i].getId()}')"></i></button>
                              <button class="__foot__buy" onclick="buyNow(event, '${productsToShow[i].getId()}')">Mua ngay</button>
                            </div>
                          </div>
                        </div>
                      </div>
      `;
      productListElement.appendChild(productElement);
      productElement.style.width = "25%";
    }
  });
}


function modeFilter() {
  const listbtn = document.querySelectorAll(".filter__select-box");
  const choose = document.querySelectorAll(".filter--choose,.filter__select-box__all");
  const display = document.querySelectorAll(".sidebarlist");
  if (window.getComputedStyle(listbtn[0]).display === 'none') {
    listbtn.forEach(x => {
      x.style.display = "unset";
    });
    choose.forEach(x => {
      x.style.display = "flex";
    });
    display.forEach(x => x.style.display = "block");
  }
  else {
    listbtn.forEach(x => {
      x.style.display = "none";
    });
    choose.forEach(x => {
      x.style.display = "none";
    });
  }
}

function displayMainSportSidebarProduct(id) {
  let title = document.getElementById('sport-maincontent__title');
  for (let i = 0; i < rootBranch.length; i++)
    if (rootBranch[i].id === id) {
      title.textContent = rootBranch[i].title;
      break;
    }
  Loc_mainCategory(id, list => {
    list = filter_arr(list);
    displayProducts(list, 1, productCountPerPage);
  });
  window.scrollTo(0, 0);
}

function setSportTitle(string) {
  const title = document.getElementById("sport-maincontent__title");
  title.textContent = string;
}

function showTopicOverview() {
  innerSportContent();
}




function toggleCheckBox(parentid, isChecked) {
  // Lấy các phần tử cần thao tác
  const mainCheckbox = document.getElementById(`filter__checkbox__${parentid}`);
  const childCheckboxes = document.querySelectorAll(`.filter__select-box.child__checkbox__${parentid}`);

  // Khi checkbox chính thay đổi trạng thái
  // mainCheckbox.addEventListener("change", function () {
  //   const isChecked = mainCheckbox.checked;
  //   
  // });
  childCheckboxes.forEach((checkbox) => {
    checkbox.checked = isChecked;
  });

  //   });
  // Khi bất kỳ checkbox con thay đổi trạng thái
  childCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      mainCheckbox.checked = Array.from(childCheckboxes).every((child) => child.checked);
    });
  });
}
// toggleCheckBox('1'); 

function toggleCheckBoxAll(isChecked) {
  // Lấy các phần tử cần thao tác
  // const mainCheckbox = document.getElementById(`filter__select-box__all`);
  const childCheckboxes = document.querySelectorAll(`.filter__select-box`);

  // Khi checkbox chính thay đổi trạng thái
  // mainCheckbox.addEventListener("change", function () {
      // const isChecked = mainCheckbox.checked;
      childCheckboxes.forEach((checkbox) => {
        checkbox.checked = isChecked; // Đồng bộ trạng thái của checkbox chính
        // checkbox.click();
      });
  // });
  // Khi bất kỳ checkbox con thay đổi trạng thái
  // childCheckboxes.forEach((checkbox) => {
  //   checkbox.addEventListener("change", function () {
  //     mainCheckbox.checked = Array.from(childCheckboxes).every((child) => child.checked);
  //   });
  // });
}

// giỏ hàng 
function DisplayCart(productID) {
  console.log("productID", productID);
  productID.forEach((lengthProduct, id) => {
    const stringid = id.toString();
    queryByID(stringid, (er, product) => {
      console.log("product", product);
      let cartList = "";
      cartList += `
            <div class="giohang_header giohang_list">
              <div class="col-1">
                <div><input class="choose-product" type="checkbox" value="${id}" onclick="countTotalProduct(); countTotalPrice()"></div>
                <div style="display: flex; align-items: center; gap: 10px;">
                  <img src="${product.getThumbnail()}" width="100">
                  <Strong>${product.getname()}</Strong>
                </div>
              </div>
              <div class="col-2" style="display: flex;flex-direction: column;align-items: flex-end;">
                <div style="text-decoration: line-through;">  
                  ${formatCurrency(product.getprice())} VNĐ
                </div>
                <div style="color: red;">
                  ${formatCurrency(product.getSalePrice())} VND
                </div>
              </div>

              <div class="col-3">
              <div class="length-col-3" onclick="decreaseCartItem('${id}'); countTotalPrice()"><i class="fa-solid fa-minus"></i></div>
              <div id="soluong${id}" style="padding: 5px;border: 1px solid #000; background-color: #e8dfdf;">${lengthProduct}</div>
              <div class="length-col-3" onclick="increaseCartItem('${id}'); countTotalPrice()"><i class="fa-solid fa-plus"></i></div>
              </div>
              <div id="gia${id}" class="col-4">${product.salePrice * lengthProduct}</div>
              <div class="col-5" onclick="removeCartItem('${id}')"><i class="fa-solid fa-trash"></i></div>

  
            </div>`
      document.getElementById("cartList").innerHTML += cartList;
    });
  });
}
// giỏ hàng
function printCart() {
  displayContainer();
  displayNoneFilterSearch();
  if (localStorage.getItem('idLogin') === null) {
    showNotification('Vui lòng đăng nhập để xem giỏ hàng', 'error');
  } else {
    console.log("printCart");
    document.getElementById("container").innerHTML = `      

      <main class="giohang">
        <div class="title">
          <i class="fa-solid fa-cart-shopping"></i>
          <span>GIỎ HÀNG</span>
        </div>
        <div class="giohang_content">
          <div class="giohang_header">
            <div class="col-1">
              <div><input type="checkbox" id="chooseAll-product" onclick="chooseAllProduct(); countTotalProduct(); countTotalPrice()"></div>
              <div>Sản Phẩm</div>
            </div>
            <div class="col-2">Đơn Giá</div>
            <div class="col-3">Số Lượng</div>
            <div class="col-4">Số Tiền</div>
            <div class="col-5">Thao Tác</div>
          </div>
          <div id="cartList"></div>
          <div style="display: flex; justify-content: flex-end; align-items: baseline;margin-bottom: 20px;margin-right: 100px;">
          <div class="csschocaigido">Số lượng sản phẩm đã chọn: <span id="totalProduct">0</span></div>
          <div class="csschocaigido">Tổng tiền: <span id="totalPrice">0</span></div>
          <div class="div-btn-infor1234" style="max-width: 300px" onclick="payCart()">Thanh toán</div>
          </div>
        </div>
      </main>`;
    queryUserByUsername(localStorage.getItem('idLogin'), (user) => {
      DisplayCart(user.cart);
    }
    );
  }
}

function replayPay(idorder) {
  queryUserByUsername(localStorage.getItem('idLogin'), (user) => {
    if (user.orders instanceof Array) {
      let order = user.orders.find((x) => x.id === idorder);
      if (order) {
        let idProduct = new Map();
        order.productID.forEach((value, key) => {
          idProduct.set(key, value);
        });
        interface_cart(order.totalAmount, order.productID.size, idProduct);
      }
    }
  });
}
function decreaseCartItem(id) {
  queryUserByUsername(localStorage.getItem('idLogin'), (user) => {
    if (user.cart instanceof Map) {
      if (user.cart.has(id)) {
        let quantity = user.cart.get(id);
        if (quantity > 1) {
          user.cart.set(id, quantity - 1); // Giảm số lượng sản phẩm
          showNotification('Đã cập nhật giỏ hàng', 'success');
        } else {
          showNotification('Số lượng sản phẩm không thể nhỏ hơn 1', 'warning');
        }
      }
      upDateUser(user.username, user); // Cập nhật lại dữ liệu người dùng
      document.getElementById("soluong" + id).textContent = user.cart.get(id);
      console.log(user.cart);
      queryByID(id, (er, product) => {
        document.getElementById("gia" + id).textContent = user.cart.get(id) * product.getSalePrice();
      });
    }
  });
}

function increaseCartItem(id) {
  queryUserByUsername(localStorage.getItem('idLogin'), (user) => {
    if (user.cart instanceof Map) {
      if (user.cart.has(id)) {
        let quantity = user.cart.get(id);
        user.cart.set(id, quantity + 1); // Tăng số lượng sản phẩm
      }
      upDateUser(user.username, user); // Cập nhật lại dữ liệu người dùng 
      document.getElementById("soluong" + id).textContent = user.cart.get(id);
      queryByID(id, (er, product) => {
        document.getElementById("gia" + id).textContent = user.cart.get(id) * product.getSalePrice();
      });
      showNotification('Đã cập nhật giỏ hàng', 'success');
    }
  });
}

function removeCartItem(id) {
  queryUserByUsername(localStorage.getItem('idLogin'), (user) => {
    if (user.cart instanceof Map) {
      if (user.cart.has(id)) {
        user.cart.delete(id); // Xóa sản phẩm khỏi giỏ hàng
      }
      upDateUser(user.username, user); // Cập nhật lại dữ liệu người dùng
      document.getElementById("bulbleLength").textContent = user.cart.size; // Cập nhật số lượng sản phẩm trong giỏ hàng
      simulateLoading(200);
      printCart(); // Cập nhật lại giao diện giỏ hàng
      showNotification('Đã xóa sản phẩm khỏi giỏ hàng', 'success');
    }
  });
}

function chooseAllProduct() {
  let chooseAll = document.getElementById("chooseAll-product");
  let chooseProduct = document.querySelectorAll(".choose-product");
  chooseProduct.forEach(x => {
    x.checked = chooseAll.checked;
  });
}

function payCart() {
  const chooesProduct = document.querySelectorAll(".choose-product");
  let idProduct = new Map();
  queryUserByUsername(localStorage.getItem('idLogin'), (user) => {
    if (user.cart instanceof Map) {
      chooesProduct.forEach((x) => {
        if (x.checked) {
          if (user.cart.has(x.value)) {
            idProduct.set(x.value, user.cart.get(x.value));
          }
        }
      });
      if (idProduct.size === 0) {
        showNotification('Vui lòng chọn sản phẩm cần thanh toán', 'error');
      } else {
        console.log(idProduct);
        // Thực hiện thanh toán
        // ...
        // Xóa sản phẩm đã thanh toán khỏi giỏ hàng
        simulateLoading(200);
        // printCart();

        const tmpgia = document.getElementById("totalPrice").textContent;
        const tmpsl = document.getElementById("totalProduct").textContent;
        console.log(tmpgia, "hdkjsahjfkhákjh", tmpsl);
        interface_cart(tmpgia, tmpsl, idProduct);

      }
    }
  });
  // let check = 0;
  // chooesProduct.forEach((x) => {
  //   if (x.checked) {
  //     queryUserByUsername(localStorage.getItem('idLogin'), (user) => {
  //       if (user.cart instanceof Map) {
  //         if (user.cart.has(x.value)) {
  //           idProduct.set(x.value, user.cart.get(x.value));

  //         }
  //       }
  //     });
  //   } else {
  //     check++;
  //   }
  //   if (check === chooesProduct.length) {
  //     showNotification('Vui lòng chọn sản phẩm cần thanh toán', 'error');
  //   }
  // });
}

function countTotalProduct() {
  const chooesProduct = document.querySelectorAll(".choose-product");
  let totalProduct = 0;
  chooesProduct.forEach((x) => {
    if (x.checked) {
      totalProduct++;
    }
  });
  if (totalProduct === chooesProduct.length) {
    document.getElementById("chooseAll-product").checked = true;
  } else {
    document.getElementById("chooseAll-product").checked = false;
  }
  console.log(totalProduct);
  document.getElementById("totalProduct").textContent = totalProduct;
}

function countTotalPrice() {
  const chooesProduct = document.querySelectorAll(".choose-product");
  let totalPrice = 0;
  let check = 0;
  chooesProduct.forEach((x) => {
    if (x.checked) {
      queryByID(x.value, (er, product) => {
        queryUserByUsername(localStorage.getItem('idLogin'), (user) => {
          totalPrice += user.cart.get(x.value) * product.getSalePrice();
          document.getElementById("totalPrice").textContent = totalPrice;
        });
      });
    } else {
      check++;
    }
    if (check === chooesProduct.length) {
      document.getElementById("totalPrice").textContent = 0;
    }
  });
}


function interface_cart(gia, sl, item) {
  item.forEach((lengthProduct, id) => {
    console.log(lengthProduct, "----------", id);
  });
  queryUserByUsername(localStorage.getItem('idLogin'), (user) => {
    if (user.fullname === null || user.fullname === "" || user.phone === null || user.phone === "" || user.address === null || user.address === "") {
      showNotification('Vui lòng cập nhật thông tin cá nhân để thanh toán', 'error');
    } else {
      printThanhToan(gia, sl, item);

    }
  });
}



function showHoverCart() {
  document.getElementById("hovercart").style.display = "block";
  innerCartToHover();
}

function hideHoverCart() {
  document.getElementById("hovercart").style.display = "none";
}


function innerCartToHover() {
  document.getElementById("hovercart").innerHTML = ""; // Xóa nội dung cũ
  queryUserByUsername(localStorage.getItem('idLogin'), (user) => {
    if (user.cart instanceof Map) {
      // Lấy tối đa 5 sản phẩm từ cuối danh sách
      const cartArray = Array.from(user.cart).reverse(); // Chuyển Map thành mảng và đảo ngược
      const max = Math.min(cartArray.length, 5); // Giới hạn tối đa 5 sản phẩm
      for (let i = 0; i < max; i++) {
        queryByID(cartArray[i][0].toString(), (error, product) => {
          if (product) {
            document.getElementById("hovercart").innerHTML += `
              <div style="display: flex; align-items: center; justify-content: space-around; margin-top: 5px; margin-bottom: 5px; height: 90px; box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);">
                <div>
                  <img src="${product.getThumbnail()}" width="100">
                </div>
                <strong>${product.getname()}</strong>
                <div>
                  <div style="text-decoration: line-through;">${formatCurrency(product.getprice())} VNĐ</div>
                  <div style="color: red;"> ${formatCurrency(product.getSalePrice())} VND</div>
                </div>
              </div>
            `;
          }
        });
      }
    }
  });
}
function displayContainer() {
  const container = document.getElementById("container"); 
  container.style.display="unset"; 
  container.innerHTML = "";

}
