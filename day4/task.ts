import { readFile } from "../utility/utility"

const solutionTask1 = (filename) => {
    const input =  readFile(filename);
    return input;
}
    
console.log("Task1: ", solutionTask1('task-inputData.txt'));
