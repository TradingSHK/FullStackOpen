import express, { type Response} from 'express';
import type { NonSSNPatient } from '../types.ts';
import patientService from '../services/patientService.ts';

const router = express.Router();

router.get("/", (_req, res: Response<NonSSNPatient[]>) => {
    res.send(patientService.getPatients());
})

router.post("/", (req, res) => {
    const addedEntry = patientService.addPatient(req.body);  
    res.json(addedEntry);
});

export default router;