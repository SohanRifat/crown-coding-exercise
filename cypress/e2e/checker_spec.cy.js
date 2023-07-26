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