// @flow
import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import {Div} from 'glamorous';
import {small} from 'components/theme';
import Legend from 'components/atoms/Legend';
import Chart from 'components/atoms/Chart';
import {TabsNoData, TabsP, HeaderTitle} from 'components/atoms/TabsText';
import TabsToolTip from 'components/molecules/TabsToolTip';
import type {PageUnit} from 'components/organisms/PagesData';
import {getPageUnitById} from 'components/organisms/PagesData';
import { NoData } from 'lib/utils/constants';

type Props = {
  ...TabDataQuery,
  config: any,
  pagesData: PageUnit[],
};

const Government = (props: Props) => {
  const getPageLine = getPageUnitById(props.pagesData);
  const totalrevenueCtry = getPageLine('totalrevenue-ctry');
  const govtRevenueExternal = getPageLine('govt-revenue-external');
  const ctryExpenditure = getPageLine('ctry-expenditure');
  if (!props.governmentFinance) throw new Error('No Government Finance data');
  const governmentFinance = props.governmentFinance;
  return (
    <Container>
      <Grid textAlign={'center'}>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {totalrevenueCtry.title ? totalrevenueCtry.title.toUpperCase() : ''}
            {governmentFinance.totalRevenue && governmentFinance.totalRevenue.toolTip
              ? <TabsToolTip {...governmentFinance.totalRevenue.toolTip} />
              : ''}
          </HeaderTitle>
          <TabsP>
            {governmentFinance.totalRevenue && governmentFinance.totalRevenue.value
              ? governmentFinance.totalRevenue.value
              : NoData}
          </TabsP>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {govtRevenueExternal.title}
            {governmentFinance.grantsAsPcOfRevenue && governmentFinance.grantsAsPcOfRevenue.toolTip
              ? <TabsToolTip {...governmentFinance.grantsAsPcOfRevenue.toolTip} />
              : ''}
          </HeaderTitle>
          <TabsP>
            {governmentFinance.grantsAsPcOfRevenue && governmentFinance.grantsAsPcOfRevenue.value
            && Number(governmentFinance.grantsAsPcOfRevenue.value) ?
              `${governmentFinance.grantsAsPcOfRevenue.value}%`
              : NoData}
          </TabsP>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {ctryExpenditure.title}
            {governmentFinance.spendingAllocation && governmentFinance.spendingAllocation.toolTip
              ? <TabsToolTip {...governmentFinance.spendingAllocation.toolTip} />
              : ''}
          </HeaderTitle>
          {governmentFinance.spendingAllocation &&
          governmentFinance.spendingAllocation.data &&
          governmentFinance.spendingAllocation.data.length ?
            <Grid>
              <Grid.Column width="2" />
              <Grid.Column width="6">
                <Chart
                  config={props.config.spendingAllocation}
                  data={governmentFinance.spendingAllocation.data}
                  height="140px"
                />
              </Grid.Column>
              <Grid.Column width="8">
                <Div fontSize={small} marginTop="2em">
                  {governmentFinance.spendingAllocation.data.map((d: Object) =>
                    (<Legend
                      key={`${d.color}-${d.value}`}
                      color={d.color}
                    >
                      <span><span /></span>
                      <span>{d[props.config.spendingAllocation.circular.label]}</span>
                    </Legend>)
                  )}
                </Div>
              </Grid.Column>
            </Grid>
            : <TabsNoData />}
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Government;