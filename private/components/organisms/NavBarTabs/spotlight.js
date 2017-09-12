// @flow
import React from 'react';
import { changeSpotlightIndicator, changeLoadingStatus } from 'lib/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import type { SpotLightlIndicator} from 'lib/actions';
import type { State, Action } from 'lib/reducers';
import type { Props } from 'components/molecules/NavigationBarTabs';
import NavigationBarTabs from 'components/molecules/NavigationBarTabs';
import type {BoundAction, BoundState} from './types';
import data from './ug-data';

const mapDispatchToProps = (dispatch: Dispatch<Action>): BoundAction<SpotLightlIndicator> =>
  ({
    changeActiveIndicator: bindActionCreators(changeSpotlightIndicator, dispatch),
    changeLoadingStatus: bindActionCreators(changeLoadingStatus, dispatch),
  });

const mapStateToProps = ({ app }: State): BoundState =>
  ({ activeIndicator: app.spotlightIndicator, loading: app.loading });


const spotlightNavBarTabs = (props: Props<SpotLightlIndicator>) =>
  (<NavigationBarTabs
    navBarItems={data.spotlightThemes}
    showUsingThisViz
    loading={props.loading}
    changeActiveIndicator={props.changeActiveIndicator}
    changeLoadingStatus={props.changeLoadingStatus}
    activeIndicator={props.state && props.state.indicator ?
      props.state.indicator : props.activeIndicator}
  />);

export default connect(mapStateToProps, mapDispatchToProps)(spotlightNavBarTabs);