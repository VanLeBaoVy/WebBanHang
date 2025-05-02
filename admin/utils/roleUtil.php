<?php
function hasPagePermission($permissions, $current_page) {
    // Lặp qua các quyền để kiểm tra
    foreach ($permissions as $perm) {
        if ($perm['link'] === $current_page) {
            return true; // Có quyền
        }
    }
    return false; // Không có quyền
}
 
function checkUserPermissions($permissions, $page) {
    // Mảng kết quả mặc định (không có quyền)
    $result = [
        'add' => false,
        'update' => false,
        'delete' => false
    ];

    // Kiểm tra nếu $permissions không phải là mảng
    if (!is_array($permissions)) {
        return $result;
    }

    // Duyệt qua danh sách quyền
    foreach ($permissions as $permission) {
        // So sánh link của quyền với trang cần kiểm tra
        if ($permission['link'] === $page) {
            // Cập nhật kết quả dựa trên quyền chi tiết
            $result['add'] = isset($permission['add']) ? $permission['add'] : false;
            $result['update'] = isset($permission['update']) ? $permission['update'] : false;
            $result['delete'] = isset($permission['delete']) ? $permission['delete'] : false;
            break; // Thoát vòng lặp khi tìm thấy quyền tương ứng
        }
    }

    return $result;
}
?>