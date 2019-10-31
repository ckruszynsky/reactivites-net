import React, {Fragment} from 'react';
import {Grid, Header} from 'semantic-ui-react';

export const ProfileDescription: React.FC<{displayName: string, bio: string}> = ({displayName, bio}) => (
    <Grid stackable>
        <Grid.Row>
            <Grid.Column width={16}>
                <Header>{`Name: ${displayName}`} </Header>
            </Grid.Column>
        </Grid.Row>
        
        <Grid.Row>
            <Grid.Column width={16}>
                <Header>Bio</Header>    
            </Grid.Column>
        </Grid.Row>
        <Grid.Row>
            <Grid.Column width={16}>
                {bio}
            </Grid.Column>
        </Grid.Row>
        </Grid>);