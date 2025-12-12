import React, { useState, useEffect } from 'react'; // useEffectを追加
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import QuestBoard from './pages/QuestBoard';
import QuestCreate from './pages/QuestCreate';
import StatusPage from './pages/StatusPage';
import HistoryPage from './pages/HistoryPage';
import Navigation from './components/Navigation';

function App() {
  const [quests, setQuests] = useState([]);
  const [history, setHistory] = useState([]);

  // ■ 追加: データをサーバーから取ってくる関数
  const fetchQuests = async () => {
    try {
      // 自分のAPIのURLに合わせてね
      const res = await axios.get("http://localhost/voltech-Inu/api/get_quests.php");
      setQuests(res.data);
    } catch (err) {
      console.error("データ取得エラー:", err);
    }
  };

  // ■ 追加: アプリを開いた瞬間にデータを読み込む
  useEffect(() => {
    fetchQuests();
  }, []);

  // ■ 修正: async を追加しました！
  const addQuest = async (title, difficulty, category) => {
    const newQuest = {
      user_id: 1,
      title: title,
      difficulty: difficulty,
      category: category
    };
    
    try {
      await axios.post("http://localhost/voltech-Inu/api/add_quest.php", newQuest);

      // 成功したらリストを再取得
      fetchQuests();
      alert("登録しました！");
    } catch (err) {
      console.error("登録エラー：", err);
      alert("登録に失敗しました");
    }
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
      <div className="App" style={{ width: '100%', paddingBottom: '70px', boxSizing: 'border-box' }}>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/board" element={<QuestBoard quests={quests} onComplete={completeQuest} />} />
          <Route path="/create" element={<QuestCreate onAddQuest={addQuest} />} />
          <Route path="/status" element={<StatusPage />} />
          <Route path="/history" element={<HistoryPage history={history} />} />
        </Routes>
        
        <Navigation />
      </div>
    </BrowserRouter>
  );
}

export default App;