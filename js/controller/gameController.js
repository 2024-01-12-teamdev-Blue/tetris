// モデルとビューの橋渡しをするファイル。
// gameController.jsにはユーザからの入力に対する反応や、ビューとモデルの更新のコーディネートが含まれます。

const model = new GameModel();
const view = new GameView();

class GameController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        //ゲームの初期状態を設定
        view.render(model.data.grid, model.data.currentTetromino);
        //イベントリスナー追加
        document.addEventListener('keydown', this.handleKeyDown.bind(this)); 
        
        setInterval(() => {
            this.gameLoop();
        }, 1000) // 1000ms毎に更新
    }
    
    gameLoop() {
        this.model.drop();
        console.log('render before:', JSON.stringify(this.model.grid)); 
        this.view.render(this.model.grid, this.model.currentTetromino);
        console.log('render after:', JSON.stringify(this.model.grid));
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
        }
    }
    // 左に動かす
    moveLeft() {
        if(!this.model.detectCollision(-1,0,this.model.currentTetromino)){
        this.model.moveLeft();
        this.view.render(this.model.grid,this.model.currentTetromino);
        }
    }

    // 右に動かす
    moveRight() {
        if(!this.model.detectCollision(1,0,this.model.currentTetromino)){
            this.model.moveRight();
            this.view.render(this.model.grid,this.model.currentTetromino);    
    }

    // テトリミノを回転させる
    //rotate() {
    //    model.rotate();
    //    view.render(model.data);
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