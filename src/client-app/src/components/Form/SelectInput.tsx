import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { Form, FormFieldProps, Label, Select } from 'semantic-ui-react';

interface ISelectInputProps extends FieldRenderProps<string, HTMLSelectElement>, FormFieldProps {}

export const SelectInput: React.FC<ISelectInputProps> = ({
  input,
  width,
  options,
  placeholder,
  meta: { touched, error }
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      <Select
        value={input.value}
        onChange={(evt, data) => input.onChange(data.value)}
        placeholder={placeholder}
        options={options}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};
