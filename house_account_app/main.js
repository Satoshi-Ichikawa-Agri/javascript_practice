/* 家計簿登録処理 */

// ===== 変数宣言 ============================================
const GOOGLE_SPREADSHEET_URL = ''; // Googleスプレッドシート GASのデプロイURL

// HTML要素
const registerForm = document.querySelector('#registerForm'); // Form全体

const date = document.querySelector('#date'); // 日付
const expenseItem = document.querySelector('#expenseItem'); // 費目
const content = document.querySelector('#content'); // 内容
const income = document.querySelector('#income'); // 収入
const spending = document.querySelector('#spending'); // 支出
const byPayment = document.querySelector('#byPayment'); // 支払手段
const receipt = document.querySelector('#receipt'); // 領収書有無
const remarks = document.querySelector('#remarks'); // 備考

const registerBtn = document.querySelector('#registerBtn'); // 登録ボタン

// ==========================================================

/**
 * POST関数
 * @param {*} event
 */
async function post(event) {
  event.preventDefault();

  const data = {
    date: date.value,
    expenseItem: expenseItem.value,
    content: content.value,
    income: income.value,
    spending: spending.value,
    byPayment: byPayment.value,
    receipt: receipt.value,
    remarks: remarks.value,
  };

  const options = {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  fetch(GOOGLE_SPREADSHEET_URL, options);
}

// 実行部
document.addEventListener('DOMContentLoaded', function () {
  registerBtn.addEventListener('click', post);
});
