// @flow
import React from 'react';
import glamorous from 'glamorous';
import type { Element } from 'react';
import {Container, Icon} from 'semantic-ui-react';
import {white, redHeaderColor, black} from 'components/theme/semantic';
import {NavLink} from '../Link';

type Props = {
  children?: Element<any>,
  hasSubMenu: boolean,
  menu: string,
  link: string,
  icon?: string
};
const LocalContainer = glamorous.span({
  height: '4em',
  color: white,
  position: 'relative',
  background: '0 0',
  paddingTop: '1.2em',
  paddingLeft: '0.8em',
  paddingRight: '0.8em',
  display: 'inline-table',
  cursor: 'pointer',
  '& .item': {
    marginBottom: '12px',
  },
  '&  i.menu-icon': {
    display: 'block',
    margin: '0',
    zIndex: '2',
    position: 'absolute',
    bottom: '102%',
    width: '100%',
    left: '0%',
    textAlign: 'center',
    transform: 'translate(0,0)',
    transition: 'transform .3s cubic-bezier(.215,.61,.355,1)',
    transitionTimingFunction: 'cubic-bezier(.215,.61,.355,1)'
  },
  ':hover i.menu-icon': {
    transform: 'translate(0,180%)',
  },
  '& .menu-text': {
    transform: 'translate(0,0)',
    transition: 'transform .3s cubic-bezier(.215,.61,.355,1)',
    transitionTimingFunction: 'cubic-bezier(.215,.61,.355,1)'
  },
  ':hover .menu-text': {
    transform: 'translate(0,80%)',
  },
  ':hover div': {
    opacity: 1,
    visibility: 'visible',
  },
  ':hover': {
    background: redHeaderColor,
  }}, (props) => ({
    ':hover .menu-text': {
      transform: props.hasSubMenu ? 'translate(0,50%)' : '',
    }
  }));

const Drawer = glamorous.div({
  position: 'fixed',
  top: '3em',
  left: '0',
  color: black,
  width: '100%',
  height: 'auto',
  borderTop: `10px solid ${redHeaderColor}`,
  paddingTop: '1em',
  paddingBottom: '2em',
  background: white,
  opacity: 0,
  visibility: 'hidden',
  transition: 'all .3s',
  transform: 'translate(0,10px)',
  boxShadow: '0 4px 6px rgba(0,0,0,.3)',
  '& i': {
    width: '1.18em',
  },
});
const ListContainer = glamorous.ul({
  columnCount: 2,
  listStyleType: 'none',
  margin: 0,
});

export default ({ children, hasSubMenu, menu, icon, link}: Props) => {
  return (
    <LocalContainer hasSubMenu>
      {hasSubMenu ? <Icon name="pie graph" className="menu-icon" /> : ''}
      <NavLink href={link}>
        <div className="menu-text">{menu}</div></NavLink>
      {hasSubMenu ? <Drawer>
        <Container>
          <ListContainer>
            {children}
          </ListContainer>
        </Container>
      </Drawer> : ''}
    </LocalContainer>
  );
};