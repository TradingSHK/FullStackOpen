import express from 'express';
import calculateBmi from "./bmiCalculator.ts";
import calculateExercises from './exerciseCalculator.ts';
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!");
})

app.get("/bmi", (req, res) => {
    const query = req.query;
    const height = query["height"];
    const weight = query["weight"];
    if(!(!isNaN(Number(height)) && !isNaN(Number(weight)))) {
        res.status(400).json({"error": "malformatted pattern"});
        return;
    }
    const bmi: string = calculateBmi(Number(height), Number(weight));
    const resultReturn = {"weight": weight, "height": height, "bmi": bmi};
    return res.send(resultReturn);
})

app.post("/exercises", (req, res) => {
    const body = req.body;
    const daily_exercises = body["daily_exercises"];
    const target = body["target"];

    if(!target || !daily_exercises) {
        return res.status(400).json({"error": "parameters missing"});
    }

    if(isNaN(Number(target))|| daily_exercises.some(isNaN)) {       
        return res.status(400).json({"error": "malformatted parameters"});
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return res.send(calculateExercises(daily_exercises, Number(target)));
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);    
}) 