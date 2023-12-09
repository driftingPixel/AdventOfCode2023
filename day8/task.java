import java.io.File;  // Import the File class
import java.io.FileNotFoundException;  // Import this class to handle errors
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Scanner; //
import java.util.stream.Collectors;

class Road{
    public String name;
    public List<String> roads;

    public Road(String name, List<String> roads){
        this.name = name;
        this.roads = roads;
    }
}

class RoadWithIndex{
    public String name;
    public List<Integer> roads;

    public RoadWithIndex(String name, List<Integer> roads){
        this.name = name;
        this.roads = roads;
    }
}

class Task {
    public static void main(String args[]){

        List<String> splittedInput = new ArrayList<String>();

        try {
            File myObj = new File("task-inputData.txt");
            Scanner myReader = new Scanner(myObj);
            while (myReader.hasNextLine()) {
                splittedInput.add(myReader.nextLine());
            }
            myReader.close();


        } catch (FileNotFoundException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }

        final List<String> splittedInputFinal = splittedInput.stream().filter(el -> el != "").collect(Collectors.toList());
        List<Integer> instruction = Arrays.stream(splittedInput.get(0).split("")).map(el -> el.equals("L") ? 0 : 1).collect(Collectors.toList());
        List<Road> roadList = splittedInputFinal.stream().filter((el) -> splittedInputFinal.indexOf(el) > 1)
                                                    .map(el -> { 
                                                            String[] elSplitted = el.split("=");
                                                            List<String> roads = Arrays.stream(elSplitted[1].trim()
                                                                                                            .split(","))
                                                                                                            .map(r -> r.replace("(","")
                                                                                                                           .replace(")", "")
                                                                                                                           .trim())
                                                                                                                           .collect(Collectors.toList());
                                                            return new Road(elSplitted[0].trim(), roads);
                                                    }).collect(Collectors.toList());

        List<RoadWithIndex> betterRoads = roadList.stream()
                                              .map(el -> new RoadWithIndex(el.name, el.roads.stream().map(roadTemp -> {
                                                                            for(int i=0; i<roadList.size(); i++){
                                                                                if(roadList.get(i).name.equals(roadTemp)){
                                                                                    return i;
                                                                                }
                                                                            }
                                                                            return 0;
                                                                        }).collect(Collectors.toList()))).collect(Collectors.toList());
        System.out.println(betterRoads);

        RoadWithIndex currentPoint = betterRoads.get(0);
        long counter = 0;
        while(!currentPoint.name.equals("ZZZ")){
            Integer nextPointIndex = currentPoint.roads.get(instruction.get((int)(counter % instruction.size())));
            RoadWithIndex nextPoint =  betterRoads.get(nextPointIndex);
            if(nextPoint.name.equals(currentPoint.name)){
                System.out.println("It's a trap");
            }
            currentPoint = nextPoint;
            counter++;
            if(counter % 1000000000 == 0){
                System.out.println(counter + new Date().toString());
            }
            // System.out.println(counter);
            // System.out.println(currentPoint.name);
        }

        System.out.println(counter);
    }
   }
