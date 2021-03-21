import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Form,
  Row,
  Col,
  FormGroup,
} from "reactstrap";
import { Formik } from "formik";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import Header from "../../components/custom/Header";
import InputText from "../../components/custom/Form/InputText";
import InputTag from "../../components/custom/Form/InputTag";
import InputFile from "../../components/custom/Form/InputFile";
import SubmitButton from "../../components/custom/Form/SubmitButton";
import InputImage from "../../components/custom/Form/InputImage";
import Spinner from "../../components/@vuexy/spinner/Loading-spinner";
import Error505 from "../misc/505";
import Radio from "../../components/custom/Form/Radio";

import { removeEmptyStrings } from "../../utility/helper";
import baseAxios, { useAxios } from "../../utility/baseAxios";
import { useAuthContext } from "../../contexts/AuthContext";
import { LOGIN } from "../../reducers/AuthReducer";
import formSchema from "./profileFormSchema";

const Profile = () => {
  const authToken = Cookies.get("token");
  const [{ data, loading, error }, refetch] = useAxios("profile", {
    useCache: false,
  });
  const { dispatch, logout } = useAuthContext();

  const handleSubmit = async (values, { setFieldError }) => {
    try {
      const formData = new FormData();
      values = removeEmptyStrings(values);
      Object.keys(values).forEach((key) => {
        if (key === "languages") {
          values[key].forEach((item) => {
            formData.append(key + "[]", item);
          });
        } else {
          formData.append(key, values[key]);
        }
      });

      const { data } = await baseAxios.post("profile", formData, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      const cookiesExpires = new Date(
        new Date().getTime() + data.data.expires_in * 1000
      );
      const cookiesConfig =
        process.env.NODE_ENV === "development"
          ? { expires: cookiesExpires }
          : {
              secure: true,
              domain: "granitebps.com",
              sameSite: "lax",
              expires: cookiesExpires,
            };

      Cookies.set("token", data.data.token, cookiesConfig);
      const cookiesToken = Cookies.get("token");
      if (!cookiesToken) {
        logout();
      }
      refetch();
      dispatch({
        type: LOGIN,
        payload: {
          user: {
            name: data.data.name,
            avatar: data.data.avatar,
          },
        },
      });
      toast.success(data.message);
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

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Error505 retry={refetch} />;
  }

  return (
    <React.Fragment>
      <Header title="Profile" />

      <Card>
        <CardHeader>
          <CardTitle>Update Profile</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={{
              avatar: "",
              name: data ? data.data.name : "",
              email: data ? data.data.email : "",
              username: data ? data.data.username : "",
              about: data ? data.data.profile.about : "",
              age: data ? data.data.profile.age : "",
              phone: data ? data.data.profile.phone : "",
              address: data ? data.data.profile.address : "",
              nationality: data ? data.data.profile.nationality : "",
              languages: data ? data.data.profile.languages : [],
              instagram: data ? data.data.profile.instagram : "",
              facebook: data ? data.data.profile.facebook : "",
              twitter: data ? data.data.profile.twitter : "",
              linkedin: data ? data.data.profile.linkedin : "",
              github: data ? data.data.profile.github : "",
              youtube: data ? data.data.profile.youtube : "",
              medium: data ? data.data.profile.medium : "",
              cv: "",
              freelance: data ? data.data.profile.freelance : 0,
            }}
            validationSchema={formSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Row>
                <Col sm="12">
                  <InputImage
                    image={data ? data.data.profile.avatar : ""}
                    name="avatar"
                  />
                </Col>
                <Col sm="12">
                  <InputText
                    name="name"
                    placeholder="Masukkan Nama"
                    label="Nama"
                    type="text"
                  />
                </Col>
                <Col sm="12">
                  <InputText
                    name="email"
                    placeholder="Masukkan Email"
                    label="Email"
                    type="email"
                  />
                </Col>
                <Col sm="12">
                  <InputText
                    name="username"
                    placeholder="Masukkan Username"
                    label="Username"
                    type="text"
                  />
                </Col>
                <Col sm="12">
                  <InputText
                    name="about"
                    placeholder="Masukkan About"
                    label="About"
                    type="textarea"
                    rows="5"
                  />
                </Col>
                <Col sm="12">
                  <InputText
                    name="age"
                    placeholder="Masukkan Umur"
                    label="Age"
                    type="number"
                  />
                </Col>
                <Col sm="12">
                  <InputText
                    name="phone"
                    placeholder="Masukkan No Telp"
                    label="Phone Number"
                    type="text"
                  />
                </Col>
                <Col sm="12">
                  <InputText
                    name="address"
                    placeholder="Masukkan Alamat"
                    label="Alamat"
                    type="textarea"
                    rows="5"
                  />
                </Col>
                <Col sm="12">
                  <InputText
                    name="nationality"
                    placeholder="Nationality"
                    label="Masukkan Kebangsaan"
                    type="text"
                  />
                </Col>
                <Col sm="12">
                  <InputTag
                    name="languages"
                    label="Masukkan Bahasa (Bisa Lebih Dari 2)"
                  />
                </Col>
                <Col sm="12">
                  <InputText
                    name="instagram"
                    placeholder="Masukkan Instagram"
                    label="Instagram"
                    type="text"
                  />
                </Col>
                <Col sm="12">
                  <InputText
                    name="facebook"
                    placeholder="Masukkan Facebook"
                    label="Facebook"
                    type="text"
                  />
                </Col>
                <Col sm="12">
                  <InputText
                    name="twitter"
                    placeholder="Masukkan Twitter"
                    label="Twitter"
                    type="text"
                  />
                </Col>
                <Col sm="12">
                  <InputText
                    name="linkedin"
                    placeholder="Masukkan LinkedIn"
                    label="LinkedIn"
                    type="text"
                  />
                </Col>
                <Col sm="12">
                  <InputText
                    name="github"
                    placeholder="Masukkan Github"
                    label="Github"
                    type="text"
                  />
                </Col>
                <Col sm="12">
                  <InputText
                    name="youtube"
                    placeholder="Masukkan YouTube"
                    label="YouTube"
                    type="text"
                  />
                </Col>
                <Col sm="12">
                  <InputText
                    name="medium"
                    placeholder="Masukkan Medium"
                    label="Medium"
                    type="text"
                  />
                </Col>
                <Col sm="12">
                  <InputFile
                    name="cv"
                    placeholder="Masukkan CV"
                    label="CV"
                    accept="application/pdf"
                  />
                </Col>
                <Col sm="12">
                  <FormGroup>
                    <Radio label="Not Available" name="freelance" value={0} />
                    <Radio label="Available" name="freelance" value={1} />
                  </FormGroup>
                </Col>
              </Row>
              <SubmitButton label="Submit" color="primary" />
            </Form>
          </Formik>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Profile;
