import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  FormGroup,
  Form,
  Button,
  Label,
  FormFeedback,
  UncontrolledAlert,
} from 'reactstrap';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet';
import { Formik, Field, ErrorMessage } from 'formik';

import fgImg from '../../../../assets/img/pages/forgot-password.png';
import { history } from '../../../../history';
import '../../../../assets/scss/pages/authentication.scss';
import { useAuthContext } from '../../../../contexts/AuthContext';
import SubmitButton from '../../../../components/custom/Form/SubmitButton';

const ForgotPassword = () => {
  const { forgot } = useAuthContext();
  const [serverError, setServerError] = useState();
  const [success, setSuccess] = useState(false);

  const formSchema = Yup.object().shape({
    email: Yup.string().required('Required').email(),
  });

  const handleForgot = async (values, { setFieldError, resetForm }) => {
    try {
      await forgot(values.email);
      setSuccess(true);
    } catch (error) {
      if (error.response.status === 400) {
        setServerError(error.response.data.message);
      } else if (error.response.status === 422) {
        error.response.data.message.forEach((e) => {
          setFieldError(e.field, e.message);
        });
      } else {
        setServerError('Something Wrong! Please Contact Customer Services!');
      }
    }
    resetForm();
  };

  return (
    <Row className="m-0 justify-content-center">
      <Helmet>
        <title>Forgot Password</title>
      </Helmet>
      <Col sm="8" xl="7" lg="10" md="8" className="d-flex justify-content-center">
        <Card className="bg-authentication rounded-0 mb-0 w-100">
          <Row className="m-0">
            <Col lg="6" className="d-lg-block d-none text-center align-self-center">
              <img src={fgImg} alt="fgImg" />
            </Col>
            <Col lg="6" md="12" className="p-0">
              <Card className="rounded-0 mb-0 px-2 py-1">
                <CardHeader className="pb-1">
                  <CardTitle>
                    <h4 className="mb-0">Recover your password</h4>
                  </CardTitle>
                </CardHeader>
                <p className="px-2 auth-title">
                  Please enter your email address and we will send you instructions on how to reset
                  your password.
                </p>
                <CardBody className="pt-1 pb-0">
                  {serverError && (
                    <UncontrolledAlert className="mb-2" color="danger">
                      {serverError}
                    </UncontrolledAlert>
                  )}
                  {success && (
                    <UncontrolledAlert className="mb-2" color="success">
                      Send Reset Password Request Email. Check your email.
                    </UncontrolledAlert>
                  )}
                  <Formik
                    initialValues={{
                      email: '',
                    }}
                    onSubmit={handleForgot}
                    validationSchema={formSchema}>
                    {({ errors, touched, isSubmitting }) => (
                      <Form>
                        <FormGroup className="form-label-group">
                          <Field
                            className={`form-control ${
                              errors.email && touched.email && 'is-invalid'
                            }`}
                            name="email"
                            placeholder="Email"
                            type="email"
                            disabled={isSubmitting}
                            required
                          />
                          <Label>Email</Label>
                          <ErrorMessage name="email">
                            {(msg /** this is the same as the above */) => (
                              <FormFeedback>{msg}</FormFeedback>
                            )}
                          </ErrorMessage>
                        </FormGroup>
                        <div className="float-md-left d-block mb-1">
                          <Button.Ripple
                            color="primary"
                            outline
                            className="px-75 btn-block"
                            onClick={() => history.push('/pages/login')}>
                            Back to Login
                          </Button.Ripple>
                        </div>
                        <div className="float-md-right d-block mb-1">
                          <SubmitButton
                            color="primary"
                            label="Recover Password"
                            className="px-75 btn-block"
                          />
                        </div>
                      </Form>
                    )}
                  </Formik>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default ForgotPassword;
