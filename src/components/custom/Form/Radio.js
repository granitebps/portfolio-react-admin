import React from 'react';
import { FormGroup, CustomInput } from 'reactstrap';
import { getIn, useFormikContext, ErrorMessage } from 'formik';

const CustomRadio = ({ label, name, value }) => {
  const { values, setFieldValue, isSubmitting } = useFormikContext();
  const checkedValue = getIn(values, name);

  const handleChange = (e) => {
    setFieldValue(name, parseInt(e.target.value));
  };

  return (
    <FormGroup>
      <CustomInput
        type="radio"
        id={value}
        name={name}
        label={label}
        checked={value === checkedValue ? true : false}
        value={value}
        onChange={(e) => handleChange(e)}
        disabled={isSubmitting}
      />
      <ErrorMessage name={name}>
        {(msg) => <div className="field-error text-danger">{msg}</div>}
      </ErrorMessage>
    </FormGroup>
  );
};

export default CustomRadio;
