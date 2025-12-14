import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import boardBg from '../assets/board-bg.png';
import CreateLogo from '../assets/AtarashiQuest.png';
import Createlist from '../assets/Adobe_Express_-_file_1.png';

const QuestCreate = ({ onAddQuest }) => {
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("行動力"); // デフォルト
  const [formDifficulty, setFormDifficulty] = useState(1);
  
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!formTitle) return;
    // 親（App.jsx）に追加を依頼
    onAddQuest(formTitle, Number(formDifficulty), formCategory);
    navigate('/board'); // 掲示板に戻る
  };

  return (
    <div style={{ padding: '20px' 
      , minHeight: '100vh',
      backgroundImage: `url(${boardBg})`,
      backgroundSize: 'cover',       // 全体にフィット
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
       <img
  src={CreateLogo}
  alt="新しいクエストを作成"
  style={{
    display: 'block',
    margin: '0 auto 0px', // 中央寄せ＋下余白
    width: '240px',        // ロゴサイズ（調整してOK）
    filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))'
  }}
/>
      
      
      {/* タイトル入力 */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold' }}>タイトル</label>
        <input 
          type="text" 
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          style={{ width: '100%', padding: '10px', marginTop: '5px', fontSize: '16px' }}
          placeholder="例: 知らない駅で降りて散歩する"
        />
      </div>

      {/* カテゴリ選択（3択） */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold' }}>身につく力（カテゴリ）</label>
        <select 
          value={formCategory} 
          onChange={(e) => setFormCategory(e.target.value)}
          style={{ width: '100%', padding: '10px', marginTop: '5px', fontSize: '16px' }}
        >
          <option value="行動力">🏃 行動力</option>
          <option value="思考力">🧠 思考力</option>
          <option value="対話力">🗣️ 対話力</option>
        </select>
      </div>

      {/* 難易度選択 */}
      <div style={{ marginBottom: '30px' }}>
        <label style={{ fontWeight: 'bold' }}>難易度</label>
        <select 
          value={formDifficulty} 
          onChange={(e) => setFormDifficulty(e.target.value)}
          style={{ width: '100%', padding: '10px', marginTop: '5px', fontSize: '16px' }}
        >
          <option value={1}>★ （かんたん）</option>
          <option value={2}>★★ （ふつう）</option>
          <option value={3}>★★★ （むずかしい）</option>
        </select>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button 
          onClick={handleSubmit}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
          }}
        >
          <img
            src={Createlist}
            alt="リストに追加"
            style={{
              width: '220px',
              height: 'auto',
              filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))',
            }}
        　　/>
        </button>
      </div>
    </div>
  );
};

export default QuestCreate;