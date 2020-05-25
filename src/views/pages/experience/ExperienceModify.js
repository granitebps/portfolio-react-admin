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
import moment from "moment";

import Checkbox from "../../../components/custom/Form/Checkbox";
import Header from "../../../components/custom/Header";
import InputText from "../../../components/custom/Form/InputText";
import SubmitButton from "../../../components/custom/Form/SubmitButton";
import { history } from "../../../history";
import DatePicker from "../../../components/custom/Form/DatePicker";

const ExperienceModify = () => {
  const formSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    position: Yup.string().required("Required"),
    currentJob: Yup.boolean(),
    startDate: Yup.date().required("Required"),
  });

  const data = history.location.state;

  const handleValidattion = (values) => {
    const errors = {};

    // If currentJob === false then endDate required
    if (values.currentJob === false || values.currentJob === 0) {
      if (!values.endDate) {
        errors.endDate = "Required";
      } else {
        // Check if End Date Lower Than Start Date
        if (moment(values.endDate).isBefore(values.startDate, "day")) {
          errors.endDate = "End Date Cannot Be Lower Than Start Date";
        }
      }
    }

    return errors;
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <React.Fragment>
      <Header title={data ? "Edit Experience" : "Add Experience"} />

      <Card>
        <CardHeader>
          <CardTitle>{data ? "Edit Experience" : "Add Experience"}</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={{
              name: data ? data.data.name : "",
              position: data ? data.data.position : "",
              currentJob: data ? data.data.currentJob : 0,
              startDate: data ? new Date(data.data.startDate) : new Date(),
              endDate: data
                ? data.data.endDate
                  ? new Date(data.data.endDate)
                  : null
                : null,
            }}
            validationSchema={formSchema}
            onSubmit={handleSubmit}
            validate={handleValidattion}
          >
            <Form>
              <Row>
                <Col sm="12">
                  <InputText
                    name="name"
                    type="text"
                    label="Company Name"
                    placeholder="Masukkan Nama Perusahaan"
                  />
                </Col>
                <Col sm="12">
                  <InputText
                    name="position"
                    type="text"
                    label="Position"
                    placeholder="Masukkan Posisi"
                  />
                </Col>
                <Col sm="12">
                  <DatePicker name="startDate" label="Start Date" />
                </Col>
                <Col sm="12">
                  <DatePicker name="endDate" label="End Date" />
                </Col>
                <Col sm="12">
                  <Checkbox
                    color="success"
                    label="My Current Job"
                    name="currentJob"
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

export default ExperienceModify;
