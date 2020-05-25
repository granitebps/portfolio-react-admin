import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Form,
  Row,
  Col,
} from "reactstrap";
import { Formik } from "formik";
import * as Yup from "yup";

import Header from "../../components/custom/Header";
import InputText from "../../components/custom/Form/InputText";
import SubmitButton from "../../components/custom/Form/SubmitButton";
import InputImage from "../../components/custom/Form/InputImage";

import { validURL } from "../../utility/helper";

const FILE_SIZE = 2048 * 1024;
const dummyData = {
  avatar: "https://granitebps.com/images/avatar/IMG_20171122_191101.jpg",
  name: "Granite Bagas",
  email: "granitebagas28@gmail.com",
  username: "granitebps",
  about:
    "Hai!!! My name is Granite Bagas and I love to code. I'm currently working as Laravel Developer. My focus now is in Laravel as PHP Framework and Node.js as a server-side Javascript Framework. But in the future, I like to learn more about Go Language and Django as Phyton Framework. I have lot of personal and client project build with Laravel and Node.js. And yes, my expertise is in back-end programming. If you want me to make something awesome with Laravel and Node.js, you can contact me down below.",
  phone: "081319144618",
  alamat: "Jakarta Pusat, DKI Jakarta, Indonesia",
  instagram: "https://www.instagram.com/granitebps",
  facebook: "https://www.facebook.com/granitebps",
  twitter: "https://www.twitter.com/granitbps",
  linkedin: "https://www.linkedin.com/in/granitebps/",
  github: "https://www.github.com/granitebps",
  youtube: "https://www.youtube.com/channel/UCcMqEJTGebhR8RodKMJey7Q",
  cv: "",
};

const Profile = () => {
  const formSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    username: Yup.string().required("Required"),
    about: Yup.string().required("Required"),
    phone: Yup.number().required("Required"),
    alamat: Yup.string().required("Required"),
    instagram: Yup.string().required("Required").url("Must Be Valid URL"),
    facebook: Yup.string().required("Required").url("Must Be Valid URL"),
    twitter: Yup.string().required("Required").url("Must Be Valid URL"),
    linkedin: Yup.string().required("Required").url("Must Be Valid URL"),
    github: Yup.string().required("Required").url("Must Be Valid URL"),
    youtube: Yup.string().required("Required").url("Must Be Valid URL"),
    cv: Yup.mixed().test(
      "fileSize",
      "File too large",
      (value) => !value || (value && value.size <= FILE_SIZE)
    ),
    avatar: Yup.mixed().test("fileSize", "File too large", (value) => {
      if (validURL(value)) {
        return true;
      } else {
        return !value || (value && value.size <= FILE_SIZE);
      }
    }),
  });

  const handleSubmit = (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
  };

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
              avatar: dummyData.avatar,
              name: dummyData.name,
              email: dummyData.email,
              username: dummyData.username,
              about: dummyData.about,
              phone: dummyData.phone,
              alamat: dummyData.alamat,
              instagram: dummyData.instagram,
              facebook: dummyData.facebook,
              twitter: dummyData.twitter,
              linkedin: dummyData.linkedin,
              github: dummyData.github,
              youtube: dummyData.youtube,
              cv: "",
            }}
            validationSchema={formSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Row>
                <Col sm="12">
                  <InputImage image={dummyData.avatar} name="avatar" />
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
                    name="phone"
                    placeholder="Masukkan No Telp"
                    label="Phone Number"
                    type="number"
                  />
                </Col>
                <Col sm="12">
                  <InputText
                    name="alamat"
                    placeholder="Masukkan Alamat"
                    label="Alamat"
                    type="textarea"
                    rows="5"
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
                    name="cv"
                    placeholder="Masukkan CV"
                    label="CV"
                    type="file"
                    accept="application/pdf"
                  />
                </Col>
              </Row>
              <SubmitButton color="primary" label="Submit" />
            </Form>
          </Formik>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Profile;
