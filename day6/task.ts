import { readFile } from "../utility/utility"

const getPossibleDistances = (maxTime: number) => {
    return Array.from(Array(maxTime).keys()).map(el => {
        return (el * 1) * (maxTime-el);
    })
}

const getDataFromStringData = (prefix: string, data: string) => {
    return data.replace(prefix ,'').trim().split(' ').filter(el => el !== '').map(el => parseInt(el));
}

const solutionTask1 = (filename) => {
    const input =  readFile(filename);
    const splittedInput = input.split("\n")
    const times = getDataFromStringData('Time:', splittedInput[0]);
    const distances = getDataFromStringData('Distance:', splittedInput[1])

    const possibleDistances = times.map(time => getPossibleDistances(time));
    const winningDistances = possibleDistances.map((possDistances,index) => possDistances.filter(el => el > distances[index]));
    return winningDistances.map(el => el.length).reduce((acc,curr) => acc * curr, 1);
}

const getConcatDataFromStringData = (prefix: string, data: string) => {
    return data.replace(prefix,'').trim().split(' ').filter(el => el !== '').reduce((acc, curr) => acc + curr, '');
}

const solutionTask2 = (filename) => {
    const input =  readFile(filename);
    const splittedInput = input.split("\n")
    const time = parseInt(getConcatDataFromStringData('Time: ',splittedInput[0]));
    const distance = parseInt(getConcatDataFromStringData('Distance:',splittedInput[1]));

    const possibleDistances = getPossibleDistances(time);
    const winningDistances = possibleDistances.filter(el => el > distance);

    return winningDistances.length;
}
    
console.log("Task1: ", solutionTask1('task-inputData.txt'));
console.log("Task2: ", solutionTask2('task-inputData.txt')); 
