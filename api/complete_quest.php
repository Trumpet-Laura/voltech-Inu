<?php
require 'db.php';

$json = file_get_contents("php://input");
$data = json_decode($json, true);
$id = $data['id']; // Reactから送られてきたID

try {
    // is_completed を 1 (完了) に書き換える
    $sql = "UPDATE quests SET is_completed = 1 WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':id' => $id]);

    echo json_encode(["status" => "success", "message" => "クエスト完了！"]);

} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "DB Error: " . $e->getMessage()]);
}
?>