import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuestItem from '../components/QuestItem';
import boardBg from '../assets/board-bg.png';
import boardLogo from '../assets/787037c2bdb004f8.png';

const QuestBoard = ({ quests, onComplete }) => {
  // 残り時間を保存する箱を用意
  const [timeLeft, setTimeLeft] = useState(null);

  // 画面が表示されたら、APIにあと何秒か聞きに行く
  useEffect(() => {
    const fetchPanaltyInfo = async () => {
      try {
        const res = await axios.get("http://192.168.100.194/voltech-Inu/api/get_user_status.php");

        // データの中にペナルティ情報があれば、時間をセットする
        if (res.data && res.data.penalty_info) {
          setTimeLeft(res.data.penalty_info.remaining_seconds);
        }
      } catch (err) {
        console.error("時間取得エラー：", err);
      }
    };
    fetchPanaltyInfo();
  }, []); // []なので最初の一回だけ実行

  // 秒数をユーザーに分かりやすく表示する関数
  useEffect(() => {
    // 時間がまだ取得できていない、または0以下の時は何もしない
    if (timeLeft === null || timeLeft <= 0) return;

    // 1秒ごとにtimeLeftを1減らす
    const timerID = setInterval(() => {
      setTimeLeft((precTime) => precTime - 1);
    }, 1000);

    // 画面が閉じられたらタイマーを止める
    return () => clearInterval(timerID);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    if (seconds === null) return "--:--:--:--";
    if (seconds <= 0) return "00:00:00:00";

    // 日、時、分、秒を計算
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = Math.floor(seconds % 60);

    // ゼロ埋め関数（数字が1桁なら頭に0をつける。例: 5秒 → 05秒）
    const pad = (num) => num.toString().padStart(2, '0');

    // 表示形式： 日 : 時 : 分 : 秒
    return `${days}:${pad(hours)}:${pad(minutes)}:${pad(sec)}`;
  };

  return (

    <div style={{ padding: '20px', paddingBottom: '80px' }}>
      {/* カウントダウン表示エリア */}
      <div style={{ 
        background: '#212121',       // 黒っぽい背景でデジタル時計風
        border: '2px solid #ff9800', // オレンジ枠
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '20px',
        textAlign: 'center',
        color: '#ff9800',            // オレンジ文字
        fontFamily: 'monospace'      // 等幅フォント（数字の幅を揃える）
      }}>
        <div style={{ fontSize: '0.9rem', marginBottom: '5px', color:'#ccc' }}>
          放置リセットまで (日:時:分:秒)
        </div>
        <span style={{ fontSize: '2rem', fontWeight: 'bold', letterSpacing: '2px' }}>
          {formatTime(timeLeft)}
        </span>
      </div>

      <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>クエスト掲示板</h2>
      
      {quests.length === 0 ? (
        <p>現在挑戦中のクエストはありません。<br/>「＋」ボタンから追加しよう！</p>
      ) : (
        quests.map((quest) => (
          <div key={quest.id} style={{ position: 'relative' }}>
            <QuestItem 
              title={quest.title} 
              difficulty={quest.difficulty} 
              tags={[quest.category]} // カテゴリを表示
            />
            {/* 完了ボタン */}
            <button 
              onClick={() => onComplete(quest.id)}
              style={{
                position: 'absolute',
                right: '10px',
                bottom: '25px',
                background: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '5px 10px',
                cursor: 'pointer'
              }}
            >
              完了！
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default QuestBoard;