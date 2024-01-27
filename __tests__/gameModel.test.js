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
            expect(gameModel.bag.length).toBe(6);
            for (let i = 0; i < 7; i++) {
                const tetromino = gameModel.getTetrominoFromBag();
                if (i === 6) {
                    expect(gameModel.bag.length).toBe(6);
                }else {
                    expect(gameModel.bag.length).toBe(5-i);
                }
                expect(tetromino.shape).toBeDefined();
                expect(tetromino.color).toBeDefined();
            }
        });
    });

    describe('drop', () => {
        test('should drop tetromino', () => {
            const gameModel = new GameModel();
            const tetromino = gameModel.createNewTetromino();
            gameModel.drop(tetromino);
            expect(tetromino.y).toBe(1);
        });
    });

    describe('detectCollision', () => {
        test('should detect collision', () => {
            const gameModel = new GameModel();
            const tetromino = gameModel.currentTetromino;
            expect(gameModel.detectCollision(tetromino)).toBeFalsy();
            tetromino.y = 19;
            expect(gameModel.detectCollision(tetromino)).toBeTruthy();
        });
    });
});