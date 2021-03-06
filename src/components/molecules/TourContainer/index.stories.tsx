import * as React from 'react';
import { storiesOf } from '@storybook/react';
// import UnbundlingAidTour from 'components/atoms/UnbundlingAidTour';
import GovernmentFinanceTour from '../../atoms/GovernmentFinanceTour';
// import GlobalVisualizationTour from '../MapTour';
import Tour from '.';

storiesOf('Tour', module)
  .add('Government tour', () =>
    (<Tour visible>
      <GovernmentFinanceTour />
    </Tour>),
  );
