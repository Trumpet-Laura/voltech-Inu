import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';     // 0ページ
import QuestBoard from './pages/QuestBoard';   // 1ページ
import QuestCreate from './pages/QuestCreate'; // 2ページ
import StatusPage from './pages/StatusPage';   // 3ページ
import HistoryPage from './pages/HistoryPage'; // 4ページ
import Navigation from './components/Navigation';

function App() {
  // ■ 1. 現在のクエストリスト
  const [quests, setQuests] = useState([
    { id: 1, title: '資格の勉強を30分する', difficulty: 3, category: '継続力' },
    { id: 2, title: 'ボランティアサイトを見る', difficulty: 2, category: '行動力' },
  ]);

  // ■ 2. 達成した履歴リスト
  const [history, setHistory] = useState([]);

  // クエストを追加する機能
  const addQuest = (title, difficulty, category) => {
    const newQuest = {
      id: Date.now(),
      title: title,
      difficulty: difficulty,
      category: category, 
    };
    setQuests([...quests, newQuest]);
  };

  // クエストを完了にする機能（掲示板から履歴へ移動）
  const completeQuest = (id) => {
    // 完了したクエストを探す
    const targetQuest = quests.find(q => q.id === id);
    if (targetQuest) {
      setHistory([targetQuest, ...history]); // 履歴に追加
      setQuests(quests.filter(q => q.id !== id)); // 掲示板から削除
    }
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* 0ページ目：スタート画面 */}
          <Route path="/" element={<StartPage />} />
          
          {/* 1ページ目：掲示板 */}
          <Route path="/board" element={<QuestBoard quests={quests} onComplete={completeQuest} />} />
          
          {/* 2ページ目：追加 */}
          <Route path="/create" element={<QuestCreate onAddQuest={addQuest} />} />
          
          {/* 3ページ目：パラメータ */}
          <Route path="/status" element={<StatusPage />} />
          
          {/* 4ページ目：履歴 */}
          <Route path="/history" element={<HistoryPage history={history} />} />
        </Routes>

        {/* 常に下に表示されるLINE風メニュー */}
        <Navigation />
      </div>
    </BrowserRouter>
  );
}

export default App;