import { readFile } from "../utility/utility"

const getWinningsFromCard = (card: {card: number[], winningsNumber: number[]}) => {
    return card.winningsNumber.filter(winningNumber => card.card.includes(winningNumber)).length;
}

const getCardWinnings = (cardsText: string[]): number[] => {
    const cardWithWinnings = cardsText.map(line => {

        const parts = line.split(":")[1].trim().split("|");
        return {
            card: parts[0].split(" ").map(el => parseInt(el.trim())).filter(el => !isNaN(el)),
            winningsNumber: parts[1].split(" ").map(el => parseInt(el.trim())).filter(el => !isNaN(el))
        }
    })

    const winningsMatchesPerCard = cardWithWinnings.map(card => getWinningsFromCard(card));

    return winningsMatchesPerCard;
}

const solutionTask1 = (filename) => {
    const input =  readFile(filename);
    const cardWinnings = getCardWinnings(input.split("\n"))
    return cardWinnings.map(el => el===0 ? 0 : Math.pow(2,el-1)).reduce((acc,cur) => acc + cur, 0);
}

const getCardsWinningFromCard = (winningsCards: number, index:number, allCards: number[]): number => {
    let sum = 1;
    if(winningsCards === 0 ){
        return sum;
    }else{
        for(let i=1; i<=winningsCards; i++){
            const newIndex = index+i;
            sum = sum + getCardsWinningFromCard(allCards[newIndex],newIndex, allCards)
        }
        return sum
    }
    
}

const solutionTask2 = (filename) => {
    const input =  readFile(filename);
    const cardWinnings = getCardWinnings(input.split("\n"))
    return cardWinnings.map((card,index) => getCardsWinningFromCard(card,index,cardWinnings)).reduce((acc,cur) => acc + cur,0);
}
    
console.log("Task1: ", solutionTask1('task-inputData.txt'));
console.log("Task2: ", solutionTask2('task-inputData.txt'));
