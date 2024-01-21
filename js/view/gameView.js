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
    render(grid, currentPiece) {
        // ここにゲーム画面を描画するコードを書く
        this.gameBoard.innerHTML = this.createBoardHtml(grid, currentPiece)
    }

    // ゲーム画面の作成
    createBoardHtml(grid, currentPiece) {
        let html = '<table>';
        for (let y = 0; y < grid.length; y++) {
            const isCurrentPiece = currentPiece.shape.some(
                (row, dy) => row.some((value, dx) => value && currentPiece.x + dx === x && currentPiece.y + dy === y)
            );
            html += `<td class="${isCurrentPiece ? 'piece' : ''}"></td>`;
        }
    }

    // ゲームオーバー時の処理
    showGameOver() {
        // ゲームオーバー時の表示を行う
    }
}

