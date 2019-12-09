import './styles.scss';

import {observer} from 'mobx-react-lite';
import React, {useContext, useEffect} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {Container, Grid} from 'semantic-ui-react';

import {LoadingIndicator} from '../../components/LoadingIndicator';
import {Content, ProfileHeader} from '../../components/Profile';
import {RootStoreContext} from '../../stores/rootStore';

interface ProfileParams {
  username: string;
}

export const Profile: React.FC<RouteComponentProps<ProfileParams>> = observer(({match}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadingProfile,
    profile,
    loadProfile,
    follow,
    unfollow,
    isCurrentUser,
    loading,
    setActiveTab
  } = rootStore.profileStore;

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
        <Grid.Column width={16}>
          {profile && <ProfileHeader 
              profile={profile} 
              isCurrentUser={isCurrentUser}
              loading={loading}
              follow={follow}
              unfollow={unfollow}
            />}
        </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
          {profile && <Content setActiveTab={setActiveTab}    />}      
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
});
