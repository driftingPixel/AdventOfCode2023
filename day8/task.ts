import { readFile } from "../utility/utility"

const solutionTask1 = (filename) => {
    const input =  readFile(filename);
    const splittedInput = input.split("\n").filter(el => el !=='');
    const instruction = splittedInput[0].split('').map(el => el === 'L' ? 0 : 1);
    let road = splittedInput.filter((el, index) => index > 0).map(el => { 
        const elSplitted = el.split('=')
        const roads = elSplitted[1].trim().split(',').map((el,index) => el.replace(index === 0 ? '(' : ')', '').trim())
        return {
                name: elSplitted[0].trim(),
                roads: roads
                }})

    // console.log(instruction);
    road = road.map(el => {
        return {
            name: el.name,
            roads: el.roads.map(roadTemp => {
                for(let i=0; i<road.length; i++){
                    if(road[i].name === roadTemp){
                        return i;
                    }
                }
            })
        }
    })
    console.log(road); 
    
    let currentPoint = road[0];
    let counter = 0;
    while(currentPoint.name !== 'ZZZ' && counter <= instruction.length){
        const nextPointIndex = currentPoint.roads[instruction[counter % instruction.length]];
        currentPoint =  road[nextPointIndex];
        counter++;
        console.log(counter)
        ;
    }

    return counter;
}

const solutionTask2 = (filename) => {
    const input =  readFile(filename);
    const splittedInput = input.split("\n")
    
    return splittedInput;
}
    
console.log("Task1: ", solutionTask1('task-inputData.txt'));
// console.log("Task2: ", solutionTask2('task-inputData.txt')); 