import { TILE_STATUSES } from "../../minesweeper.js";
describe("Test", () => {
  it("test", () => {
    cy.visit("/", {
      onBeforeLoad(window) {
        window.board = [
          [
            { x: 0, y: 0, mine: false, status: TILE_STATUSES.HIDDEN },
            { x: 0, y: 1, mine: false, status: TILE_STATUSES.HIDDEN },
          ],
          [
            { x: 1, y: 0, mine: true, status: TILE_STATUSES.HIDDEN },
            { x: 1, y: 1, mine: false, status: TILE_STATUSES.HIDDEN },
          ],
        ];
      },
    });
  });
});
