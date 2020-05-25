import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Form,
  Row,
  Col,
} from "reactstrap";
import { Formik } from "formik";
import * as Yup from "yup";

import Header from "../../components/custom/Header";
import SubmitButton from "../../components/custom/Form/SubmitButton";
import InputPassword from "../../components/custom/Form/InputPassword";

const Password = () => {
  const formSchema = Yup.object().shape({
    old_password: Yup.string().required("Required").min(8),
    new_password: Yup.string().required("Required").min(8),
    verif_password: Yup.string().required("Required").min(8),
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <React.Fragment>
      <Header title="Password" />

      <Card>
        <CardHeader>
          <CardTitle>Update Password</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={{
              old_password: "",
              new_password: "",
              verif_password: "",
            }}
            validationSchema={formSchema}
            onSubmit={handleSubmit}
          >
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
                    name="new_password"
                    placeholder="Masukkan Password Baru"
                    label="Password Baru"
                  />
                </Col>
                <Col sm="12">
                  <InputPassword
                    name="verif_password"
                    placeholder="Masukkan Password Verifikasi"
                    label="Password Verifikasi"
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
