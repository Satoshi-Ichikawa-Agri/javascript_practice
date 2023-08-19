// Google Sheets APIクライアントライブラリをロード
gapi.load('client', initClient);

/**
 *
 */
function initClient() {
  gapi.client
    .init({
      apiKey: 'AIzaSyDENDqAggofoosUwzxlknGH-as9xOKdpzw', // 作成したAPIキー
      discoveryDocs: [
        'https://sheets.googleapis.com/$discovery/rest?version=v4',
      ],
    })
    .then(function () {
      // 初期化が成功したらAPIを使用できるようになります
      // ここでAPIを呼び出すコードを書くことができます
      readSpreadsheetData();
    });
}

/**
 *
 */
function readSpreadsheetData() {
  gapi.client.sheets.spreadsheets.values
    .get({
      spreadsheetId: '1gFJoLwqV3X44023-3qchf6MzMgLkdhpIQu_kST1NoRU', // スプレッドシートのID
      range: 'シート1!A1:I100', // 読み取る範囲
    })
    .then(function (response) {
      var values = response.result.values;
      if (values.length > 0) {
        console.log('Cell A1 value:', values[0][0]);
        console.log('Cell B1 value:', values[0][1]);
      } else {
        console.log('No data found.');
      }
    });
}
