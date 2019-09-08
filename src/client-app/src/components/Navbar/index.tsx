import './styles.scss';

import React, { useContext } from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

import ActivityStore from '../../stores/activityStore';

export const Navbar: React.FC<{}> = () => {
  const activityStore = useContext(ActivityStore);
  const {openCreateForm} = activityStore;
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
