'use strict';

// 問題文リスト
const QUESTIONS = [
  'JavaScript',
  'document',
  'window',
  'getElementById',
  'getElementByClassName',
  'addEventListener',
];

// 要素を取得する
const entered = document.querySelector('#entered');
const remained = document.querySelector('#remained');
const inputText = document.querySelector('#inputText');
const game = document.querySelector('#game');
const message = document.querySelector('#message');
const replayBtn = document.querySelector('#replayBtn');
let remainedTextWords = remained.textContent.split(''); // 問題文を分解し配列にした
let enteredTextWords = []; // 入力済み判定配列

/**
 * 問題文をランダムにセットする
 */
function setQuestion() {
  // ランダムで問題文を一つ選ぶ
  let currentKey = Math.floor(Math.random() * QUESTIONS.length);
  let currentText = QUESTIONS[currentKey];

  QUESTIONS.splice(currentKey, 1);

  // 現在の問題文をリセットし、新しい問題文を表示させる
  entered.textContent = '';
  remained.textContent = currentText;
  inputText.value = '';
  enteredTextWords = [];
  remainedTextWords = currentText.split('');
}
setQuestion();

// 入力値の正誤判定
document.addEventListener('input', (e) => {
  if (remainedTextWords[0] === e.data) {
    enteredTextWords.push(remainedTextWords[0]); // 配列への要素挿入
    remainedTextWords.shift(); // 配列の先頭要素を削除する
    entered.textContent = enteredTextWords.join(''); // 配列の要素を結合する
    remained.textContent = remainedTextWords.join(''); // 配列の要素を結合する

    if (remainedTextWords.length <= 0) {
      if (QUESTIONS.length <= 0) {
        // タイピングが全問終了したら、gameブロックを非表示にし、messageブロックを表示する(※CSSでhiddenの表示処理を記述している)
        game.classList.add('hidden');
        message.classList.remove('hidden');
      } else {
        setQuestion();
      }
    }
  }
});

replayBtn.addEventListener('click', () => {
  window.location.reload();
});
