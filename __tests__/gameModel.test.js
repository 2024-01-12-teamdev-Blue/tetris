const GameModel = require('../js/model/gameModel.js');

describe('GameModel', () => {
    describe('createEmptyGrid', () => {
        test('should return 10x20 grid filled with 0', () => {
            const gameModel = new GameModel();
            const grid = gameModel.createEmptyGrid();
            expect(grid.length).toBe(20);
            expect(grid[0].length).toBe(10);
            for (let y = 0; y < 20; y++) {
                for (let x = 0; x < 10; x++) {
                    expect(grid[y][x]).toBe(0);
                }
            }
        });
    });

    describe('createNewTetromino', () => {
        test('should return new tetromino', () => {
            const gameModel = new GameModel();
            for (let i = 0; i < 7; i++) {
                const tetromino = gameModel.createNewTetromino();
                if (tetromino.shape[0][0] === 1) {
                    expect(tetromino.x).toBe(4);
                }else {
                    expect(tetromino.x).toBe(3);
                }
                expect(tetromino.y).toBe(0);
                expect(tetromino.shape).toBeDefined();
                expect(tetromino.color).toBeDefined();
            }
        });
    });

    describe('shuffle', () => {
        test('should return shuffled array', () => {
            const gameModel = new GameModel();
            const array = ['O','I', 'T', 'L', 'J', 'S', 'Z'];
            const shuffledArray = gameModel.shuffle(array.slice()); // 元の配列のコピーをシャッフル

            // シャッフルされた配列が元の配列と異なるかチェック
            let different = false;
            for (let i = 0; i < array.length; i++) {
                if (array[i] !== shuffledArray[i]) {
                    different = true;
                    break;
                }
            }
            expect(different).toBeTruthy(); // 少なくとも1つの要素が異なることを期待

            // シャッフルされた配列が元の配列の要素をすべて含んでいるかチェック
            expect(shuffledArray.sort()).toEqual(array.sort());
        });
    });

    describe('getTetrominoFromBag', () => {
        test('should return tetromino from bag', () => {
            const gameModel = new GameModel();
            expect(gameModel.bag.length).toBe(5);
            for (let i = 0; i < 7; i++) {
                const tetromino = gameModel.getTetrominoFromBag();
                if (i === 5) {
                    expect(gameModel.bag.length).toBe(6);
                }else if (i === 6) {
                    expect(gameModel.bag.length).toBe(5);
                }else {
                    expect(gameModel.bag.length).toBe(4-i);
                }
                expect(tetromino.shape).toBeDefined();
                expect(tetromino.color).toBeDefined();
            }
        });
    });

    describe('drop', () => {
        test('should drop tetromino', () => {
            const gameModel = new GameModel();
            const initialY = gameModel.currentTetromino.y;
            gameModel.drop();
            expect(gameModel.currentTetromino.y).toBe(initialY + 1);
        });

        test('should fix tetromino and create new tetromino when collision detected', () => {
            const gameModel = new GameModel();
            gameModel.detectCollision = jest.fn().mockReturnValue(true);
            gameModel.fixTetromino = jest.fn();
            gameModel.checkLines = jest.fn();
            gameModel.updateTetriminos = jest.fn();
            gameModel.checkGameOver = jest.fn().mockReturnValue(false);

            gameModel.drop();

            expect(gameModel.fixTetromino).toHaveBeenCalled();
            expect(gameModel.checkLines).toHaveBeenCalled();
            expect(gameModel.updateTetriminos).toHaveBeenCalled();
        });

        test('should set isGameOver to true when game over', () => {
            const gameModel = new GameModel();
            gameModel.detectCollision = jest.fn().mockReturnValue(true);
            gameModel.fixTetromino = jest.fn();
            gameModel.checkLines = jest.fn();
            gameModel.createNewTetromino = jest.fn().mockReturnValue('newTetromino');
            gameModel.checkGameOver = jest.fn().mockReturnValue(true);

            gameModel.drop();

            expect(gameModel.isGameOver).toBeTruthy();
        });
    });

    describe('detectCollision', () => {
        test('should return false when collision not detected', () => {
            const gameModel = new GameModel();
            expect(gameModel.detectCollision(0, 0, gameModel.currentTetromino)).toBeFalsy();
        });

        // 下限
        test('should return true when collision detected', () => {
            const gameModel = new GameModel();
            expect(gameModel.detectCollision(0, 20, gameModel.currentTetromino)).toBeTruthy();
        });

        // 左端
        test('should return true when collision detected', () => {
            const gameModel = new GameModel();
            if (gameModel.currentTetromino.shape[0][0] === 1) {
                expect(gameModel.detectCollision(-5, 0, gameModel.currentTetromino)).toBeTruthy();
            }else {
                expect(gameModel.detectCollision(-4, 0, gameModel.currentTetromino)).toBeTruthy();
            }
        });
        
        // 右端
        test('should return true when collision detected', () => {
            const gameModel = new GameModel();
            expect(gameModel.detectCollision(7, 0, gameModel.currentTetromino)).toBeTruthy();
        });

        // 下のブロックに衝突
        test('should return true when collision detected', () => {
            const gameModel = new GameModel();
            gameModel.grid[1] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
            gameModel.grid[2] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
            expect(gameModel.detectCollision(0, 1, gameModel.currentTetromino)).toBeTruthy();
        });

        // 左のブロックに衝突
        test('should return true when collision detected', () => {
            const gameModel = new GameModel();
            for (let y = 0; y < 20; y++) {
                gameModel.grid[y][2] = 1;
                gameModel.grid[y][3] = 1;
            }
            expect(gameModel.detectCollision(-1, 0, gameModel.currentTetromino)).toBeTruthy();
        });

        // 右のブロックに衝突
        test('should return true when collision detected', () => {
            const gameModel = new GameModel();
            for (let y = 0; y < 20; y++) {
                gameModel.grid[y][6] = 1;
                gameModel.grid[y][7] = 1;
            }
            expect(gameModel.detectCollision(1, 0, gameModel.currentTetromino)).toBeTruthy();
        });

        // 初期位置で衝突
        test('should return true when collision detected', () => {
            const gameModel = new GameModel();
            gameModel.grid[0] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
            gameModel.grid[1] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
            expect(gameModel.detectCollision(0, 0, gameModel.currentTetromino)).toBeTruthy();
        });
    });

    describe('fixTetromino', () => {
        test('should fix tetromino', () => {
            const gameModel = new GameModel();
            gameModel.currentTetromino = {
                shape: [
                    [1, 1],
                    [1, 1]
                ],
                x: 4,
                y: 5
            };
            gameModel.grid = [
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

            gameModel.fixTetromino();

            expect(gameModel.grid).toEqual([
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
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
            ]);
        });
    });

    describe('moveLeft', () => {
        test('should move tetromino to left', () => {
            const gameModel = new GameModel();
            const initialX = gameModel.currentTetromino.x;
            gameModel.moveLeft();
            expect(gameModel.currentTetromino.x).toBe(initialX - 1);
        });

        test('should not move tetromino to left when collision detected', () => {
            const gameModel = new GameModel();
            gameModel.detectCollision = jest.fn().mockReturnValue(true);
            const initialX = gameModel.currentTetromino.x;
            gameModel.moveLeft();
            expect(gameModel.currentTetromino.x).toBe(initialX);
        });
    });

    describe('moveRight', () => {
        test('should move tetromino to right', () => {
            const gameModel = new GameModel();
            const initialX = gameModel.currentTetromino.x;
            gameModel.moveRight();
            expect(gameModel.currentTetromino.x).toBe(initialX + 1);
        });

        test('should not move tetromino to right when collision detected', () => {
            const gameModel = new GameModel();
            gameModel.detectCollision = jest.fn().mockReturnValue(true);
            const initialX = gameModel.currentTetromino.x;
            gameModel.moveRight();
            expect(gameModel.currentTetromino.x).toBe(initialX);
        });
    });

    describe('rotate', () => {
        test('should rotate tetromino', () => {
            const gameModel = new GameModel();
            gameModel.currentTetromino = {
                shape: [
                    [0, 1, 0],
                    [1, 1, 1],
                    [0, 0, 0]
                ],
                x: 0,
                y: 0
            };

            gameModel.rotate();

            expect(gameModel.currentTetromino.shape).toEqual([
                [0, 1, 0],
                [0, 1, 1],
                [0, 1, 0]
            ]);
        });

        test('should not rotate tetromino when collision detected', () => {
            const gameModel = new GameModel();
            gameModel.currentTetromino = {
                shape: [
                    [0, 1, 0],
                    [1, 1, 1],
                    [0, 0, 0]
                ],
                x: 0,
                y: 0
            };
            gameModel.detectCollision = jest.fn().mockReturnValue(true);

            gameModel.rotate();

            expect(gameModel.currentTetromino.shape).toEqual([
                [0, 1, 0],
                [1, 1, 1],
                [0, 0, 0]
            ]);
        });
    });

    describe('checkGameOver', () => {
        test('should return true when game over', () => {
            const gameModel = new GameModel();
            const tetromino = {
                x: 4,
                y: 0,
                shape: [
                    [1, 1],
                    [1, 1]
                ],
                color: '#F92338'
            };
            gameModel.grid[0] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
            gameModel.grid[1] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
            expect(gameModel.checkGameOver(tetromino)).toBeTruthy();
        });

        test('should return false when game not over', () => {
            const gameModel = new GameModel();
            const tetromino = {
                x: 4,
                y: 0,
                shape: [
                    [1, 1],
                    [1, 1]
                ],
                color: '#F92338'
            };
            expect(gameModel.checkGameOver(tetromino)).toBeFalsy();
        });
    });

    describe('removeLine', () => {
        test('should remove line', () => {
            const gameModel = new GameModel();
            gameModel.grid = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
                [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
                [4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
            ];

            gameModel.removeLine(3);
            expect(gameModel.grid).toEqual([
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
                [4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
            ]);
        });
    });

    describe('isLineComplete', () => {
        test('should return true when line complete', () => {
            const gameModel = new GameModel();
            gameModel.grid[0] = [1, 2, 3, 4, 5, 6, 7, 1, 2, 3];
            expect(gameModel.isLineComplete(0)).toBeTruthy();
        });

        test('should return false when line not complete', () => {
            const gameModel = new GameModel();
            gameModel.grid[0] = [1, 0, 3, 4, 5, 6, 7, 1, 2, 3];
            expect(gameModel.isLineComplete(0)).toBeFalsy();
        });
    });

    describe('checkLines', () => {
        test('should remove line and return number of lines removed', () => {
            const gameModel = new GameModel();
            gameModel.grid = [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 0], 
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
                [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
                [4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
            ];

            const lines = gameModel.checkLines();
            expect(lines).toBe(2);
            expect(gameModel.grid).toEqual([
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 0], 
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
            ]);
        });
    });
});