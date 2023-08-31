/* SUNDAY NIGHT DREAMER放送回の検索処理 */

// ===== 変数宣言 ============================================
const SND_URL = 'http://127.0.0.1:8000/snd_broadcast_search/'; // SND-SEARCH-API

// HTML要素
const searchForm = document.querySelector('#searchForm'); // Form全体
const broadcastYear = document.querySelector('#broadcastYear'); // 放送年
const broadcastMonth = document.querySelector('#broadcastMonth'); // 放送月
const broadcastDate = document.querySelector('#broadcastDate'); // 放送日
const broadcastContent = document.querySelector('#broadcastContent'); // 放送内容
const assistant1 = document.querySelector('#assistant1'); // アシスタント1
const assistant2 = document.querySelector('#assistant2'); // アシスタント2
const guests = document.querySelector('#guests'); // ゲスト
const remarks = document.querySelector('#remarks'); // 備考

const sndSearchBtn = document.querySelector('#sndSearchBtn'); // 検索ボタン
const searchResultList = document.querySelector('#searchResultList'); // 検索結果div

// ==========================================================

/**
 *
 * @returns
 */
async function sndSearch() {
  const data = {
    broadcast_year: broadcastYear.value,
    broadcast_month: broadcastMonth.value,
    broadcast_date: broadcastDate.value,
    broadcast_content: broadcastContent.value,
    assistant_1: assistant1.value,
    assistant_2: assistant2.value,
    guests: guests.value,
    remarks: remarks.value,
  };
  console.log('INPUT DATA:', data);

  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  let response = await fetch(SND_URL, options);
  let results = await response.json();
  console.log(results);

  return results;
}

/**
 *
 * @param {*} event
 */
async function listAddResults(event) {
  // event.preventDefault()
  // ブラウザのデフォルトの動作を無効化し、代わりにJavaScriptでカスタムの処理を実行するための強力な手段です。
  // これにより、ユーザーエクスペリエンスを制御し、ウェブページやアプリケーションの挙動をカスタマイズすることができます。
  event.preventDefault();
  const results = await sndSearch();

  // DOM操作
  createTable(results);
}

/**
 *
 * @param {*} apiData
 */
function createTable(apiData) {
  const table = document.createElement('table'); // テーブルを作成
  const thead = document.createElement('thead'); // テーブルヘッダーを作成
  const headerRow = document.createElement('tr');
  const tbody = document.createElement('tbody'); // テーブルボディを作成

  // ヘッダーセルを作成してテーブルヘッダーに追加
  // ヘッダーのテキストを定義
  const headers = [
    'No.',
    '放送年',
    '放送月',
    '放送日',
    '放送内容',
    'アシスタント1',
    'アシスタント2',
    'ゲスト',
    '備考',
    '作成日',
    '更新日',
  ];
  headers.forEach((headerText) => {
    const headerCell = document.createElement('th');
    headerCell.textContent = headerText;
    headerRow.appendChild(headerCell);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // データ行とセルを作成してテーブルボディに追加
  for (const obj of apiData) {
    const row = document.createElement('tr');
    for (const key in obj) {
      const cell = document.createElement('td');
      cell.textContent = obj[key];
      row.appendChild(cell);
    }
    tbody.appendChild(row);
  }

  table.appendChild(tbody);
  searchResultList.appendChild(table); // テーブルをHTML文書に追加
}

// 実行部
document.addEventListener('DOMContentLoaded', function () {
  sndSearchBtn.addEventListener('click', listAddResults);
});
