import React from 'react';
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
  // 本来はバックエンドから受け取るデータ
  const myStats = {
    action: 80,    // 行動力
    thinking: 40,  // 思考力
    dialogue: 60   // 対話力
  };

  // 4. グラフに渡すデータの設定
  const data = {
    labels: ['行動力', '思考力', '対話力'], // 角の名前
    datasets: [
      {
        label: '現在のステータス',
        data: [myStats.action, myStats.thinking, myStats.dialogue], // 実際の数値
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
        max: 100, // 最大値
        ticks: {
          stepSize: 20, // 目盛りの間隔
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

      {/* ▼ Chart.jsの描画エリア ▼ */}
      <div style={{ width: '300px', margin: '0 auto' }}>
        <Radar data={data} options={options} />
      </div>

      <div style={{ marginTop: '20px', textAlign: 'left', display: 'inline-block' }}>
        <p>🏃 行動力: Lv.{myStats.action}</p>
        <p>🧠 思考力: Lv.{myStats.thinking}</p>
        <p>🗣️ 対話力: Lv.{myStats.dialogue}</p>
      </div>
    </div>
  );
};

export default StatusPage;