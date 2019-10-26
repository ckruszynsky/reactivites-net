import './styles.scss';

import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Container, Grid } from 'semantic-ui-react';

import { LoadingIndicator } from '../../components/LoadingIndicator';
import { Content, ProfileHeader } from '../../components/Profile';
import { RootStoreContext } from '../../stores/rootStore';

interface ProfileParams {
  username: string;
}

export const Profile: React.FC<RouteComponentProps<ProfileParams>> = observer(({ match }) => {
  const rootStore = useContext(RootStoreContext);
  const { loadingProfile, loadProfile, profile } = rootStore.profileStore;

  useEffect(() => {
    loadProfile(match.params.username);
  }, [loadProfile, match]);

  if (loadingProfile) {
    return <LoadingIndicator content="Loading profile..." />;
  }
  return (
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            {profile && <ProfileHeader profile={profile} />}
            {profile && <Content profile={profile} />}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
});