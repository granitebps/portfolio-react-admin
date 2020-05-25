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

const SkillModify = () => {
  const formSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    percentage: Yup.number().required("Required").min(1).max(100),
  });
  const data = history.location.state;

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <React.Fragment>
      <Header title={data ? "Edit Skill" : "Add Skill"} />

      <Card>
        <CardHeader>
          <CardTitle>{data ? "Edit Skill" : "Add Skill"}</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={{
              name: data ? data.data.name : "",
              percentage: data ? data.data.percentage : "",
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
                    label="Skill Name"
                    placeholder="Masukkan Nama Skill"
                  />
                </Col>
                <Col sm="12">
                  <InputText
                    name="percentage"
                    type="number"
                    label="Skill Percentage"
                    placeholder="Masukkan Persentase Skill"
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

export default SkillModify;
