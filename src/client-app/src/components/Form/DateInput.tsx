import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { DateTimePicker } from 'react-widgets';
import { Form, FormFieldProps, Label } from 'semantic-ui-react';

interface IDateInputProps extends FieldRenderProps<Date, HTMLInputElement>, FormFieldProps {}

export const DateInput: React.FC<IDateInputProps> = ({
  input,
  width,
  type,
  placeholder,
  meta: { touched, error },
  ...rest
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      <DateTimePicker placeholder={placeholder} 
            value={input.value || null}
            onChange={input.onChange}
            {...rest} />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};
