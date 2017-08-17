// @flow
import React from 'react';
import { graphql } from 'react-apollo';
import config from 'visboxConfigs/areaTreemapChart';
import InternationalResourcesChart from 'components/molecules/AreaPartitionChart';
import type { Props } from 'components/molecules/AreaPartitionChart';
import LoadingBar from 'components/molecules/LoadingBar';
import {getCountryName} from 'lib/utils';
import QUERY from './query.graphql';

type WrapperProps = Props & {
  loading: boolean
};

const internationalResourcesChartWrapper = (props: WrapperProps) => {
  if (props.loading) return <LoadingBar loading={props.loading} />;
  return (
    <InternationalResourcesChart
      startYear={props.startYear}
      data={props.data}
      config={config}
      year={props.year} // look in countryProfile lower tabs
      chartId={props.chartId}
      country={props.country}
    />
  );
};

const withData = graphql(QUERY, {
  options: props => ({
    variables: {
      id: props.id,
    },
  }),
  props: ({ data }) => {
    const { error, loading } = data;
    if (error) throw new Error(error);
    return loading || !data.internationalResources
      ? { loading }
      : {
        country: getCountryName(data.variables.id),
        startYear: data.internationalResources.startYear,
        data: data.internationalResources.resourcesOverTime.data.map(d => ({
          ...d,
          flow_group: `${d.flow_category}-${d.flow_type}`,
        }))
      };
  },
});

export default withData(internationalResourcesChartWrapper);
