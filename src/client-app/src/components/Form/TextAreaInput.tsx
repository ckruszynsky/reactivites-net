import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { Form, FormFieldProps, Label } from 'semantic-ui-react';

interface ITextAreaInputProps
  extends FieldRenderProps<string, HTMLTextAreaElement>,
    FormFieldProps {}

export const TextAreaInput: React.FC<ITextAreaInputProps> = ({
  input,
  width,
  rows,
  placeholder,
  meta: { touched, error }
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      <textarea {...input} placeholder={placeholder} rows={rows} />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};
