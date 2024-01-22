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
               switch (grid[y][x]) {
                    case 0:
                        this.context.fillStyle = '#151515'; // グリッドのセルの色
                        break;
                    case 1:
                        this.context.fillStyle = "#FFFF00"; // Oテトリミノのセルの色
                        break;
                    case 2:
                        this.context.fillStyle = "#00FFFF"; // Iテトリミノのセルの色
                        break;
                    case 3:
                        this.context.fillStyle = "#9400D3"; // Tテトリミノのセルの色
                        break;
                    case 4:
                        this.context.fillStyle = "#FFA500"; // Lテトリミノのセルの色
                        break;
                    case 5:
                        this.context.fillStyle = "#0000FF"; // Jテトリミノのセルの色
                        break;
                    case 6:
                        this.context.fillStyle = "#32CD32"; // Zテトリミノのセルの色
                        break;
                    case 7:
                        this.context.fillStyle = "#FF0000"; // Sテトリミノのセルの色
                        break;
                }   
                this.context.fillRect(x * this.cellSize + 0.5, y * this.cellSize + 0.5, this.cellSize, this.cellSize);
            }
        }
    }

    drawTetromino(tetromino) {
        this.context.fillStyle = tetromino.color; // テトリミノの色
        tetromino.shape.forEach((row, dy) => {
            row.forEach((value, dx) => {
                if (value) {
                    this.context.fillRect(
                        (tetromino.x + dx) * this.cellSize,
                        (tetromino.y + dy) * this.cellSize,
                        this.cellSize,
                        this.cellSize
                    );
                }
            });
        });
    }
}
