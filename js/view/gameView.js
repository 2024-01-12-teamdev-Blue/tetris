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
                        this.context.fillStyle = "#706C5A"; // グリッドのセルの色
                        break;
                    case 1:
                        this.context.fillStyle = "#F92338"; // Oテトリミノのセルの色
                        break;
                    case 2:
                        this.context.fillStyle = "#C973FF"; // Iテトリミノのセルの色
                        break;
                    case 3:
                        this.context.fillStyle = "#1C76BC"; // Tテトリミノのセルの色
                        break;
                    case 4:
                        this.context.fillStyle = "#FEE356"; // Lテトリミノのセルの色
                        break;
                    case 5:
                        this.context.fillStyle = "#53D504"; // Jテトリミノのセルの色
                        break;
                    case 6:
                        this.context.fillStyle = "#36E0FF"; // Zテトリミノのセルの色
                        break;
                    case 7:
                        this.context.fillStyle = "#F8931D"; // Sテトリミノのセルの色
                        break;
                }   
                this.context.fillRect(x * this.cellSize + 1.25, y * this.cellSize + 1.25, this.cellSize - 2.5, this.cellSize - 2.5);
            }
        }
    }

    drawTetromino(tetromino) {
        this.context.fillStyle = tetromino.color; // テトリミノの色
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

    // ゲームオーバーの表示
    showGameOver() {
        this.context.fillStyle = 'rgba(0,0,0,0.75)';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = '#fff';
        this.context.font = '36px Inconsolata, Courier, monospace';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2);
    }
}

module.exports = GameView;