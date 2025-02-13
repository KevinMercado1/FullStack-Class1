"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const uuid_1 = require("uuid");
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.json(patientService_1.default.getPatients());
});
router.get('/:id', (req, res) => {
    const patient = patientService_1.default.getPatientById(req.params.id);
    if (patient) {
        res.json(patient);
    }
    else {
        res.status(404).json({ error: 'Patient not found' });
    }
});
router.post('/', (req, res) => {
    try {
        const parsedPatient = utils_1.patientSchema.parse(req.body);
        const newPatient = {
            id: (0, uuid_1.v1)(),
            name: parsedPatient.name,
            dateOfBirth: new Date(parsedPatient.dateOfBirth).toISOString(),
            gender: parsedPatient.gender,
            occupation: parsedPatient.occupation,
            ssn: parsedPatient.ssn,
            entries: [],
        };
        const addedPatient = patientService_1.default.addPatient(newPatient);
        res.status(201).json(addedPatient);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({ error: 'Invalid data' });
        }
    }
});
router.post('/:id/entries', (async (req, res) => {
    try {
        const patient = patientService_1.default.getPatientById(req.params.id);
        if (!patient) {
            res.status(404).json({ error: 'Patient not found' });
            return;
        }
        const newEntry = (0, utils_1.toNewEntry)(req.body);
        const updatedPatient = patientService_1.default.addEntry(patient.id, newEntry);
        res.json(updatedPatient);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).json({ error: errorMessage });
    }
}));
exports.default = router;
