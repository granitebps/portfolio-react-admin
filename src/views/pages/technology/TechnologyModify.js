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
import InputImage from "../../../components/custom/Form/InputImage";
import { validURL } from "../../../utility/helper";

const FILE_SIZE = 2048 * 1024;

const TechnologyModify = () => {
  const formSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    picture: Yup.mixed()
      .required("Required")
      .test("fileSize", "File too large", (value) => {
        if (validURL(value)) {
          return true;
        } else {
          return !value || (value && value.size <= FILE_SIZE);
        }
      }),
  });
  const data = history.location.state;

  const handleSubmit = (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
  };

  return (
    <React.Fragment>
      <Header title={data ? "Edit Technology" : "Add Technology"} />

      <Card>
        <CardHeader>
          <CardTitle>{data ? "Edit Technology" : "Add Technology"}</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={{
              name: data ? data.data.name : "",
              picture: data ? data.data.picture : "",
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
                    label="Technology Name"
                    placeholder="Masukkan Nama Technology"
                  />
                </Col>
                <Col sm="12">
                  <InputImage
                    name="picture"
                    image={data ? data.data.picture : null}
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

export default TechnologyModify;
