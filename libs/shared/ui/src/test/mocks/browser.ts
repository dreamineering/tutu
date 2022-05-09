// lib/util-testing/src/lib/mocks/browser.ts
import { setupWorker, SetupWorkerApi } from 'msw';

import { handlers } from './handlers';

// this configures a browser service work with our mocked request handlers
export const worker: SetupWorkerApi = setupWorker(...handlers);
