<?php
// 1. データベースに接続
require 'db.php';

// 2. ユーザーIDの確認（今回は全員「ID:1」として扱います）
// URLに ?user_id=1 がついていればそれを使い、なければ 1 を使います
$user_id = isset($_GET['user_id']) ? $_GET['user_id'] : 1;

try {
    // 3. SQLの作成
    // WHERE is_completed = 0  → 「未完了」のものだけ！
    // ORDER BY created_at DESC → 「新しい順」に並べる！
    $sql = "SELECT * FROM quests WHERE user_id = :user_id AND is_completed = 0 ORDER BY created_at DESC";
    $stmt = $pdo->prepare($sql);

    // 4. 実行
    $stmt->execute([':user_id' => $user_id]);
    
    // 5. データを全部持ってくる
    $quests = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // 6. JSONにして返す
    echo json_encode($quests, JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    // エラーがあったら教えてあげる
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>