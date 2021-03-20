import React from "react";
import { Card, CardBody, Button, Row, Col } from "reactstrap";

import errorImg from "../../assets/img/pages/404.png";
import { history } from "../../history";

const Error404 = () => {
  const handleBack = () => {
    history.goBack();
  };

  return (
    <Row className="m-0">
      <Col sm="12">
        <Card className="auth-card bg-transparent shadow-none rounded-0 mb-0 w-100">
          <CardBody className="text-center">
            <img
              src={errorImg}
              alt="ErrorImg"
              className="img-fluid align-self-center"
            />
            <h1 className="font-large-2 my-1">404 - Page Not Found!</h1>
            <Button.Ripple
              tag="button"
              color="primary"
              size="lg"
              className="mt-2"
              onClick={handleBack}
            >
              Back
            </Button.Ripple>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Error404;
