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
            newRow = row - 2;
            newColumn = column + 2;
            console.log(newRow, newColumn)
            const availableMoveSelectorWithJump = `[name="space${newRow}${newColumn}"]`;
            console.log(availableMoveSelectorWithJump)
            cy.get(availableMoveSelectorWithJump).click();

        } else {
            cy.get(availableMoveSelector).click();
        }
        cy.wait(2000);
    });
});
