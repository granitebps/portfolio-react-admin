import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Form,
  Row,
  Col,
  UncontrolledAlert,
} from "reactstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";

import Header from "../../components/custom/Header";
import SubmitButton from "../../components/custom/Form/SubmitButton";
import InputPassword from "../../components/custom/Form/InputPassword";
import baseAxios from "../../utility/baseAxios";
import { useAuthContext } from "../../contexts/AuthContext";
import SuccessFailAlert from "../../components/custom/SuccessFailAlert";
import { notAuthenticated } from "../../utility/helper";

const Password = () => {
  const authToken = Cookies.get("token");
  const { dispatch } = useAuthContext();
  const [serverError, setServerError] = useState();
  const [success, setSuccess] = useState();
  const [fail, setFail] = useState(false);

  const formSchema = Yup.object().shape({
    old_password: Yup.string().required("Required").min(8),
    password: Yup.string().required("Required").min(8),
    password_confirmation: Yup.string().required("Required").min(8),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setSuccess();
      setFail(false);
      const { data } = await baseAxios.post("profile-password", values, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setSuccess(data.message);
      resetForm();
    } catch (error) {
      resetForm();
      if (error.response.status === 401) {
        notAuthenticated(dispatch);
      } else if (error.response.status === 400) {
        setServerError(error.response.data.message);
      } else {
        setFail(true);
      }
    }
  };

  const handleValidation = (values) => {
    const errors = {};
    if (values.password === values.old_password) {
      errors.password = "Password Cannot Be Same To Old Password";
    }
    if (values.password !== values.password_confirmation) {
      errors.password_confirmation = "Password Not Match";
    }
    return errors;
  };

  return (
    <React.Fragment>
      <Header title="Password" />

      <SuccessFailAlert
        success={success}
        fail={fail}
        setSuccess={setSuccess}
        setFail={setFail}
      />

      <Card>
        <CardHeader>
          <CardTitle>Update Password</CardTitle>
        </CardHeader>
        <CardBody>
          {serverError && (
            <UncontrolledAlert className="mb-2" color="danger">
              {serverError}
            </UncontrolledAlert>
          )}
          <Formik
            initialValues={{
              old_password: "",
              password: "",
              password_confirmation: "",
            }}
            validationSchema={formSchema}
            onSubmit={handleSubmit}
            validate={handleValidation}
          >
            {({ isSubmitting }) => (
              <Form>
                <Row>
                  <Col sm="12">
                    <InputPassword
                      name="old_password"
                      placeholder="Masukkan Password Lama"
                      label="Password Lama"
                    />
                  </Col>
                  <Col sm="12">
                    <InputPassword
                      name="password"
                      placeholder="Masukkan Password Baru"
                      label="Password Baru"
                    />
                  </Col>
                  <Col sm="12">
                    <InputPassword
                      name="password_confirmation"
                      placeholder="Masukkan Password Verifikasi"
                      label="Password Verifikasi"
                    />
                  </Col>
                </Row>
                <SubmitButton
                  color="primary"
                  label="Submit"
                  isSubmitting={isSubmitting}
                />
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Password;
