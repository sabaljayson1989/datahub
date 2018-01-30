import React from 'react';
import { storiesOf } from '@storybook/react';
import withApolloProvider from 'lib/storybook-addon/apollo';
import config from 'visboxConfigs/unbundlingTreemapChart';
import Chart from '.';

// Let's see
storiesOf('Unbundling Aid', module)
  .addDecorator(withApolloProvider())
  .add('Chart', () => <Chart aidType={'oda'} startYear={2010} config={config} />);