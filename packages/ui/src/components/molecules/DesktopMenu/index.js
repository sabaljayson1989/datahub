// @flow
import glamorous from 'glamorous';
import { white } from '../../theme/semantic';
import {mediaQueries} from '../../theme';
import MenuItem from 'components/atoms/DesktopMenuItem';
import React from 'react';

const ListContainer = glamorous.ul({
  flexDirection: 'column',
  color: white,
  alignSelf: 'flex-end',
  listStyleType: 'none',
  float: 'right',
  paddingTop: '0.2em',
  margin: '0',
  [mediaQueries.phone]: {
    display: 'none',
  },
});

const menu = (props: Object) => {
  const menuItems = props.menu.map(item => <MenuItem key={item.name} menu={item} />);
  return (
    <ListContainer>
      {menuItems}
    </ListContainer>
  );
};

export default menu;