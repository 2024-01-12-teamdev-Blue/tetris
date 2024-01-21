// ユーザインターフェースを管理するファイル。
// DOMの更新、キーボード入力の処理、画面描画のロジックが含まれます。

class GameView {
    constructor() {
        this.initialize();
    }

    // ゲームビューの初期設定
    initialize() {
        this.gameBoard = document.getElementById('tetris-container');

        // キーボードイベントの設定
        document.addEventListener('keydown', (event) => this.handleKeyDown(event));
    }

    // キーボード入力に応じたイベント
    handleKeyDown(event) {
        switch (event.keyCode) {
            case 37: // 左矢印キー
                this.emit('left');
                break;
            case 39: // 右矢印キー
                this.emit('right');
                break;
            case 38: // 上矢印キー（回転）
                this.emit('rotate');
                break;
            case 40: // 下矢印キー（ドロップ）
                this.emit('drop');
                break;
        }
    }

    // イベントリスナーの登録
    on(event, callback) {
        document.addEventListener(event, callback);
    }

    // イベントを発火
    emit(event) {
        const customEvent = new Event(event);
        document.dispatchEvent(customEvent);
    }

    // ゲームの状態に基づいて画面を描画
    render(data) {
        // ここにゲーム画面を描画するコードを書く
        // 例: this.gameBoard.innerHTML = ...;
    }

    // ゲームオーバー時の処理
    showGameOver() {
        // ゲームオーバー時の表示を行う
        // 例: this.gameBoard.innerHTML = '<h1>Game Over</h1>';
    }
}

