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
import { toast } from "react-toastify";

import Header from "../../../components/custom/Header";
import SubmitButton from "../../../components/custom/Form/SubmitButton";
import { history } from "../../../history";
import { useAuthContext } from "../../../contexts/AuthContext";
import baseAxios from "../../../utility/baseAxios";
import formSchema from "./formSchema";
import InputFile from "../../../components/custom/Form/InputFile";

const GalleryModify = () => {
  const authToken = localStorage.getItem("token-gbps");
  const { logout } = useAuthContext();

  const handleSubmit = async (values, { setFieldError }) => {
    try {
      const filename = values.file.name;
      const extension = filename.split(".").pop();
      const { data: dataAWs } = await baseAxios({
        url: "gallery/aws",
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: {
          extension,
        },
      });

      await fetch(dataAWs.data.url, {
        method: "PUT",
        headers: {
          "Content-Type": values.file.type,
        },
        body: values.file,
      });

      const { data } = await baseAxios({
        url: "gallery",
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: {
          name: dataAWs.data.name,
          file: dataAWs.data.file,
          ext: extension,
          size: values.file.size,
        },
      });

      toast.success(data.message);
      history.push("/gallery");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          logout();
        } else if (error.response.status === 422) {
          error.response.data.message.forEach((e) => {
            setFieldError(e.field, e.message);
          });
        } else {
          toast.error("Something Wrong!");
        }
      } else {
        console.log(error);
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
              file: null,
            }}
            validationSchema={formSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Row>
                <Col sm="12">
                  <InputFile label="File" name="file" placeholder="Add file" />
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
