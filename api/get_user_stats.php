<?php
require 'db.php';

// 今はユーザーID:1 固定
$user_id = 1;

try {
    // 1. 「完了済み(is_completed = 1)」のクエストをすべて取得
    // 難易度(difficulty)とカテゴリ(category)の情報のみで計算
    $sql = "SELECT category, difficulty FROM quests WHERE user_id = :uid AND is_completed = 1";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':uid' => $user_id]);
    $quests = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // 2. 集計用の変数を準備
    $total_exp = 0; // 総経験値
    $status = [
        'thinking' => 0,      // 思考力 (青)
        'communication' => 0, // 対話力 (緑)
        'action' => 0         // 行動力 (赤)
    ];

    // デバッグ
    $debug_ignored = [];

    // 変換
    $map = [
        '思考力' => 'thinking',
        'thinking' => 'thinking',
        'Thinking' => 'thinking',

        '対話力' => 'communication',
        'communication' => 'communication',
        'Communication' => 'communication',
        'dialogue' => 'communication',

        '行動力' => 'action',
        'action' => 'action',
        'Action' => 'action'
    ];

    // 3. ループして計算
    foreach ($quests as $q) {
        // 難易度1につき10ポイントとして計算
        $points = $q['difficulty'] * 10;
        
        // 総経験値に足す
        $total_exp += $points;

        // カテゴリごとのパラメータに足す
        $raw_category = trim($q['category']);

        // (DBに保存されたカテゴリ名とキーが一致する場合のみ加算)
        if (isset($map[$raw_category])) {
            $key = $map[$raw_category];
            $status[$key] += $points;
        } else {
            // マッチしなかったカテゴリをリストに追加
            $debug_ignored[] = $q['category'];
        }
    }

    // 4. レベル計算 (例: 100経験値ごとにレベル1アップ)
    // 初期レベルは1。 floorは「切り捨て」の意味
    $level = 1 + floor($total_exp / 100);

    // 5. 結果をJSONで返す
    echo json_encode([
        "level" => $level,
        "exp" => $total_exp,
        "status" => $status,
        "debug_ignored" => $debug_ignored
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>