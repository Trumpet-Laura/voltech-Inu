<?php
// === CORS設定（ここが最強の許可証） ===
// どのサイトからでもアクセスOK
header("Access-Control-Allow-Origin: *");
// JSONなどのデータを送ってもOK
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
// GET, POST, OPTIONS どの方法でもOK
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// 【重要】Reactからの「事前確認(OPTIONS)」が来たら、すぐに「OK」と答えて終了する
// これがないとPOST送信でエラーになります
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// === データベース接続設定 ===
$host = 'localhost';
$db   = 'gakuchika_db';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // 接続エラー時はJSONで返す
    echo json_encode(["status" => "error", "message" => "DB Connection Error: " . $e->getMessage()]);
    exit;
}
?>