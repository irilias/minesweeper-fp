import {
  createBoard,
  markedTilesCount,
  markTile,
  TILE_STATUSES,
  revealTile,
  checkWin,
  checkLose,
} from "./minesweeper";

describe("#createBoard", () => {
  test("Correctly creates a Board", () => {
    const boardSize = 2;
    const minePositions = [{ positionX: 0, positionY: 0 }];
    const expectedBoard = [
      [
        { x: 0, y: 0, mine: false, status: TILE_STATUSES.HIDDEN },
        { x: 0, y: 1, mine: false, status: TILE_STATUSES.HIDDEN },
      ],
      [
        { x: 1, y: 0, mine: false, status: TILE_STATUSES.HIDDEN },
        { x: 1, y: 1, mine: false, status: TILE_STATUSES.HIDDEN },
      ],
    ];
    expect(createBoard(boardSize, minePositions)).toEqual(expectedBoard);
  });
});

describe("#markedTilesCount", () => {
  describe("Correctly returns the number of marked tiles on the board ", () => {
    test("The board has marked tiles", () => {
      const board = [
        [
          { x: 0, y: 0, mine: false, status: TILE_STATUSES.MARKED },
          { x: 0, y: 1, mine: false, status: TILE_STATUSES.HIDDEN },
        ],
        [
          { x: 1, y: 0, mine: true, status: TILE_STATUSES.MARKED },
          { x: 1, y: 1, mine: false, status: TILE_STATUSES.HIDDEN },
        ],
      ];
      expect(markedTilesCount(board)).toBe(2);
    });
    test("The board has no marked tiles", () => {
      const board = [
        [
          { x: 0, y: 0, mine: false, status: TILE_STATUSES.NUMBER },
          { x: 0, y: 1, mine: false, status: TILE_STATUSES.HIDDEN },
        ],
        [
          { x: 1, y: 0, mine: true, status: TILE_STATUSES.HIDDEN },
          { x: 1, y: 1, mine: false, status: TILE_STATUSES.HIDDEN },
        ],
      ];
      expect(markedTilesCount(board)).toBe(0);
    });
  });
});

describe("#markTile", () => {
  describe("Correctly marks a tile on the board ", () => {
    test("The tile to be marked has a status number", () => {
      const board = [
        [
          { x: 0, y: 0, mine: false, status: TILE_STATUSES.NUMBER },
          { x: 0, y: 1, mine: false, status: TILE_STATUSES.HIDDEN },
        ],
        [
          { x: 1, y: 0, mine: true, status: TILE_STATUSES.HIDDEN },
          { x: 1, y: 1, mine: false, status: TILE_STATUSES.HIDDEN },
        ],
      ];
      expect(markTile(board, { x: 0, y: 0 })).toEqual(board);
    });
    test("The tile to be marked has a status mine", () => {
      const board = [
        [
          { x: 0, y: 0, mine: false, status: TILE_STATUSES.MINE },
          { x: 0, y: 1, mine: false, status: TILE_STATUSES.HIDDEN },
        ],
        [
          { x: 1, y: 0, mine: true, status: TILE_STATUSES.HIDDEN },
          { x: 1, y: 1, mine: false, status: TILE_STATUSES.HIDDEN },
        ],
      ];
      expect(markTile(board, { x: 0, y: 0 })).toEqual(board);
    });
    test("The tile to be marked has a status marked", () => {
      const board = [
        [
          { x: 0, y: 0, mine: false, status: TILE_STATUSES.MARKED },
          { x: 0, y: 1, mine: false, status: TILE_STATUSES.HIDDEN },
        ],
        [
          { x: 1, y: 0, mine: true, status: TILE_STATUSES.HIDDEN },
          { x: 1, y: 1, mine: false, status: TILE_STATUSES.HIDDEN },
        ],
      ];
      const expectedBoard = [
        [
          { x: 0, y: 0, mine: false, status: TILE_STATUSES.HIDDEN },
          { x: 0, y: 1, mine: false, status: TILE_STATUSES.HIDDEN },
        ],
        [
          { x: 1, y: 0, mine: true, status: TILE_STATUSES.HIDDEN },
          { x: 1, y: 1, mine: false, status: TILE_STATUSES.HIDDEN },
        ],
      ];
      expect(markTile(board, { x: 0, y: 0 })).toEqual(expectedBoard);
    });
    test("The tile to be marked has a status hidden", () => {
      const board = [
        [
          { x: 0, y: 0, mine: false, status: TILE_STATUSES.HIDDEN },
          { x: 0, y: 1, mine: false, status: TILE_STATUSES.HIDDEN },
        ],
        [
          { x: 1, y: 0, mine: true, status: TILE_STATUSES.HIDDEN },
          { x: 1, y: 1, mine: false, status: TILE_STATUSES.HIDDEN },
        ],
      ];
      const expectedBoard = [
        [
          { x: 0, y: 0, mine: false, status: TILE_STATUSES.MARKED },
          { x: 0, y: 1, mine: false, status: TILE_STATUSES.HIDDEN },
        ],
        [
          { x: 1, y: 0, mine: true, status: TILE_STATUSES.HIDDEN },
          { x: 1, y: 1, mine: false, status: TILE_STATUSES.HIDDEN },
        ],
      ];
      expect(markTile(board, { x: 0, y: 0 })).toEqual(expectedBoard);
    });
  });
});

