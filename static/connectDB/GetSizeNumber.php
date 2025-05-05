<?php
// Kết nối tới cơ sở dữ liệu
$servername = "localhost";  // Địa chỉ máy chủ
$username = "root";         // Tên người dùng MySQL
$password = "";             // Mật khẩu MySQL
$dbname = "web2(1)";    // Tên cơ sở dữ liệu

// Tạo kết nối
$conn = new mysqli($servername, $username, $password, $dbname);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}

// Câu truy vấn SQL để lấy giá trị không trùng lặp
$sql = "SELECT DISTINCT size_number FROM size";

// Thực thi truy vấn
$result = $conn->query($sql);

// Kiểm tra và hiển thị dữ liệu
if ($result->num_rows > 0) {
    // Lặp qua từng dòng dữ liệu
    while ($row = $result->fetch_assoc()) {
        echo "Size Number: " . $row["size_number"] . "<br>";
    }
} else {
    echo "Không có dữ liệu nào!";
}

// Đóng kết nối
$conn->close();
?>
