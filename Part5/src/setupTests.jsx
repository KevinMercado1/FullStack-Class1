import '@testing-library/jest-dom';
import { configure } from '@testing-library/dom';

// Setup window and navigator mocks
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

// Mock navigator object
const mockNavigator = {
clipboard: {
    writeText: jest.fn(),
    readText: jest.fn(),
},
userAgent: 'test',
};

Object.defineProperty(window, 'navigator', {
value: mockNavigator,
writable: true,
});

// Configure testing library
configure({
testIdAttribute: 'data-testid',
});

