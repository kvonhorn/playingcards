// A playing card class with Rank and Suit
 
 
const SuitEnum = {
    CLUB: {name: "Clubs", value: 1, symbol: "c"},
    DIAMOND: {name: "Diamonds", value: 2, symbol: "d"},
    HEART: {name: "Hearts", value: 3, symbol: "h"},
    SPADE: {name: "Spades", value: 4, symbol: "s"}
};


const RankEnum = {
    ACE: {name: "Ace", value: 1, symbol: "A" },
    TWO: {name: "Two", value: 2, symbol: "2" },
    THREE: {name: "Three", value: 3, symbol: "3" },
    FOUR: {name: "Four", value: 4, symbol: "4" },
    FIVE: {name: "Five", value: 5, symbol: "5" },
    SIX: {name: "Six", value: 6, symbol: "6" },
    SEVEN: {name: "Seven", value: 7, symbol: "7" },
    EIGHT: {name: "Eight", value: 8, symbol: "8" },
    NINE: {name: "Nine", value: 9, symbol: "9" },
    TEN: {name: "Ten", value: 10, symbol: "T" },
    JACK: {name: "Jack", value: 11, symbol: "J" },
    QUEEN: {name: "Queen", value: 12, symbol: "Q" },
    KING: {name: "King", value: 13, symbol: "K" }
};


class Card {
    
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }
   
    toString() {
        return this.rank.symbol + this.suit.symbol;
    }
    
    speak() {
        return this.rank.name + " of " + this.suit.name;
    }
    
    static isRank(rank) {
        return Object.values(RankEnum).includes(rank);
    }

    static isSuit(suit) {
        return Object.values(SuitEnum).includes(suit);
    }
    
    static makePack() { // Create an array of each card
        let packOut = [];
        for (let suit in SuitEnum) {
            for(let rank in RankEnum) {
                packOut.push(new Card(RankEnum[rank], SuitEnum[suit]) );
            }
        }
        return packOut;
    }
    
}


module.exports = {
    SuitEnum,
    RankEnum,
    Card
};