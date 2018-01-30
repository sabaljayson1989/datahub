// @flow
import React from 'react';
import { LightBg } from 'components/atoms/Backgrounds';
import { graphql } from 'react-apollo';
import Chart from 'components/molecules/MultiLinePartition';
import {errorHandler} from 'lib/utils';
import config from 'visboxConfigs/linePartition';
import QUERY from './query.graphql';

const withData = graphql(QUERY, {
  options: props => ({
    variables: {
      id: props.id,
    },
  }),
  props: ({ data }) => {
    const { error, loading } = data;

    if (error) errorHandler(error, 'error in government finance chart');

    const {
      startYear,
      currencyCode,
      currencyUSD,
      expenditure = [],
      revenueAndGrants = [],
      finance = [],
    } = data.governmentFinance || {};
    return {
      loading,
      config,
      currencyCode,
      currencyUSD,
      startYear,
      items: [
        {
          title: 'Revenue And Grants',
          data: revenueAndGrants,
        },
        {
          title: 'Financing',
          inverted: true,
          withoutOptions: true,
          data: finance,
        },
        {
          title: 'Expenditure',
          data: expenditure,
        },
      ]
    };
  },
});

export default withData(props => <LightBg><Chart {...props} /></LightBg>);