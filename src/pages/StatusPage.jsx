import React, { useState, useEffect } from 'react'; // 変更：useStateとuseEffectを追加
import axios from 'axios';  // 変更：通信用のaxiosを追加

// 1. Chart.js で使う部品をインポート
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
// 2. React用のレーダーチャートコンポーネントをインポート
import { Radar } from 'react-chartjs-2';

// 3. Chart.jsを使うための登録（おまじない）
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const StatusPage = () => {
  //　変更：データを保存するためのstateを作成、初期値を0に設定
  const [myStats, setMyStats] = useState({
    level: 1,     // レベル
    exp: 0,       // 経験値
    levels: { action: 1, thinking: 1, communication: 1 },
    points: { thinking: 0, communication: 0, action: 0 }
  });

  // 変更：画面が開いた瞬間に、APIからデータを取ってくる処理を追加
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://192.168.100.194/voltech-Inu/api/get_user_status.php");

        if (res.data && res.data.status_levels){
          console.log("APIから届いたデータ：", res.data);
          // APIから帰ってきたデータを、画面用の変数に入れる
          // API側は{ thinking, communication, action }なので、名前に気を付けてセット
          setMyStats({
            level: res.data.level,
            exp: res.data.exp,
            levels: res.data.status_levels,
            points: res.data.status_points
          });
        } 
      } catch (err) {
        console.error("ステータス取得エラー：", err);
      }
    };
    fetchStats();
  }, []);

  // 4. グラフに渡すデータの設定
  const data = {
    labels: [
      `行動力 Lv.${myStats.levels.action}`,
      `思考力 Lv.${myStats.levels.thinking}`,
      `対話力 Lv.${myStats.levels.communication}`
    ], // 角の名前
    datasets: [
      {
        label: '現在のステータス',
        // 変更：固定値ではなく、APIからとったデータ（state）を使う仕様にした
        data: [myStats.levels.action, myStats.levels.thinking, myStats.levels.communication], // 実際の数値
        backgroundColor: 'rgba(255, 127, 80, 0.2)', // 中の色（薄いオレンジ）
        borderColor: 'rgba(255, 127, 80, 1)',       // 線の色（濃いオレンジ）
        borderWidth: 2,
        pointBackgroundColor: 'rgba(255, 127, 80, 1)', // 点の色
      },
    ],
  };

  // 5. グラフの見た目オプション設定
  const options = {
    scales: {
      r: {
        min: 0,   // 最小値
        //max: 100, // 最大値
        suggestedMax: myStats.level + 1,
        ticks: {
          stepSize: 1, // 目盛りの間隔
          backdropColor: 'transparent', // 目盛りの背景を透明に
        },
        grid: {
          color: '#ccc', // 網目の色
        },
        pointLabels: {
          font: {
            size: 14 // ラベル（行動力など）の文字サイズ
          }
        }
      },
    },
    plugins: {
      legend: {
        display: false, // 上に出る「現在のステータス」という凡例を消す（お好みで）
      }
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>現在のステータス</h2>

      {/* 追加：レベルと経験値を表示するエリアを追加 */}
      <div style={{ marginBottom: '20px'}}>
        <h1 style={{ fontSize: '2.5rem', margin: '10px 0'}}>
          Lv.<span style={{ color: 'e91e63'}}>{myStats.level}</span>
        </h1>
        <p>総経験値: {myStats.exp} exp</p>
      </div>

      {/* ▼ Chart.jsの描画エリア ▼ */}
      <div style={{ width: '300px', margin: '0 auto' }}>
        <Radar data={data} options={options} />
      </div>

      <div style={{ marginTop: '20px', textAlign: 'left', display: 'inline-block' }}>
        <p>🏃 行動力: <b>Lv.{myStats.levels.action}</b> <span style={{fontSize:'0.8em', color:'#666'}}>({myStats.points.action} exp)</span></p>
        <p>🧠 思考力: <b>Lv.{myStats.levels.thinking}</b> <span style={{fontSize:'0.8em', color:'#666'}}>({myStats.points.thinking} exp)</span></p>
        <p>🗣️ 対話力: <b>Lv.{myStats.levels.communication}</b> <span style={{fontSize:'0.8em', color:'#666'}}>({myStats.points.communication} exp)</span></p>
      </div>
    </div>
  );
};

export default StatusPage;