/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender, NewEntry, BaseEntry, SickLeave, Discharge, HealthCheckRating } from "./types";
import { isString, isArray } from "util";

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isDate = (param: any): boolean => {
  return Boolean(Date.parse(param));
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseName = (name: any) => {
  if (!name || !isString(name)) {
    throw new Error('incorrect or missing name: ' + (name as string));
  }
  return name;
};

const parseDateOfBirth = (dateOfBirth: any) => {
  console.log(isDate(dateOfBirth));
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('incorrect or missing date of birth: ' + (dateOfBirth as string));
  }
  return dateOfBirth;
};

const parseSsn = (ssn: any) => {
  if (!ssn || !isString(ssn)) {
    throw new Error('incorrect or missing date of social security number: ' + (ssn as string));
  }
  return ssn;
};

const parseGender = (gender: any) => {
  if (!gender || !isGender(gender)) {
    throw new Error('incorrect or missing gender: ' + (gender as string));
  }
  return gender;
};
const parseOccupation = (occupation: any) => {
  if (!occupation || !isString(occupation)) {
    throw new Error('incorrect or missing occupation: ' + (occupation as string));
  }
  return occupation;
};

export const toNewPatientEntry = (object: any): NewPatient => {
  const newPatientEntry: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation)
  };
  return newPatientEntry;
};

const parseDescription = (description: any) => {
  if (!description || !isString(description)) {
    throw new Error('invalid or missing description: ' + (description as string));
  }
  return description;
};
const parseDate = (date: any) => {
  if (!date || !isString(date)) {
    throw new Error('invalid or missing date: ' + (date as string));
  }
  return date;
};
const parseSpecialist = (specialist: any) => {
  if (!specialist || !isString(specialist)) {
    throw new Error('invalid or missing specialist: ' + (specialist as string));
  }
  return specialist;
};

const parseDiagnosisCodes = (diagnosisCodes: any) => {
  if (!isArray(diagnosisCodes) || diagnosisCodes.some(value => !isString(value))) {
    throw new Error('invalid or missing DiagnosisCodes: ' + (diagnosisCodes as string));
  }
  return diagnosisCodes as string[];
};
const parseEmployerName = (employerName: any) => {
  if (!employerName || !isString(employerName)) {
    throw new Error('invalid or missing employerName: ' + (employerName as string));
  }
  return employerName;
};
const parseSickLeave = (sickLeave: any) => {
  if (!sickLeave) return undefined;
  if (!sickLeave.startDate || !isString(sickLeave.startDate)) {
    throw new Error('invalid or missing startDate of sickLeave: ' + (sickLeave.stertDate as string));
  }
  if (!sickLeave.endDate || !isString(sickLeave.endDate)) {
    throw new Error('invalid or missing startDate of sickLeave: ' + (sickLeave.endDate as string));
  }
  return sickLeave as SickLeave;
};

const parseDischarge = (discharge: any) => {
  if (!discharge) throw new Error('missigng discharge ');
  if (!discharge.date || !isString(discharge.date)) {
    throw new Error('invalid or missing discharge date: ' + (discharge.date as string));
  }
  if (!discharge.criteria || !isString(discharge.criteria)) {
    throw new Error('invalid or missing discharge criteria: ' + (discharge.criteria as string));
  }
  return discharge as Discharge;
};

const parseHealtCheckRating  = (healthCheckRating: any) => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('invalid or missing healthCheckRating');
  }
  return healthCheckRating;
};

export const toNewEntry = (object: any): NewEntry => {
  const newEntry: Omit<BaseEntry, 'id'> = {
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
  };
  switch (object.type) {
    case 'OccupationalHealthcare': {
      return { 
        ...newEntry,
        type: 'OccupationalHealthcare',
        employerName: parseEmployerName(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave)
      };
    }
    case 'Hospital': {
      return {
        ...newEntry,
        type: 'Hospital',
        discharge: parseDischarge(object.discharge)
      };
    }
    case 'HealthCheck': {
      return {
        ...newEntry,
        type: 'HealthCheck',
        healthCheckRating: parseHealtCheckRating(object.healthCheckRating)
      };
    }
    default:
      throw new Error('invalid or missing type' + (object.type as string));
  }
};
