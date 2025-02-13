"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = exports.toNewPatient = exports.patientSchema = void 0;
const types_1 = require("./types");
const zod_1 = require("zod");
const types_2 = require("./types");
exports.patientSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: 'Name is required' }),
    dateOfBirth: zod_1.z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: 'Invalid date of birth',
    }),
    gender: zod_1.z.nativeEnum(types_1.Gender, {
        errorMap: () => ({ message: 'Invalid gender' }),
    }),
    occupation: zod_1.z.string().min(1, { message: 'Occupation is required' }),
    ssn: zod_1.z.string().min(1, { message: 'SSN is required' }),
});
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
const parseName = (name) => {
    if (!name || typeof name !== 'string') {
        throw new Error('Incorrect or missing name');
    }
    return name;
};
const parseDateOfBirth = (dateOfBirth) => {
    if (!dateOfBirth ||
        typeof dateOfBirth !== 'string' ||
        isNaN(Date.parse(dateOfBirth))) {
        throw new Error('Incorrect or missing date of birth');
    }
    return new Date(dateOfBirth).toISOString();
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!occupation || typeof occupation !== 'string') {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};
const parseSsn = (ssn) => {
    if (!ssn || typeof ssn !== 'string') {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};
const toNewPatient = (object) => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        ssn: parseSsn(object.ssn),
        entries: [],
    };
};
exports.toNewPatient = toNewPatient;
const entrySchema = zod_1.z.object({
    type: zod_1.z.nativeEnum(types_2.EntryType),
});
const toNewEntry = (object) => {
    const parsedEntry = entrySchema.safeParse(object);
    if (!parsedEntry.success) {
        throw new Error(`Invalid entry data: ${parsedEntry.error.message}`);
    }
    return object;
};
exports.toNewEntry = toNewEntry;
