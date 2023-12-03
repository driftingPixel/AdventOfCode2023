import { readFile } from "../utility/utility";


const removeGamePrefix = (line: String) => {
    return line.replace(/Game *\d*: /gi,'')
}

const separateGrab = (game: String) => {
    return game.split(";")
}

const getQuantityOfColor = (game: string[]) => {
    return game
            .map(grab => grab.split(",")
                                .map(record => { 
                                     const recordArray = record
                                                             .trim()
                                                             .split(' ');

                                     return {cubes: parseInt(recordArray[0]), color: recordArray[1]}
                                }
            ));
}

const isGamePossibleForLimit = (game: [], limit: {cubes: number, color: string}[]) => {
    return game
            .map((grab : {cubes: number, color: string}[]) => grab
                    .map((oneGet : {cubes: number, color: string}) => limit
                            .filter( limitElement => oneGet.color === limitElement.color)
                            .map(limitElement =>  oneGet.cubes <= limitElement.cubes)
                            .reduce((acc, currentValue) => acc && currentValue, true))
                    .reduce((acc, currentValue) => acc && currentValue, true))
            .reduce((acc, currentValue) => acc && currentValue, true)
}



const task1Limit = [
    { cubes: 12, color: 'red' },
    { cubes: 13, color: 'green' },
    { cubes: 14, color: 'blue' }
]

const solutionTask1 = (filename, taskLimit) => {
    return readFile(filename)
        .split("\n")
        .map(el => removeGamePrefix(el))
        .map(game => separateGrab(game))
        .map(game => getQuantityOfColor(game))
        .map((game, index) => isGamePossibleForLimit(game, taskLimit) ? index + 1 : 0)
        .reduce( (accumulator, currentValue) => accumulator + currentValue, 0);
}

const getMaxCubesFromGame = (game: [], color: String) => {
    return Math.max(...game
            .map((grab: {cubes: number, color: string}[]) => grab.filter((el: {cubes: number, color: string}) => el.color == color))
            .map((grab: {cubes: number, color: string}[]) => grab[0]?.cubes ?? 0))
            
}

const getMinimumNumberOfCubes = (game: []) => {
    return [
        getMaxCubesFromGame(game, 'green'),
        getMaxCubesFromGame(game, 'red'),
        getMaxCubesFromGame(game, 'blue'),
    ]
}

const solutionTask2 = (filename) => {
    return readFile(filename)
        .split("\n")
        .map(el => removeGamePrefix(el))
        .map(game => separateGrab(game))
        .map(game => getQuantityOfColor(game))
        .map(game => getMinimumNumberOfCubes(game))
        .map(minimumNumbersOfCubes => minimumNumbersOfCubes.reduce((accumulator, currentValue) => accumulator * currentValue))
        .reduce( (accumulator, currentValue) => accumulator + currentValue, 0);
}

console.log("Task 1: ", solutionTask1('task-inputData.txt', task1Limit));
console.log("Task 2: ", solutionTask2('task-inputData.txt'));