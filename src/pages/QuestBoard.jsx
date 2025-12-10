import React from 'react';
import QuestItem from '../components/QuestItem';

const QuestBoard = ({ quests, onComplete }) => {
  return (
    <div style={{ padding: '20px', paddingBottom: '80px' }}>
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