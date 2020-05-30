import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";

const SuccessFailAlert = ({ success, fail, setSuccess, setFail }) => {
  return (
    <React.Fragment>
      <SweetAlert
        success
        title="Success"
        show={success ? true : false}
        onConfirm={() => setSuccess()}
      >
        <p className="sweet-alert-text">{success}</p>
      </SweetAlert>
      <SweetAlert
        error
        title="Error"
        show={fail ? true : false}
        onConfirm={() => setFail(false)}
      >
        <p className="sweet-alert-text">Something Wrong!</p>
      </SweetAlert>
    </React.Fragment>
  );
};

export default SuccessFailAlert;
