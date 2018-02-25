import * as React from 'react';
import {menueData} from './testData';
import { storiesOf } from '@storybook/react';
import Menu from '.';

storiesOf('Menu', module).add('Datahub Menu', () => <Menu menu={menueData.menu} />);
