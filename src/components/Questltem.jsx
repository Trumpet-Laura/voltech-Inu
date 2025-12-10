import React from 'react';

// クエスト1つ分の見た目を作る部品
const QuestItem = ({ title, difficulty, tags }) => {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px', marginBottom: '12px', background: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      {/* タイトル */}
      <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{title}</h3>
      
      {/* 難易度（星の数だけ★を表示） */}
      <div style={{ color: '#f5c518', marginBottom: '8px' }}>
        {'★'.repeat(difficulty)}
        <span style={{ color: '#ccc' }}>{'★'.repeat(3 - difficulty)}</span>
      </div>

      {/* 身につく力（タグ） */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {tags.map((tag, index) => (
          <span key={index} style={{ background: '#e0f2f1', color: '#00695c', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default QuestItem;