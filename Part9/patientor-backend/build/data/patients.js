"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const patients = [
    {
        id: '123',
        name: 'John Doe',
        dateOfBirth: '1991-04-15',
        ssn: '123-45-6789',
        gender: types_1.Gender.Male,
        occupation: 'Engineer',
        entries: [
            {
                id: '1',
                date: '2022-01-01',
                description: 'Regular checkup',
                specialist: 'Dr. Smith',
                type: types_1.EntryType.HealthCheck,
                healthCheckRating: 1,
            },
        ],
    },
    {
        id: 'd2773336-f723-11e9-8f0b-362b9e155667',
        name: 'John McClane',
        dateOfBirth: '1986-07-09',
        ssn: '090786-122X',
        gender: types_1.Gender.Male,
        occupation: 'New York City Cop',
        entries: [],
    },
    {
        id: 'd2773598-f723-11e9-8f0b-362b9e155667',
        name: 'Martin Riggs',
        dateOfBirth: '1979-01-30',
        ssn: '300179-77A',
        gender: types_1.Gender.Male,
        occupation: 'Cop',
        entries: [],
    },
    {
        id: 'd27736ec-f723-11e9-8f0b-362b9e155667',
        name: 'Hans Gruber',
        dateOfBirth: '1970-04-25',
        ssn: '250470-555L',
        gender: types_1.Gender.Other,
        occupation: 'Technician',
        entries: [],
    },
    {
        id: 'd2773822-f723-11e9-8f0b-362b9e155667',
        name: 'Dana Scully',
        dateOfBirth: '1974-01-05',
        ssn: '050174-432N',
        gender: types_1.Gender.Female,
        occupation: 'Forensic Pathologist',
        entries: [],
    },
    {
        id: 'd2773c6e-f723-11e9-8f0b-362b9e155667',
        name: 'Matti Luukkainen',
        dateOfBirth: '1971-04-09',
        ssn: '090471-8890',
        gender: types_1.Gender.Male,
        occupation: 'Digital Evangelist',
        entries: [],
    },
];
exports.default = patients;
