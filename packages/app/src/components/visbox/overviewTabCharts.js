// @flow
import {red } from 'components/theme/semantic';

export type OverviewChartConfigs = {
  area: any,
  histogram: any,
};
export const area = {
  type: 'timearea',
  colors: [red],
  linearAxis: {
    showAxis: true,
    indicator: 'value',
    axisMargin: 0,
    ticking: 'sparse',
  },
  timeAxis: {
    showAxis: true,
    indicator: 'year',
    ticking: 'years',
    tickingStep: 20,
    axisMinimum: 1980,
    axisMaximum: 2015,
  },
  time: {
    interpolate: true,
  }
};

export const histogram = {
  type: 'bar',
  colors: ['#a0979d'],
  coloring: 'color',
  labeling: {
    showLabels: true,
    suffix: '%',
  },
  linearAxis: {
    showAxis: false,
    indicator: 'value',
    // suffix: '%',
  },
  categoryAxis: {
    indicator: 'quintileName',
    ticking: 'end',
    innerPadding: 0.2,
  },
};

export default { area, histogram };