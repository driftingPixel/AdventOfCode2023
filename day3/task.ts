import { readFile } from "../utility/utility"


const getAllSymbols = (text: string ): string[] => {
    const setOfSymbols = new Set();
    text.split('')
        .filter(char => !/([0-9])/gi.test(char) && !['.', '\n'].includes(char))
        .forEach(symbol => setOfSymbols.add(symbol));

    return Array.from(setOfSymbols) as string[];
}


const findAllNumbersAdjacentSymbols = (splittedInput: string[], symbolsArray: string[]) => {

    return splittedInput.map( (line,index) => 
       {
        const numbersFromLine = line.match(/([0-9])*([0-9])/gi);
        let lastIndexInLine = 0;
        return numbersFromLine?.filter(el => {
            const indexOfNumber = line.indexOf(el, lastIndexInLine);
            lastIndexInLine = indexOfNumber + 1;
            const indexPrev = indexOfNumber == 0 ? 0 : indexOfNumber-1;

            const testLineAbove = index > 0 ? `${splittedInput[index-1].substring(indexPrev, indexPrev + el.length + 2)}`: ''
            const testLineBelow = index < splittedInput.length-1 ? splittedInput[index+1].substring(indexPrev, indexPrev + el.length + 2) : '';
            const result = symbolsArray.includes(line[indexOfNumber-1]) || symbolsArray.includes(line[indexOfNumber + el.length]) //check symbols is before or after the number
                || symbolsArray.some( el => testLineAbove.includes(el))
                ||  symbolsArray.some( el => testLineBelow.includes(el))

            return result;
        })
       }
    )
    .flat()
    .map(el => el ? parseInt(el): 0);
    
}

const solutionTask1 = (filename) => {
    const input =  readFile(filename);
    //Symbols are all not digit character, except dot ".";
    const symbolsArray = getAllSymbols(input);
    const splittedInput = input.split('\n');
    
    return findAllNumbersAdjacentSymbols(splittedInput, symbolsArray).reduce( (accumulator, currentValue) => accumulator + currentValue, 0);
        
}


const gearSymbol = '*';
const maxLengthOfNumber = 3;

const getNumberFromLineAndIndex = (textLine, index): number[] | undefined => {
    let currentIndex = 1;
    const centerElement = textLine[index] !== '.' ? textLine[index] : '';
    let currentChar = textLine[index-1];
    let leftResult = '';
    while(currentChar !== "." && index-currentIndex >=0){
        leftResult = currentChar + leftResult;
        currentIndex++;
        currentChar = textLine[index-currentIndex];
    }

    let rightResult = '';
    currentIndex = 1;
    currentChar = textLine[index+currentIndex];
    while(currentChar !== "." && index+currentIndex <= textLine.length){
        rightResult += currentChar;
        currentIndex++;
        currentChar = textLine[index+currentIndex];
    }

    if(leftResult !== '' && rightResult !== '' && centerElement === ''){
        return [parseInt(leftResult), parseInt(rightResult)]
    }else{
        const stringResult = leftResult+centerElement+rightResult;
        const result = stringResult === '' ? undefined : [parseInt(stringResult)];
        return result;
    }
}

const findAllGearRatio = (splittedInput: string[], gearSymbol: string): number[]  => {
    return splittedInput.map( (line,index) => {
        let lastIndexOfGear = line.indexOf(gearSymbol);
        const gearsRatios = [] as number[];
        while(lastIndexOfGear >= 0){
            const gearElements = [] as number[];
            const elementBeforeGear = line.substring(lastIndexOfGear-1, lastIndexOfGear+4).match(/\*([0-9])*([0-9])/g);
            if(elementBeforeGear) elementBeforeGear.forEach(el => gearElements.push(parseInt(el.replace("*", ''))));

            const elementAfterGear = line.substring(lastIndexOfGear-4, lastIndexOfGear+1).match(/([0-9])*([0-9])\*/g);
            if(elementAfterGear) elementAfterGear.forEach(el => gearElements.push(parseInt(el.replace("*", ''))));

            if(index > 0){
                const aboveResult = getNumberFromLineAndIndex(splittedInput[index-1], lastIndexOfGear);
                if(aboveResult) aboveResult.forEach(el => gearElements.push(el));
                
            }

            if(index < splittedInput.length-1){
                const belowResult = getNumberFromLineAndIndex(splittedInput[index+1], lastIndexOfGear);
                if(belowResult) belowResult.forEach(el => gearElements.push(el));
            }

            lastIndexOfGear = line.indexOf(gearSymbol, lastIndexOfGear+ 1);
           
            if(gearElements.length > 1){
                gearsRatios.push(gearElements[0] * gearElements[1])
            }
        }
    return gearsRatios
    }).flat();
    
};

const solutionTask2 = (filename) => {
    const input =  readFile(filename);
    const splittedInput = input.split('\n');
    const allGearRatios= findAllGearRatio(splittedInput, gearSymbol);
    return allGearRatios.reduce( (accumulator, currentValue) => accumulator + currentValue, 0);
        
}

console.log("Task1: ", solutionTask1('task-inputData.txt'));
console.log("Task2: ", solutionTask2('task-inputData.txt'));
