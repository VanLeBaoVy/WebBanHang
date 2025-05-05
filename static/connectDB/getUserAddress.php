<?php
header('Content-Type: application/json');
require_once __DIR__ . '/ConnectDataBase.php';
$db   = new Database();
$conn = $db->conn;

if (!isset($_GET['id'])) {
    echo json_encode(["success" => false, "message" => "Thiếu ID"]);
    exit;
}

$id = intval($_GET['id']);

try {
    $stmt = $conn->prepare("SELECT id, street, ward, district, city FROM address WHERE profile_id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();

    $addresses = [];
    while ($row = $result->fetch_assoc()) {
        $addresses[] = $row;
    }

    echo json_encode(["success" => true, "addresses" => $addresses]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
