import express from 'express';
import calculateBmi from "./bmiCalculator.ts";
import calculateExercises from './exerciseCalculator.ts';
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
    const query = req.query;
    const height = query["height"];
    const weight = query["weight"];
    if (!(!isNaN(Number(height)) && !isNaN(Number(weight)))) {
        res.status(400).json({"error": "malformatted pattern"});
        return;
    }
    const bmi: string = calculateBmi(Number(height), Number(weight));
    const resultReturn = {"weight": weight, "height": height, "bmi": bmi};
    return res.send(resultReturn);
});

app.post("/exercises", (req, res) => {
    const body: unknown = req.body;
    if (
        typeof body !== "object" ||
        body === null ||
        !("target" in body) ||
        !("daily_exercises" in body)
    ) {
        return res.status(400).json({ error: "parameters missing" });
    }

    const { daily_exercises, target } = body;
    if (!target || !daily_exercises) {
        return res.status(400).json({ error: "parameters missing" });
    }

    if (
        !Array.isArray(daily_exercises) ||
        isNaN(Number(target)) ||
        daily_exercises.some((exercise: unknown) => isNaN(Number(exercise)))
    ) {
        return res.status(400).json({ error: "malformatted parameters" });
    }
    return res.send(
        calculateExercises(daily_exercises.map(Number), Number(target))
    );
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});