import express, { Request, Response } from 'express';
import patientService from '../services/patientService';
import { Patient, NewEntry } from '../types';
import { v1 as uuid } from 'uuid';
import { patientSchema, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  res.json(patientService.getPatients());
});

router.get('/:id', (req: Request<{ id: string }>, res: Response) => {
  const patient = patientService.getPatientById(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).json({ error: 'Patient not found' });
  }
});

router.post('/', (req: Request<unknown, unknown, Patient>, res: Response) => {
  try {
    const parsedPatient = patientSchema.parse(req.body);

    const newPatient: Patient = {
      id: uuid(),
      name: parsedPatient.name,
      dateOfBirth: new Date(parsedPatient.dateOfBirth).toISOString(),
      gender: parsedPatient.gender,
      occupation: parsedPatient.occupation,
      ssn: parsedPatient.ssn,
      entries: [],
    };

    const addedPatient = patientService.addPatient(newPatient);
    res.status(201).json(addedPatient);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Invalid data' });
    }
  }
});

router.post('/:id/entries', (async (req: Request<{id: string}, unknown, NewEntry>, res: Response): Promise<void> => {
try {
    const patient = patientService.getPatientById(req.params.id);
    if (!patient) {
    res.status(404).json({ error: 'Patient not found' });
    return;
    }

    const newEntry = toNewEntry(req.body);
    const updatedPatient = patientService.addEntry(patient.id, newEntry);
    res.json(updatedPatient);
} catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
    }
    res.status(400).json({ error: errorMessage });
}
}) as express.RequestHandler<{ id: string }, Patient | { error: string }, NewEntry>);

export default router;
