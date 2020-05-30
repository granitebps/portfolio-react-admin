import React from "react";
import { Button } from "reactstrap";
import { useFormikContext } from "formik";

const SubmitButton = ({ children, ...props }) => {
  const { handleSubmit } = useFormikContext();

  const handleClick = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <Button.Ripple type="submit" onClick={(e) => handleClick(e)} {...props}>
      {children}
    </Button.Ripple>
  );
};

export default SubmitButton;
