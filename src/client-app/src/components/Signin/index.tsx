import './styles.scss';

import {FORM_ERROR} from 'final-form';
import React from 'react';
import {Field, Form as FinalForm} from 'react-final-form';
import {combineValidators, isRequired} from 'revalidate';
import {Button, Form, Label} from 'semantic-ui-react';

import {IUserFormValues} from '../../models/user';
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
        render={({handleSubmit, submitting, form, submitError, invalid, pristine, dirtySinceLastSubmit}) => (
          <Form onSubmit={handleSubmit}>
            <Field name="email" component={TextInput} placeholder="Email Address" />
            <Field
              name="password"
              component={TextInput}
              placeholder="Password"
              type="password"
            />
            {submitError && !dirtySinceLastSubmit && <Label color='red' basic content={submitError.statusText} />}
            <br />
            <Button disabled={invalid && !dirtySinceLastSubmit || pristine} positive content="Login" loading={submitting} />
            <pre>{JSON.stringify(form.getState(), null, 2)}</pre>
          </Form>
        )}
      />
    );
  };

export default Signin;
