import './styles.scss';

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
const Signin: React.FC<{
  onLogin: (values: IUserFormValues) => Promise<void>;
}> = ({
  onLogin
}) => {
    return (
      <FinalForm
        onSubmit={(values: IUserFormValues) => onLogin(values).catch(error => ({[FORM_ERROR]: error}))}
        validate={validate}
        render={({handleSubmit, submitting, submitError, invalid, pristine, dirtySinceLastSubmit}) => (
          <Form size="large" onSubmit={handleSubmit} error>
            <Header as='h2' content='Login to Reactivities' color='teal' textAlign='center' />
            <Field name="email" component={TextInput} placeholder="Email Address" />
            <Field
              name="password"
              component={TextInput}
              placeholder="Password"
              type="password"
            />
            {submitError && !dirtySinceLastSubmit && <ErrorMessage error={submitError} text='Invalid email or password' />}
            <br />
            <Button disabled={(invalid && !dirtySinceLastSubmit) || pristine} color='teal' content="Login" loading={submitting} fluid />
          </Form>
        )}
      />
    );
  };

export default Signin;
