/* 全国公営体育館の登録・検索処理 */

// ===== 変数宣言 ============================================
const SEARCH_URL = 'http://127.0.0.1:8000/public_gymnasium_search/'; // search-API
const REGISTER_URL = 'http://127.0.0.1:8000/public_gymnasium_register/'; // register-API

// public_gym_search.html HTML要素
const searchForm = document.querySelector('#searchForm'); // Form全体
const prefecture_search = document.querySelector('#prefecture'); // 都道府県
const municipality_search = document.querySelector('#municipality'); // 市区町村名
const publicGymSearchBtn = document.querySelector('#publicGymSearchBtn'); // 検索ボタン
const searchResultList = document.querySelector('#searchResultList'); // 検索結果div

// public_gym_register.html HTML要素
const registerForm = document.querySelector('#registerForm'); // Form全体
const facilityName = document.querySelector('#facilityName'); // 施設名称
const prefecture = document.querySelector('#prefecture'); // 都道府県
const municipality = document.querySelector('#municipality'); // 市区町村名
const address = document.querySelector('#address'); // 所在地
const telephone = document.querySelector('#telephone'); // 電話番号
const url = document.querySelector('#url'); // ホームページURL
const trainingRoomFlag = document.querySelector(
  'input[type="radio"][name="training_room_flag"]'
); // トレーニングルーム有無
const publicGymRegisterBtn = document.querySelector('#publicGymRegisterBtn'); // 登録ボタン
// ==========================================================

/**
 * 公営体育館の登録処理
 * @returns
 */
async function publicGymRegister(event) {
  event.preventDefault();

  let trainingRoomFlagBool = false;
  if (trainingRoomFlag.value === '1') {
    trainingRoomFlagBool = true;
  }

  const data = {
    facility_name: facilityName.value,
    prefecture: prefecture.value,
    municipality: municipality.value,
    address: address.value,
    telephone: telephone.value,
    url: url.value,
    training_room_flag: trainingRoomFlagBool,
  };
  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  let response = await fetch(REGISTER_URL, options);
  let results = await response.json();
  console.log(results);

  return results;
}

/**
 *　公営体育館の検索処理
 * @returns
 */
async function publicGymSearch() {
  const data = {
    prefecture: prefecture_search.value,
    municipality: municipality_search.value,
  };
  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  let response = await fetch(SEARCH_URL, options);
  let results = await response.json();
  console.log(results);

  return results;
}

/**
 * 公営体育館検索のmain処理
 * @param {*} event
 */
async function listAddResults(event) {
  // event.preventDefault()
  // ブラウザのデフォルトの動作を無効化し、代わりにJavaScriptでカスタムの処理を実行するための強力な手段です。
  // これにより、ユーザーエクスペリエンスを制御し、ウェブページやアプリケーションの挙動をカスタマイズすることができます。
  event.preventDefault();
  const results = await publicGymSearch();

  // DOM操作
  createTable(results);
}

/**
 * 公営体育館の検索結果を描画処理
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
    '都道府県',
    '自治体(区市町村)',
    '作成日',
    '更新日',
    '施設名称',
    '所在地',
    '電話番号',
    'HP-URL',
    'トレーニングルームの有無',
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

/* 実行部 */
// 検索
document.addEventListener('DOMContentLoaded', function () {
  publicGymSearchBtn.addEventListener('click', listAddResults);
});
// 登録
document.addEventListener('DOMContentLoaded', function () {
  publicGymRegisterBtn
    .addEventListener('click', publicGymRegister)
    .then(function (results) {
      console.log(results);
    });
});