describe("#revealTile", () => {
  describe("Correctly reveals a hidden tile on the board ", () => {
    test("The tile to be revealed does not have the status hidden", () => {
      const board = [
        [
          { x: 0, y: 0, mine: false, status: TILE_STATUSES.NUMBER },
          { x: 0, y: 1, mine: false, status: TILE_STATUSES.HIDDEN },
        ],
        [
          { x: 1, y: 0, mine: true, status: TILE_STATUSES.HIDDEN },
          { x: 1, y: 1, mine: false, status: TILE_STATUSES.HIDDEN },
        ],
      ];
      expect(revealTile(board, { x: 0, y: 0 })).toEqual(board);
    });
    test("The tile to be revealed is a hidden mine", () => {
      const board = [
        [
          { x: 0, y: 0, mine: true, status: TILE_STATUSES.HIDDEN },
          { x: 0, y: 1, mine: false, status: TILE_STATUSES.HIDDEN },
        ],
        [
          { x: 1, y: 0, mine: true, status: TILE_STATUSES.HIDDEN },
          { x: 1, y: 1, mine: false, status: TILE_STATUSES.HIDDEN },
        ],
      ];
      const expectedBoard = [
        [
          { x: 0, y: 0, mine: true, status: TILE_STATUSES.MINE },
          { x: 0, y: 1, mine: false, status: TILE_STATUSES.HIDDEN },
        ],
        [
          { x: 1, y: 0, mine: true, status: TILE_STATUSES.HIDDEN },
          { x: 1, y: 1, mine: false, status: TILE_STATUSES.HIDDEN },
        ],
      ];
      expect(revealTile(board, { x: 0, y: 0 })).toEqual(expectedBoard);
    });
    test("The tile to be revealed is a hidden empty tile", () => {
      const board = [
        [
          { x: 0, y: 0, mine: true, status: TILE_STATUSES.HIDDEN },
          { x: 0, y: 1, mine: false, status: TILE_STATUSES.HIDDEN },
          { x: 0, y: 2, mine: false, status: TILE_STATUSES.HIDDEN },
        ],
        [
          { x: 1, y: 0, mine: false, status: TILE_STATUSES.HIDDEN },
          { x: 1, y: 1, mine: false, status: TILE_STATUSES.HIDDEN },
          { x: 1, y: 2, mine: false, status: TILE_STATUSES.HIDDEN },
        ],
        [
          { x: 2, y: 0, mine: false, status: TILE_STATUSES.HIDDEN },
          { x: 2, y: 1, mine: false, status: TILE_STATUSES.HIDDEN },
          { x: 2, y: 2, mine: false, status: TILE_STATUSES.HIDDEN },
        ],
      ];
      const expectedBoard = [
        [
          { x: 0, y: 0, mine: true, status: TILE_STATUSES.HIDDEN },
          {
            x: 0,
            y: 1,
            mine: false,
            status: TILE_STATUSES.NUMBER,
            adjacentMinesCount: 1,
          },
          {
            x: 0,
            y: 2,
            mine: false,
            status: TILE_STATUSES.NUMBER,
            adjacentMinesCount: 0,
          },
        ],
        [
          {
            x: 1,
            y: 0,
            mine: false,
            status: TILE_STATUSES.NUMBER,
            adjacentMinesCount: 1,
          },
          {
            x: 1,
            y: 1,
            mine: false,
            status: TILE_STATUSES.NUMBER,
            adjacentMinesCount: 1,
          },
          {
            x: 1,
            y: 2,
            mine: false,
            status: TILE_STATUSES.NUMBER,
            adjacentMinesCount: 0,
          },
        ],
        [
          {
            x: 2,
            y: 0,
            mine: false,
            status: TILE_STATUSES.NUMBER,
            adjacentMinesCount: 0,
          },
          {
            x: 2,
            y: 1,
            mine: false,
            status: TILE_STATUSES.NUMBER,
            adjacentMinesCount: 0,
          },
          {
            x: 2,
            y: 2,
            mine: false,
            status: TILE_STATUSES.NUMBER,
            adjacentMinesCount: 0,
          },
        ],
      ];
      expect(revealTile(board, { x: 2, y: 2 })).toEqual(expectedBoard);
    });
  });
});

describe("#checkWin", () => {
  describe("Correctly checks if the user has won", () => {
    test("Checks if all the number tiles are revealed", () => {
      const board = [
        [
          { x: 0, y: 0, mine: true, status: TILE_STATUSES.HIDDEN },
          { x: 0, y: 1, mine: false, status: TILE_STATUSES.NUMBER },
        ],
        [
          { x: 1, y: 0, mine: true, status: TILE_STATUSES.MARKED },
          { x: 1, y: 1, mine: false, status: TILE_STATUSES.NUMBER },
        ],
      ];
      expect(checkWin(board)).toBeTruthy();
    });
    test("Not all the number tiles are revealed", () => {
      const board = [
        [
          { x: 0, y: 0, mine: true, status: TILE_STATUSES.HIDDEN },
          { x: 0, y: 1, mine: false, status: TILE_STATUSES.HIDDEN },
        ],
        [
          { x: 1, y: 0, mine: true, status: TILE_STATUSES.MARKED },
          { x: 1, y: 1, mine: false, status: TILE_STATUSES.NUMBER },
        ],
      ];
      expect(checkWin(board)).toBeFalsy();
    });
  });
});

describe("#checkLose", () => {
  describe("Correctly checks if the user has lost", () => {
    test("Checks if at least one tile has the status mine", () => {
      const board = [
        [
          { x: 0, y: 0, mine: true, status: TILE_STATUSES.MINE },
          { x: 0, y: 1, mine: false, status: TILE_STATUSES.NUMBER },
        ],
        [
          { x: 1, y: 0, mine: true, status: TILE_STATUSES.MARKED },
          { x: 1, y: 1, mine: false, status: TILE_STATUSES.NUMBER },
        ],
      ];
      expect(checkLose(board)).toBeTruthy();
    });
  });
});
