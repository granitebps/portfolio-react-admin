import React, { useState } from 'react';
import Header from '../../../components/custom/Header';
import { Card, CardBody, Button, Spinner, Col, Row, CardTitle, CardHeader } from 'reactstrap';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import moment from 'moment';

import { history } from '../../../history';
import baseAxios, { useAxios } from '../../../utility/baseAxios';
import { useAuthContext } from '../../../contexts/AuthContext';
import { notAuthenticated } from '../../../utility/helper';
import LoadingSpinner from '../../../components/@vuexy/spinner/Loading-spinner';
import Error505 from '../../misc/505';

const Gallery = () => {
  const authToken = Cookies.get('token');
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: 'gallery',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
    {
      useCache: false,
    }
  );
  const [loadingDelete, setLoadingDelete] = useState(false);
  const { dispatch } = useAuthContext();

  const handleAdd = () => {
    history.push('/gallery/modify');
  };

  const handleDelete = async (data) => {
    try {
      setLoadingDelete(true);

      const { data: dataDelete } = await baseAxios.delete(`gallery/${data.id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      toast.success(dataDelete.message);
      refetch();
      setLoadingDelete(false);
    } catch (error) {
      if (error.response.status === 401) {
        notAuthenticated(dispatch);
      } else {
        toast.error('Something Wrong!');
      }
    }
  };

  if (loading) {
    return <LoadingSpinner retry={refetch} />;
  }
  if (error) {
    return <Error505 retry={refetch} />;
  }

  return (
    <React.Fragment>
      <Header title="Experience" />

      <Card>
        <CardHeader>
          <CardTitle>Card Actions</CardTitle>
          <Button.Ripple color="primary" onClick={handleAdd}>
            Add
          </Button.Ripple>
        </CardHeader>
        <CardBody>
          <Row>
            {data.data.map((image) => (
              <Col md="2" key={image.name}>
                <span>{moment(image.created_at).format('DD MMMM YYYY, HH:mm')}</span>
                <a href={image.image} target="_blank" rel="noopener noreferrer">
                  <img src={image.image} alt={image.name} className="img-fluid img-thumbnail" />
                </a>
                <Button
                  color="danger"
                  size="sm"
                  tag="button"
                  className="btn-block"
                  onClick={() => handleDelete(image)}
                  disabled={loadingDelete}>
                  {loadingDelete ? <Spinner color="white" size="sm" /> : 'Delete'}
                </Button>
              </Col>
            ))}
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Gallery;
