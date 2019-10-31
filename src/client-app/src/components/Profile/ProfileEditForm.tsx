import React from 'react';
import {Field, Form as FinalForm} from 'react-final-form';
import {combineValidators, isRequired} from 'revalidate';
import {Button, Form, Grid} from 'semantic-ui-react';

import {TextAreaInput, TextInput} from '../Form';


const validate = combineValidators({
    displayName: isRequired({message: 'A Display name is required.'})
});

export const ProfileEditForm: React.FC<{displayName: string, bio: string, updateProfile: (displayName: string, bio: string) => Promise<void>}> = ({displayName, bio, updateProfile}) => (
    <Grid.Row>
        <Grid.Column>
            <FinalForm initialValues={{displayName: displayName, bio: bio}}
                onSubmit={({displayName, bio}) => updateProfile(displayName, bio)}
                validate={validate}
                render={({handleSubmit, invalid, pristine, submitting}) => (
                    <Form onSubmit={handleSubmit}>
                        <Field name='displayName' component={TextInput} placeholder='Display Name' />
                        <Field name="bio" component={TextAreaInput} rows={25} />
                        <Button color="pink"
                            type="submit"
                            content="Update Profile"
                            loading={submitting}
                            disabled={invalid || pristine} />
                    </Form>)} />

        </Grid.Column>
    </Grid.Row>);
