// テトリスのゲームロジックや状態を管理するファイル。
// テトリミノの位置、スコアなどの状態とそれらを変更するロジックが含まれます。

const blocks = [
    //O
    {shape: [[1,1],
             [1,1]],
     color: "#F92338"
    },
    //I
    {shape: [[2,2,2,2]],
     color: "#C973FF"
    },
    //T
    {shape: [[0,3,0],
             [3,3,3]],
     color: "#1C76BC"
    },
    //L
    {shape: [[0,0,4],
             [4,4,4]],
     color: "#FEE356"
    },
    //J
    {shape: [[5,0,0],
             [5,5,5]],
     color: "#53D504"
    },
    //Z
    {shape: [[0,6,6],
             [6,6,0]],
     color: "#36E0FF"
    },
    //S
    {shape: [[7,7,0],
             [0,7,7]],
     color: "#F8931D"}
]

class GameModel {
    constructor() {
        this.grid = this.createEmptyGrid();
        this.bag = [];
        this.currentTetromino = this.createNewTetromino();
        this.score = 0;
        this.isGameOver = false;
    }

    // 現在のゲームのデータを取得（ビューに渡すため）
    get data() {
        return {
            grid: this.grid,
            currentTetromino: this.currentTetromino,
            score: this.score
        };
    }

    // 空のグリッド
    createEmptyGrid() {
        // 10x20の2次元配列を生成し、全ての要素を0（空）で初期化
        const grid = [];
        for (let y = 0; y < 20; y++) {
            grid[y] = [];
            for (let x = 0; x < 10; x++) {
                grid[y][x] = 0;
            }
        }
        return grid;
    }

    // 新しいテトリミノを生成
    createNewTetromino() {
        // ランダムにテトリミノを選択し、初期状態で返す
        let block = this.getTetrominoFromBag(); 
        return {
            x: Math.floor(10/2) - Math.ceil(block.shape[0].length /2),
            y: 0,
            shape: block.shape,
            color: block.color
        };
    }
    
    // 配列をランダムに並び替え
    shuffle(array) {
        for (let i = array.length - 1; i >= 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // バッグからテトリミノを一つ取り出す
    getTetrominoFromBag() {
        if (this.bag.length === 0) {
            this.bag = blocks.slice();
            this.shuffle(this.bag);
        }
        return this.bag.pop();
    }

    // テトリミノを落とす
    drop() {
        if (!this.detectCollision(0, 1, this.currentTetromino)) {
            // テトリミノを一つ下に移動
            this.currentTetromino.y++; 
        } else {
            // テトリミノを固定して、新しいテトリミノを生成
            this.fixTetromino();
            const clearedLines = this.checkLines();
            if(clearedLines > 0){
                this.plusScoreWhenLineDisapear(clearedLines);
            }
            this.currentTetromino = this.createNewTetromino();
            this.checkLines();
            let tetromino = this.currentTetromino;
            if (this.checkGameOver(tetromino)) {
                this.isGameOver = true;
            }else{
                this.currentTetromino = tetromino;
            }
        }
    }

    // 衝突チェック
    detectCollision(xOffset, yOffset, tetromino) {
        for (let y = 0; y < tetromino.shape.length; y++) {
            for (let x = 0; x < tetromino.shape[y].length; x++) {
                if (!tetromino.shape[y][x]) {
                    continue;
                }
                let newX = tetromino.x + x + xOffset;
                let newY = tetromino.y + y + yOffset;
                if (newX < 0 || newX >= 10 || newY >= 20) {
                    return true;
                }
                if (newY < 0) {
                    continue;
                }
                if (newY >= 0 && this.grid[newY] && this.grid[newY][newX]) {
                    return true;
                }
            }
        }
        return false;
    }

    // 落ち切ったテトリミノの固定
    fixTetromino() {
        this.currentTetromino.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    this.grid[y + this.currentTetromino.y][x + this.currentTetromino.x] = value;
                }
            });
        });
    }

    // テトリミノを左に移動,衝突のチェックもここで行う
    moveLeft() {
	if(!this.detectCollision(-1,0,this.currentTetromino)){
		this.currentTetromino.x--;
	    }
    }

    // テトリミノを右に移動,衝突のチェックもここで行う
    moveRight() {
	if(!this.detectCollision(1,0,this.currentTetromino)){
		this.currentTetromino.x++;
	    } 
    }

    // テトリミノを回転
    rotate() {
        // 現在のテトリミノを回転するロジック
        // 衝突のチェックもここで行う
        const rows = this.currentTetromino.shape.length;
        const cols = this.currentTetromino.shape[0].length;
        const rotatedTetromino = [];
        for(let y=0; y<cols; y++){
            rotatedTetromino[y] = [];
            for(let x=0; x<rows; x++){
                rotatedTetromino[y][x] = this.currentTetromino.shape[rows-1-x][y];
            }
        }
        if(!this.detectCollision(0,0,{...this.currentTetromino,shape: rotatedTetromino})){
            this.currentTetromino.shape = rotatedTetromino;
            } 
    }


    // ゲームオーバーのチェック
    checkGameOver(tetromino) {
        return this.detectCollision(0,0,tetromino);
    }

    // 任意のラインを消去
    removeLine(y) {
        this.grid.splice(y, 1);
        this.grid.unshift(Array(10).fill(0));
    }

    // 指定された行が完全に埋まっているかチェック
    isLineComplete(y) {
        for (let x = 0; x < this.grid[y].length; x++) {
            if (this.grid[y][x] === 0) {
                return false;
            }
        }
        return true;
    }

    // 埋まった行のチェック/消去した行数のカウント
    checkLines() {
        let lines = 0;
        for (let y = 0; y < this.grid.length; y++) {
            if (this.isLineComplete(y)) {
                this.removeLine(y);
                lines++;
            }
        }
        return lines;
    }
    // 消したラインの数に応じたスコアを提示する
    calculateScore(lines){
        const linesScore = [0,100,300,500,800];
        return linesScore[lines];
    }
    // ラインが消えた時にスコアに点数を加算する
    plusScoreWhenLineDisapear(lines){
        const saving = this.calculateScore(lines);
        this.score += saving;
        document.getElementById('score_value').innerText = this.score;
    }
}

module.exports = GameModel;