<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
require 'db.php';

// 今はユーザーID:1 固定
$user_id = 1;

try {
    // 1. データの取得
    $sql = "SELECT category, difficulty FROM quests WHERE user_id = :uid AND is_completed = 1";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':uid' => $user_id]);
    $quests = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // 2. 集計用の変数を準備
    $total_exp = 0; // 総経験値
    $status_points = [
        'thinking' => 0,      // 思考力
        'communication' => 0, // 対話力
        'action' => 0         // 行動力
    ];

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

    $debug_ignored = [];

    // 3. ループして計算
    if (!empty($quests)) {
        foreach ($quests as $q) {
            $diff = intval($q['difficulty']);
            // 難易度1につき10ポイントとして計算
            $points = $diff * 10;
        
            // 総経験値に足す
            $total_exp += $points;

            // カテゴリごとのパラメータに足す
            $raw_category = trim($q['category']);

            // (DBに保存されたカテゴリ名とキーが一致する場合のみ加算)
            if (isset($map[$raw_category])) {
                $key = $map[$raw_category];
                $status_points[$key] += $points;
            } else {
                $debug_ignored[] = $raw_category;
            }
        }
    }

    // 4. レベル計算 (1 + √(経験値 ÷ 100))
    // 例：100exp→Lv2, 400exp→Lv3, 900exp→Lv4...
    function calcLevel($exp) {
        if ($exp <= 0) return 1;
        return 1 + floor(sqrt($exp / 100));
    }

    // メインレベル
    $main_level = calcLevel($total_exp);

    // カテゴリ別レベル
    $status_levels = [
        'thinking'      => calcLevel($status_points['thinking']),
        'communication' => calcLevel($status_points['communication']),
        'action'        => calcLevel($status_points['action'])
    ];
    // 5. 結果をJSONで返す
    echo json_encode([
        "level" => $main_level,
        "exp" => $total_exp,
        "status_points" => $status_points,
        "status_levels" => $status_levels,
        "debug_ignored" => $debug_ignored
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>