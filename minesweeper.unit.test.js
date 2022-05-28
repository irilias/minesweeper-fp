import { createBoard } from "./minesweeper.js";
import { TILE_STATUSES } from "./minesweeper.js";
describe("#createBoard", () => {
  test("Correctly creates a 2D object array ", () => {
    const boardSize = 5;
    const minePositions = [
      { x: 0, y: 2 },
      { x: 2, y: 0 },
      { x: 3, y: 3 },
    ];
    const mines = getMines(minePositions);
    const board = createBoard(boardSize, minePositions).flatMap((x) => x);
    expect(board.length).toBe(boardSize * boardSize);
    expect(board).toEqual(expect.arrayContaining(mines));
    expect(board.every((x) => x.status === TILE_STATUSES.HIDDEN)).toBe(true);
  });
});

function getMines(minePositions) {
  return minePositions.map((position) => ({
    x: position.x,
    y: position.y,
    mine: true,
    status: TILE_STATUSES.HIDDEN,
  }));
}
