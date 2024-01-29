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

        this.nextBlockCanvas = document.getElementById('nextBlockCanvas');
        this.nextBlockContext = this.nextBlockCanvas.getContext('2d');
        this.nextBlockCanvas.width = this.cellSize * 4;
        this.nextBlockCanvas.height = this.cellSize * 4;
    }

    render(grid, currentTetromino, nextTetromino) {
        // Canvasをクリア
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
        // グリッドの描画
        this.drawGrid(grid);

        // 現在のテトリミノの描画
        this.drawTetromino(currentTetromino);

        // 次のテトリミノを表示するCanvasをクリア
        this.nextBlockContext.clearRect(0, 0, this.nextBlockCanvas.width, this.nextBlockCanvas.height);

        //次のテトリミノの描画
        this.drawNextTetromino(nextTetromino);
    }

    drawGrid(grid) {
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
               switch (grid[y][x]) {
                    case 0:
                        this.context.fillStyle = '#706C5A'; // グリッドのセルの色
                        this.nextBlockContext.fillStyle = '#706C5A'; // 次のテトリミノのグリッドのセルの色
                        break;
                    case 1:
                        this.context.fillStyle = "#F92338"; // Oテトリミノのセルの色
                        this.nextBlockContext.fillStyle = "#F92338"; // Oテトリミノのセルの色
                        break;
                    case 2:
                        this.context.fillStyle = "#C973FF"; // Iテトリミノのセルの色
                        this.nextBlockContext.fillStyle = "#C973FF"; // Iテトリミノのセルの色
                        break;
                    case 3:
                        this.context.fillStyle = "#1C76BC"; // Tテトリミノのセルの色
                        this.nextBlockContext.fillStyle = "#1C76BC"; 
                        break;
                    case 4:
                        this.context.fillStyle = "#FEE356"; // Lテトリミノのセルの色
                        this.nextBlockContext.fillStyle = "#FEE356"; // Lテトリミノのセルの色
                        break;
                    case 5:
                        this.context.fillStyle = "#53D504"; // Jテトリミノのセルの色
                        this.nextBlockContext.fillStyle = "#53D504"; // Jテトリミノのセルの色
                        break;
                    case 6:
                        this.context.fillStyle = "#36E0FF"; // Zテトリミノのセルの色
                        this.nextBlockContext.fillStyle = "#36E0FF"; // Zテトリミノのセルの色
                        break;
                    case 7:
                        this.context.fillStyle = "#F8931D"; // Sテトリミノのセルの色
                        this.nextBlockContext.fillStyle = "#F8931D"; // Sテトリミノのセルの色
                        break;
                }   
                this.context.fillRect(x * this.cellSize + 1.25, y * this.cellSize + 1.25, this.cellSize - 2.5, this.cellSize - 2.5);
                this.nextBlockContext.fillRect(x * this.cellSize + 1.25, y * this.cellSize + 1.25, this.cellSize - 2.5, this.cellSize - 2.5);
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

    drawNextTetromino(nextTetromino) {
        this.nextBlockContext.fillStyle = nextTetromino.color; // 次のテトリミノの色

        const offsetX = (4 - nextTetromino.shape[0].length) / 2;
        const offsetY = (4 - nextTetromino.shape.length) / 2;

        nextTetromino.shape.forEach((row, dy) => {
            row.forEach((value, dx) => {
                if (value) {
                    this.nextBlockContext.fillRect(
                        (offsetX + dx) * this.cellSize + 1.25,
                        (offsetY + dy) * this.cellSize + 1.25,
                        this.cellSize - 2.5,
                        this.cellSize -2.5
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