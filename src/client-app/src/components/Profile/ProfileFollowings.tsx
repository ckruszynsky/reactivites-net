import React from 'react';
import { Tab, Grid, Header, Card } from 'semantic-ui-react';
import {ProfileCard} from './ProfileCard';
import {IProfile} from '../../models/profile';

export const ProfileFollowings:React.FC<{
  profile:IProfile,
  followings:IProfile[],
  activeTab:number
}> = ({profile,followings,activeTab}) => {  
  return (
    <Tab.Pane>
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
};

