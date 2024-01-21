// テトリスのゲームロジックや状態を管理するファイル。
// テトリミノの位置、スコアなどの状態とそれらを変更するロジックが含まれます。

class GameModel {
    constructor() {
        this.grid = this.createEmptyGrid();
        this.currentTetromino = this.createNewTetromino();
        this.score = 0;
    }

    // グリッドを生成（空のゲームフィールド）
    createEmptyGrid() {
        // ここで10x20の2次元配列を生成し、全ての要素を0（空）で初期化
        this.grid = this.createGrid(10, 20);
        // 初期ピースを設定
        this.currentPiece = { x: 3, y: 0, shape: this.createNewTetromino() };
    }

    // width x height のグリッドを作成
    createGrid(width, height) {
        const grid = [];
        for (let y = 0; y < height; y++) {
            grid[y] = [];
            for (let x = 0; x < width; x++) {
                grid[y][x] = 0;
            }
        }
        return grid;
    }

    // 新しいテトリミノを生成
    createNewTetromino() {
        // ランダムにテトリミノを選択し、初期状態で返す
        return [
            [1,1,1,1]
        ];
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

    // テトリミノを落とす
    drop() {
        // テトリミノを一つ下に移動
        this.currentPiece.y += 1 
        // 衝突のチェックもここで行い、ラインが完成していれば消去し、スコアを更新
    }

    // ゲームオーバーのチェック
    checkGameOver() {
        // ゲームオーバーの条件をチェックし、その結果を返す
    }

    // 現在のゲームのデータを取得（ビューに渡すため）
    get data() {
        return {
            grid: this.grid,
            currentTetromino: this.currentTetromino,
            score: this.score
        };
    }
}

