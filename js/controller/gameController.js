// モデルとビューの橋渡しをするファイル。
// gameController.jsにはユーザからの入力に対する反応や、ビューとモデルの更新のコーディネートが含まれます。

const model = new GameModel();
const view = new GameView();

class GameController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.interval = 1000;
        this.gameInterval = null;
        this.softDropFlag = false;
        this.isGameOver = false;

        //ゲームの初期状態を設定
        view.render(model.data.grid, model.data.currentTetromino, model.data.nextTetromino);
        //イベントリスナー追加
        document.addEventListener('keydown', this.handleKeyDown.bind(this)); 
        document.addEventListener('keyup', this.handleKeyUp.bind(this));
        document.getElementById('newgame').addEventListener('click', () => this.newGameStart());
        this.gameLoop();
    }
    
    gameLoop() {
        if (this.gameInterval) {
            clearInterval(this.gameInterval);
        }
        this.gameInterval = setInterval(() => {
            this.isGameOver = this.model.isGameOver;
            if (this.isGameOver) {
                clearInterval(this.gameInterval);
                this.view.showGameOver();
                return;
            }
            this.model.drop();
            this.view.render(this.model.grid, this.model.currentTetromino,this.model.nextTetromino);
        }, this.interval);
    }

    // キー入力時の動き
    handleKeyDown(event){
        if (this.isGameOver) {
            return;
        }
        switch(event.key){
            case 'ArrowLeft':
                this.moveLeft();
                break;           
            case 'ArrowRight':
                this.moveRight();
                break;       
            case 'ArrowDown':
                if (!this.softDropFlag) {
                    this.interval /= 20;
                    this.softDropFlag = true;
                    this.gameLoop();
                }
                break;
            case 'ArrowUp' :
                this.rotate();
                break;
        }
    }

    handleKeyUp(event){
        if (this.isGameOver) {
            return;
        }
        switch(event.key){
            case 'ArrowDown':
                this.interval = 1000;
                this.softDropFlag = false;
                this.gameLoop();
                break;
        }
    }

    // NewGameボタンクリック時の動き
    newGameStart(){
        this.model = new GameModel();
        this.isGameOver = false;
        this.softDropFlag = false;
        this.interval = 1000;
        this.gameLoop();
    }

    // 左に動かす
    moveLeft() {
        this.model.moveLeft();
        this.view.render(this.model.grid,this.model.currentTetromino,this.model.nextTetromino);
        }
    

    // 右に動かす
    moveRight() {
        this.model.moveRight();
        this.view.render(this.model.grid,this.model.currentTetromino,this.model.nextTetromino);    
        }

    // テトリミノを回転させる
    rotate() {
        this.model.rotate();
        this.view.render(this.model.grid,this.model.currentTetromino,this.model.nextTetromino);
    }

    // テトリミノを下に落とす
    drop() {
        model.drop();
        const isGameOver = model.checkGameOver();
        if (isGameOver) {
            this.view.showGameOver();
        } else {
            this.view.render(model.data);
        }
    }
}

// ゲームを起動
const controller = new GameController(model, view);