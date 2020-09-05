import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Card, CardHeader, CardTitle, CardBody, Form, Row, Col, Button } from 'reactstrap';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

import Header from '../../../components/custom/Header';
import SubmitButton from '../../../components/custom/Form/SubmitButton';
import InputMultipleImage from '../../../components/custom/Form/InputMultipleImage';
import { history } from '../../../history';
import { notAuthenticated } from '../../../utility/helper';
import { useAuthContext } from '../../../contexts/AuthContext';
import baseAxios from '../../../utility/baseAxios';

const FILE_SIZE = 2048 * 1024;

const GalleryModify = () => {
  const authToken = Cookies.get('token');
  const { dispatch } = useAuthContext();

  const formSchema = Yup.object().shape({
    image: Yup.array().required('Required'),
  });

  const handleValidation = (values) => {
    const errors = {};

    if (values.image.length > 0) {
      values.image.map((file) => {
        if (file.size >= FILE_SIZE) {
          errors.image = 'File too large';
        }
        return file;
      });
    }

    return errors;
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === 'image') {
          values[key].forEach((item) => {
            formData.append(key + '[]', item);
          });
        }
        formData.append(key, values[key]);
      });

      const { data } = await baseAxios({
        url: 'gallery',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: formData,
      });

      toast.success(data.message);
      history.push('/gallery');
    } catch (error) {
      if (error.response.status === 401) {
        notAuthenticated(dispatch);
      } else {
        toast.error('Something Wrong!');
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
              image: [],
            }}
            validationSchema={formSchema}
            onSubmit={handleSubmit}
            validate={handleValidation}>
            {({ isSubmitting }) => (
              <Form>
                <Row>
                  <Col sm="12">
                    <InputMultipleImage label="Images" name="image" images={[]} />
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

export default GalleryModify;
