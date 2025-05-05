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
    if (!data || data.length === 0) {
        const productTableBody = document.getElementById('productTableBody');
        if (productTableBody) {
            productTableBody.innerHTML = '<tr><td colspan="7" class="text-center">Không có sản phẩm nào</td></tr>';
        }
        return;
    }
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
            <td class="text-center">
                <span class="badge ${product.attributes === '{}' ? 'bg-success' : 'bg-danger'}">${product.attributes === '{}' ? "Đang bán" : "Ngưng bán"}</span>
            </td>
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
    newRow.classList.add('d-flex', 'mb-2', 'gap-2', 'size-row'); 
    newRow.innerHTML = `
        <input type="text" class="form-control" name="sizes[]" placeholder="Size (ví dụ: 38, 39, M...)" required>
        <input type="number" class="form-control" name="amounts[]" value="0" required readonly>
        <button type="button" class="btn btn-danger remove-size-row">X</button>
    `;

    container.appendChild(newRow);
});

function deleteRowIfZero(button) {
    const row = button.closest('.d-flex'); // Adjusted to match the correct parent element
    const amountInput = row.querySelector('input[name="amounts[]"]'); // Corrected selector for amount input
    if (amountInput && amountInput.value === '0') {
        row.remove();
    } else {
        showToast('Không thể xóa dòng này vì số lượng không bằng 0.', 'error');
    }
}

document.getElementById('addEditSizeRow').addEventListener('click', function () {
    const container = document.getElementById('editSizeQuantityContainer');
    const sizeRow = document.createElement('div');
        sizeRow.classList.add('d-flex', 'mb-2', 'gap-2');
        sizeRow.innerHTML = `
            <input type="number" class="form-control" name="sizes[]" placeholder="Size" value="" required>
            <input type="number" class="form-control" name="amounts[]" placeholder="Số lượng" value="0" readonly>
            <button type="button" class="btn btn-danger btn-sm" onclick="deleteRowIfZero(this)">X</button>
        `;
        container.appendChild(sizeRow);
});
// Lắng nghe sự kiện xóa dòng size
document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('remove-size-row')) {
        e.target.closest('.size-row').remove();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const addProductForm = document.getElementById('addProductForm');

    addProductForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(addProductForm);
        const data = Object.fromEntries(formData.entries());

        const sizes = Array.from(document.querySelectorAll('input[name="sizes[]"]')).map(input => input.value.trim());
        const uniqueSizes = new Set(sizes);

        if (sizes.length !== uniqueSizes.size) {
            showToast('Có kích thước bị trùng lặp. Vui lòng kiểm tra lại.', 'error');
            return;
        }

        data.sizes = sizes.filter(size => size !== '');

        // Chuyển ảnh sang Base64 nếu có
        const fileInput = document.getElementById('productImage');
        const file = fileInput.files[0];

        if (file) {
            try {
                data.url = await convertFileToBase64(file); // Đợi chuyển ảnh xong mới tiếp tục
                console.log('Image converted to Base64:', data.url);
            } catch (error) {
                console.error('Lỗi chuyển ảnh:', error);
                return;
            }
        } else {
            data.url = '';
        }

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
                showToast('Thêm sản phẩm thành công!', 'success');
                addProductForm.reset();
                const modal = bootstrap.Modal.getInstance(document.getElementById('addProductModal'));
                modal.hide();
                fetchProducts(); // cập nhật danh sách sản phẩm
            } else {
                showToast('Thêm sản phẩm thất bại: ' + result.message, 'error');
            }
        } catch (error) {
            console.error('Lỗi khi thêm sản phẩm:', error);
        }
    });

    // Hàm chuyển ảnh sang Base64
    function convertFileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    }
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
    document.getElementById('editProductStatus').value = product.attributes; // Set attributes
    document.getElementById("deleteProductButton").setAttribute("data-product-id", product.id); // Set product ID for delete button
    document.getElementById('editProductSupplier').value = product.supplier_id; // Set supplier_id
    // Xử lý sizes (mảng các object có size_number và amount)
    const container = document.getElementById('editSizeQuantityContainer');
    container.innerHTML = ''; // Xóa trước
    product.sizes.forEach(size => {
        const sizeRow = document.createElement('div');
        sizeRow.classList.add('d-flex', 'mb-2', 'gap-2');
        sizeRow.innerHTML = `
            <input type="number" class="form-control" name="sizes[]" placeholder="Size" size-id="${size.size_id}" value="${size.size_number}" required>
            <input type="number" class="form-control" name="amounts[]" placeholder="Số lượng" value="${size.amount}" readonly>
            <button type="button" class="btn btn-danger btn-sm" onclick="deleteRowIfZero(this)">X</button>
        `;
        container.appendChild(sizeRow);
    });

    if (product.url && product.url !== '') {
        const imageUrl = product.url;
        console.log('Image URL:', imageUrl);
        $('#editProductImagePreview').attr('src', imageUrl).show();
    } else {
        $('#editProductImagePreview').hide();
    }
    // Hiển thị modal
    const modal = new bootstrap.Modal(document.getElementById('editProductModal'));
    modal.show();
}

