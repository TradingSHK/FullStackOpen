interface ExerciseResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
