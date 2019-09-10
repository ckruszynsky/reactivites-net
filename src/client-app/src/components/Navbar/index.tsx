import './styles.scss';

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';

export const Navbar: React.FC<{}> = () => {
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
      </Container>
    </Menu>
  );
};
