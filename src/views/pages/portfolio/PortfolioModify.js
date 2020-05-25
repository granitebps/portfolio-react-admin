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
  FormGroup,
} from "reactstrap";

import Header from "../../../components/custom/Header";
import InputText from "../../../components/custom/Form/InputText";
import SubmitButton from "../../../components/custom/Form/SubmitButton";
import InputImage from "../../../components/custom/Form/InputImage";
import InputMultipleImage from "../../../components/custom/Form/InputMultipleImage";
import { history } from "../../../history";
import { validURL } from "../../../utility/helper";
import Radio from "../../../components/custom/Form/Radio";

const FILE_SIZE = 2048 * 1024;

const PortofolioModify = () => {
  const data = history.location.state;

  const formSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    url: Yup.string().url(),
    thumbnail: Yup.mixed()
      .required("Required")
      .test("fileSize", "File too large", (value) => {
        if (validURL(value)) {
          return true;
        } else {
          return !value || (value && value.size <= FILE_SIZE);
        }
      }),
    picture: Yup.array().required("Required"),
  });

  const handleValidation = (values) => {
    const errors = {};

    if (values.picture.length > 0) {
      values.picture.map((file) => {
        if (file.size >= FILE_SIZE) {
          errors.picture = "File too large";
        }
        return file;
      });
    }

    return errors;
  };

  const handleSubmit = (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key === "picture") {
        values[key].forEach((item) => {
          formData.append(key + "[]", item.file);
        });
      }
      formData.append(key, values[key]);
    });
  };

  return (
    <React.Fragment>
      <Header title={data ? "Edit Portfolio" : "Add Portfolio"} />

      <Card>
        <CardHeader>
          <CardTitle>{data ? "Edit Portfolio" : "Add Portfolio"}</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={{
              name: data ? data.data.name : "",
              description: data ? data.data.description : "",
              thumbnail: data ? data.data.thumbnail : null,
              type: data ? data.data.type : 1,
              picture: data ? data.data.picture : [],
              url: data ? data.data.url : "",
            }}
            validationSchema={formSchema}
            onSubmit={handleSubmit}
            validate={handleValidation}
          >
            <Form>
              <Row>
                <Col sm="12">
                  <InputText
                    name="name"
                    type="text"
                    label="Portfolio Name"
                    placeholder="Masukkan Nama Portfolio"
                  />
                </Col>
                <Col sm="12">
                  <InputText
                    name="description"
                    type="textarea"
                    label="Portfolio Description"
                    placeholder="Masukkan Deskripsi Portfolio"
                    rows="5"
                  />
                </Col>
                <Col sm="12">
                  <InputText
                    name="url"
                    type="text"
                    label="Portfolio URL"
                    placeholder="Masukkan URL Portfolio"
                  />
                </Col>
                <Col sm="12">
                  <FormGroup>
                    <Radio label="Personal Project" name="type" value={1} />
                    <Radio label="Client Project" name="type" value={2} />
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <InputImage
                    name="thumbnail"
                    image={data ? data.data.thumbnail : null}
                    label="Porfolio Thumbnail"
                  />
                </Col>
                <Col sm="12">
                  <InputMultipleImage
                    label="Porfolio Pictures"
                    name="picture"
                    images={data ? data.data.picture : []}
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

export default PortofolioModify;
