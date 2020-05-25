import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Form,
  Row,
  Col,
  Button,
} from "reactstrap";

import Header from "../../../components/custom/Header";
import InputText from "../../../components/custom/Form/InputText";
import SubmitButton from "../../../components/custom/Form/SubmitButton";
import { history } from "../../../history";

const ServiceModify = () => {
  const formSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    icon: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
  });

  const data = history.location.state;

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <React.Fragment>
      <Header title={data ? "Edit Service" : "Add Service"} />

      <Card>
        <CardHeader>
          <CardTitle>{data ? "Edit Service" : "Add Service"}</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={{
              name: data ? data.data.name : "",
              icon: data ? data.data.icon : "",
              description: data ? data.data.description : "",
            }}
            validationSchema={formSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Row>
                <Col sm="12">
                  <InputText
                    name="name"
                    type="text"
                    label="Service Name"
                    placeholder="Masukkan Nama Service"
                  />
                </Col>
                <Col sm="12">
                  <InputText
                    name="icon"
                    type="text"
                    label="Service Icon"
                    placeholder="Masukkan Icon Service"
                  />
                </Col>
                <Col sm="12">
                  <InputText
                    name="description"
                    type="textarea"
                    label="Service Description"
                    placeholder="Masukkan Deskripsi Service"
                    rows="5"
                  />
                </Col>
              </Row>
              <Button.Ripple
                className="mr-1"
                color="warning"
                onClick={() => history.goBack()}
              >
                Back
              </Button.Ripple>
              <SubmitButton color="primary" label="Submit" />
            </Form>
          </Formik>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default ServiceModify;
