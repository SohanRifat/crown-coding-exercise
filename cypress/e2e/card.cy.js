describe("Blackjack Game Test", () => {
  it("should check for blackjack", () => {
    cy.visit("https://deckofcardsapi.com/");

    cy.contains("Deck of Cards");

    cy.request("GET", "https://deckofcardsapi.com/api/deck/new/").then((response) => {
      const deckId = response.body.deck_id;

      cy.request("GET", `https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);

      cy.request("GET", `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=6`).then((response) => {
        const cards = response.body.cards;

        const player1Hand = [cards[0], cards[1], cards[2]];
        const player2Hand = [cards[3], cards[4], cards[5]];

        const player1Score = calculateHandScore(player1Hand);
        const player2Score = calculateHandScore(player2Hand);

        if (player1Score === 21) {
          cy.log("Player 1 has blackjack!");
        }
        if (player2Score === 21) {
          cy.log("Player 2 has blackjack!");
        }
      });
    });
  });
});

// Helper function to calculate the score of a hand
function calculateHandScore(hand) {
  let score = 0;
  for (const card of hand) {
    if (["KING", "QUEEN", "JACK"].includes(card.value)) {
      score += 10;
    } else if (card.value === "ACE") {
      score += 11;
    } else {
      score += parseInt(card.value);
    }
  }
  return score;
}
