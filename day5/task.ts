import { readFile } from "../utility/utility"


const mapToNext = (element: number, nextConfigNumbers: number[][]) : number => {

    let selectedRange;
    for( let i = 0; i < nextConfigNumbers.length; i++){
        const range = nextConfigNumbers[i]
        if(element >= range[1] && element <=range[1] + range[2]){
            selectedRange = range;
            break;
        }
    }
   
    return selectedRange ? element + selectedRange[0] - selectedRange[1] : element; 
}

const getConfig = (configText: string) => {
    return configText.split(":")[1].trim().split("\n").map(el => el.trim().split(' ')).map(arrayEl => arrayEl.map(el => parseInt(el)));
}

const solutionTask1 = (filename) => {
    const input =  readFile(filename);
    const splittedInput = input.split("\n\n")
    const seeds = splittedInput[0].split(":")[1].split("\n").map(el => el.trim().split(' ')).flat().map(el => parseInt(el));
    const soils = getConfig(splittedInput[1]);
    const fertilizers = getConfig(splittedInput[2]);
    const water = getConfig(splittedInput[3]);
    const light = getConfig(splittedInput[4]);
    const temperature = getConfig(splittedInput[5]);
    const humidity = getConfig(splittedInput[6]);
    const location = getConfig(splittedInput[7]);
    console.log(splittedInput);

    console.log("Seeds:", seeds);
    console.log("Soils:", soils);
    console.log("fertilizers:", fertilizers);
    console.log("water:", water);
    console.log("light:", light);
    console.log("temperature:", temperature);
    console.log("humidity:", humidity);
    console.log("location:", location);

    return seeds.map(seed => mapToNext(seed, soils))
         .map(soil => mapToNext(soil, fertilizers))
         .map(fert => mapToNext(fert, water))
         .map(wat => mapToNext(wat, light))
         .map(li => mapToNext(li, temperature))
         .map(temp => mapToNext(temp, humidity))
         .map(hum => mapToNext(hum, location))
         .reduce((acc,current) => acc < current ? acc : current, Number.MAX_VALUE);
  
}


const solutionTask2 = (filename) => {
    const input =  readFile(filename);
    const splittedInput = input.split("\n\n")
    const seeds = splittedInput[0].split(":")[1].split("\n").map(el => el.trim().split(' ')).flat().map(el => parseInt(el)) as number[];
    const soils = splittedInput[1].split(":")[1].trim().split("\n").map(el => el.trim().split(' ')).map(arrayEl => arrayEl.map(el => parseInt(el)));
    const fertilizers = splittedInput[2].split(":")[1].trim().split("\n").map(el => el.trim().split(' ')).map(arrayEl => arrayEl.map(el => parseInt(el)));
    const water = splittedInput[3].split(":")[1].trim().split("\n").map(el => el.trim().split(' ')).map(arrayEl => arrayEl.map(el => parseInt(el)));
    const light = splittedInput[4].split(":")[1].trim().split("\n").map(el => el.trim().split(' ')).map(arrayEl => arrayEl.map(el => parseInt(el)));
    const temperature = splittedInput[5].split(":")[1].trim().split("\n").map(el => el.trim().split(' ')).map(arrayEl => arrayEl.map(el => parseInt(el)));
    const humidity = splittedInput[6].split(":")[1].trim().split("\n").map(el => el.trim().split(' ')).map(arrayEl => arrayEl.map(el => parseInt(el)));
    const location = splittedInput[7].split(":")[1].trim().split("\n").map(el => el.trim().split(' ')).map(arrayEl => arrayEl.map(el => parseInt(el)));
    console.log(splittedInput);

    let minLocation = Number.MAX_VALUE;

    for(let i = 0; i<seeds.length; i = i + 2){
        for(let j =0; j< seeds[i+1]; j++){
            const result = mapToNext(
                                mapToNext(
                                    mapToNext(
                                        mapToNext(
                                            mapToNext(
                                                mapToNext(
                                                    mapToNext(seeds[i] + j, soils)
                                                , fertilizers)
                                            , water)
                                        , light)
                                    , temperature)
                                , humidity)
                            , location
                            );
           minLocation = result < minLocation ? result : minLocation;
        }
    }
    return minLocation;
}
    
console.log("Task1: ", solutionTask1('task-inputData.txt'));
console.log("Task2: ", solutionTask2('task-inputData.txt')); 
