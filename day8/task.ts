import { readFile } from "../utility/utility"

const solutionTask1 = (filename) => {
    const input =  readFile(filename);
    const splittedInput = input.split("\n")
    
    return splittedInput;
}

const solutionTask2 = (filename) => {
    const input =  readFile(filename);
    const splittedInput = input.split("\n")
    
    return splittedInput;
}
    
console.log("Task1: ", solutionTask1('task-inputData.txt'));
console.log("Task2: ", solutionTask2('task-inputData.txt')); 
