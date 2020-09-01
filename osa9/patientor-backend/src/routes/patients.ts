import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toNewEntry } from '../utils';
const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getPatientEntries());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry  = toNewPatientEntry(req.body);
    const addedPatientEntry = patientService.addNewPatientEntry(newPatientEntry);
    res.json(addedPatientEntry);
  } catch (e) {
    if (e instanceof Error) res.status(400).send(e.message);
    res.status(400);
  }
});

router.get('/:id', (req, res) => {
  res.json(patientService.getPatientEntryById(req.params.id));
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addNewEntry(newEntry, req.params.id);
    res.json(addedEntry);
  } catch (e) {
    if (e instanceof Error) res.status(400).send(e.message);
    res.status(400);
  }
});
export default router;
