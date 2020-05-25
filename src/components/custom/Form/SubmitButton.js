import React from "react";
import { Button } from "reactstrap";
import { useFormikContext } from "formik";

const SubmitButton = ({ label, ...props }) => {
  const { handleSubmit } = useFormikContext();

  const handleClick = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <Button.Ripple type="submit" onClick={(e) => handleClick(e)} {...props}>
      {label}
    </Button.Ripple>
  );
};

export default SubmitButton;
