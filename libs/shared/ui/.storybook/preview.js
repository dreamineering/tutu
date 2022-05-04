// TODO: problematic as it causes circular dependencies & memory overflows
// when executing the migration scripts
/* eslint-disable no-import-assign */
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import './tailwind-imports.css';
import * as NextImage from 'next/image';

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

// Storybook executes this module in both bootstap phase (Node)
// and a story's runtime (browser). However, cannot call `setupWorker`
// in Node environment, so need to check if we're in a browser.
if (typeof global.process === 'undefined') {
  // note: we must use relative imports here
  const { worker } = require('../src/test/mocks/browser');
  // Start the mocking when each story is loaded.
  // Repetitive calls to the `.start()` method do not register a new worker,
  // but check whether there's an existing once, reusing it, if so.
  worker.start();
}
