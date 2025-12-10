import React from 'react';

const StatusPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>現在のステータス</h2>
      <div style={{ textAlign: 'center', margin: '30px 0' }}>
        {/* 仮の六角形グラフ画像（あとで実装） */}
        <div style={{ 
          width: '200px', height: '200px', background: '#f0f0f0', 
          borderRadius: '50%', margin: '0 auto', display: 'flex', 
          alignItems: 'center', justifyContent: 'center' 
        }}>
          グラフ予定地
        </div>
      </div>
      
      <h3>Lv. 12</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ padding: '10px', borderBottom: '1px solid #eee' }}>🏃 行動力: 150 EXP</li>
        <li style={{ padding: '10px', borderBottom: '1px solid #eee' }}>🧠 思考力: 80 EXP</li>
        <li style={{ padding: '10px', borderBottom: '1px solid #eee' }}>🗣️ 対話力: 200 EXP</li>
      </ul>
    </div>
  );
};

export default StatusPage;