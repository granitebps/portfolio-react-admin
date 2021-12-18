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
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../../assets/scss/plugins/extensions/editor.scss";

import Header from "../../../components/custom/Header";
import InputText from "../../../components/custom/Form/InputText";
import SubmitButton from "../../../components/custom/Form/SubmitButton";
import { history } from "../../../history";
import InputImage from "../../../components/custom/Form/InputImage";
import { removeEmptyStrings } from "../../../utility/helper";
import baseAxios from "../../../utility/baseAxios";
import { toast } from "react-toastify";
import { useAuthContext } from "../../../contexts/AuthContext";
import InputMarkdown from "../../../components/custom/Form/InputMarkdown";
import validation from "./formSchema";

const BlogModify = () => {
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

      const url = param ? `blog/${param.blog.id}` : "blog";
      const { data } = await baseAxios({
        url: url,
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: formData,
      });

      toast.success(data.message);
      history.push("/blog");
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
      <Header title={param ? "Edit Blog" : "Add Blog"} />

      <Card>
        <CardHeader>
          <CardTitle>{param ? "Edit Blog" : "Add Blog"}</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={{
              title: param ? param.blog.title : "",
              body: param ? param.blog.body : "",
              image: "",
            }}
            validationSchema={formSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Row>
                <Col sm="12">
                  <InputText
                    name="title"
                    type="text"
                    label="Blog Title"
                    placeholder="Masukkan Judul Blog"
                  />
                </Col>
                <Col sm="12">
                  <InputMarkdown
                    name="body"
                    label="Blog Content"
                    placeholder="Masukkan Isi Blog"
                  />
                </Col>
                <Col sm="12">
                  <InputImage
                    name="image"
                    image={param ? param.blog.image : null}
                    label="Blog Image"
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

export default BlogModify;
