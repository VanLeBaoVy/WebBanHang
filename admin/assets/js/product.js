document.addEventListener('DOMContentLoaded', () => {
    const link = new URLSearchParams(window.location.search).get('page');
    console.log(link);
    if (link === 'product_management' ) {
        fetchProducts();
    }
});

async function fetchProducts() {
    try {
        const response = await fetch('../admin/api/product/getallproduct.php', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok' + response.statusText);
        }
        const data = await response.json();
        console.log(data);
        renderDataProducts(data);
    }
    catch (error) {
        console.error('Error fetching products:', error);
    }
}

async function renderDataProducts(data) {
    console.log(data);
    const productTableBody = document.getElementById('productTableBody');
    if (!productTableBody) {
        console.error('Product table body not found');
        return;
    }
    productTableBody.innerHTML = ''; // Clear existing rows

    data.forEach(product => {
        
        let size = "";
        let amount = 0;
        product.size.forEach(item => {
            size += item.size_number + ", ";
            amount += item.amount;
        });
        size = size.slice(0, -2); // Remove trailing comma and space
        const row = document.createElement('tr');
        row.addEventListener('click', () => 
            console.log('Row clicked:', product.product_id) ||
            fetch(`../admin/api/product/getproductbyid.php?id=${product.product_id}`)
            .then(response => response.json())
            .then(productData => openEditModal(productData.data))
            .catch(error => console.error('Error fetching product details:', error))
        );
        row.innerHTML = `
            <td>${product.product_name}</td>
            <td>${product.category_name}</td>
            <td>${product.brand_name}</td>
            <td>${product.price}</td>
            <td>${size}</td>
            <td>${amount}</td>
        `;
        productTableBody.appendChild(row);
    });
}

document.getElementById('searchInputProduct').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const rows = document.querySelectorAll('#productTableBody tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        let found = false;
        cells.forEach(cell => {
            if (cell.textContent.toLowerCase().includes(searchTerm)) {
                found = true;
            }
        });
        row.style.display = found ? '' : 'none';
    });
});

document.getElementById('addSizeRow').addEventListener('click', function () {
    const container = document.getElementById('sizeQuantityContainer');
    const newRow = document.createElement('div');
    newRow.classList.add('row', 'g-2', 'align-items-center', 'mb-2', 'size-row');

    newRow.innerHTML = `
        <div class="col-md-4">
            <input type="text" class="form-control" name="sizes[]" placeholder="Size (ví dụ: 38, 39, M...)" required>
        </div>
        <div class="col-md-2">
            <button type="button" class="btn btn-danger remove-size-row">X</button>
        </div>
    `;

    container.appendChild(newRow);
});

function deleteRowIfZero(button) {
    const row = button.closest('.d-flex'); // Adjusted to match the correct parent element
    const amountInput = row.querySelector('input[name="amounts[]"]'); // Corrected selector for amount input
    if (amountInput && amountInput.value === '0') {
        row.remove();
    } else {
        alert("Chỉ có thể xóa dòng khi số lượng = 0.");
    }
}


// Lắng nghe sự kiện xóa dòng size
document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('remove-size-row')) {
        e.target.closest('.size-row').remove();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const addProductForm = document.getElementById('addProductForm');

    // Lắng nghe sự kiện submit
    addProductForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của form

        // Lấy dữ liệu từ form
        const formData = new FormData(addProductForm);

        // Chuyển FormData thành object để dễ xử lý
        const data = Object.fromEntries(formData.entries());

        // Chuyển đổi dữ liệu size thành mảng
        const sizes = Array.from(document.querySelectorAll('input[name="sizes[]"]')).map(input => input.value);
        data.sizes = sizes.filter(size => size.trim() !== ''); // Lọc bỏ các giá trị rỗng

        console.log('Dữ liệu sản phẩm:', data);
        try {
            const response = await fetch('../admin/api/product/addproduct.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (result.success) {
                alert('Thêm sản phẩm thành công!');
                addProductForm.reset(); // Reset form sau khi thêm thành công
                const modal = bootstrap.Modal.getInstance(document.getElementById('addProductModal'));
                modal.hide(); // Đóng modal
            } else {
                alert('Lỗi: ' + result.message);
            }
        } catch (error) {
            console.error('Lỗi khi thêm sản phẩm:', error);
        }
    });
});

