import React from 'react';
import { useNavigate } from 'react-router-dom';


import startBtnImage from '../assets/Starttouka.png';

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: '100vh',
        backgroundImage: "url('/title-bg2.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      {/* 黒い半透明オーバーレイ */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.35)',
        }}
      />

      {/* 中身 */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <h1 style={{
    fontSize: '2.5rem', // 重厚なフォントは少し大きい方が映えます！
    marginBottom: '10px',
    fontWeight: 900,    // 太さを最大にする
    letterSpacing: '0.05em', // 少し文字間隔を空けるとリッチに見えます
    
    // ▼ 候補1（極太明朝）の場合
    fontFamily: '"Noto Serif JP", serif',
    
    // ▼ 候補2（極太ゴシック）の場合
    // fontFamily: '"Dela Gothic One", sans-serif',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)', // 黒い影を落とす
  }}
>
  Re:ゼロから始める<br />ガクチカ生活
        </h1>

        <p style={{ marginBottom: '40px', lineHeight: '1.6' }}>
          経験値を貯めて、<br />
          ガクチカを作ろう。
        </p>

        <button
  onClick={() => navigate('/board')}
  style={{
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    display: 'block',      // ← 追加
    margin: '0 auto',  // ← 追加
  }}
>
  <img
    src={startBtnImage}
    alt="START"
    style={{
      width: '220px',      // 好きなサイズに調整
      height: 'auto',
      filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))',
      display: 'block',
      margin: '0 auto',
    }}
  />
</button>
      </div>
    </div>
  );
};

export default StartPage;