import React, { useState } from "react";
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
  FormGroup,
} from "reactstrap";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import Header from "../../../components/custom/Header";
import InputText from "../../../components/custom/Form/InputText";
import SubmitButton from "../../../components/custom/Form/SubmitButton";
import InputImage from "../../../components/custom/Form/InputImage";
import InputMultipleImage from "../../../components/custom/Form/InputMultipleImage";
import { history } from "../../../history";
import { removeEmptyStrings } from "../../../utility/helper";
import Radio from "../../../components/custom/Form/Radio";
import { useAuthContext } from "../../../contexts/AuthContext";
import baseAxios from "../../../utility/baseAxios";
import validation from "./formSchema";

const PortofolioModify = () => {
  const authToken = Cookies.get("token");
  const { logout } = useAuthContext();
  const [loadingRemoveDefaultPic, setLoadingRemoveDefaultPic] = useState(false);
  const param = history.location.state;
  const formSchema = validation(param);

  const handleSubmit = async (values, { setFieldError }) => {
    try {
      const formData = new FormData();
      values = removeEmptyStrings(values);
      Object.keys(values).forEach((key) => {
        if (key === "pic") {
          values[key].forEach((item) => {
            formData.append(key + "[]", item);
          });
        }
        formData.append(key, values[key]);
      });

      if (param) {
        formData.append("_method", "PUT");
      }

      const url = param ? `portfolio/${param.portfolio.id}` : "portfolio";
      const { data } = await baseAxios({
        url: url,
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: formData,
      });

      toast.success(data.message);
      history.push("/portfolio");
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

  const handleRemovePic = async (id) => {
    try {
      setLoadingRemoveDefaultPic(true);
      await baseAxios({
        url: `portfolio-photo/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const oldPics = param.portfolio.pic;
      const filteredPics = oldPics.filter((p) => p.id !== id);

      const stateCopy = { ...param };
      stateCopy.portfolio.pic = filteredPics;
      history.replace({ state: stateCopy });
    } catch (error) {
      if (error.response.status === 401) {
        logout();
      } else {
        toast.error("Something Wrong!");
      }
    }
    setLoadingRemoveDefaultPic(false);
  };

  return (
    <React.Fragment>
      <Header title={param ? "Edit Portfolio" : "Add Portfolio"} />

      <Card>
        <CardHeader>
          <CardTitle>{param ? "Edit Portfolio" : "Add Portfolio"}</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={{
              name: param ? param.portfolio.name : "",
              desc: param ? param.portfolio.desc : "",
              thumbnail: "",
              type: param ? param.portfolio.type : 1,
              pic: [],
              url: param ? param.portfolio.url : "",
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
                    label="Portfolio Name"
                    placeholder="Masukkan Nama Portfolio"
                  />
                </Col>
                <Col sm="12">
                  <InputText
                    name="desc"
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
                    image={param ? param.portfolio.thumbnail : null}
                    label="Porfolio Thumbnail"
                  />
                </Col>
                <Col sm="12">
                  <InputMultipleImage
                    label="Porfolio Pictures"
                    name="pic"
                    images={param ? param.portfolio.pic : []}
                    removeDefaultPic={handleRemovePic}
                    loadingRemoveDefaultPic={loadingRemoveDefaultPic}
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
