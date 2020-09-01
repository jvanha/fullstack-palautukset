import patientData from '../../data/patients';
import { Patient, NewPatient, PublicPatient, Entry, NewEntry } from '../types';

const patients: Array<Patient> = patientData;
//const patients: Array<Patient> = [];
const generateId = ():string => {
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
};
const getPatientEntries = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};
const getPatientEntryById = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};
const addNewPatientEntry = (patient: NewPatient): Patient => {
  const entries: Entry[] = [];
  const newPatientEntry: Patient = {
    id: generateId(),
    entries,
    ...patient
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addNewEntry = (newEntry: NewEntry, id: string): Entry => {
  const patient: Patient | undefined= getPatientEntryById(id);
  if (!patient) throw new Error('patient not found: ' + id);
  const entry: Entry = {
    id:generateId(),
    ...newEntry
  };
  patient.entries = patient.entries.concat(entry);
  return entry;
};

export default { getPatientEntries, addNewPatientEntry, getPatientEntryById, addNewEntry };