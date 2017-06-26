import { Container, Header, Grid, Icon, Button } from 'semantic-ui-react';
import React from 'react';
import {LightBg} from 'components/atoms/Backgrounds';
import {HeaderGroup} from './Common';

const Poverty = () => (
  <LightBg>
    <Container>
      <Grid>
        <Grid.Column width={5}>
          <Header
            textAlign="center"
            as="h3"
          >
            IS POVERTY REDUCING OVER TIME?
          </Header>
        </Grid.Column>

        <Grid.Column width={5}>
          <Header
            textAlign="center"
            as="h3"
          >
            HOW DEEP IS POVERTY?
          </Header>

          <HeaderGroup>
            <Header
              textAlign="center"
              as="h1"
              color="red"
            >
              10%
            </Header>
            <Header
              textAlign="center"
              as="h5"
            >
              out of a population of 39 million people
            </Header>
          </HeaderGroup>
        </Grid.Column>

        <Grid.Column width={5}>
          <Header
            textAlign="center"
            as="h3"
          >
            HOW IS INCOME DISTRIBUTED?
          </Header>

        </Grid.Column>
      </Grid>
    </Container>
  </LightBg>
);

export default Poverty;