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
import { toast } from "react-toastify";

import Header from "../../components/custom/Header";
import SubmitButton from "../../components/custom/Form/SubmitButton";
import InputPassword from "../../components/custom/Form/InputPassword";
import baseAxios from "../../utility/baseAxios";
import { useAuthContext } from "../../contexts/AuthContext";
import formSchema from "./passwordFormSchema";

const Password = () => {
  const authToken = localStorage.getItem("token-gbps");
  const { logout } = useAuthContext();
  const [serverError, setServerError] = useState();

  const handleSubmit = async (values, { resetForm, setFieldError }) => {
    try {
      const { data } = await baseAxios.post("profile-password", values, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      toast.success(data.message);
      resetForm();
    } catch (error) {
      resetForm();
      if (error.response.status === 401) {
        logout();
      } else if (error.response.status === 400) {
        setServerError(error.response.data.message);
      } else if (error.response.status === 422) {
        error.response.data.message.forEach((e) => {
          setFieldError(e.field, e.message);
        });
      } else {
        toast.error("Something Wrong!");
      }
    }
  };

  return (
    <React.Fragment>
      <Header title="Password" />

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
          >
            <Form>
              <Row>
                <Col sm="12">
                  <InputPassword
                    name="old_password"
                    placeholder="Old Password"
                    label="Old Password"
                  />
                </Col>
                <Col sm="12">
                  <InputPassword
                    name="password"
                    placeholder="New Password"
                    label="New Password"
                  />
                </Col>
                <Col sm="12">
                  <InputPassword
                    name="password_confirmation"
                    placeholder="New Password Verification"
                    label="New Password Verification"
                  />
                </Col>
              </Row>
              <SubmitButton color="primary" label="Submit" />
            </Form>
          </Formik>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Password;
