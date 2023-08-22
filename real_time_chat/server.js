// 定数宣言
const PORT = 3000;

// expressのインスタンスを作成する
const express = require('express');
const app = express();

// Serverの生成
const http = require('http');
const server = http.createServer(app);

// socket.ioインスタンスの生成
const io = require('socket.io')(server);

// index
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Clientとの接続
io.on('connection', (socket) => {
  console.log('ユーザーが接続しました。');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

// serverの起動
server.listen(PORT, () => {
  console.log('listening on 3000');
});
