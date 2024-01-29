const GameView = require('../js/view/gameView');

describe('GameView', () => {
    let canvas;

    // テストのセットアップ
    beforeEach(() => {
        // canvas要素を作成し、idを設定
        canvas = document.createElement('canvas');
        canvas.id = 'cvs';
        document.body.appendChild(canvas);
    });

    // テストのクリーンアップ
    afterEach(() => {
        // canvas要素を削除
        canvas.remove();
    });

    describe('render', () => {
        test('render method should update the canvas', () => {
            const grid = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ];

            const tetromino = {
                shape: [
                    [1, 1],
                    [1, 1],
                ],
                color: '#F92338',
                x: 3,
                y: 5,
            };

            const gameView = new GameView();
            gameView.render(grid, tetromino);
            const canvas = gameView.canvas;

            expect(canvas.width).toBe(300);
            expect(canvas.height).toBe(600);
            expect(gameView.context.fillStyle).toBe('#f92338');
        });
    });

    describe('GameView', () => {
        describe('drawGrid', () => {
            test('drawGrid method should update the canvas with correct colors and positions', () => {
                const grid = [
                    [0, 0, 0, 0, 0],
                    [0, 0, 1, 1, 0],
                    [2, 2, 3, 4, 4],
                    [3, 3, 3, 4, 4],
                    [5, 6, 6, 6, 6],
                    [5, 5, 7, 7, 7]
                ];

                const gameView = new GameView();

                gameView.context.fillRect = jest.fn((x, y, width, height) => {
                    // fillRectが呼び出されるたびにfillStyleをチェック
                    const gridX = Math.floor(x / gameView.cellSize);
                    const gridY = Math.floor(y / gameView.cellSize);
                    const expectedColor = getColorForCell(grid[gridY][gridX]);
                    expect(gameView.context.fillStyle).toBe(expectedColor);
                });
            });
        });
    });

    // セルの色を返すヘルパー関数
    function getColorForCell(cellValue) {
        switch (cellValue) {
            case 0: return '#706c5a';
            case 1: return '#f92338';
            case 2: return '#c973ff';
            case 3: return '#1c76bc';
            case 4: return '#fee356';
            case 5: return '#53d504';
            case 6: return '#36e0ff';
            case 7: return '#f8931d';
            default: return '#000000';
        }
    }


    describe('drawTetromino', () => {
        test('drawTetromino method should update the canvas', () => {
            const tetromino = {
                shape: [
                    [1, 1],
                    [1, 1],
                ],
                color: '#F92338',
                x: 3,
                y: 5,
            };

            const gameView = new GameView();
            gameView.context.fillRect = jest.fn();
            gameView.drawTetromino(tetromino);

            expect(gameView.context.fillStyle).toBe('#f92338');
            expect(gameView.context.fillRect).toHaveBeenCalledTimes(4);
            expect(gameView.context.fillRect).toHaveBeenCalledWith(
                3 * gameView.cellSize + 1.25,
                5 * gameView.cellSize + 1.25,
                gameView.cellSize - 2.5,
                gameView.cellSize - 2.5
            );
        });
    });

    describe('showGameOver', () => {
        test('showGameOver method should display "GAME OVER" on the canvas', () => {
            const gameView = new GameView();
            const fillStyleValues = [];
            // fillStyleをモックして変更を追跡
            Object.defineProperty(gameView.context, 'fillStyle', {
                set: jest.fn((value) => fillStyleValues.push(value))
            });
            gameView.context.fillText = jest.fn();
            gameView.showGameOver();
            const canvas = gameView.canvas;

            expect(fillStyleValues[0]).toBe('rgba(0,0,0,0.75)');
            expect(gameView.context.font).toBe('36px Inconsolata, Courier, monospace');
            expect(gameView.context.textAlign).toBe('center');
            expect(gameView.context.textBaseline).toBe('middle');
            expect(gameView.context.fillText).toHaveBeenCalledWith(
                'GAME OVER',
                canvas.width / 2,
                canvas.height / 2
            );
        });
    });
});