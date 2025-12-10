<?php
// React(5173)からPHP(80)へのアクセス許可
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// DB接続情報 (XAMPP初期設定)
$host = 'localhost';
$db   = 'gakuchika_db';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'DB Connection Error: ' . $e->getMessage();
    exit;
}
?>