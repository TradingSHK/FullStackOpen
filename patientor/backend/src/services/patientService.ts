import patients from "../../data/PatientsEntries.ts";
import { type NonSSNPatient, type NewPatient, type Patient } from "../types.ts";
import { v1 as uuid } from 'uuid';

const getPatients = (): NonSSNPatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const findById = (id: string): Patient | undefined => {
    const patient = patients.find(p => p.id === id);
    return patient;
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient
    };

    patients.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    addPatient,
    findById
};