function openEditModal(product) {
    console.log('Sản phẩm cần chỉnh sửa:', product);
    // Gán dữ liệu vào các input cơ bản
    document.getElementById('editProductId').value = product.id;
    document.getElementById('editProductName').value = product.name;
    document.getElementById('editProductPrice').value = product.price;
    document.getElementById('editProductDescription').value = product.description || '';

    document.getElementById('editProductCategory').value = product.category_id; // Set category_id
    document.getElementById('editProductBrand').value = product.brand; // Set brand_id

    // Xử lý sizes (mảng các object có size_number và amount)
    const container = document.getElementById('editSizeQuantityContainer');
    container.innerHTML = ''; // Xóa trước
    product.sizes.forEach(size => {
        const sizeRow = document.createElement('div');
        sizeRow.classList.add('d-flex', 'mb-2', 'gap-2');
        sizeRow.innerHTML = `
            <input type="number" class="form-control" name="sizes[]" placeholder="Size" size-id="${size.size_id}" value="${size.size_number}" required>
            <input type="number" class="form-control" name="amounts[]" placeholder="Số lượng" value="${size.amount}" required readonly>
            <button type="button" class="btn btn-danger btn-sm" onclick="deleteRowIfZero(this)">X</button>
        `;
        container.appendChild(sizeRow);
    });

    // Hiển thị modal
    const modal = new bootstrap.Modal(document.getElementById('editProductModal'));
    modal.show();
}

document.getElementById("editProductForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    
    // Thu thập dữ liệu sản phẩm
    const productData = {
        id: form.id.value,
        name: form.name.value,
        price: parseFloat(form.price.value),
        description: form.description.value,
        url: "", // Bạn có thể lấy Base64 từ file nếu cần
        category_id: form.category_id.value,
        brand: form.brand.value,
        sizes: []
    };

    // Lấy danh sách size từ container
    const sizeContainer = document.getElementById("editSizeQuantityContainer");
    const sizeRows = sizeContainer.querySelectorAll(".form-control[name='sizes[]']");

    sizeRows.forEach((sizeInput, index) => {
        const amountInput = sizeContainer.querySelectorAll(".form-control[name='amounts[]']")[index];
        const sizeId = sizeInput.getAttribute("size-id");

        if (sizeId) {
            productData.sizes.push({
                id: parseInt(sizeId),
                size_number: sizeInput.value,
                amount: parseInt(amountInput.value)
            });
        } else {
            productData.sizes.push({
                id: 0,
                size_number: sizeInput.value,
                amount: parseInt(amountInput.value)
            });
        }
    });

    // Nếu có ảnh mới được upload, có thể xử lý sang Base64 hoặc FormData nếu dùng file
    const fileInput = document.getElementById("editProductImage");
    const file = fileInput.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = async function () {
            productData.url = reader.result; // Base64 image string

            console.log("Dữ liệu sản phẩm sau khi xử lý ảnh:", productData);
            // Gửi dữ liệu sau khi đã có ảnh
            // await sendProductUpdate(productData);
        };
        reader.readAsDataURL(file);
    } else {
        console.log("Dữ liệu sản phẩm sau khi xử lý ảnh:", productData);
        // Không có ảnh mới, gửi luôn
        await sendProductUpdate(productData);
    }
});

async function sendProductUpdate(data) {
    try {
        const response = await fetch("../admin/api/product/updateproduct.php", {
            method: "POST", // hoặc PUT nếu bạn cấu hình như vậy
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (result.success) {
            const modal = bootstrap.Modal.getInstance(document.getElementById("editProductModal"));
            modal.hide();
            fetchProducts(); // Cập nhật lại danh sách sản phẩm
        } else {
            console.error("Update failed:", result.message);
            alert("Cập nhật sản phẩm thất bại: " + result.message);
        }
    } catch (error) {
        console.error("Update failed:", error);
        alert("Đã xảy ra lỗi khi cập nhật sản phẩm.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const productImageInput = document.getElementById('productImage');
    const productImagePreview = document.getElementById('productImagePreview');

    productImageInput.addEventListener('change', (event) => {
        const file = event.target.files[0]; // Lấy file đầu tiên từ input
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                productImagePreview.src = e.target.result; // Gán đường dẫn Base64 vào thẻ <img>
                productImagePreview.style.display = 'block'; // Hiển thị thẻ <img>
            };
            reader.readAsDataURL(file); // Đọc file dưới dạng Data URL (Base64)
        } else {
            productImagePreview.src = '#';
            productImagePreview.style.display = 'none'; // Ẩn thẻ <img> nếu không có file
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const editProductImageInput = document.getElementById('editProductImage');
    const editProductImagePreview = document.getElementById('editProductImagePreview');

    editProductImageInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                editProductImagePreview.src = e.target.result;
                editProductImagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            editProductImagePreview.src = '#';
            editProductImagePreview.style.display = 'none';
        }
    });
});