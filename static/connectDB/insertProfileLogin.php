<?php
header('Content-Type: application/json');
require_once __DIR__ . '/ConnectDataBase.php';
$db   = new Database();
$conn = $db->conn;

$data = json_decode(file_get_contents("php://input"), true);
$account = $data['account'];
$profile = $data['phone']; // Nhận luôn profile để lấy phone_number

try {
    // 1. Insert tài khoản account trước
    $insAcc = $conn->prepare("
        INSERT INTO account
          (username, password, email, role_id, status, created, updated)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ");
    $insAcc->bind_param(
        "sssssss",
        $account['username'],
        $account['password'],
        $account['email'],
        $account['role_id'],
        $account['status'],
        $account['created'],
        $account['updated']
    );
    $insAcc->execute();
    $accountId = $insAcc->insert_id;
    $account['id'] = $accountId; // Cập nhật lại ID cho account

    // 2. Insert profile, ID profile sẽ chính là ID account
    $insPro = $conn->prepare("
        INSERT INTO profile
          (id, fullname, phone_number, avatar)
        VALUES (?, NULL, ?, NULL)
    ");
    $insPro->bind_param(
        "is",
        $accountId,
        $profile
    );
    $insPro->execute();

    echo json_encode([
        "success" => true,
        "account" => $account
    ]);
}
catch (Exception $e) {
    echo json_encode([
      "success" => false,
      "error"   => $e->getMessage()
    ]);
}
?>
