import { NewPatientSchema, type NewPatient } from './types.ts';

const parseNewPatient = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};

export default parseNewPatient;