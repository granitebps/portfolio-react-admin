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
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import Header from "../../../components/custom/Header";
import SubmitButton from "../../../components/custom/Form/SubmitButton";
import InputMultipleImage from "../../../components/custom/Form/InputMultipleImage";
import { history } from "../../../history";
import { useAuthContext } from "../../../contexts/AuthContext";
import baseAxios from "../../../utility/baseAxios";
import formSchema from "./formSchema";

const GalleryModify = () => {
  const authToken = Cookies.get("token");
  const { logout } = useAuthContext();

  const handleSubmit = async (values, { setFieldError }) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === "image") {
          values[key].forEach((item) => {
            formData.append(key + "[]", item);
          });
        }
        formData.append(key, values[key]);
      });

      const { data } = await baseAxios({
        url: "gallery",
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: formData,
      });

      toast.success(data.message);
      history.push("/gallery");
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
      <Header title="Add Gallery" />

      <Card>
        <CardHeader>
          <CardTitle>Add Gallery</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={{
              image: [],
            }}
            validationSchema={formSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Row>
                <Col sm="12">
                  <InputMultipleImage label="Images" name="image" images={[]} />
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

export default GalleryModify;
