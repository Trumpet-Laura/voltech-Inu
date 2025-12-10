import React, { useState } from 'react';
import QuestItem from '../components/QuestItem';

const QuestPage = () => {
  // 1. 仮のデータ（データベース代わり）
  const [quests, setQuests] = useState([
    { id: 1, title: '資格の勉強を30分する', difficulty: 3, tags: ['継続力', '知識'] },
    { id: 2, title: 'ボランティアサイトを見る', difficulty: 2, tags: ['行動力'] },
    { id: 3, title: '1人で知らない駅に降りる', difficulty: 1, tags: ['冒険心'] },
  ]);

  // 入力フォームの状態管理
  const [formTitle, setFormTitle] = useState("");
  const [formDifficulty, setFormDifficulty] = useState(1);

  // 追加ボタンを押したときの処理
  const handleAddQuest = () => {
    if (!formTitle) return; // 空なら何もしない
    
    const newQuest = {
      id: Date.now(), // 適当なID
      title: formTitle,
      difficulty: Number(formDifficulty),
      tags: ['行動力'], // いったん固定
    };

    // リストに追加
    setQuests([...quests, newQuest]);
    setFormTitle(""); // 入力欄をクリア
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', display: 'flex', gap: '20px' }}>
      
      {/* --- 左側：クエスト掲示板 --- */}
      <div style={{ flex: 1 }}>
        <h2>クエスト掲示板</h2>
        {quests.map((quest) => (
          <QuestItem 
            key={quest.id}
            title={quest.title} 
            difficulty={quest.difficulty} 
            tags={quest.tags} 
          />
        ))}
      </div>

      {/* --- 右側：入力フォーム（手書きメモの右側部分） --- */}
      <div style={{ width: '300px', padding: '20px', background: '#f9f9f9', borderRadius: '8px', height: 'fit-content' }}>
        <h3>クエスト作成</h3>
        
        <div style={{ marginBottom: '10px' }}>
          <label>やること</label>
          <input 
            type="text" 
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            placeholder="例: 本を1ページ読む"
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>難易度</label>
          <select 
            value={formDifficulty} 
            onChange={(e) => setFormDifficulty(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          >
            <option value={1}>★</option>
            <option value={2}>★★</option>
            <option value={3}>★★★</option>
          </select>
        </div>

        <button 
          onClick={handleAddQuest}
          style={{ width: '100%', padding: '10px', background: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          追加
        </button>
      </div>

    </div>
  );
};

export default QuestPage;