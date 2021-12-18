import React from "react";
import { Formik } from "formik";
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
import { toast } from "react-toastify";

import Checkbox from "../../../components/custom/Form/Checkbox";
import Header from "../../../components/custom/Header";
import InputText from "../../../components/custom/Form/InputText";
import SubmitButton from "../../../components/custom/Form/SubmitButton";
import { history } from "../../../history";
import DatePicker from "../../../components/custom/Form/DatePicker";
import baseAxios from "../../../utility/baseAxios";
import { useAuthContext } from "../../../contexts/AuthContext";
import formSchema from "./formSchema";

const ExperienceModify = () => {
  const { logout } = useAuthContext();
  const authToken = localStorage.getItem("token-gbps");

  const param = history.location.state;

  const handleSubmit = async (values, { setFieldError }) => {
    try {
      if (param) {
        values._method = "PUT";
      }
      const url = param ? `experience/${param.experience.id}` : "experience";
      const { data } = await baseAxios({
        url: url,
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: values,
      });

      toast.success(data.message);
      history.push("/experience");
    } catch (error) {
      if (error.response.status === 401) {
        logout();
      } else if (error.response.status === 422) {
        error.response.data.message.forEach((e) => {
          setFieldError(e.field, e.message);
        });
      } else {
        toast.error("Something Wrong!");
      }
    }
  };

  const handleValidattion = (values) => {
    const errors = {};

    // If current_job === false then end_date required
    if (values.current_job === false || values.current_job === 0) {
      if (!values.end_date) {
        errors.end_date = "Required";
      } else {
        // Check if End Date Lower Than Start Date
        if (moment(values.end_date).isBefore(values.start_date, "day")) {
          errors.end_date = "End Date Cannot Be Lower Than Start Date";
        }
      }
    }

    return errors;
  };

  return (
    <React.Fragment>
      <Header title={param ? "Edit Experience" : "Add Experience"} />

      <Card>
        <CardHeader>
          <CardTitle>{param ? "Edit Experience" : "Add Experience"}</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={{
              company: param ? param.experience.company : "",
              position: param ? param.experience.position : "",
              desc: param ? param.experience.desc : "",
              current_job: param ? param.experience.current_job : 0,
              start_date: param
                ? new Date(param.experience.start_date)
                : new Date(),
              end_date: param
                ? param.experience.end_date
                  ? new Date(param.experience.end_date)
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
                    name="company"
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
                  <InputText
                    name="desc"
                    type="textarea"
                    label="Description"
                    placeholder="Masukkan Deskripsi"
                    rows={5}
                  />
                </Col>
                <Col sm="12">
                  <DatePicker name="start_date" label="Start Date" />
                </Col>
                <Col sm="12">
                  <DatePicker name="end_date" label="End Date" />
                </Col>
                <Col sm="12">
                  <Checkbox
                    color="success"
                    label="My Current Job"
                    name="current_job"
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
