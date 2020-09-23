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
import { notAuthenticated } from '../../../utility/helper';
import { useAuthContext } from '../../../contexts/AuthContext';

const ServiceModify = () => {
  const { dispatch } = useAuthContext();
  const authToken = Cookies.get('token');

  const formSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    icon: Yup.string().required('Required'),
    desc: Yup.string().required('Required'),
  });

  const param = history.location.state;

  const handleSubmit = async (values, { setFieldError }) => {
    try {
      if (param) {
        values._method = 'PUT';
      }
      const url = param ? `service/${param.service.id}` : 'service';
      const { data } = await baseAxios({
        url: url,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: values,
      });

      toast.success(data.message);
      history.push('/service');
    } catch (error) {
      if (error.response.status === 401) {
        notAuthenticated(dispatch);
      } else if (error.response.status === 422) {
        error.response.data.errors.name &&
          setFieldError('name', error.response.data.errors.name[0]);
        error.response.data.errors.icon &&
          setFieldError('icon', error.response.data.errors.icon[0]);
        error.response.data.errors.desc &&
          setFieldError('desc', error.response.data.errors.desc[0]);
      } else {
        toast.error('Something Wrong!');
      }
    }
  };

  return (
    <React.Fragment>
      <Header title={param ? 'Edit Service' : 'Add Service'} />

      <Card>
        <CardHeader>
          <CardTitle>{param ? 'Edit Service' : 'Add Service'}</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={{
              name: param ? param.service.name : '',
              icon: param ? param.service.icon : '',
              desc: param ? param.service.desc : '',
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
                      label="Service Name"
                      placeholder="Masukkan Nama Service"
                    />
                  </Col>
                  <Col sm="12">
                    <InputText
                      name="icon"
                      type="text"
                      label="Service Icon (LineIcons)"
                      placeholder="Masukkan Icon Service"
                    />
                  </Col>
                  <Col sm="12">
                    <InputText
                      name="desc"
                      type="textarea"
                      label="Service Description"
                      placeholder="Masukkan Deskripsi Service"
                      rows="5"
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

export default ServiceModify;
