// HTML要素を取得する
const button = document.querySelector('#addBtn');
const lists = document.querySelector('#lists');

const url = 'https://jsonplaceholder.typicode.com/users';

/**
 * WebAPIから情報を取得する
 * @returns
 */
async function getUsers() {
  // Dataの取得
  const res = await fetch(url);
  const users = await res.json();

  return users;
}

/**
 *
 */
async function listAddUsers() {
  const users = await getUsers();

  /* DOM操作 */
  users.forEach(addList);
}

/**
 *
 * @param {*} user
 */
function addList(user) {
  const list = document.createElement('li'); // li要素の生成
  list.innerText = user.name; // 挿入Text
  lists.appendChild(list); // liにTextを挿入し、olに追加する
}

// 実行部
// ウィンドウを読み込み時の動作
window.addEventListener('load', listAddUsers);
// 「もっと」ボタン押下時のイベント
button.addEventListener('click', listAddUsers);

/**
 * WebAPIの導入Lesson
 */
// 書き方1 async-await
// async function callApi() {
//   const url = 'https://jsonplaceholder.typicode.com/users';
//   const res = await fetch(url);
//   const users = await res.json();
//   console.log(users);
// }
// 書き方2 fetch.then
// async function callApi() {
//   const url = 'https://jsonplaceholder.typicode.com/users';
//   const res = await fetch(url)
//     .then(function (res) {
//       return res.json();
//     })
//     .then(function (users) {
//       console.log(users);
//     });
// }

// 書き方3 XMLHttpRequest
// async function callApi() {
//   const url = 'https://jsonplaceholder.typicode.com/users';
//   const xhr = new XMLHttpRequest();
//   xhr.open('GET', url);
//   xhr.responseType = 'json';
//   xhr.send();
//   xhr.onload = function () {
//     console.log(xhr.response);
//   };
// }
// callApi();
