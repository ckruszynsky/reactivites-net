import './styles.scss';

import {placeholder} from '@babel/types';
import React from 'react';
import {Field, Form as FinalForm} from 'react-final-form';
import {Button, Form} from 'semantic-ui-react';

import {TextInput} from '../Form/TextInput';

const Signin = () => {
  return (
    <FinalForm
      onSubmit={(values) => {console.log(values)}}
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
