var particleSystem = null;
var particleStage = null;

//  ウィンドウのロードが終わり次第、初期化コードを呼び出す。
window.addEventListener("load", function () {
// Stageオブジェクトを作成します。表示リストのルートになります。
particleStage = new createjs.Stage("ptcCanvas");

// リサイズイベントを検知してリサイズ処理を実行
window.addEventListener("resize", handleResize);
handleResize(); // 起動時にもリサイズしておく

// パーティクルシステム作成します。
particleSystem = new particlejs.ParticleSystem();

// パーティクルシステムの描画コンテナーを表示リストに登録します。
particleStage.addChild(particleSystem.container);

// Particle Develop( http://ics-web.jp/projects/particle-develop/ ) から書きだしたパーティクルの設定を読み込む
particleSystem.importFromJson(
// パラメーターJSONのコピー＆ペースト ここから--
{
"bgColor": "#00000",
"width": 1024,
"height": 661,
"emitFrequency": 1,
"startX": 612,
"startXVariance": 1024,
"startY": 612,
"startYVariance": 1024,
"initialDirection": "270",
"initialDirectionVariance": 45,
"initialSpeed": 1.6,
"initialSpeedVariance": 0.5,
"friction": 0.0005,
"accelerationSpeed": 0,
"accelerationDirection": "270",
"startScale": 0.5,
"startScaleVariance": 1,
"finishScale": 0.5,
"finishScaleVariance": 0.5,
"lifeSpan": 500,
"lifeSpanVariance": 140,
"startAlpha": "1",
"startAlphaVariance": "0",
"finishAlpha": "0.5",
"finishAlphaVariance": "1",
"shapeIdList": [
"flower"
],
"startColor": {
"hue": ptc_hue,
"hueVariance": "0",
"saturation": ptc_satu,
"saturationVariance": "0",
"luminance": ptc_lum,
"luminanceVariance": "0"
},
"blendMode": false,
"alphaCurveType": "0",
"VERSION": "1.0.0"
}
// パラメーターJSONのコピー＆ペースト ここまで---
);

// フレームレートの設定
createjs.Ticker.framerate = 24;
// requestAnimationFrameに従った呼び出し
createjs.Ticker.timingMode = createjs.Ticker.RAF;
// 定期的に呼ばれる関数を登録
createjs.Ticker.addEventListener("tick", handleTick);
});

function handleTick() {
// パーティクルの発生・更新
particleSystem.update();

// 描画を更新する
particleStage.update();
}

// リサイズ処理
function handleResize(event) {
  // 画面幅・高さを取得
  var w = window.innerWidth;
  var h = window.innerHeight;
  // Canvas要素の大きさを画面幅・高さに合わせる
  particleStage.canvas.width = w;
  particleStage.canvas.height = h;

  particleStage.canvas.startX = w/2;
  particleStage.canvas.startXVariance = w;
  particleStage.canvas.startY = h;
  particleStage.canvas.startYVariance = h;

  // 画面更新する
  particleStage.update();
}