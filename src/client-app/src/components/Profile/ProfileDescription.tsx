import React, {Fragment} from 'react';
import {Container, Grid, Header} from 'semantic-ui-react';

export const ProfileDescription: React.FC<{displayName: string, bio: string}> = ({displayName, bio}) => (
    <Fragment>
        <Grid.Row>
            <Grid.Column width={16}>
                <Header>{`Name: ${displayName}`} </Header>
            </Grid.Column>
        </Grid.Row>
        
        <Grid.Row>
            <Grid.Column width={16}>
                <Header>Bio</Header>                
                <Container text>
                    {bio}
                </Container>
            </Grid.Column>
        </Grid.Row>
    </Fragment>);