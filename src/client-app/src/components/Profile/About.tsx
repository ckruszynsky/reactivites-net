import React, {useState} from 'react';
import {Button, Grid, Header} from 'semantic-ui-react';

import {IProfile} from '../../models/profile';
import {ProfileDescription} from './ProfileDescription';
import {ProfileEditForm} from './ProfileEditForm';



export const About: React.FC<{
    profile: IProfile,
    isLoggedInUserProfile: boolean,
    updateProfile: (displayName: string, bio: string) => Promise<void>,
    loading: boolean
}> =
    ({profile, isLoggedInUserProfile, updateProfile, loading}) => {

        const [editMode, setEditMode] = useState<boolean>(false);
        return (
            <>
                <Grid stackable>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Header floated='left'
                                icon="user circle outline"
                                content="About"
                                size="large"></Header>
                            {isLoggedInUserProfile &&
                                <Button floated='right'
                                    inverted
                                    color='pink'
                                    onClick={() => setEditMode(!editMode)}
                                    content={editMode ? 'Cancel' : 'Edit Profile'}
                                    icon={editMode ? "cancel" : "edit"}>
                                </Button>
                            }
                        </Grid.Column>
                    </Grid.Row>
                    </Grid>
                    {!editMode ? 
                        (<ProfileDescription 
                            displayName={profile.displayName}
                            bio={profile.bio} />) : 
                        (<ProfileEditForm
                            displayName={profile.displayName}
                            bio={profile.bio}
                            updateProfile={updateProfile}
                         />)
                    }                
            </>
        )
    }


