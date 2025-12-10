import React from 'react';

const HistoryPage = ({ history }) => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>クエスト達成履歴</h2>
      {history.length === 0 ? (
        <p>まだ達成したクエストはありません。</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {history.map((quest) => (
            <li key={quest.id} style={{ 
              background: '#e8f5e9', 
              padding: '15px', 
              marginBottom: '10px', 
              borderRadius: '8px',
              borderLeft: '5px solid #4CAF50'
            }}>
              <div style={{ fontWeight: 'bold' }}>✅ {quest.title}</div>
              <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '5px' }}>
                獲得: {quest.category} / 難易度: {'★'.repeat(quest.difficulty)}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistoryPage;