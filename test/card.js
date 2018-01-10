import test from 'ava';
import { Card, RankEnum, SuitEnum } from '../card';

var expectedRanks = ['KING', 'QUEEN', 'JACK', 'TEN', 'NINE', 'EIGHT',
    'SEVEN', 'SIX', 'FIVE', 'FOUR', 'THREE', 'TWO', 'ACE'];
var expectedSuits = ['SPADE', 'HEART', 'DIAMOND', 'CLUB'];


test('RankEnum', t => {
    let numRanks = 0;
    
    for(let rank in RankEnum) {
        numRanks++;
        t.true(expectedRanks.includes(rank) );
    }
    t.is(numRanks, 13);
});


test('SuitEnum', t => {
    let numSuits = 0;
    
    for(let suit in SuitEnum) {
        numSuits++;
        t.true(expectedSuits.includes(suit) );
    }
    t.is(numSuits, 4);
});


test('Create a card', t => {
    let card = new Card(RankEnum.ACE, SuitEnum.CLUB);

    t.is(card.toString(), "Ac");
    t.is(card.speak(), "Ace of Clubs");
});


test('Create a pack of cards', t => {
    let pack = Card.makePack();
    
    t.is(pack.length, 52);
    const Ks = new Card(RankEnum.KING, SuitEnum.SPADE);
    let topOfPack = pack[51];
    t.deepEqual(topOfPack, Ks);
    
    const Kh = new Card(RankEnum.KING, SuitEnum.HEART);
    let KhFromPack = pack[51-13];
    t.deepEqual(KhFromPack, Kh);
});


test('card.toString', t => {
    let pack = Card.makePack();
    let regex = new RegExp("^[A23456789TJQK][cdhs]$"); 
    
    for(let i in pack) {
        const s = pack[i].toString();
        t.regex(s, regex);
    }
});


test('card.speak', t => {
    let pack = Card.makePack();
    let regex = new RegExp(
            "^(" + expectedRanks.join('|') + ") of (" + expectedSuits.join('|') + ")s$", "i"); 
    
    for(let i in pack) {
        const speech = pack[i].speak();
        t.regex(speech, regex);
    }
});