import * as React from 'react';
import { Container } from 'semantic-ui-react';
import glamorous from 'glamorous';
import { white, lightBlack } from '../../../theme/semantic';
import data from '@devinit/dh-base/lib/__generated__/data';
import SearchInput from '../Basic';
import { big } from '../../../theme';

export interface State  {
  showInput: boolean;
}

const SearchTitle = glamorous.div({
  'backgroundColor': lightBlack,
  'fontSize': big,
  'textAlign': 'center',
  'color': white,
  'fontWeight': 700,
  'paddingTop': '1em',
  'paddingBottom': '1em',
  '& .clickable': {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
});

class Search extends React.Component {
  public state: State = {showInput: false};

  public showInput = () => {
    this.state.showInput ? this.setState({ showInput: false }) : this.setState({ showInput: true });
  }

  public render() {
    return (
      <div>
        <SearchTitle>
          <Container>
            <h2>
              Explore by
              <span onClick={this.showInput} className="clickable" role="button">
                {' '}country
              </span>
            </h2>
          </Container>
        </SearchTitle>
        <SearchInput
          entities={data.countries}
          routePath={'country'} // for route
          visible={false}
          profile={false}
          placeholder={'Type a country name...'}
        />
      </div>
    );
  }
}

export default Search;