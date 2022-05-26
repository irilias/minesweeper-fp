// Display/UI

import {
  TILE_STATUSES,
  createBoard,
  markTile,
  revealTile,
  checkWin,
  checkLose,
  positionMatch,
  markedTilesCount,
} from "./minesweeper.js";

const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 3;

let board = createBoard(
  BOARD_SIZE,
  getMinePositions(BOARD_SIZE, NUMBER_OF_MINES)
);
const boardElement = document.querySelector(".board");
const minesLeftText = document.querySelector("[data-mine-count]");
const messageText = document.querySelector(".subtext");

render();

function render() {
  boardElement.innerHTML = "";
  mapBoardElementTiles();
  listMinesLeft();
}
function mapBoardElementTiles() {
  board.flatMap((row) =>
    row.map((tile) => {
      const element = document.createElement("div");
      element.dataset.status = tile.status;
      element.dataset.x = tile.x;
      element.dataset.y = tile.y;
      element.textContent = tile.adjacentMineCount || "";
      boardElement.append(element);
    })
  );
}
boardElement.addEventListener("click", (e) => {
  if (!e.target.matches("[data-status]")) return;
  const tile = e.target;
  board = revealTile(board, {
    x: parseInt(tile.dataset.x),
    y: parseInt(tile.dataset.y),
  });
  checkGameEnd();
  render();
});
boardElement.addEventListener("contextmenu", (e) => {
  if (!e.target.matches("[data-status]")) return;
  e.preventDefault();
  const tile = e.target;
  board = markTile(board, {
    x: parseInt(tile.dataset.x),
    y: parseInt(tile.dataset.y),
  });
  render();
});

boardElement.style.setProperty("--size", BOARD_SIZE);

function listMinesLeft() {
  minesLeftText.textContent = NUMBER_OF_MINES - markedTilesCount(board);
}

function checkGameEnd() {
  const win = checkWin(board);
  const lose = checkLose(board);

  if (win || lose) {
    boardElement.addEventListener("click", stopProp, { capture: true });
    boardElement.addEventListener("contextmenu", stopProp, { capture: true });
  }

  if (win) {
    messageText.textContent = "You Win";
  }
  if (lose) {
    messageText.textContent = "You Lose";
    board.forEach((row) => {
      row.forEach((tile) => {
        if (tile.status === TILE_STATUSES.MARKED) board = markTile(tile);
        if (tile.mine) board = revealTile(board, tile);
      });
    });
  }
}

function stopProp(e) {
  e.stopImmediatePropagation();
}
function getMinePositions(boardSize, numberOfMines) {
  const positions = [];

  while (positions.length < numberOfMines) {
    const position = {
      x: randomNumber(boardSize),
      y: randomNumber(boardSize),
    };

    if (!positions.some(positionMatch.bind(null, position))) {
      positions.push(position);
    }
  }

  return positions;
}

function randomNumber(size) {
  return Math.floor(Math.random() * size);
}
