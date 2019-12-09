import React, {useContext, useState} from 'react';
import {Grid, Header, Button, Tab} from 'semantic-ui-react';
import {observer} from 'mobx-react-lite';
import {RootStoreContext} from '../../stores/rootStore';
import {ProfileEditForm} from './ProfileEditForm';

export const ProfileDescription: React.FC = observer(() =>{
    const rootStore = useContext(RootStoreContext);
    const { updateProfile, profile, isCurrentUser } = rootStore.profileStore;
    const [editMode, setEditMode] = useState(false);
    return(
        <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated='left'
            icon='user'
            content={`About ${profile!.displayName}`}
          />
          {isCurrentUser && (
            <Button
              floated='right'
              basic
              content={editMode ? 'Cancel' : 'Edit Profile'}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <ProfileEditForm updateProfile={updateProfile} profile={profile!} />
          ) : (
            <span>{profile!.bio}</span>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
   );
});