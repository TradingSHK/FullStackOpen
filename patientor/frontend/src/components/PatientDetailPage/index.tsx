import { useEffect, useState } from "react";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import { Patient } from "../../types";
import patientService from "../../services/patients";

type PatientLoadState =
  | { id: string; patient: Patient }
  | { id: string; error: string };

const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<PatientLoadState>();

  useEffect(() => {
    if (!id) {
      return;
    }

    let active = true;

    patientService.getById(id)
      .then((loadedPatient) => {
        if (active) {
          setResult({ id, patient: loadedPatient });
        }
      })
      .catch((loadError: unknown) => {
        console.error("Failed to load patient", loadError);
        if (active) {
          setResult({ id, error: "Unable to load patient" });
        }
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (!id) {
    return <Alert severity="error">Patient ID is missing</Alert>;
  }

  if (!result || result.id !== id) {
    return <CircularProgress aria-label="Loading patient" />;
  }

  if ("error" in result) {
    return <Alert severity="error">{result.error}</Alert>;
  }

  const { patient } = result;

  return (
    <Box>
      <Typography variant="h4" component="h1">
        {patient.name}
      </Typography>
      {patient.ssn && <Typography>SSN: {patient.ssn}</Typography>}
      {patient.dateOfBirth && <Typography>Date of birth: {patient.dateOfBirth}</Typography>}
      <Typography>Occupation: {patient.occupation}</Typography>
      <Typography>Gender: {patient.gender}</Typography>
    </Box>
  );
};

export default PatientDetailPage;
