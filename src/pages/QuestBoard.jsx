import React from 'react';
import QuestItem from '../components/QuestItem';
import boardBg from '../assets/board-bg.png';
import boardLogo from '../assets/787037c2bdb004f8.png';

const QuestBoard = ({ quests, onComplete }) => {
  return (
    <div 
    　style={{ 
      padding: '20px',
       paddingBottom: '80px', 
       minHeight: '100vh',
        backgroundImage: `url(${boardBg})`,
        backgroundSize: 'cover',       // 全体にフィット
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',}}>
      <img
  src={boardLogo}
  alt="クエスト掲示板"
  style={{
    display: 'block',
    margin: '0 auto 10px', // 中央寄せ＋下余白
    width: '240px',        // ロゴサイズ（調整してOK）
    filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))'
  }}
/>
      
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