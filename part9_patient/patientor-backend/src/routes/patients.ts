import express, { Request, Response } from 'express';
import patientService from '../services/patientService';
import { NewPatientSchema } from '../utils/zodSchemas';
import toNewEntry from "../utils/entryParser";

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  res.json(patientService.getPatients());
});

router.get('/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  const patient = patientService.getPatientById(id);

  if (!patient) {
    return res.status(404).json({ error: 'Patient not found' });
  }

  res.json(patient);
});

router.post('/', (req: Request, res: Response) => {
  try {
    const parsedData = NewPatientSchema.parse(req.body);
    const addedPatient = patientService.addPatient(parsedData);
    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof Error && 'issues' in error) {
      return res.status(400).json({
        error: 'Validation error',
        details: (error as any).issues,
      });
    }
    return res.status(400).json({ error: 'Failed to add patient' });
  }
});

router.post("/:id/entries", (req, res) => {
    try {
      const newEntry = toNewEntry(req.body);
      const addedEntry = patientService.addEntry(req.params.id, newEntry);
  
      if (!addedEntry) {
        return res.status(404).json({ error: "Patient not found" });
      }
  
      res.json(addedEntry);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).send({ error: error.message });
      } else {
        res.status(400).send({ error: "Something went wrong" });
      }
    }
  });

export default router;
