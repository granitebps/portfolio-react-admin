import React, { useState } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import { getIn, useFormikContext, ErrorMessage } from 'formik';
import { EyeOff, Eye } from 'react-feather';

const InputPassword = ({ label, name, placeholder, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { values, setFieldValue } = useFormikContext();
  const value = getIn(values, name);

  const handleChange = (e) => {
    setFieldValue(name, e.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <React.Fragment>
      <Label for={name}>{label}</Label>
      <FormGroup className="position-relative input-divider-right">
        <Input
          name={name}
          placeholder={placeholder}
          onChange={(e) => handleChange(e)}
          value={value}
          type={showPassword ? 'text' : 'password'}
          {...props}
        />
        <div
          className="form-control-position"
          onClick={handleShowPassword}
          onKeyPress
          role="button"
          tabIndex="-1">
          {showPassword ? <Eye /> : <EyeOff />}
        </div>
        <ErrorMessage name={name}>
          {(msg) => <div className="field-error text-danger">{msg}</div>}
        </ErrorMessage>
      </FormGroup>
    </React.Fragment>
  );
};

export default InputPassword;
