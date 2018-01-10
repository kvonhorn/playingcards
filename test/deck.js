import test from 'ava';
import { Deck } from '../deck';
import { Card, RankEnum, SuitEnum } from '../card';


test('Create a deck', t => {
    let deck = new Deck();
    t.is(deck.deck.length, 52);
    let uniqueCards = new Set(deck.deck);
    t.is(uniqueCards.size, 52);
});


test('Create a multi-pack deck', t => {
    let i, deck, uniqueCards;
    for(i=1; i<9; i++) {
        deck = new Deck(i);
        t.is(deck.deck.length, 52*i);
        uniqueCards = new Set(deck.deck);
        t.is(uniqueCards.size, 52);
    }
});


test('Deck.addCardsToDeck (array of Cards), Deck.getCards', t => {
    let newDeck = new Deck(0);
    let testDeck = new Deck();
    testDeck.shuffle();
    
    t.is(newDeck.numCardsInDeck(), 0);
    while(testDeck.numCardsInDeck() > 0) {
        let numCardsToGet = Math.floor(Math.random() * 4 ) + 1;
        t.true(numCardsToGet > 0);
        t.true(numCardsToGet <= 4);
        if(numCardsToGet > testDeck.numCardsInDeck()) {
            numCardsToGet = testDeck.numCardsInDeck();
        }
        
        const cards = testDeck.getCards(numCardsToGet);
        const origSize = newDeck.numCardsInDeck();
        newDeck.addCardsToDeck(cards);
        t.is(newDeck.numCardsInDeck(), origSize+numCardsToGet);
    }
    t.is(newDeck.numCardsInDeck(), 52);    
});


test('Deck.addCardsToDeck (single Card)', t => {
    let newDeck = new Deck(0);
    let testDeck = new Deck();
    testDeck.shuffle();
    
    t.is(newDeck.numCardsInDeck(), 0);
    while(testDeck.numCardsInDeck() > 0) {
        const topCard = testDeck.getTopCard();
        const origSize = newDeck.numCardsInDeck();
        newDeck.addCardsToDeck(topCard);
        t.is(newDeck.numCardsInDeck(), origSize+1);
    }
    t.is(newDeck.numCardsInDeck(), 52);
});


test('Deck.getTopCard', t => {
    let deck = new Deck();
    deck.shuffle();
    
    t.is(deck.numCardsInDeck(), 52);
    for(let numIterations = deck.deck.length; numIterations > 0; numIterations--) {
        const topCardExpected = deck.deck[numIterations-1];
        const topCardObserved = deck.getTopCard();
        t.is(topCardObserved, topCardExpected);
    }
});


test('Deck.shuffle', t => {
    let deck, origDeck, uniqueCards, i;
    const maxI = 2;
    //const maxI = 8;
    const Ac = new Card(RankEnum.ACE, SuitEnum.CLUB);
    const Ad = new Card(RankEnum.ACE, SuitEnum.DIAMOND);
    const Ah = new Card(RankEnum.ACE, SuitEnum.HEART);
    const As = new Card(RankEnum.ACE, SuitEnum.SPADE);
    
    for(i=1; i<=maxI; i++) {
        deck = new Deck(i);
        
        origDeck = [];
        for(let j=0; j<deck.deck.length; j++) {
            origDeck.push(deck.deck[j]);
        }
        
        deck.shuffle();
        t.is(deck.deck.length, 52*i);
        
        uniqueCards = new Set(deck.deck);
        t.is(uniqueCards.size, 52);
        
        // TODO: Implement better shuffle testing
        t.not(deck.deck, origDeck);
        t.false(deck.deck[0] === Ac && deck.deck[13] === Ad && 
            deck.deck[13*2] === Ah && deck.deck[13*3] === As);
        t.is(deck.deck.length, origDeck.length);   // Redundant
    }
});