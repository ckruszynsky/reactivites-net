import './styles.scss';

import {observer} from 'mobx-react-lite';
import React, {useContext, useEffect, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {Container, Grid} from 'semantic-ui-react';

import {ProfileHeader} from '../../components/Profile';
import {RootStoreContext} from '../../stores/rootStore';

interface ProfileParams {
  username: string;
}

export const Profile: React.FC<RouteComponentProps<ProfileParams>> = observer(
  ({match}) => {
    const rootStore = useContext(RootStoreContext);

    return (
      <Container>
        <Grid>
          <Grid.Row>
          <Grid.Column>
            <ProfileHeader />
          </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
);
