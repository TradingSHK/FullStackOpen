interface BmiValues {
    height: number,
    weight: number,
}

const parseArguments = (args: string[]): BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
    
    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

const calculateBmi = (height: number, weight: number): string => {    
    if (height <= 0 || weight <= 0) {
        throw new Error("Both height and weight must be greater than 0");
    }
    let heightInM = height / 100
    let bmi = weight/(heightInM*heightInM)    

    if (bmi < 16) {
        return "Underweight (Severe thinness)";
    } else if (bmi >= 16 && bmi < 17) {
        return "Underweight (Moderate thinness)";
    } else if (bmi >= 17 && bmi < 18.5) {
        return "Underweight (Mild thinness)";
    } else if (bmi >= 18.5 && bmi < 25) {
        return "Normal range";
    } else if (bmi >= 25 && bmi < 30) {
        return "Overweight (Pre-obese)";
    } else if (bmi >= 30 && bmi < 35) {
        return "Obese (Class I)";
    } else if (bmi >= 35 && bmi < 40) {
        return "Obese (Class II)";
    } else {
        return "Obese (Class III)";
    }
}

try {
    const {weight, height} = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    console.log(error)
}