import React from "react";
import { FormGroup } from "reactstrap";
import { getIn, useFormikContext, ErrorMessage } from "formik";
import { Check } from "react-feather";

import Checkbox from "../../@vuexy/checkbox/CheckboxesVuexy";

const CustomCheckbox = ({ name, ...props }) => {
  const { values, setFieldValue, isSubmitting } = useFormikContext();
  const value = getIn(values, name);

  const handleChange = (e) => {
    setFieldValue(name, e.target.checked);
  };

  return (
    <FormGroup>
      <div className="d-inline-block mr-1">
        <Checkbox
          icon={<Check className="vx-icon" size={16} />}
          checked={value}
          onChange={(e) => handleChange(e)}
          disabled={isSubmitting}
          {...props}
        />
      </div>
      <ErrorMessage name={name}>
        {(msg) => <div className="field-error text-danger">{msg}</div>}
      </ErrorMessage>
    </FormGroup>
  );
};

export default CustomCheckbox;
