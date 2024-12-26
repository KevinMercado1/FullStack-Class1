import '@testing-library/jest-dom';
import { configure } from '@testing-library/dom';
// Import necessary testing utilities
import { beforeAll, afterEach, afterAll } from '@jest/globals';

// Configure testing library
configure({ testIdAttribute: 'data-testid' });

// Setup React 18 specific configurations
global.ResizeObserver = jest.fn().mockImplementation(() => ({
observe: jest.fn(),
unobserve: jest.fn(),
disconnect: jest.fn(),
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
writable: true,
value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
})),
});

// Setup more comprehensive navigator mock
const mockNavigator = {
clipboard: {
    writeText: jest.fn(() => Promise.resolve()),
    readText: jest.fn(() => Promise.resolve('')),
},
userAgent: 'test-agent',
language: 'en-US',
languages: ['en-US', 'en'],
onLine: true,
};

Object.defineProperty(window, 'navigator', {
value: mockNavigator,
writable: true,
configurable: true,
});

// Clean up after each test
afterEach(() => {
jest.clearAllMocks();
});
