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

        //ゲームの初期状態を設定
        view.render(model.data.grid, model.data.currentTetromino);
        //イベントリスナー追加
        document.addEventListener('keydown', this.handleKeyDown.bind(this)); 
        document.addEventListener('keyup', this.handleKeyUp.bind(this));
        
        this.gameLoop();
    }
    
    gameLoop() {
        if (this.gameInterval) {
            clearInterval(this.gameInterval);
        }

        this.gameInterval = setInterval(() => {
            this.model.drop();
            this.view.render(this.model.grid, this.model.currentTetromino);
        }, this.interval);
    }

    // キー入力時の動き
    handleKeyDown(event){
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
        switch(event.key){
            case 'ArrowDown':
                this.interval = 1000;
                this.softDropFlag = false;
                this.gameLoop();
                break;
        }
    }

    // 左に動かす
    moveLeft() {
        this.model.moveLeft();
        this.view.render(this.model.grid,this.model.currentTetromino);
        }
    

    // 右に動かす
    moveRight() {
        this.model.moveRight();
        this.view.render(this.model.grid,this.model.currentTetromino);    
        }

    // テトリミノを回転させる
    rotate() {
        model.rotate();
        this.view.render(this.model.grid,this.model.currentTetromino);
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