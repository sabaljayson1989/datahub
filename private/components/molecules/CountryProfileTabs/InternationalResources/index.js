// @flow
import {Container, Grid} from 'semantic-ui-react';
import React from 'react';
import Chart from 'components/atoms/Chart';
import {HeaderTitle, TabsFootNote, TabsNoData, TabsP} from 'components/atoms/TabsText';
import {NoData} from 'lib/utils/constants';
import TabsToolTip from 'components/molecules/TabsToolTip';
import type {PageUnit} from 'components/organisms/PagesData';
import {getPageUnitById} from 'components/organisms/PagesData';
import {Legend} from '../GovernmentFinance';

type Props = {
  ...TabDataQuery,
  config: any,
  pagesData: PageUnit[],
};
// TODO: move to separate file
const groupBy = (list, field) => {
  return list.reduce((all, d) => ({
    ...all,
    [d[field]]: [
      ...(all[d[field]] || []),
      d,
    ],
  }), {});
};

const getAggregatedSumOfResourcesOverTime = (data: any[]) =>
  [data]
    .map(list => {
      const groupedByYear = groupBy(list, 'year');

      const types: any = Object.keys(groupedByYear)
        .map(y => {
          const groupedByType = groupBy(groupedByYear[y], 'flow_type');

          return Object.keys(groupedByType).map(t =>
            groupedByType[t].reduce((s, d) => ({
              ...s,
              value: s.value + d.value
            }))
          );
        });
      return Object.keys(types).map(t => types[t]).reduce((all, d) => [...all, ...d], []);
    })
    .reduce((_, d) => d);

const International = (props: Props) => {
  const getPageLine = getPageUnitById(props.pagesData);
  const shareGniAllocatedToCtry = getPageLine('share-gni-allocated-to-ctry');
  const resourceInflow = getPageLine('resource-inflow');
  const mixtureOfResources = getPageLine('mixture-of-resources');
  if (!props.internationalResources) throw new Error('No international resources data');
  const internationalResources = props.internationalResources;
  const resourcesOverTime =
    internationalResources.resourcesOverTime && internationalResources.resourcesOverTime.data
      ? getAggregatedSumOfResourcesOverTime(internationalResources.resourcesOverTime.data)
      : null;
  return (
    <Container>
      <Grid textAlign={'center'}>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {shareGniAllocatedToCtry.title}
            {internationalResources.netODAOfGNIIn && internationalResources.netODAOfGNIIn.toolTip
              ? <TabsToolTip {...internationalResources.netODAOfGNIIn.toolTip} />
              : ''}
          </HeaderTitle>
          <TabsP>
            {internationalResources.netODAOfGNIIn && internationalResources.netODAOfGNIIn.value
            && Number(internationalResources.netODAOfGNIIn.value)
              ? `${internationalResources.netODAOfGNIIn.value}% of GNI`
              : NoData}
          </TabsP>
          <TabsFootNote>
            Gross national income is{' '}
            {internationalResources.GNI && internationalResources.GNI.value
              ? internationalResources.GNI.value
              : NoData}
          </TabsFootNote>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {resourceInflow.title }
            {internationalResources.resourcesOverTime &&
            internationalResources.resourcesOverTime.toolTip
              ? <TabsToolTip {...internationalResources.resourcesOverTime.toolTip} />
              : ''}
          </HeaderTitle>
          {resourcesOverTime
            ? <Chart
              config={props.config.resourcesOverTime}
              data={resourcesOverTime}
              height="140px"
            />
            : <TabsNoData />}
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {mixtureOfResources.title}
            {internationalResources.mixOfResources && internationalResources.mixOfResources.toolTip
              ? <TabsToolTip {...internationalResources.mixOfResources.toolTip} />
              : ''}
          </HeaderTitle>
          {internationalResources.mixOfResources && internationalResources.mixOfResources.data ?
            <Grid>
              <Grid.Column width="6">
                <Chart
                  config={props.config.mixOfResources}
                  data={internationalResources.mixOfResources.data}
                  height="140px"
                />
              </Grid.Column>
              <Grid.Column width="10">
                <div>
                  {internationalResources.mixOfResources.data.map((d, i) =>
                    (<Legend
                      color={props.config.mixOfResources.colors[i]}
                      key={`${d[props.config.mixOfResources.circular.label]}_${props.config.mixOfResources.colors[i]}`}
                    >
                      <span><span /></span>
                      <span>{d[props.config.mixOfResources.circular.label]}</span>
                    </Legend>)
                  )}
                </div>
              </Grid.Column>
            </Grid>
            : <TabsNoData />}
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default International;
