import React from "react";
import { FormGroup, CustomInput } from "reactstrap";
import { getIn, useFormikContext, ErrorMessage } from "formik";

const CustomRadio = ({ label, name, value, ...props }) => {
  const { values, setFieldValue } = useFormikContext();
  const checkedValue = getIn(values, name);

  const handleChange = (e) => {
    setFieldValue(name, e.target.value);
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
      />
      <ErrorMessage name={name}>
        {(msg) => <div className="field-error text-danger">{msg}</div>}
      </ErrorMessage>
    </FormGroup>
  );
};

export default CustomRadio;
