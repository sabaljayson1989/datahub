// @flow
import React from 'react';
import { Div, H1 } from 'glamorous';
import { Icon } from 'semantic-ui-react';
import Link from 'next/link';
import Router from 'next/router';
import { Input, InputContainer, List } from 'components/atoms/SearchInput';

type Entity = {
  slug: string,
  name: string,
};
export type Props = {
  entities: Entity[],
  routePath: string,
  placeholder: string,
  profile: boolean, // whether appears on a country profile page or on the front landing page
  visible: boolean,
  onSelected?: any => void,
};
type State = {
  selected: number,
  entities: Entity[],
  showList: boolean,
  value: string,
};
class SearchInput extends React.Component {
  constructor(props: Props) {
    super(props);
    if (!props.entities || !props.entities.length) throw new Error('entities data prop mixing');
    this.state = {
      selected: -1,
      entities: props.entities,
      value: '',
      showList: false,
    };
  }
  state: State;
  onBlurTimer: any;
  onKeyDown(e: Object) {
    let { selected } = this.state;
    const { entities } = this.state;
    const keyCode = e.keyCode;
    switch (keyCode) {
      case 40: {
        // down arrow
        if (selected + 1 < entities.length) {
          selected += 1;
        }
        break;
      }
      case 38: {
        // up arrow
        if (selected !== 0) selected -= 1;
        break;
      }
      case 13: {
        // enter key code
        this.onSubmit();
        break;
      }
      default: {
        selected = -1;
        break;
      }
    }
    this.setState({ selected });
  }
  onChange(text: string) {
    this.setState({ value: text });
    const filteredCountries: Entity[] = this.props.entities.filter((country: Entity) =>
      country.name.toLowerCase().includes(text.toLowerCase()),
    );
    if (filteredCountries.length) this.setState({ entities: filteredCountries });
  }
  onBlur() {
    if (this.setState) {
      this.onBlurTimer = setTimeout(() => {
        this.resetState();
      }, 200);
    }
  }
  onCaretDownClick() {
    this.setState({...this.resetState(), showList: true});
    this.textInput.focus();
  }
  onSubmit() {
    const country: Entity | void = this.state.entities[0] || null;
    if (!country) return false;
    // reset state
    this.resetState();
    this.textInput.blur();
    if (this.props.onSelected) return this.props.onSelected(country.slug);
    return Router.push(`/${this.props.routePath}?id=${country.slug}`, `/${this.props.routePath}/${country.slug}`);
  }
  textInput: HTMLInputElement
  resetState() {
    this.setState({
      value: '',
      showList: false,
      selected: -1,
      entities: this.props.entities,
    });
    if (this.onBlurTimer) clearTimeout(this.onBlurTimer);
  }
  componentWillReceive(props: Props) {
    this.setState({ entities: props.entities });
  }
  render() {
    return (
      <Div>
        <InputContainer
          visible={this.props.visible}
          profile={this.props.profile}
          height={this.props.profile ? '5em' : '10em'}
        >
          {this.props.profile
            ? <H1 textTransform="capitalize" backgroundColor={this.state.showList ? 'white' : 'none'}>
              {this.props.placeholder}
              <Icon name="caret down" onClick={() => this.onCaretDownClick()} />
            </H1>
            : ''}
          <Input
            value={this.state.value}
            profile={this.props.profile}
            placeholder={this.props.profile ? '' : this.props.placeholder}
            onBlur={() => this.onBlur()}
            innerRef={input => { this.textInput = input; }}
            onFocus={() => this.setState({ showList: true })}
            onChange={e => this.onChange(e.target.value)}
            onKeyDown={e => this.onKeyDown(e)}
          />
        </InputContainer>
        <Div position="relative" visibility={this.state.showList ? 'visible' : 'hidden'}>
          <List>
            {this.state.entities
              ? this.state.entities.map((country, i) =>
                (<li key={country.slug} className={this.state.selected === i ? 'active' : 'not-active'}>
                  <Link href={`/${this.props.routePath}?id=${country.slug}`} as={`/${this.props.routePath}/${country.slug}`}>
                    <a>
                      {country.name}
                    </a>
                  </Link>
                </li>),
              )
              : <li>country list is not available</li>}
          </List>
        </Div>
      </Div>
    );
  }
}
export default SearchInput;