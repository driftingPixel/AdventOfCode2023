const fs = require('node:fs');

const readFile = (fileName) => {
    try {
        return fs.readFileSync(fileName, 'utf8')
    } catch (err) {
        console.error(err);
    }
}

/** First task 
 * Get numbers from string (task-inputData.txt) and for each line create a number from first and last digit.
 * On the end sum all lines.
*/

const isLetter = (char) => {
    return char.toUpperCase() != char.toLowerCase() || char.codePointAt(0) > 127;
}


const solutionTask1 = (filename) => {
    return readFile(filename).split("\n")
        .map(el => el.split('').filter(letterOrNumber => !isLetter(letterOrNumber)))
        .map(el => parseInt(el[0] + el[el.length - 1]))
        .reduce( (accumulator, currentValue) => accumulator + currentValue, 0);
}

/** Second task 
 * Extends task 1. Additional if numbers are as string (one, two ...), you should use it as a digits.
 * Rules of creating numbers from line are the same :).
*/
const digits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

const insertSubStringAtPosition = (text, substring, position) => {
    return text.slice(0, position) + substring + text.slice(position);
}

const addStringNumbersAsDigit = (text) => {

    let textLowerCase = text.toLowerCase();

    const findings = [];
    for(let index = 0; index< digits.length; index++) {
        let lastPosition = textLowerCase.indexOf(digits[index]);
    
       while(lastPosition >= 0){
            findings.push({position: lastPosition, number: index+1})
            lastPosition = textLowerCase.indexOf(digits[index], lastPosition+1);
        }
        
    };

    //Sort desc, when we are insert digits fro back the index of next insert stay without changes
    findings.sort((a,b) => b.position - a.position )
    
    for(let i = 0; i< findings.length; i++){
        textLowerCase = insertSubStringAtPosition(textLowerCase, findings[i].number, findings[i].position);
    }
    return textLowerCase;
}


const solutionTask2 = (filename) => {
    return readFile(filename).split("\n")
        .map(el => addStringNumbersAsDigit(el))
        .map(el => el.split('').filter(letterOrNumber => !isLetter(letterOrNumber)))
        .map(el => parseInt(el[0] + el[el.length - 1]))
        .reduce( (accumulator, currentValue, index) => accumulator + currentValue, 0);
}

const result = solutionTask1("task-inputData.txt");
const result2 = solutionTask2("task-inputData.txt");
console.log(result);
console.log(result2);