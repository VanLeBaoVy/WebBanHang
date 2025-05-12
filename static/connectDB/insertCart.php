<?php
header('Content-Type: application/json');
require_once __DIR__ . '/ConnectDataBase.php';
$db   = new Database();
$conn = $db->conn;

$data = json_decode(file_get_contents("php://input"), true);
$cart = $data['cart'];

try {
    $insertCart = $conn->prepare("INSERT INTO cart(profile_id,product_id, amount, size, created) VALUES (?, ?, ?, ?, NOW())");
    foreach($cart as $ca) {
        $insertCart->bind_param(
            "iiii",
            $ca['profile_id'],
            $ca['product_id'],
            $ca['quantity'],
            $ca['size']
        );
        $insertCart->execute();
    }

    echo json_encode([
        "success" => true,
    ]);
}
catch (Exception $e) {
    echo json_encode([
      "success" => false,
      "error"   => $e->getMessage()
    ]);
}
?>
