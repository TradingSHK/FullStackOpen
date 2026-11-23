import diagnosis from "../../data/DiagnosisEntries.ts";
import type { Diagnosis } from "../types.ts";

const getDiagnosis = (): Diagnosis[] => {
    return diagnosis;
};

const addDiagnosis = () => {
    return null;
};

export default {
    getDiagnosis,
    addDiagnosis
};