// Logic
import { times, range } from "lodash/fp";
export const TILE_STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked",
};

export function createBoard(boardSize, minePositions) {
  return times((x) => {
    return times((y) => {
      return {
        x,
        y,
        mine: minePositions.some(positionMatch.bind(null, { x, y })),
        status: TILE_STATUSES.HIDDEN,
        adjacentMineCount: null,
      };
    }, boardSize);
  }, boardSize);
}

export function markTile(board, { x, y }) {
  const tile = board[x][y];
  if (
    tile.status !== TILE_STATUSES.HIDDEN &&
    tile.status !== TILE_STATUSES.MARKED
  ) {
    return board;
  }

  if (tile.status === TILE_STATUSES.MARKED) {
    return replaceTile(
      board,
      { x, y },
      { ...tile, status: TILE_STATUSES.HIDDEN }
    );
  } else {
    return replaceTile(
      board,
      { x, y },
      { ...tile, status: TILE_STATUSES.MARKED }
    );
  }
}

export function revealTile(board, { x, y }) {
  const tile = board[x][y];
  if (tile.status !== TILE_STATUSES.HIDDEN) {
    return board;
  }
  if (tile.mine) {
    return replaceTile(
      board,
      { x, y },
      { ...tile, status: TILE_STATUSES.MINE }
    );
  }
  const adjacentTiles = nearbyTiles(board, tile);
  const mines = adjacentTiles.filter((t) => t.mine);
  let newBoard = replaceTile(
    board,
    { x, y },
    { ...tile, status: TILE_STATUSES.NUMBER, adjacentMineCount: mines.length }
  );
  if (mines.length === 0) {
    return adjacentTiles.reduce((b, tile) => {
      return revealTile(b, tile);
    }, newBoard);
  }
  return newBoard;
}

export function markedTilesCount(board) {
  return board.reduce((count, row) => {
    return (
      count + row.filter((tile) => tile.status === TILE_STATUSES.MARKED).length
    );
  }, 0);
}
export function checkWin(board) {
  return board.every((row) => {
    return row.every((tile) => {
      return (
        tile.status === TILE_STATUSES.NUMBER ||
        (tile.mine &&
          (tile.status === TILE_STATUSES.HIDDEN ||
            tile.status === TILE_STATUSES.MARKED))
      );
    });
  });
}

export function checkLose(board) {
  return board.some((row) => {
    return row.some((tile) => {
      return tile.status === TILE_STATUSES.MINE;
    });
  });
}
export function positionMatch(a, b) {
  return a.x === b.x && a.y === b.y;
}

function nearbyTiles(board, { x, y }) {
  const offsets = range(-1, 2);
  // return times((xTimes) => {
  //   return times((yTimes) => {
  //     return board[x + offsets[xTimes]]?.[y + offsets[yTimes]];
  //   }, offsets.length);
  // }, offsets.length)
  //   .flatMap((x) => x)
  //   .filter((x) => x != null);

  return offsets
    .flatMap((xOffset) =>
      offsets.map((yOffset) => board[x + xOffset]?.[y + yOffset])
    )
    .filter((x) => x != null);
}

function replaceTile(board, { x, y }, newTile) {
  return board.map((row) =>
    row.map((tile) => {
      if (positionMatch(tile, { x, y })) {
        return newTile;
      } else {
        return tile;
      }
    })
  );
}
