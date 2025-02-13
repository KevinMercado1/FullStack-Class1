import patientsData from '../data/patients';
import { Patient, Entry, NewEntry, EntryType } from '../types';
import { v4 as uuidv4 } from 'uuid';

const getPatients = (): Patient[] => {
  return patientsData;
};

const getPatientById = (id: string): Patient | undefined => {
  return patientsData.find((p) => p.id === id);
};

const addPatient = (patient: Omit<Patient, 'id'>): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patient,
  };
  patientsData.push(newPatient);
  return newPatient;
};

const isHospitalEntry = (entry: NewEntry): entry is NewEntry & { type: EntryType.Hospital; discharge: { date: string; criteria: string } } => {
return entry.type === EntryType.Hospital && 'discharge' in entry;
};

const isHealthCheckEntry = (entry: NewEntry): entry is NewEntry & { type: EntryType.HealthCheck; healthCheckRating: number } => {
return entry.type === EntryType.HealthCheck && 'healthCheckRating' in entry;
};

const isOccupationalHealthcareEntry = (entry: NewEntry): entry is NewEntry & { 
    type: EntryType.OccupationalHealthcare; 
    employerName: string;
    sickLeave?: { 
        startDate: string; 
        endDate: string; 
    };
} => {
    return entry.type === EntryType.OccupationalHealthcare && 'employerName' in entry;
};

const addEntry = (patientId: string, entry: NewEntry): Patient | undefined => {
const patient = patientsData.find((p) => p.id === patientId);
if (!patient) return undefined;

let newEntry: Entry;

if (isHospitalEntry(entry)) {
    newEntry = {
        id: uuidv4(),
        ...entry,
    };
} else if (isHealthCheckEntry(entry)) {
    newEntry = {
        id: uuidv4(),
        ...entry,
    };
} else if (isOccupationalHealthcareEntry(entry)) {
    newEntry = {
        id: uuidv4(),
        ...entry,
        ...(entry.sickLeave && { sickLeave: entry.sickLeave }),
    };
} else {
    throw new Error('Invalid entry type');
}

patient.entries.push(newEntry);
return patient;
};

export default {
  getPatients,
  getPatientById,
  addPatient,
  addEntry,
};
