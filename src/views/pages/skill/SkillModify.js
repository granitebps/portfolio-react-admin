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
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import { history } from "../../../history";
import Header from "../../../components/custom/Header";
import InputText from "../../../components/custom/Form/InputText";
import SubmitButton from "../../../components/custom/Form/SubmitButton";
import { notAuthenticated } from "../../../utility/helper";
import { useAuthContext } from "../../../contexts/AuthContext";
import baseAxios from "../../../utility/baseAxios";

const SkillModify = () => {
  const { dispatch } = useAuthContext();
  const authToken = Cookies.get("token");

  const formSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    percentage: Yup.number().required("Required").min(1).max(100),
  });
  const param = history.location.state;

  const handleSubmit = async (values) => {
    try {
      const url = param ? `skill/${param.skill.id}` : "skill";
      const method = param ? "PUT" : "POST";
      const { data } = await baseAxios({
        url: url,
        method: method,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: values,
      });

      toast.success(data.message);
      history.push("/skill");
    } catch (error) {
      if (error.response.status === 401) {
        notAuthenticated(dispatch);
      } else {
        toast.error("Something Wrong!");
      }
    }
  };

  return (
    <React.Fragment>
      <Header title={param ? "Edit Skill" : "Add Skill"} />

      <Card>
        <CardHeader>
          <CardTitle>{param ? "Edit Skill" : "Add Skill"}</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={{
              name: param ? param.skill.name : "",
              percentage: param ? param.skill.percentage : "",
            }}
            validationSchema={formSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
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

export default SkillModify;
