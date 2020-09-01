export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: string[];
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

interface OccupationalHealthCareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: SickLeave;
}

export interface Discharge {
  date: string;
  criteria: string;
}

interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: Discharge;
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}
export type Entry =
  | HospitalEntry
  | OccupationalHealthCareEntry
  | HealthCheckEntry;

export type NewOccupationalHealthcareEntry = Omit<OccupationalHealthCareEntry, 'id'>;
export type NewHospitalEntry = Omit<HospitalEntry, 'id'>;
export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;
export type NewEntry = 
  | NewOccupationalHealthcareEntry
  | NewHospitalEntry
  | NewHealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export type NewPatient = Omit<Patient, 'id' | 'entries'>;
export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;