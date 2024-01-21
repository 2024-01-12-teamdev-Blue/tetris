// テトリスのゲームロジックや状態を管理するファイル。
// テトリミノの位置、スコアなどの状態とそれらを変更するロジックが含まれます。

class GameModel {
    constructor() {
        this.grid = this.createEmptyGrid();
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
        const blocks = [
            //O
            {shape: [[1,1],
                     [1,1]],
             color: "yellow"
            },
            //I
            {shape: [[1,1,1,1]],
             color: "ligthblue"
            },
            //T
            {shape: [[0,1,0],
                     [1,1,1]],
             color: "purple"
            },
            //L
            {shape: [[0,0,1],
                     [1,1,1]],
             color: "olange"
            },
            //J
            {shape: [[1,0,0],
                     [1,1,1]],
             color: "darkblue"
            },
            //Z
            {shape: [[0,1,1],
                     [1,1,0]],
             color: "green"
            },
            //S
            {shape: [[1,1,0],
                     [0,1,1]],
             color: "red"}
        ]
        const block = blocks[Math.floor(Math.random()*blocks.length)];
        return {
            x: Math.floor(10/2) - Math.ceil(block.shape[0].length /2),
            y: 0,
            shape: block.shape,
            color: block.color
        };
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
            for (let x = 0; x < tetromino.shape.length; x++) {
                if (!tetromino.shape[y][x]) {
                    continue
                }
                let newX = tetromino.x + x + xOffset;
                let newY = tetromino.y + y + yOffset;
                if (newX < 0 || newX >= 10 || newY >= 20) {
                    return true;
                }
                if (newY < 0) {
                    continue;
                }
                if (this.grid[newY] && this.grid[newY][newX]) {
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

    // テトリミノを左に移動
    moveLeft() {
        // 現在のテトリミノを左に移動するロジック
        // 衝突のチェックもここで行う
    }

    // テトリミノを右に移動
    moveRight() {
        // 現在のテトリミノを右に移動するロジック
        // 衝突のチェックもここで行う
    }

    // テトリミノを回転
    rotate() {
        // 現在のテトリミノを回転するロジック
        // 衝突のチェックもここで行う
    }


    // ゲームオーバーのチェック
    checkGameOver() {
        // ゲームオーバーの条件をチェックし、その結果を返す
    }
}

