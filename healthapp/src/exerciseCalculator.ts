interface ExerciseResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface ExerciseInputs {
    exercises: number[],
    trainingTarget: number
}

const parseArguments = (args: string[]): ExerciseInputs => {
    if (args.length < 4) throw new Error('Not enough arguments'); 
    
    const argsWithoutDefaults = process.argv.slice(2)
    if(argsWithoutDefaults.every((element) => !isNaN(Number(element))))
        return {
            trainingTarget: Number(argsWithoutDefaults[0]),
            exercises: argsWithoutDefaults.slice(1).map((i) => Number(i))
        }
    else {
        throw new Error('Provided values were not numbers!');
    }
}


const calculateExercises = (exercises: number[], trainingTarget: number): ExerciseResult => {
    if (exercises.length === 0) {
        throw new Error("You have not specified any exercises!");
    }

    let sum = 0;
    exercises.forEach(x => sum += x);
    let average = sum / exercises.length;

    let rating = 0;
    let ratingDescriptionText = "";
    if (average <= 1) {
        rating = 1;
        ratingDescriptionText = "You gotta do better than that!";
    } else if (average > 1 && average <= 2) {
        rating = 2;
        ratingDescriptionText = "not too bad, but could be better";
    } else if (average > 2) {
        rating = 3;
        ratingDescriptionText = "Great job!";
    }
    
    return {
        periodLength: exercises.length,
        trainingDays: exercises.filter(exercise => exercise > 0).length,
        success: average > trainingTarget,
        rating: rating,
        ratingDescription: ratingDescriptionText,
        target: trainingTarget,
        average: average,
    }
}
if (process.argv[1] === import.meta.filename) {
    try {
        const {exercises, trainingTarget} = parseArguments(process.argv);
        console.log(calculateExercises(exercises, trainingTarget));
    } catch (error: unknown) {
        console.log(error)
    }
}

export default calculateExercises