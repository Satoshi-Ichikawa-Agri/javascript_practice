// ======== 変数宣言 ============= //
const RANDOM_SENTENCE_URL_API = 'https://api.quotable.io/random'; // 名言APIのURL

const timer = document.querySelector('#timer');
const typeDisplay = document.querySelector('#typeDisplay');
const typeInput = document.querySelector('#typeInput');

// 音
const typeSound = new Audio('./audio/typing-sound.mp3');
const wrongSound = new Audio('./audio/wrong.mp3');
const correctSound = new Audio('./audio/correct.mp3');

// タイマー
let originalTime = 30;
let startTime;
// ============================== //

typeInput.addEventListener('input', () => {
  // タイプサウンドを付ける
  typeSound.play();
  typeSound.currentTime = 0;

  // 問題文を分解し1文字ずつにする → 入力値と問題文の正誤判定
  const sentenceArray = typeDisplay.querySelectorAll('span');
  const arrayValue = typeInput.value.split('');
  let correctFlag = true;
  sentenceArray.forEach((characterSpan, index) => {
    if (arrayValue[index] == null) {
      characterSpan.classList.remove('correct');
      characterSpan.classList.remove('incorrect');
      correctFlag = false;
    } else if (characterSpan.innerText === arrayValue[index]) {
      characterSpan.classList.add('correct');
      characterSpan.classList.remove('incorrect');
    } else {
      characterSpan.classList.add('incorrect');
      characterSpan.classList.remove('correct');
      correctFlag = false;
      wrongSound.volume = 0.3;
      wrongSound.play();
      wrongSound.currentTime = 0;
    }
  });

  // 全て正解したら、次の問題に移行する
  if (correctFlag) {
    correctSound.play();
    correctSound.currentTime = 0;
    renderNextSentence();
  }
});

/**
 * タイマーを動かす
 */
function startTimer() {
  timer.innerText = originalTime;
  startTime = new Date();
  setInterval(() => {
    timer.innerText = originalTime - getTimerTime();
    if (timer.innerText <= 0) timeUp();
  }, 1000);
}

/**
 * 時間を取得する
 * @returns
 */
function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}

/**
 * 時間切れの時は再レンダリングする
 */
function timeUp() {
  renderNextSentence();
}

/**
 * 非同期でランダムな文章を取得する
 */
function getRandomSentence() {
  return fetch(RANDOM_SENTENCE_URL_API)
    .then((response) => response.json())
    .then((data) => data.content);
}

/**
 * ランダムな文章を取得して表示する
 */
async function renderNextSentence() {
  const sentence = await getRandomSentence();
  typeDisplay.innerText = '';

  // 文章を1文字ずつ分解し、spanタグを生成する
  let oneText = sentence.split('');
  oneText.forEach((character) => {
    const characterSpan = document.createElement('span');
    characterSpan.innerText = character;
    typeDisplay.appendChild(characterSpan);
  });

  // 入力ボックスの中身を初期化する
  typeInput.value = '';

  startTimer();
}

// 初期読み込み
renderNextSentence();
