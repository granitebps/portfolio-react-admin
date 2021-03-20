import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import { useFormikContext, ErrorMessage } from "formik";

const InputFile = ({ label, name, placeholder, ...props }) => {
  const { setFieldValue, isSubmitting } = useFormikContext();

  const handleChange = (e) => {
    setFieldValue(name, e.target.files[0]);
  };

  return (
    <FormGroup>
      <Label for={name}>{label}</Label>
      <Input
        name={name}
        placeholder={placeholder}
        onChange={(e) => handleChange(e)}
        type="file"
        disabled={isSubmitting}
        {...props}
      />
      <ErrorMessage name={name}>
        {(msg) => <div className="field-error text-danger">{msg}</div>}
      </ErrorMessage>
    </FormGroup>
  );
};

export default InputFile;
