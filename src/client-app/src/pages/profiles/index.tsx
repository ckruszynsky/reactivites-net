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
    loadProfile, 
    profile, 
    isCurrentUser, 
    uploadPhoto, 
    uploadingPhoto,
    setMainPhoto,
    deletePhoto,
    loading
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
        <Grid.Column width={16}>
          {profile && <ProfileHeader profile={profile} />}
          {profile && <Content profile={profile} 
                      isLoggedInUserProfile={isCurrentUser}
                      uploadPhoto={uploadPhoto}
                      uploadingPhoto={uploadingPhoto}
                      setMainPhoto={setMainPhoto} 
                      deletePhoto={deletePhoto}
                      loading={loading} />}
        </Grid.Column>
      </Grid>
    </Container>
  );
});
