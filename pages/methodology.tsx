import * as React from 'react';
import { rehydrate } from 'glamor';
import App from '../src/components/templates/Methodology';

// Adds server generated styles to glamor cache.
// Has to run before any `style()` calls
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
  rehydrate((window as any).__NEXT_DATA__.ids);
}

export default () => {
  return <App />;
};
