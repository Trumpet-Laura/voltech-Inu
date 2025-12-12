
import React, { useState, useEffect } from 'react';
import axios from 'axios';  //追加：通信するための道具


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

      console.log("取得したデータ：", res.data); // 確認用ログ

      // 追加：questsにデータを保持
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
      //1. PHPのadd_quest.phpにデータを送る
      await axios.post("http://localhost/voltech-Inu/api/add_quest.php", newQuest);

      alert("登録しました！"); // (任意)　ユーザーへの報告

      //2. 成功したら、リストを再取得して画面を最新にする
      fetchQuests();

      window.location.href = "/board";

    } catch (err) {
      console.error("登録エラー：", err);
      alert("登録に失敗しました");
    }
  };

  const completeQuest = async(id) => {
    try {
      // 1. PHPに完了報告
      await axios.post("http://localhost/voltech-Inu/api/complete_quest.php", { id: id });

      // 2. 成功したら画面からも消す
      const targetQuest = quests.find(q => q.id === id);
      if (targetQuest) {
        setHistory([targetQuest, ...history]);
        setQuests(quests.filter(q => q.id !== id));
      }
      console.log("完了したクエストID:", id)
    } catch (err) {
      console.log("完了エラー：", err);
      alert("完了処理に失敗しました");
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