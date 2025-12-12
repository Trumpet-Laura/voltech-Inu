import React, { useState } from 'react';
import axios from 'axios';  //追加：通信するための道具
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
    /*{ id: 1, title: '資格の勉強を30分する', difficulty: 3, category: '継続力' },
    { id: 2, title: 'ボランティアサイトを見る', difficulty: 2, category: '行動力' },*/
  ]);

  // ■ 2. 達成した履歴リスト
  const [history, setHistory] = useState([]);

  // 追加：画面が開いた瞬間に、PHPからデータを取ってくる
  const fetchQuests = async () => {
    try {
      //PHPのget_quests.phpに電話をかける 
      const res = await axios.get("http://localhost/voltech-Inu/api/get_quests.php");
      console.log("取得したデータ：", res.data); // 確認用ログ
    } catch (err) {
      console.error("データ取得エラー：", err)
    }
  };

  // useEffectを使って、最初の1回だけデータを取得する
  useEffect(() => {
    fetchQuests();
  }, []);

  // クエストを追加する機能 追加：PHPに送信するように変更
  const addQuest = async(title, difficulty, category) => {
    // 送るデータを作る
    const newQuest = {
      user_id: 1, // とりあえずID:1で固定
      title: title,
      difficulty: difficulty,
      category: category
    };
    
    try {
      // PHPのadd_quest.phpにデータを送る
      await axios.post("http://localhost/voltech-Inu/api/add_quest.php", newQuest);

      // 成功したら、リストを再取得して画面を最新にする
      fetchQuests();
      alert("登録しました！"); // (任意)　ユーザーへの報告
    } catch (err) {
      console.error("登録エラー：", err);
      alert("登録に失敗しました");
    }
  };

  // クエストを完了にする機能（掲示板から履歴へ移動）
  const completeQuest = (id) => {
    // 完了したクエストを探す
    const targetQuest = quests.find(q => q.id === id);
    if (targetQuest) {
      setHistory([targetQuest, ...history]); // 履歴に追加
      setQuests(quests.filter(q => q.id !== id)); // 掲示板から削除

      // 次回追加：ここでapi/complete_quest.phpを呼ぶ処理を追加する
      console.log("完了したクエストID：", id);
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