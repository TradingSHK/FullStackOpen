import express, { type Response} from 'express';
import type { NonSSNPatient } from '../types.ts';
import patientService from '../services/patientService.ts';
import parseNewPatient from '../utils.ts';

const router = express.Router();

router.get("/", (_req, res: Response<NonSSNPatient[]>) => {
    res.send(patientService.getPatients());
});

router.post("/", (req, res) => {
    const addedEntry = patientService.addPatient(parseNewPatient(req.body));
    res.json(addedEntry);
});

export default router;