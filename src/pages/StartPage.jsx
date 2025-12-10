import React from 'react';
import { useNavigate } from 'react-router-dom';

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      background: 'linear-gradient(to bottom, #87CEFA, #f0f8ff)' // 爽やかな背景
    }}>
      <h1 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '10px' }}>
        VOLTECH<br/>INU RPG
      </h1>
      <p style={{ marginBottom: '40px', color: '#555' }}>
        経験値を貯めて、<br/>ガクチカを作ろう。
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
          boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
        }}
      >
        START
      </button>
    </div>
  );
};

export default StartPage;