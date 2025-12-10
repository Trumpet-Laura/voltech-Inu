<?php
require 'db.php';

// 動作確認用メッセージ
echo json_encode([
    "status" => "success",
    "message" => "Backend API is connected!"
]);
?>