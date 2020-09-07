import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
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
} from 'reactstrap';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

import Header from '../../../components/custom/Header';
import InputText from '../../../components/custom/Form/InputText';
import SubmitButton from '../../../components/custom/Form/SubmitButton';
import InputImage from '../../../components/custom/Form/InputImage';
import InputMultipleImage from '../../../components/custom/Form/InputMultipleImage';
import { history } from '../../../history';
import { validURL, notAuthenticated } from '../../../utility/helper';
import Radio from '../../../components/custom/Form/Radio';
import { useAuthContext } from '../../../contexts/AuthContext';
import baseAxios from '../../../utility/baseAxios';

const FILE_SIZE = 2048 * 1024;

const PortofolioModify = () => {
  const authToken = Cookies.get('token');
  const { dispatch } = useAuthContext();
  const [loadingRemoveDefaultPic, setLoadingRemoveDefaultPic] = useState(false);
  const param = history.location.state;

  const formSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    desc: Yup.string().required('Required'),
    url: Yup.string().url().nullable(),
    thumbnail: Yup.mixed()
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
    pic: Yup.array().test('required', 'Required', (value) => {
      if (param) {
        return true;
      } else {
        if (!value) {
          return false;
        } else {
          return true;
        }
      }
    }),
  });

  const handleValidation = (values) => {
    const errors = {};

    if (values.pic.length > 0) {
      values.pic.map((file) => {
        if (file.size >= FILE_SIZE) {
          errors.pic = 'File too large';
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
        if (key === 'pic') {
          values[key].forEach((item) => {
            formData.append(key + '[]', item);
          });
        }
        formData.append(key, values[key]);
      });

      if (param) {
        formData.append('_method', 'PUT');
      }

      const url = param ? `portfolio/${param.portfolio.id}` : 'portfolio';
      const { data } = await baseAxios({
        url: url,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: formData,
      });

      toast.success(data.message);
      history.push('/portfolio');
    } catch (error) {
      if (error.response.status === 401) {
        notAuthenticated(dispatch);
      } else {
        toast.error('Something Wrong!');
      }
    }
  };

  const handleRemovePic = async (id) => {
    try {
      setLoadingRemoveDefaultPic(true);
      await baseAxios({
        url: `portfolio-photo/${id}`,
        method: 'GET',
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
        notAuthenticated(dispatch);
      } else {
        toast.error('Something Wrong!');
      }
    }
    setLoadingRemoveDefaultPic(false);
  };

  return (
    <React.Fragment>
      <Header title={param ? 'Edit Portfolio' : 'Add Portfolio'} />

      <Card>
        <CardHeader>
          <CardTitle>{param ? 'Edit Portfolio' : 'Add Portfolio'}</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={{
              name: param ? param.portfolio.name : '',
              desc: param ? param.portfolio.desc : '',
              thumbnail: null,
              type: param ? param.portfolio.type : 1,
              pic: [],
              url: param ? param.portfolio.url : '',
            }}
            validationSchema={formSchema}
            onSubmit={handleSubmit}
            validate={handleValidation}>
            {({ isSubmitting }) => (
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

export default PortofolioModify;
