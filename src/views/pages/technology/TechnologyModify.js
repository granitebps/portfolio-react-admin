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

import Header from "../../../components/custom/Header";
import InputText from "../../../components/custom/Form/InputText";
import SubmitButton from "../../../components/custom/Form/SubmitButton";
import { history } from "../../../history";
import InputImage from "../../../components/custom/Form/InputImage";
import { removeEmptyStrings } from "../../../utility/helper";
import baseAxios from "../../../utility/baseAxios";
import { toast } from "react-toastify";
import { useAuthContext } from "../../../contexts/AuthContext";
import validation from "./formSchema";

const TechnologyModify = () => {
  const authToken = localStorage.getItem("token-gbps");
  const { logout } = useAuthContext();
  const param = history.location.state;
  const formSchema = validation(param);

  const handleSubmit = async (values, { setFieldError }) => {
    try {
      const formData = new FormData();
      values = removeEmptyStrings(values);
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      if (param) {
        formData.append("_method", "PUT");
      }

      const url = param ? `technology/${param.technology.id}` : "technology";
      const { data } = await baseAxios({
        url: url,
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: formData,
      });

      toast.success(data.message);
      history.push("/technology");
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

  return (
    <React.Fragment>
      <Header title={param ? "Edit Technology" : "Add Technology"} />

      <Card>
        <CardHeader>
          <CardTitle>{param ? "Edit Technology" : "Add Technology"}</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={{
              name: param ? param.technology.name : "",
              pic: "",
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
                    name="pic"
                    image={param ? param.technology.pic : null}
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
