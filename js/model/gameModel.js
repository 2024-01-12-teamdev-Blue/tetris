// テトリスのゲームロジックや状態を管理するファイル。
// テトリミノの位置、スコアなどの状態とそれらを変更するロジックが含まれます。

const blocks = [
    //O
    {shape: [[1,1],
             [1,1]],
     color: "#FFFF00"
    },
    //I
    {shape: [[2,2,2,2]],
     color: "#00FFFF"
    },
    //T
    {shape: [[0,3,0],
             [3,3,3]],
     color: "#9400D3"
    },
    //L
    {shape: [[0,0,4],
             [4,4,4]],
     color: "#FFA500"
    },
    //J
    {shape: [[5,0,0],
             [5,5,5]],
     color: "#0000FF"
    },
    //Z
    {shape: [[0,6,6],
             [6,6,0]],
     color: "#32CD32"
    },
    //S
    {shape: [[7,7,0],
             [0,7,7]],
     color: "#FF0000"}
]

class GameModel {
    constructor() {
        this.grid = this.createEmptyGrid();
        this.bag = [];
        this.currentTetromino = this.createNewTetromino();
        this.score = 0;
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
        let block = this.getTetriminoFromBag(); 
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
    getTetriminoFromBag() {
        if (this.bag.length === 0) {
            this.bag = blocks.slice();
            this.shuffle(this.bag);
        }
        console.log(this.bag);
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
            this.currentTetromino = this.createNewTetromino();
        }
        // 衝突のチェックもここで行い、ラインが完成していれば消去し、スコアを更新
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
    checkGameOver() {
        // ゲームオーバーの条件をチェックし、その結果を返す
    }
}

