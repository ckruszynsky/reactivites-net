import './styles.scss';

import React from 'react';
import {Field, Form as FinalForm} from 'react-final-form';
import {Button, Form} from 'semantic-ui-react';

import {IUserFormValues} from '../../models/user';
import {TextInput} from '../Form/TextInput';

const Signin: React.FC<{
  onLogin: (values: IUserFormValues) => void;
}> = ({
  onLogin
}) => {
    return (
      <FinalForm
        onSubmit={(values: IUserFormValues) => {onLogin(values)}}
        render={({handleSubmit}) => (
          <Form onSubmit={handleSubmit}>
            <Field name="email" component={TextInput} placeholder="Email Address" />
            <Field
              name="password"
              component={TextInput}
              placeholder="Password"
              type="password"
            />
            <Button positive content="Login" />
          </Form>
        )}
      />
    );
  };

export default Signin;
