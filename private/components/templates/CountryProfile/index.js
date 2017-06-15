import React from 'react';
import glamorous from 'glamorous';
import { Container, Header, Grid, Icon, Button } from 'semantic-ui-react';
import { red } from 'components/theme/semantic';
import Tabs from 'components/atoms/Tabs';
import Pane from 'components/atoms/Tabs/Pane';
import Overview from 'components/atoms/CountryProfiles/OverviewTab';
import PovertyTab from 'components/atoms/CountryProfiles/PovertyTab';
import PopulationTab from 'components/atoms/CountryProfiles/PopulationTab';
import GovernmentFinance from 'components/atoms/CountryProfiles/GovernmentFinanceTab';
import InternationalResourcesTab from 'components/atoms/CountryProfiles/InternationalResourcesTab';
import {SectionHeader} from 'components/atoms/CountryProfiles/Common';

import Generic from '../Generic';
import SearchInput from '../../molecules/SearchInput';

const cardStyles = {
  background: 'rgba(255,255,255,.6)',
  boxShadow: '0 1px 4px rgba(0,0,0,.1)',
  paddingLeft: '1.5em',
  paddingRight: '1.5em',
  paddingBottom: '1.5em',
  paddingTop: '1.5em',
  overflow: 'visible',
};

const CardContainer = glamorous.div(cardStyles);

const SocialIconsContainer = glamorous.div({
  marginTop: '1.5em'
});
const UpperContainer = glamorous.div({
  borderBottom: '2px solid #ddd9dc',
  marginBottom: '.2em',
});
const HeaderContainer = glamorous.div({
  paddingTop: '4em',
  paddingBottom: '4em'
});

const JumpToResource = glamorous.span({
  marginTop: '1.5em',
  display: 'block',
  '& a': {
    color: red
  }
});

export default () =>
  (<Generic pathName="/aid">
    <UpperContainer>
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              <CardContainer>
                <Header>
                  <Icon name="globe" />
                  <Header.Content>
                    General Picture
                  </Header.Content>
                </Header>
                <SearchInput
                  visible
                  countries={[
                    { name: 'Uganda', id: 1 },
                    { name: 'Kenya', id: 2 },
                    { name: 'Tanzania', id: 3 }
                  ]}
                  placeholder="Type Your Country Name"
                />
                <JumpToResource>
                  Jump to <a>International resources</a>
                </JumpToResource>
                <SocialIconsContainer>
                  <Button icon="facebook f" />
                  <Button icon="twitter" />
                  <Button icon="google plus" />
                  <Button icon="mail outline" />
                </SocialIconsContainer>
              </CardContainer>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </UpperContainer>
    <Tabs selected={0} >
      <Pane label="Overview">
        <Overview />
      </Pane>
      <Pane label="Poverty">
        <PovertyTab />
      </Pane>
      <Pane label="Population">
        <PopulationTab />
      </Pane>
      <Pane label="Government Finance">
        <GovernmentFinance />
      </Pane>
      <Pane label="International Resources">
        <InternationalResourcesTab />
      </Pane>
    </Tabs>

    <HeaderContainer>
      <Container textAlign="center">
        <SectionHeader>
          EXPLORE <span>DOMESTIC AND INTERNATIONAL RESOURCES</span>
        </SectionHeader>
      </Container>
    </HeaderContainer>
    <Tabs selected={0} textAlign="center">
      <Pane label="Government Finance">
        1
      </Pane>
      <Pane label="International Resources">
        1
      </Pane>
    </Tabs>
  </Generic>);
