/* @flow */
//  This file was automatically generated and should not be edited.

export type CountriesQuery = {|
  countries: ? Array< {|
    id: ?string,
    name: ?string,
  |} >,
|};

export type ResourcesOverTimeQueryVariables = {|
  id: string,
|};

export type ResourcesOverTimeQuery = {|
  internationalResources: ? {|
    // for sidebar chart in international resources section & area partition tree chart default data
    // & line chart in the  tabs section
    resourcesOverTime: ? Array< {|
      year: number,
      value: number,
      flow_name: string,
      // Category i.e FDI, ODA
      flow_category: ?string,
      // flow either inflow or outflow
      flow_type: ?string,
      // in or out
      direction: ?string,
      color: ?string,
    |} >,
  |},
|};

export type TabDataQueryVariables = {|
  id: string,
|};

export type TabDataQuery = {|
  governmentFinance: ? {|
    // Total revenue for a particular year if not available return -1
    // uses gdp
    totalRevenue: ?string,
    grantsAsPcOfRevenue: ?string,
    // for donut chart
    spendingAllocation: ? Array< {|
      value: ?number,
      name: ?string,
      color: ?string,
    |} >,
    // for treemap
    // such as constant 2015 USD for tree map
    currencyCode: ?string,
    // use resourcesRecipient sql
    expenditure: ? Array< {|
      // eg Actual or budget
      budgetType: ?string,
      // eg total_revenue and grants --> l1
      type: ?string,
      // eg revenue --> l2
      parentCategory: ?string,
      // eg tax revenue --> l3
      category: ?string,
      // eg value-added tax  --> l4
      subCategory: ?string,
      year: ?number,
      value: ?number,
      valueNcu: ?number,
    |} >,
    revenueAndGrants: ? Array< {|
      // eg Actual or budget
      budgetType: ?string,
      // eg total_revenue and grants --> l1
      type: ?string,
      // eg revenue --> l2
      parentCategory: ?string,
      // eg tax revenue --> l3
      category: ?string,
      // eg value-added tax  --> l4
      subCategory: ?string,
      year: ?number,
      value: ?number,
      valueNcu: ?number,
    |} >,
    finance: ? Array< {|
      // eg Actual or budget
      budgetType: ?string,
      // eg total_revenue and grants --> l1
      type: ?string,
      // eg revenue --> l2
      parentCategory: ?string,
      // eg tax revenue --> l3
      category: ?string,
      // eg value-added tax  --> l4
      subCategory: ?string,
      year: ?number,
      value: ?number,
      valueNcu: ?number,
    |} >,
  |},
  povertyTab: ? {|
    // Poverty reduction over time area chart trend
    poverty190Trend: ? Array< {|
      id: ?string,
      year: ?number,
      value: ?number,
      name: ?string,
    |} >,
    // how deep is poverty %
    depthOfExtremePoverty: ?string,
    // Recipients: how income is distributed, % of income received by each quintil
    incomeDistTrend: ? Array< {|
      value: ?number,
      quintileName: ?string,
    |} >,
  |},
  populationTab: ? {|
    // total population in a country
    population: ?string,
    // Urban vs Rural population level
    populationDistribution: ? Array< {|
      group: ?string,
      value: ?number,
      year: ?number,
    |} >,
    // Number of people in 3 age bands (65+, 15- 65, 0 - 14)
    populationPerAgeBand: ? Array< {|
      band: ?string,
      value: ?number,
      year: ?number,
    |} >,
  |},
  internationalResources: ? {|
    // Gross National Income
    GNI: ?string,
    // Net ODA received, % of GNI for recipient countries
    netODAOfGNIIn: ?string,
    // Net ODA out, % of GNI for recipient countries
    netODAOfGNIOut: ?string,
    // Whats the mix of resources can be for donors (out flows) or receipient (in flows)
    // this is for the donut chart
    mixOfResources: ? Array< {|
      flow_name: string,
      value: number,
    |} >,
    // for sidebar chart in international resources section & area partition tree chart default data
    // & line chart in the  tabs section
    resourcesOverTime: ? Array< {|
      // Category i.e FDI, ODA
      flow_category: ?string,
      value: number,
    |} >,
  |},
|};