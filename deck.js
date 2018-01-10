// A class modeling a deck of playing cards

var card = require('./card.js');


class Deck {
    
    // A deck can contain one or more packs of playing cards
    //  (e.g. an 8 pack deck/shoe for blackjack)
    constructor(numPacks=1) {
        this.deck = [];
        const pack = card.Card.makePack();
        for(let i = 0; i < numPacks; i++) {
            this.deck = this.deck.concat(pack);
        }
        
    }
    
    
    // Returns a card
    getTopCard() {
        return this.deck.pop();
    }
    
    
    // Returns an array of Cards
    getCards(numCards) {
        const i = this.deck.length - numCards;
        return this.deck.splice(i, numCards);   // Splice off the last numCards
    }
    
    
    // Add either a single Card instance or an array of Cards to the Deck
    addCardsToDeck(cards) {
        this.deck = this.deck.concat(cards);
    }
    
    
    numCardsInDeck() {
        return this.deck.length;
    }
    
    
    shuffle() {
        for(let i = 1; i < this.deck.length; i++) {
            const j = Math.floor(Math.random() * this.deck.length);
            [ this.deck[i], this.deck[j] ] = [ this.deck[j], this.deck[i] ];
        }
    }
    
}


module.exports = {
    Deck
};