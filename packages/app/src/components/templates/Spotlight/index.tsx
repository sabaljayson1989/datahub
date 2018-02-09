// @flow
/* eslint-disable no-useless-constructor */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import * as React from 'react';
import { Div } from 'glamorous';
import { Container, Grid, Icon} from 'semantic-ui-react';
import SpotLightNavTabsKe from '../../organisms/NavBarTabs/spotlightKe';
import SpotLightNavTabsUg from '../../organisms/NavBarTabs/spotlightUg';
import { MapBackground } from '@devinit/dh-ui/lib/atoms/Backgrounds';
import dynamic from 'next/dynamic';
import About from '@devinit/dh-ui/lib/molecules/About';
import { cacheMapData, capitalize } from '@devinit/dh-base/lib/utils';
import {StateToShare} from '@devinit/dh-ui/lib/molecules/ChartShare';
import Generic from '../Generic';

const DynamicMapComponent = dynamic(
  import('../../organisms/Map'), {
    ssr: false,
    loading: () => <MapBackground />
  });

interface Props  {
  pathname: string;
  id: string;
  state: StateToShare;
  // rehydrated: boolean,
}

export default class Spotlight extends React.Component {
  public countryName: string;
  constructor(props: Props) {
    super(props);
  }
  public componentDidMount() {
    cacheMapData(`/worker_${this.props.id}.js`);
  }
  public render() {
    const countryName = capitalize(this.props.id);
    const region = this.props.id === 'uganda' ? 'district' : 'country';
    return (
      <Generic pathname={this.props.pathname} >
        <Container>
          <Div paddingTop={'4em'} paddingBottom={'4em'}>
            <Grid centered>
              <Grid.Column width={12} textAlign="center">
                <b>
                  <Icon name="pie graph" /> Spotlight on {countryName} {' '}
                </b>
                is a comprehensive source of {countryName}'s financial resource flow data at the
                sub-national ({region}) level, alongside indicators on poverty, population, education,
                health, water, hygiene and sanitation. It highlights the geographical variance in
                sector performance and financial resources, and seeks to answer whether resources are
                allocated according to need. Explore the country picture by selecting topics and click
                on a {region} for an in-depth profile.
              </Grid.Column>
            </Grid>
          </Div>
        </Container>
        {this.props.id === 'uganda' ?
          <SpotLightNavTabsUg state={this.props.state} />
          :
          <SpotLightNavTabsKe state={this.props.state} />
        }

        {
          process.env.NODE_ENV !== 'test' ?
            <DynamicMapComponent country={this.props.id} state={this.props.state} /> : ''
        }
        <About />
      </Generic>
    );
  }
}