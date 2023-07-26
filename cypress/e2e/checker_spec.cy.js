/// <reference types="cypress" />

describe("Checkers Game Test", () => {
  it("should be able to make 5 moves and restart the game", () => {

    cy.visit("https://www.gamesforthebrain.com/game/checkers/");
    cy.get("h1").should("be.visible").and("have.text", "Checkers");

    cy.makeMove(2, 2);
    cy.makeMove(4, 2);
    cy.makeMove(5, 1);
    cy.makeMove(6, 2);
    cy.makeMove(7, 1);

    cy.restartGame();
  });

});



// this should be in the commands.js file for the test to run properly 
// cypress/support/commands.js

// Custom command to restart the game by clicking on the "Restart" button
Cypress.Commands.add("restartGame", () => {
  cy.contains("a", "Restart").click();
  cy.contains("button", "Make a move").should("be.visible");
});

Cypress.Commands.add("makeMove", (row, column) => {
  const cellSelector = `[name="space${row}${column}"]`;

  cy.get(cellSelector).click();
  cy.wait(2000);

  let newRow = row - 1;
  let newColumn = column + 1;

  const availableMoveSelector = `[name="space${newRow}${newColumn}"]`;

  cy.wait(2000);

  cy.get(availableMoveSelector).then(($cell) => {
      console.log($cell.attr("src"))
      const notEmpty = $cell.attr("src") === "you1.gif";

      if (notEmpty) {
          newRow1 = row - 2;
          newColumn1 = column + 2;
          console.log(newRow, newColumn)
          const availableMoveSelectorWithJump = `[name="space${newRow1}${newColumn1}"]`;
          console.log(availableMoveSelectorWithJump)
          cy.get(availableMoveSelectorWithJump).click();

      } else {
          cy.get(availableMoveSelector).click();
      }
      cy.wait(2000);
  });
});
