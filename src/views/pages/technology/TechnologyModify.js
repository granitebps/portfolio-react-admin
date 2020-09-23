import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Card, CardHeader, CardTitle, CardBody, Form, Row, Col, Button } from 'reactstrap';
import Cookies from 'js-cookie';

import Header from '../../../components/custom/Header';
import InputText from '../../../components/custom/Form/InputText';
import SubmitButton from '../../../components/custom/Form/SubmitButton';
import { history } from '../../../history';
import InputImage from '../../../components/custom/Form/InputImage';
import { validURL, notAuthenticated } from '../../../utility/helper';
import baseAxios from '../../../utility/baseAxios';
import { toast } from 'react-toastify';
import { useAuthContext } from '../../../contexts/AuthContext';

const FILE_SIZE = 2048 * 1024;

const TechnologyModify = () => {
  const authToken = Cookies.get('token');
  const { dispatch } = useAuthContext();
  const param = history.location.state;
  const formSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    pic: Yup.mixed()
      .test('required', 'Required', (value) => {
        if (param) {
          return true;
        } else {
          if (!value) {
            return false;
          } else {
            return true;
          }
        }
      })
      .test('fileSize', 'File too large', (value) => {
        if (validURL(value)) {
          return true;
        } else {
          return !value || (value && value.size <= FILE_SIZE);
        }
      }),
  });

  const handleSubmit = async (values, { setFieldError }) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      if (param) {
        formData.append('_method', 'PUT');
      }

      const url = param ? `technology/${param.technology.id}` : 'technology';
      const { data } = await baseAxios({
        url: url,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: formData,
      });

      toast.success(data.message);
      history.push('/technology');
    } catch (error) {
      if (error.response.status === 401) {
        notAuthenticated(dispatch);
      } else if (error.response.status === 422) {
        error.response.data.errors.name &&
          setFieldError('name', error.response.data.errors.name[0]);
        error.response.data.errors.pic && setFieldError('pic', error.response.data.errors.pic[0]);
      } else {
        toast.error('Something Wrong!');
      }
    }
  };

  return (
    <React.Fragment>
      <Header title={param ? 'Edit Technology' : 'Add Technology'} />

      <Card>
        <CardHeader>
          <CardTitle>{param ? 'Edit Technology' : 'Add Technology'}</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={{
              name: param ? param.technology.name : '',
              pic: '',
            }}
            validationSchema={formSchema}
            onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
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
                    <InputImage name="pic" image={param ? param.technology.pic : null} />
                  </Col>
                </Row>
                <Button.Ripple className="mr-1" color="warning" onClick={() => history.goBack()}>
                  Back
                </Button.Ripple>
                <SubmitButton color="primary" label="Submit" isSubmitting={isSubmitting} />
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default TechnologyModify;
