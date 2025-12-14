import React from 'react';
import { Link, useLocation } from 'react-router-dom';


const Navigation = () => {
  const location = useLocation();

  if (location.pathname === '/') {
    return null;
  }

  const navStyle = {
    position: 'fixed',
    bottom: 0,
    // left: 0,  <-- これを削除（またはコメントアウト）
    width: '100%',
    maxWidth: '480px', // ★ここを追加！親と同じ幅に制限する
    height: '60px',
    background: '#faf0e6',
    borderTop: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 100,
    boxShadow: '0 -2px 10px rgba(0,0,0,0.05)'
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#888',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '0.7rem'
  };

  // 選択中のアイコンを濃くする関数
  const getStyle = (path) => ({
    ...linkStyle,
    color: location.pathname === path ? '#333' : '#aaa', // 選択中は黒、以外はグレー
    fontWeight: location.pathname === path ? 'bold' : 'normal',
  });

  return (
    <nav style={navStyle}>
      <Link to="/board" style={getStyle('/board')}>
        <span style={{ fontSize: '1.5rem' }}>📋</span>
        <span>掲示板</span>
      </Link>
      <Link to="/create" style={getStyle('/create')}>
        <span style={{ fontSize: '1.5rem' }}>➕</span>
        <span>追加</span>
      </Link>
      <Link to="/status" style={getStyle('/status')}>
        <span style={{ fontSize: '1.5rem' }}>📊</span>
        <span>ステータス</span>
      </Link>
      <Link to="/history" style={getStyle('/history')}>
        <span style={{ fontSize: '1.5rem' }}>📜</span>
        <span>履歴</span>
      </Link>
    </nav>
  );
};

export default Navigation;