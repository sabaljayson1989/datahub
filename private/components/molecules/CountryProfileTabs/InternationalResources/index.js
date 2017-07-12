// @flow
import { Container, Header, Grid, Icon, Button } from 'semantic-ui-react';
import React from 'react';
import {HeaderGroup} from 'components/atoms/Header';

export type Props = {
  GNI: string,
  netODAOfGNIIn?: string,
  netODAOfGNIOut?: string,
  mixOfResources: Array<{flow_name: string, value: number}>,
}

const International = (props: Props) => {
  console.log('props in tabs', props);
  return (
    <Container>
      <Grid>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
            AS A SHARE OF GNI, HOW MUCH AID IS ALLOCATED TO UGANDA?
          </Header>
          <HeaderGroup>
            <Header
              textAlign="center"
              as="h1"
              color="red"
            > {props.netODAOfGNIIn} of GNI</Header>
            <Header
              textAlign="center"
              as="h5"
            >
              Gross national income is {props.GNI}
            </Header>
          </HeaderGroup>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
            HOW HAVE RESOURCE INFLOWS CHANGED OVER TIME?
          </Header>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
            WHAT’S THE MIX OF RESOURCES?
          </Header>

        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default International;
