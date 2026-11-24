import express, { type Request, type Response } from 'express';
import type { NewPatient, NonSSNPatient, Patient } from '../types.ts';
import patientService from '../services/patientService.ts';
import { errorMiddleware, newPatientParser } from '../middleware.ts';

const router = express.Router();

router.get("/", (_req, res: Response<NonSSNPatient[]>) => {
    res.send(patientService.getPatients());
});

router.get("/:id", (req: Request<{ id: string }>, res: Response<Patient>) => {
    const patient = patientService.findById(req.params.id);

    if(patient) {
        res.send(patient);
    } else {
        res.sendStatus(404);
    }
});

router.post("/", newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>)=> {
    const addedEntry = patientService.addPatient(req.body);
    res.json(addedEntry);
});

router.use(errorMiddleware);

export default router;