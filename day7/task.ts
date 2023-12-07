import { readFile } from "../utility/utility"

enum Result {
    NOTHING,
    PAIR,
    TWO_PAIR,
    THREE,
    FULL,
    FOUR,
    FIVE
}


const isFull = (cards: {card: String, result:number}[], withJoker = false) => {
    const mostCardNumber = cards[0].result + (cards.filter(el => el.card ==='J')[0]?.result ?? 0);
    return mostCardNumber === 3 && cards[1].result === 2;
}

const isTwoPair = (cards: {card: String, result:number}[]) => {
    return cards[0].result === 2 && cards[1].result === 2;
}


const getDefaultResultOrder = (hand: String) => {
    let startHand = hand;
    let cards = [] as {card: String, result:number}[];
    while(startHand.length > 0){
        const filtered = startHand.split('').filter(el => el == startHand[0]);
        cards.push({ 
                    card: filtered[0],
                    result: filtered.length
                    }
                );

        for(let i = 0; i <filtered.length; i++){
            startHand = startHand.replace(filtered[0], '');
        }
    }

    cards = cards.sort((a,b) => b.result - a.result);
    
    switch(cards[0].result){
        case 5: return Result.FIVE
        case 4: return Result.FOUR
        case 3: return isFull(cards) ? Result.FULL : Result.THREE
        case 2: return isTwoPair(cards) ? Result.TWO_PAIR : Result.PAIR
        default: return Result.NOTHING
    }
}

const getJokerResultOrder = (hand: String) => {
    let startHand = hand;
    let cards = [] as {card: String, result:number}[];
    while(startHand.length > 0){
        const filtered = startHand.split('').filter(el => el == startHand[0]);
        cards.push({ 
                    card: filtered[0],
                    result: filtered.length
                    }
                );

        for(let i = 0; i <filtered.length; i++){
            startHand = startHand.replace(filtered[0], '');
        }
    }

    cards = cards.sort((a,b) => (b.card === 'J' ? 0 : b.result) - (a.card === 'J' ? 0 : a.result));
    
    const jCards = cards.filter(el => el.card === 'J')[0];

    switch(cards[0].result + (jCards ? jCards.result : 0) % 5){
        case 5: return Result.FIVE
        case 4: return Result.FOUR
        case 3: return isFull(cards) ? Result.FULL : Result.THREE
        case 2: return isTwoPair(cards) ? Result.TWO_PAIR : Result.PAIR
        default: return Result.NOTHING
    }
}

const getValueForCard = (card: string, jokerVersion = false) => {
    switch(card){
        case 'T' : return 10;
        case 'J' : return  jokerVersion ? 1 : 11;
        case 'Q' : return 12;
        case 'K' : return 13;
        case 'A' : return 14;
        default: return parseInt(card);
    }
}

const resultSorter = (hand1, hand2, withJoker = false) => {
    const resultDiff = hand2.result - hand1.result
    if(resultDiff !== 0){
        return resultDiff;
    }else{
        for(let i = 0; i < hand1.hand.length; i++){
            if(hand1.hand[i] === hand2.hand[i]){
                continue;
            }
            return getValueForCard(hand2.hand[i], withJoker) - getValueForCard(hand1.hand[i], withJoker)
        }
        return 0;
    }
}

const solutionTask1 = (filename) => {
    const input =  readFile(filename);
    const splittedInput = input.split("\n")
    const hands = splittedInput.map(line => {
        const parsedLine = line.split(' ');
        return {
            hand: parsedLine[0],
            bid: parseInt(parsedLine[1]),
            result: getDefaultResultOrder(parsedLine[0])
        }
    })

    const sortedHands = hands.sort((a,b) => resultSorter(b,a));
    return sortedHands.reduce((acc, cur, index) => acc + (cur.bid * (index+1)), 0);
}

const solutionTask2 = (filename) => {
    const input =  readFile(filename);
    const splittedInput = input.split("\n")
    const hands = splittedInput.map(line => {
        const parsedLine = line.split(' ');
        const result =  {
            hand: parsedLine[0],
            bid: parseInt(parsedLine[1]),
            result: getJokerResultOrder(parsedLine[0])
        }

        if(result.hand.indexOf('J') > -1){
            console.log(result);
        }

        return result;
    })

    const sortedHands = hands.sort((a,b) => resultSorter(b,a, true));
    console.log(JSON.stringify(sortedHands));
    return sortedHands.reduce((acc, cur, index) => acc + (cur.bid * (index+1)), 0);
}
    
console.log("Task1: ", solutionTask1('task-inputData.txt'));
console.log("Task2: ", solutionTask2('task-inputData.txt')); 
