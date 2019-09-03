import './styles.scss';

import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

export const Navbar: React.FC<{
  openCreateForm: () => void;
}> = ({ openCreateForm }) => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <img src="/assets/logo.png" className="navBar__logo" alt="logo" />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button positive content="Create Activity" onClick={() => openCreateForm()} />
        </Menu.Item>
      </Container>
    </Menu>
  );
};
