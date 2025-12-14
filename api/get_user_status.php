<?php
date_default_timezone_set('Asia/Tokyo');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

require 'db.php';

// 今はユーザーID:1 固定
$user_id = 1;

try {
    // 1. さぼり判定：最後に完了した日時を取得
    $sql_check = "SELECT MAX(completed_at) as last_active FROM quests WHERE user_id = :uid AND is_completed = 1 AND is_active = 1";
    $stmt_check = $pdo->prepare($sql_check);
    $stmt_check->execute([':uid' => $user_id]);
    $result = $stmt_check->fetch(PDO::FETCH_ASSOC);

    $last_active = $result['last_active'];
    $seconds_remaining = null;  // あと何秒でリセットか
    $is_reset_just_now = false; // 今リセットされたか

    $quests = [];

    if ($last_active) {
        // 最後に活動した時間 + 7日間 = リミット日時
        $limit_time = strtotime($last_active) + 10;
        $current_time = time(); // 今の時間

        // もし「今の時間」が「リミット」を過ぎていたら...^^
        if ($current_time > $limit_time) {
            // 強制リセット★
            // すべてのクエストを未完了（0）にし、日時（completed_at）も消す
            $sql_reset = "UPDATE quests SET is_active = 0 WHERE user_id = :uid";
            $stmt_reset = $pdo->prepare($sql_reset);
            $stmt_reset->execute([':uid' => $user_id]);

            

            $is_reset_just_now = true;
            // リセットされたので、クエストデータは空っぽのまま進む
            $quests = [];

        } else {
            // セーフなら、残り時間を計算
            $seconds_remaining = $limit_time - $current_time;

            // 通常通りデータを取得する
                $sql = "SELECT category, difficulty FROM quests WHERE user_id = :uid AND is_completed = 1 AND is_active = 1";
                $stmt = $pdo->prepare($sql);
                $stmt->execute([':uid' => $user_id]);
                $quests = $stmt->fetchAll(PDO::FETCH_ASSOC);
        } 
    } else {
        // まだ一度も完了していない場合
        $quests = []; 
    }

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
        "penalty_info" => [
            "remaining_seconds" => $seconds_remaining,
            "is_reset" => $is_reset_just_now
        ],
        "debug_ignored" => $debug_ignored
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>