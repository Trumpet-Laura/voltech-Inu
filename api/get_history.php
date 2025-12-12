<?php
require 'db.php';

$user_id = isset($_GET['user_id']) ? $_GET['user_id'] : 1;

try {
    // 完了済み(is_completed = 1)のクエストを、新しい順に取得
    $sql = "SELECT * FROM quests WHERE user_id = :user_id AND is_completed = 1 ORDER BY created_at DESC";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':user_id' => $user_id]);
    
    $quests = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($quests, JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>