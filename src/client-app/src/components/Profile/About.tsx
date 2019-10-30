import React, {Fragment} from 'react';
import {Field, Form as FinalForm} from 'react-final-form';
import {combineValidators, isRequired} from 'revalidate';
import {Button, Container, Form, Grid, Header} from 'semantic-ui-react';

import {IProfile} from '../../models/profile';
import {TextAreaInput, TextInput} from '../Form';


const validate = combineValidators({
    displayName: isRequired({message: 'A Display name is required.'})
});

export const About: React.FC<{
    profile: IProfile, 
    isLoggedInUserProfile: boolean, 
    updateProfile: (displayName:string, bio:string) => Promise<void>,
    loading:boolean}> =
    ({profile, isLoggedInUserProfile,updateProfile, loading}) => {
        const ProfileDescription = <Fragment>
            <Grid.Row>
                <Grid.Column width={16}>
                    <Header>{`Name: ${profile.displayName}`} </Header>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={16}>
                    <Header>Bio</Header>
                    <Container text>
                        {profile.bio}
                    </Container>
                </Grid.Column>
            </Grid.Row>
        </Fragment>;
        const ProfileEditForm = <Grid.Row>
            <Grid.Column>
                <FinalForm initialValues={{displayName: profile.displayName, bio: profile.bio}} 
                        onSubmit={({displayName, bio}) => updateProfile(displayName, bio)} 
                        validate={validate}                     
                        render={({handleSubmit}) => (
                    <Form onSubmit={handleSubmit} loading={loading}>
                    <Field name='displayName' component={TextInput} placeholder='Display Name' />
                    <Field name="bio" component={TextAreaInput} rows={25} />
                    <Button color="pink" type="submit" content="Update Profile" />
                </Form>)} />

            </Grid.Column>
        </Grid.Row>;
        return (
            <>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Header floated='left'
                                icon="user circle outline"
                                content="About"
                                size="large"></Header>
                        </Grid.Column>
                    </Grid.Row>
                    {!isLoggedInUserProfile ? ProfileDescription :ProfileEditForm}
                </Grid>
            </>
        )
    }


