import { Gender, Patient } from './types';
import { z } from 'zod';
import { NewEntry, EntryType } from './types';

export const patientSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date of birth',
  }),
  gender: z.nativeEnum(Gender, {
    errorMap: () => ({ message: 'Invalid gender' }),
  }),
  occupation: z.string().min(1, { message: 'Occupation is required' }),
  ssn: z.string().min(1, { message: 'SSN is required' }),
});

export type NewPatient = z.infer<typeof patientSchema>;

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseName = (name: unknown): string => {
  if (!name || typeof name !== 'string') {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (
    !dateOfBirth ||
    typeof dateOfBirth !== 'string' ||
    isNaN(Date.parse(dateOfBirth))
  ) {
    throw new Error('Incorrect or missing date of birth');
  }
  return new Date(dateOfBirth).toISOString();
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || typeof occupation !== 'string') {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || typeof ssn !== 'string') {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

export const toNewPatient = (object: any): Omit<Patient, 'id'> => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    ssn: parseSsn(object.ssn),
    entries: [],
  };
};

const entrySchema = z.object({
  type: z.nativeEnum(EntryType),
});

const toNewEntry = (object: unknown): NewEntry => {
  const parsedEntry = entrySchema.safeParse(object);
  if (!parsedEntry.success) {
    throw new Error(`Invalid entry data: ${parsedEntry.error.message}`);
  }
  return object as NewEntry;
};

export { toNewEntry };
