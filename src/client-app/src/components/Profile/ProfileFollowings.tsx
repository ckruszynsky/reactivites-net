import React, {useContext} from 'react';
import { Tab, Grid, Header, Card } from 'semantic-ui-react';
import {ProfileCard} from './ProfileCard';
import {IProfile} from '../../models/profile';
import {observer} from 'mobx-react-lite';
import {RootStoreContext} from '../../stores/rootStore';

export const ProfileFollowings:React.FC = observer(() => {  
  const rootStore = useContext(RootStoreContext);
  const {
    profile,
    followings,
    loading,
    activeTab
  } = rootStore.profileStore;
  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated='left'
            icon='user'
            content={
              activeTab === 3
                ? `People following ${profile!.displayName}`
                : `People ${profile!.displayName} is following`
            }
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Card.Group itemsPerRow={5}>
            {followings.map((profile)=> 
                <ProfileCard key={profile.username} profile={profile} />
            )}                      
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});

