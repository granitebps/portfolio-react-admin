import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import { getIn, useFormikContext, ErrorMessage } from 'formik';

const InputText = ({ label, name, placeholder, ...props }) => {
  const { values, setFieldValue } = useFormikContext();
  const value = getIn(values, name);

  const handleChange = (e) => {
    setFieldValue(name, e.target.value);
  };

  return (
    <FormGroup>
      <Label for={name}>{label}</Label>
      <Input
        name={name}
        placeholder={placeholder}
        onChange={(e) => handleChange(e)}
        value={value}
        {...props}
      />
      <ErrorMessage name={name}>
        {(msg) => <div className="field-error text-danger">{msg}</div>}
      </ErrorMessage>
    </FormGroup>
  );
};

export default InputText;
