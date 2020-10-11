import React from 'react';
import { Button, Spinner } from 'reactstrap';
import { useFormikContext } from 'formik';

const SubmitButton = ({ label, ...props }) => {
  const { handleSubmit, isSubmitting } = useFormikContext();

  const handleClick = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <Button.Ripple onClick={(e) => handleClick(e)} disabled={isSubmitting} {...props}>
      {isSubmitting ? (
        <React.Fragment>
          <Spinner color="white" size="sm" />
          <span className="ml-50">Loading...</span>
        </React.Fragment>
      ) : (
        label
      )}
    </Button.Ripple>
  );
};

export default SubmitButton;
