import React from 'react';
import { useNavigate } from 'react-router-dom';

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
    fontSize: '3.5rem', // 重厚なフォントは少し大きい方が映えます！
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
  Re: ガクチカ
        </h1>

        <p style={{ marginBottom: '40px', lineHeight: '1.6' }}>
          経験値を貯めて、<br />
          ガクチカを作ろう。
        </p>

        <button
          onClick={() => navigate('/board')}
          style={{
            padding: '15px 50px',
            fontSize: '1.2rem',
            background: '#ff7f50',
            color: 'white',
            border: 'none',
            borderRadius: '30px',
            fontWeight: 'bold',
            boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
            cursor: 'pointer',
          }}
        >
          START
        </button>
      </div>
    </div>
  );
};

export default StartPage;