document.getElementById("editProductForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    
    const productData = {
        id: form.id.value,
        name: form.name.value,
        price: parseFloat(form.price.value),
        description: form.description.value,
        url: document.getElementById("editProductImagePreview").src, // Lấy ảnh cũ nếu không có ảnh mới
        category_id: form.category_id.value,
        brand: form.brand.value,
        attributes: form.status.value,
        supplier_id: form.supplier_id.value,
        sizes: []
    };

    const sizeContainer = document.getElementById("editSizeQuantityContainer");
    const sizeInputs = sizeContainer.querySelectorAll(".form-control[name='sizes[]']");
    const amountInputs = sizeContainer.querySelectorAll(".form-control[name='amounts[]']");

    const sizeSet = new Set();
    let hasDuplicate = false;

    sizeInputs.forEach((sizeInput, index) => {
        const sizeId = sizeInput.getAttribute("size-id");
        const sizeValue = sizeInput.value.trim();

        if (sizeSet.has(sizeValue)) {
            hasDuplicate = true;
        } else {
            sizeSet.add(sizeValue);
        }

        productData.sizes.push({
            id: sizeId ? parseInt(sizeId) : 0,
            size_number: sizeValue,
            amount: parseInt(amountInputs[index].value)
        });
    });

    if (hasDuplicate) {
        showToast("Có kích thước bị trùng lặp. Vui lòng kiểm tra lại.", "error");
        return;
    }

    const fileInput = document.getElementById("editProductImage");
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = async function () {
            productData.url = reader.result; // Base64 string
            console.log("Dữ liệu sản phẩm sau khi xử lý ảnh:", productData);
            await sendProductUpdate(productData);
        };
        reader.readAsDataURL(file); // Trigger async load
    } else {
        console.log("Dữ liệu sản phẩm không có ảnh mới:", productData);
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
            showToast("Cập nhật sản phẩm thành công!", "success");
            const modal = bootstrap.Modal.getInstance(document.getElementById("editProductModal"));
            modal.hide();
            fetchProducts(); // Cập nhật lại danh sách sản phẩm
        } else {
            console.error("Update failed:", result.message);
            showToast("Cập nhật sản phẩm thất bại: " + result.message, "error");
        }
    } catch (error) {
        console.error("Update failed:", error);
        showToast("Đã xảy ra lỗi khi cập nhật sản phẩm.", "error");
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

document.getElementById("deleteProductButton").addEventListener("click", async function () {
    const productId = this.getAttribute("data-product-id");
    if (productId) {
        const confirmDelete = await showConfirm("Bạn có chắc chắn muốn xóa sản phẩm này không?");
        if (confirmDelete) {
            deleteProduct(productId);
        }
    } else {
        showToast("Không tìm thấy ID sản phẩm để xóa.", "error");
    }
});

async function deleteProduct(productId) {
    try {
        const response = await fetch(`../admin/api/product/deleteproduct.php?id=${productId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();
        if (result.success) {
            const modal = bootstrap.Modal.getInstance(document.getElementById('editProductModal'));
            modal.hide();
            fetchProducts(); // Cập nhật lại danh sách sản phẩm
        } else {
            showToast('Xóa sản phẩm thất bại: ' + result.message, 'error');
        }
    } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error);
        showToast('Đã xảy ra lỗi khi xóa sản phẩm.', 'error');
    }
}

