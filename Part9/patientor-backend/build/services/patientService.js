"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../data/patients"));
const types_1 = require("../types");
const uuid_1 = require("uuid");
const getPatients = () => {
    return patients_1.default;
};
const getPatientById = (id) => {
    return patients_1.default.find((p) => p.id === id);
};
const addPatient = (patient) => {
    const newPatient = Object.assign({ id: (0, uuid_1.v4)() }, patient);
    patients_1.default.push(newPatient);
    return newPatient;
};
const isHospitalEntry = (entry) => {
    return entry.type === types_1.EntryType.Hospital && 'discharge' in entry;
};
const isHealthCheckEntry = (entry) => {
    return entry.type === types_1.EntryType.HealthCheck && 'healthCheckRating' in entry;
};
const isOccupationalHealthcareEntry = (entry) => {
    return entry.type === types_1.EntryType.OccupationalHealthcare && 'employerName' in entry;
};
const addEntry = (patientId, entry) => {
    const patient = patients_1.default.find((p) => p.id === patientId);
    if (!patient)
        return undefined;
    let newEntry;
    if (isHospitalEntry(entry)) {
        newEntry = Object.assign({ id: (0, uuid_1.v4)() }, entry);
    }
    else if (isHealthCheckEntry(entry)) {
        newEntry = Object.assign({ id: (0, uuid_1.v4)() }, entry);
    }
    else if (isOccupationalHealthcareEntry(entry)) {
        newEntry = Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, entry), (entry.sickLeave && { sickLeave: entry.sickLeave }));
    }
    else {
        throw new Error('Invalid entry type');
    }
    patient.entries.push(newEntry);
    return patient;
};
exports.default = {
    getPatients,
    getPatientById,
    addPatient,
    addEntry,
};
