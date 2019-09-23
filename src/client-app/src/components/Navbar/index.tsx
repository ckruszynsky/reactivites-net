import './styles.scss';

import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {Button, Container, Dropdown, Image, Menu} from 'semantic-ui-react';

import {IUser} from '../../models/user';

export const Navbar: React.FC<{
  isLoggedIn: boolean;
  user: IUser | null,
  logout: () => void
}> = ({isLoggedIn, user, logout}) => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header as={NavLink} exact to="/">
          <img src="/assets/logo.png" className="navBar__logo" alt="logo" />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" as={NavLink} to="/activities" />
        <Menu.Item>
          <Button positive content="Create Activity" as={NavLink} to="/new" />
        </Menu.Item>
        {user &&
          <Menu.Item position='right'>
            <Image avatar spaced='right' src={user.image || '/assets/user.png'} />
            <Dropdown pointing='top left' text={user.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to={`/profile/${user.username}`} text='My profile' icon='user' />
                <Dropdown.Item onClick={logout} text='Logout' icon='power' />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        }
      </Container>
    </Menu>
  );
};
