import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Automaticky vyčistí DOM po každém testu (prevence úniku paměti)
afterEach(() => {
    cleanup();
});