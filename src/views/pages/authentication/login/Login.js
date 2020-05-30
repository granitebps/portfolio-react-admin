import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  FormFeedback,
  UncontrolledAlert,
} from "reactstrap";
import { Lock, Check, User } from "react-feather";
import Cookies from "js-cookie";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy";

import loginImg from "../../../../assets/img/pages/login.png";
import "../../../../assets/scss/pages/authentication.scss";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { LOGIN } from "../../../../reducers/AuthReducer";
import { history } from "../../../../history";
import baseAxios from "../../../../utility/baseAxios";
import { Formik, Field, ErrorMessage } from "formik";
import SubmitButton from "../../../../components/custom/Form/SubmitButton";

const Login = () => {
  const { state, dispatch } = useAuthContext();
  const [serverError, setServerError] = useState();

  useEffect(() => {
    if (state.isLogin) {
      history.push("/dashboard");
    }
  }, [state]);

  const formSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleLogin = async (values, { setFieldError }) => {
    try {
      const request = {
        username: values.username,
        password: values.password,
      };
      const { data } = await baseAxios.post("auth/login", request);

      Cookies.set("token", data.data.token);
      dispatch({
        type: LOGIN,
        payload: {
          user: {
            name: data.data.name,
            avatar: data.data.avatar,
          },
        },
      });
    } catch (error) {
      if (error.response.status === 401) {
        setServerError(error.response.data.message);
      } else if (error.response.status === 422) {
        error.response.data.errors.username &&
          setFieldError("username", error.response.data.errors.username[0]);
        error.response.data.errors.password &&
          setFieldError("password", error.response.data.errors.password[0]);
        setServerError(error.response.data.message);
      } else {
        setServerError("Something Wrong! Please Contact Customer Services!");
      }
    }
  };

  return (
    <Row className="m-0 justify-content-center">
      <Col
        sm="8"
        xl="7"
        lg="10"
        md="8"
        className="d-flex justify-content-center"
      >
        <Helmet>
          <title>Login</title>
        </Helmet>
        <Card className="bg-authentication login-card rounded-0 mb-0 w-100">
          <Row className="m-0">
            <Col
              lg="6"
              className="d-lg-block d-none text-center align-self-center px-1 py-0"
            >
              <img src={loginImg} alt="loginImg" />
            </Col>
            <Col lg="6" md="12" className="p-0">
              <Card className="rounded-0 mb-0 px-2">
                <CardBody>
                  <h1 className="mb-2">Login</h1>
                  {serverError && (
                    <UncontrolledAlert className="mb-2" color="danger">
                      {serverError}
                    </UncontrolledAlert>
                  )}
                  <Formik
                    initialValues={{
                      username: "",
                      password: "",
                    }}
                    onSubmit={handleLogin}
                    validationSchema={formSchema}
                  >
                    {({ errors, touched, isSubmitting }) => (
                      <Form>
                        <FormGroup className="form-label-group position-relative has-icon-left">
                          <Field
                            className={`form-control ${
                              errors.username &&
                              touched.username &&
                              "is-invalid"
                            }`}
                            name="username"
                            placeholder="Username"
                            type="text"
                          />
                          <div className="form-control-position">
                            <User size={15} />
                          </div>
                          <Label>Username</Label>
                          <ErrorMessage name="username">
                            {(msg /** this is the same as the above */) => (
                              <FormFeedback>{msg}</FormFeedback>
                            )}
                          </ErrorMessage>
                        </FormGroup>
                        <FormGroup className="form-label-group position-relative has-icon-left">
                          <Field
                            className={`form-control ${
                              errors.password &&
                              touched.password &&
                              "is-invalid"
                            }`}
                            name="password"
                            placeholder="Password"
                            type="password"
                          />
                          <div className="form-control-position">
                            <Lock size={15} />
                          </div>
                          <Label>Password</Label>
                          <ErrorMessage name="password">
                            {(msg /** this is the same as the above */) => (
                              <FormFeedback>{msg}</FormFeedback>
                            )}
                          </ErrorMessage>
                        </FormGroup>
                        <FormGroup className="d-flex justify-content-between align-items-center">
                          <Checkbox
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label="Remember me"
                          />
                        </FormGroup>
                        <div className="d-flex justify-content-between">
                          <SubmitButton
                            color="primary"
                            isSubmitting={isSubmitting}
                            label="Login"
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
export default Login;
