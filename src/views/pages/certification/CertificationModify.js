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
import DatePicker from '../../../components/custom/Form/DatePicker';
import baseAxios from '../../../utility/baseAxios';
import { useAuthContext } from '../../../contexts/AuthContext';

const CertificationModify = () => {
  const { logout } = useAuthContext();
  const authToken = Cookies.get('token');

  const formSchema = Yup.object().shape({
    name: Yup.string().required(),
    institution: Yup.string().required(),
    link: Yup.string().required().url(),
    published: Yup.date().required(),
  });

  const param = history.location.state;

  const handleSubmit = async (values, { setFieldError }) => {
    try {
      if (param) {
        values._method = 'PUT';
      }
      const url = param ? `certification/${param.certification.id}` : 'certification';
      const { data } = await baseAxios({
        url: url,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: values,
      });

      toast.success(data.message);
      history.push('/certification');
    } catch (error) {
      if (error.response.status === 401) {
        logout();
      } else if (error.response.status === 422) {
        error.response.data.errors.name &&
          setFieldError('name', error.response.data.errors.name[0]);
        error.response.data.errors.institution &&
          setFieldError('institution', error.response.data.errors.institution[0]);
        error.response.data.errors.link &&
          setFieldError('link', error.response.data.errors.link[0]);
        error.response.data.errors.published &&
          setFieldError('published', error.response.data.errors.published[0]);
      } else {
        toast.error('Something Wrong!');
      }
    }
  };

  return (
    <React.Fragment>
      <Header title={param ? 'Edit Certification' : 'Add Certification'} />

      <Card>
        <CardHeader>
          <CardTitle>{param ? 'Edit Certification' : 'Add Certification'}</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={{
              name: param ? param.certification.name : '',
              institution: param ? param.certification.institution : '',
              link: param ? param.certification.link : '',
              published: param ? new Date(param.certification.published) : new Date(),
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
                      label="Certification Name"
                      placeholder="Masukkan Nama Sertifikasi"
                    />
                  </Col>
                  <Col sm="12">
                    <InputText
                      name="institution"
                      type="text"
                      label="Institution"
                      placeholder="Masukkan Institusi"
                    />
                  </Col>
                  <Col sm="12">
                    <InputText name="link" type="text" label="Link" placeholder="Masukkan Link" />
                  </Col>
                  <Col sm="12">
                    <DatePicker name="published" label="Published Date" />
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

export default CertificationModify;
