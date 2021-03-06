import * as React from 'react';
import { Header } from 'semantic-ui-react';
import glamorous from 'glamorous';

const Wrapper = glamorous.div({
  'marginTop': '1em',
  '& h4': {
    marginBottom: '.5em !important',
  },
});

export interface Props  {
  children?: React.ReactChild | any;
  title: string;
}

export default ({ title, children }: Props) =>
  (<Wrapper>
    <Header as="h4">
      {title}
    </Header>
    {children}
  </Wrapper>);
