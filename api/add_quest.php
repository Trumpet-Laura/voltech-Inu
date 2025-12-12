<?php
// 1. データベース接続設定（db.php）を読み込む
// ※ここでCORS（セキュリティ許可）の設定も読み込まれます
require 'db.php';

// 2. Reactから送られてきたJSONデータを受け取る
$json = file_get_contents("php://input");
$data = json_decode($json, true);

// 3. データが空でないかチェック
if (empty($data['title']) || empty($data['category'])) {
    echo json_encode(["status" => "error", "message" => "入力項目が足りません"]);
    exit;
}

// 4. 変数に整理する
$user_id = $data['user_id'] ?? 1;       // 仮のユーザーID
$title = $data['title'];                // クエスト名
$category = $data['category'];          // カテゴリ
$difficulty = $data['difficulty'] ?? 1; // 難易度

try {
    // 5. データベースに保存する（INSERT文）
    $sql = "INSERT INTO quests (user_id, title, category, difficulty) VALUES (:user_id, :title, :category, :difficulty)";
    $stmt = $pdo->prepare($sql);
    
    $stmt->execute([
        ':user_id' => $user_id,
        ':title' => $title,
        ':category' => $category,
        ':difficulty' => $difficulty
    ]);

    // 6. 成功メッセージを返す
    echo json_encode([
        "status" => "success", 
        "message" => "クエストを登録しました"
    ]);

} catch (PDOException $e) {
    // エラーメッセージを返す
    echo json_encode([
        "status" => "error", 
        "message" => "DB Error: " . $e->getMessage()
    ]);
}
?>