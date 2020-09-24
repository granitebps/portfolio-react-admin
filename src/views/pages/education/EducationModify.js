import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Card, CardHeader, CardTitle, CardBody, Form, Row, Col, Button } from 'reactstrap';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

import Header from '../../../components/custom/Header';
import InputText from '../../../components/custom/Form/InputText';
import SubmitButton from '../../../components/custom/Form/SubmitButton';
import { history } from '../../../history';
import baseAxios from '../../../utility/baseAxios';
import { useAuthContext } from '../../../contexts/AuthContext';

const EducationModify = () => {
  const { logout } = useAuthContext();
  const authToken = Cookies.get('token');

  const formSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    institute: Yup.string().required('Required'),
    start_year: Yup.number().required('Required').min(1900).max(9999),
    end_year: Yup.number().required('Required').min(1900).max(9999),
  });

  const param = history.location.state;

  const handleSubmit = async (values, { setFieldError }) => {
    try {
      if (param) {
        values._method = 'PUT';
      }
      const url = param ? `education/${param.education.id}` : 'education';
      const { data } = await baseAxios({
        url: url,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: values,
      });

      toast.success(data.message);
      history.push('/education');
    } catch (error) {
      if (error.response.status === 401) {
        logout();
      } else if (error.response.status === 422) {
        error.response.data.errors.name &&
          setFieldError('name', error.response.data.errors.name[0]);
        error.response.data.errors.institute &&
          setFieldError('institute', error.response.data.errors.institute[0]);
        error.response.data.errors.start_year &&
          setFieldError('start_year', error.response.data.errors.start_year[0]);
        error.response.data.errors.end_year &&
          setFieldError('end_year', error.response.data.errors.end_year[0]);
      } else {
        toast.error('Something Wrong!');
      }
    }
  };

  return (
    <React.Fragment>
      <Header title={param ? 'Edit Education' : 'Add Education'} />

      <Card>
        <CardHeader>
          <CardTitle>{param ? 'Edit Education' : 'Add Education'}</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={{
              name: param ? param.education.name : '',
              institute: param ? param.education.institute : '',
              start_year: param ? param.education.start_year : '',
              end_year: param ? param.education.end_year : '',
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
                      label="Education Name"
                      placeholder="Masukkan Nama Edukasi"
                    />
                  </Col>
                  <Col sm="12">
                    <InputText
                      name="institute"
                      type="text"
                      label="Education Institute"
                      placeholder="Masukkan Nama Institute"
                    />
                  </Col>
                  <Col sm="12">
                    <InputText
                      name="start_year"
                      type="number"
                      label="Start Year"
                      placeholder="Masukkan Tahun Masuk"
                    />
                  </Col>
                  <Col sm="12">
                    <InputText
                      name="end_year"
                      type="number"
                      label="End Year"
                      placeholder="Masukkan Tahun Keluar"
                    />
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

export default EducationModify;
