// ユーザインターフェースを管理するファイル。
// DOMの更新、キーボード入力の処理、画面描画のロジックが含まれます。

class GameView {
    constructor() {
        this.canvas = document.getElementById('cvs');
        // 引数を"2d"とすることで2Dグラフィックの描画に特化したメソッドやプロパティを持つオブジェクトを取得
        this.context = this.canvas.getContext('2d');

        this.cellSize = 30; // グリッドのセルのサイズ（ピクセル）
        this.gridRows = 20; // グリッドの行数
        this.gridCols = 10; // グリッドの列数

        // canvasのサイズ
        this.canvas.width = this.cellSize * this.gridCols
        this.canvas.height = this.cellSize * this.gridRows
    }

    render(grid, currentTetromino) {
        // Canvasをクリア
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // グリッドの描画
        this.drawGrid(grid);

        // 現在のテトリミノの描画
        this.drawTetromino(currentTetromino);
    }

    drawGrid(grid) {
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                if (grid[y][x] === 0) {
                    // 空のセルの場合は暗い色で描画
                    this.context.fillStyle = '#70605A'; // グリッドのセルの色
                } else {
                    // テトリミノのセルの場合は明るい色で描画
                    this.context.fillStyle = '#FFFF00'; // テトリミノのセルの色
                }
                this.context.fillRect(x * this.cellSize + 1.25, y * this.cellSize + 1.25, this.cellSize - 2.5, this.cellSize - 2.5);
            }
        }
    }

    drawTetromino(tetromino) {
        this.context.fillStyle = '#FFFF00'; // テトリミノの色
        tetromino.shape.forEach((row, dy) => {
            row.forEach((value, dx) => {
                if (value) {
                    this.context.fillRect(
                        (tetromino.x + dx) * this.cellSize + 1.25,
                        (tetromino.y + dy) * this.cellSize + 1.25,
                        this.cellSize - 2.5,
                        this.cellSize - 2.5
                    );
                }
            });
        });
    }
}
