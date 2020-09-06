import React from 'react';
import { Card, CardHeader, CardTitle, CardBody, Form, Row, Col, FormGroup } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

import Header from '../../components/custom/Header';
import InputText from '../../components/custom/Form/InputText';
import InputTag from '../../components/custom/Form/InputTag';
import InputFile from '../../components/custom/Form/InputFile';
import SubmitButton from '../../components/custom/Form/SubmitButton';
import InputImage from '../../components/custom/Form/InputImage';
import Spinner from '../../components/@vuexy/spinner/Loading-spinner';
import Error505 from '../misc/505';
import Radio from '../../components/custom/Form/Radio';

import { validURL, removeEmptyStrings, notAuthenticated } from '../../utility/helper';
import baseAxios, { useAxios } from '../../utility/baseAxios';
import { useAuthContext } from '../../contexts/AuthContext';
import { LOGIN } from '../../reducers/AuthReducer';

const FILE_SIZE = 2048 * 1024;

const Profile = () => {
  const authToken = Cookies.get('token');
  const [{ data, loading, error }, refetch] = useAxios('profile', {
    useCache: false,
  });
  const { dispatch } = useAuthContext();

  const formSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    username: Yup.string().required('Required'),
    about: Yup.string().required('Required'),
    age: Yup.number().required('Required'),
    phone: Yup.number().required('Required'),
    address: Yup.string().required('Required'),
    nationality: Yup.string().required('Required'),
    languages: Yup.array().required('Required'),
    instagram: Yup.string().required('Required').url('Must Be Valid URL'),
    facebook: Yup.string().required('Required').url('Must Be Valid URL'),
    twitter: Yup.string().required('Required').url('Must Be Valid URL'),
    linkedin: Yup.string().required('Required').url('Must Be Valid URL'),
    github: Yup.string().required('Required').url('Must Be Valid URL'),
    youtube: Yup.string().required('Required').url('Must Be Valid URL'),
    cv: Yup.mixed().test(
      'fileSize',
      'File too large',
      (value) => !value || (value && value.size <= FILE_SIZE)
    ),
    avatar: Yup.mixed().test('fileSize', 'File too large', (value) => {
      if (validURL(value)) {
        return true;
      } else {
        return !value || (value && value.size <= FILE_SIZE);
      }
    }),
  });

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      values = removeEmptyStrings(values);
      Object.keys(values).forEach((key) => {
        if (key === 'languages') {
          values[key].forEach((item) => {
            formData.append(key + '[]', item);
          });
        } else {
          formData.append(key, values[key]);
        }
      });

      const { data } = await baseAxios.post('profile', formData, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      const cookiesConfig =
        process.env.NODE_ENV === 'development'
          ? {}
          : { secure: true, domain: 'granitebps.com', sameSite: 'lax' };

      Cookies.set('token', data.data.token, cookiesConfig);
      const cookiesToken = Cookies.get('token');
      if (!cookiesToken) {
        notAuthenticated(dispatch);
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
        notAuthenticated(dispatch);
      } else {
        toast.error('Something Wrong!');
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
              avatar: '',
              name: data ? data.data.name : '',
              email: data ? data.data.email : '',
              username: data ? data.data.username : '',
              about: data ? data.data.profile.about : '',
              age: data ? data.data.profile.age : '',
              phone: data ? data.data.profile.phone : '',
              address: data ? data.data.profile.address : '',
              nationality: data ? data.data.profile.nationality : '',
              languages: data ? data.data.profile.languages : [],
              instagram: data ? data.data.profile.instagram : '',
              facebook: data ? data.data.profile.facebook : '',
              twitter: data ? data.data.profile.twitter : '',
              linkedin: data ? data.data.profile.linkedin : '',
              github: data ? data.data.profile.github : '',
              youtube: data ? data.data.profile.youtube : '',
              cv: '',
              freelance: data ? data.data.profile.freelance : 0,
            }}
            validationSchema={formSchema}
            onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <Row>
                  <Col sm="12">
                    <InputImage image={data ? data.data.profile.avatar : ''} name="avatar" />
                  </Col>
                  <Col sm="12">
                    <InputText name="name" placeholder="Masukkan Nama" label="Nama" type="text" />
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
                    <InputText name="age" placeholder="Masukkan Umur" label="Age" type="number" />
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
                    <InputTag name="languages" label="Masukkan Bahasa (Bisa Lebih Dari 2)" />
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
                <SubmitButton isSubmitting={isSubmitting} label="Submit" color="primary" />
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Profile;
