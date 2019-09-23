import {FORM_ERROR} from 'final-form';
import React from 'react';
import {Field, Form as FinalForm} from 'react-final-form';
import {combineValidators, isRequired} from 'revalidate';
import {Button, Form, Header} from 'semantic-ui-react';

import {IUserFormValues} from '../../models/user';
import {ErrorMessage} from '../Errors';
import {TextInput} from '../Form/TextInput';


const validate = combineValidators({
    email: isRequired('email'),
    password: isRequired('password')
})

export const Signup: React.FC<{
    onRegister: (values: IUserFormValues) => Promise<void>;
}> = ({
    onRegister
}) => {
        return (
            <FinalForm
                onSubmit={(values: IUserFormValues) => onRegister(values).catch(error => ({[FORM_ERROR]: error}))}
                validate={validate}
                render={({handleSubmit, submitting, submitError, invalid, pristine, dirtySinceLastSubmit}) => (
                    <Form size="large" onSubmit={handleSubmit} error>
                        <Header
                            as='h2'
                            content='Sign up to Reactivities'
                            color='teal'
                            textAlign='center'
                        />
                        <Field name='username' component={TextInput} placeholder='Username' />
                        <Field
                            name='displayName'
                            component={TextInput}
                            placeholder='Display Name'
                        />
                        <Field name='email' component={TextInput} placeholder='Email' />
                        <Field
                            name='password'
                            component={TextInput}
                            placeholder='Password'
                            type='password'
                        />
                        {submitError && !dirtySinceLastSubmit && <ErrorMessage error={submitError} />}
                        <br />
                        <Button disabled={(invalid && !dirtySinceLastSubmit) || pristine} color='teal' content="Register" loading={submitting} fluid />
                    </Form>
                )}
            />
        );
    };
