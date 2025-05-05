<?php
header('Content-Type: application/json');
require_once __DIR__ . '/ConnectDataBase.php';
$db = new Database();
$conn = $db->conn;

try {
	$data = json_decode(file_get_contents("php://input"), true);

	$accountId = $data['accountId'];
	$newPassword = $data['newPassword'];

	if (!$accountId || !$newPassword) {
		echo json_encode(["success" => false, "message" => "Thiếu dữ liệu"]);
		exit;
	}

	$updatePass = $conn->prepare("
		UPDATE account
		SET password = ?
		WHERE id = ?
	");
	$updatePass->bind_param("ss", $newPassword, $accountId);
	$updatePass->execute();

	echo json_encode(["success" => true]);
}
catch (Exception $e) {
	echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
