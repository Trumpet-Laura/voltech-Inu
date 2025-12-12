import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import QuestBoard from './pages/QuestBoard';
import QuestCreate from './pages/QuestCreate';
import StatusPage from './pages/StatusPage';
import HistoryPage from './pages/HistoryPage';
import Navigation from './components/Navigation';

function App() {
  const [quests, setQuests] = useState([
    { id: 1, title: '資格の勉強を30分する', difficulty: 3, category: '継続力' },
    { id: 2, title: 'ボランティアサイトを見る', difficulty: 2, category: '行動力' },
  ]);
  const [history, setHistory] = useState([]);

  const addQuest = (title, difficulty, category) => {
    const newQuest = {
      id: Date.now(),
      title: title,
      difficulty: difficulty,
      category: category, 
    };
    setQuests([...quests, newQuest]);
  };

  const completeQuest = (id) => {
    const targetQuest = quests.find(q => q.id === id);
    if (targetQuest) {
      setHistory([targetQuest, ...history]);
      setQuests(quests.filter(q => q.id !== id));
    }
  };

  return (
    <BrowserRouter>
      {/* ここを変更しました！
        width: 100% にすることで、親の #root (max-width:480px) にピッタリ合わせます
      */}
      <div className="App" style={{ width: '100%', paddingBottom: '70px', boxSizing: 'border-box' }}>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/board" element={<QuestBoard quests={quests} onComplete={completeQuest} />} />
          <Route path="/create" element={<QuestCreate onAddQuest={addQuest} />} />
          <Route path="/status" element={<StatusPage />} />
          <Route path="/history" element={<HistoryPage history={history} />} />
        </Routes>
        
        {/* メニューバー */}
        <Navigation />
      </div>
    </BrowserRouter>
  );
}

export default App;