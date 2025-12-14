<?php

// Reactからのアクセスを許可する設定
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
date_default_timezone_set('Asia/Tokyo');

require 'db.php';

$json = file_get_contents("php://input");
$data = json_decode($json, true);
$id = $data['id']; // Reactから送られてきたID

try {
    // is_completed を 1 (完了) に書き換える、completed_at = NOW()で現在時刻も一緒に記録
    $sql = "UPDATE quests SET is_completed = 1, is_active = 1, completed_at = NOW() WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':id' => $id]);

    echo json_encode(["status" => "success", "message" => "クエスト完了！"]);

} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "DB Error: " . $e->getMessage()]);
}
?>