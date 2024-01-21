// モデルとビューの橋渡しをするファイル。
// gameController.jsにはユーザからの入力に対する反応や、ビューとモデルの更新のコーディネートが含まれます。

const model = new GameModel();
const view = new GameView();

class GameController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        view.on('left', () => this.moveLeft());
        view.on('right', () => this.moveRight());
        view.on('rotate', () => this.rotate());
        view.on('drop', () => this.drop());

        //ゲームの初期状態を設定
        view.render(model.data);
    }

    // 左に動かす
    moveLeft() {
        model.moveLeft();
        view.render(model.data);
    }

    // 右に動かす
    moveRight() {
        model.moveRight();
        view.render(model.data);
    }

    // テトリミノを回転させる
    rotate() {
        model.rotate();
        view.render(model.data);
    }

    // テトリミノを下に落とす
    drop() {
        model.drop();
        const isGameOver = model.checkGameOver();
        if (isGameOver) {
            view.showGameOver();
        } else {
            view.render(model.data);
        }
    }
}

// ゲームを起動
const controller = new GameController(model, view);

