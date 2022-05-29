beforeEach(() => {
  cy.visit("/");
});
describe("minesweeper", () => {
  it("On cick, correctly shows empty tile and its adjacent empty tiles.", () => {
    const positionX = 1;
    const positionY = 1;
    cy.get(`[data-x=${positionX}][data-y=${positionY}]`).click();
    cy.get(`[data-x=${positionX}][data-y=${positionY}]`).then((tile) => {
      if (tile[0].dataset.status === "number") {
        if (tile[0].innerText) {
          // all adjacent tiles are hidden.
          // at least one tile is a mine.
          // adjacentElements.each((adjacentElement) => {
          //   console.log(adjacentElement[0].dataset.status);
          //   expect(adjacentElement[0].dataset.status).toBe("hidden");
          // });
          console.log("a tile with a number clicked");

          cy.getAdjacentTiles(positionX, positionY).each((tile) =>
            expect(tile[0].dataset.status).toEqual("hidden")
          );
        } else {
          // adjacentElements.each((adjacentElement) => {
          //   console.log(adjacentElement[0].dataset.status);
          //   // expect(adjacentElement[0].dataset.status).toBe("number");
          // });
          console.log("empty Tile Clicked");
          // cy.getAdjacentTiles(1,1).each((x) => console.log(x[0]));
          cy.getAdjacentTiles(positionX, positionY).select();
        }
      }
    });
  });
});
