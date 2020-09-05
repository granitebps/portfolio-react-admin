import React, { useState } from 'react';
import { Card, CardBody, Button, Spinner, Col, Row } from 'reactstrap';
import Cookies from 'js-cookie';
import { Trash2, Edit } from 'react-feather';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';

import Header from '../../../components/custom/Header';
import { history } from '../../../history';
import baseAxios, { useAxios } from '../../../utility/baseAxios';
import { useAuthContext } from '../../../contexts/AuthContext';
import CustomHeader from '../../../components/custom/Table/CustomHeader';
import LoadingSpinner from '../../../components/@vuexy/spinner/Loading-spinner';
import Error505 from '../../misc/505';
import { notAuthenticated } from '../../../utility/helper';

const Service = () => {
  const [{ data, loading, error }, refetch] = useAxios('service', {
    useCache: false,
  });
  const [value, setValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const { dispatch } = useAuthContext();
  const authToken = Cookies.get('token');

  const handleAdd = () => {
    history.push('/service/modify');
  };

  const handleDelete = async (data) => {
    try {
      setLoadingDelete(true);

      const { data: dataDelete } = await baseAxios.delete(`service/${data.id}`, {
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

  const handleFilter = (e) => {
    let text = e.target.value;
    let filter = filteredData;
    setValue(text);

    if (text.length) {
      filter = data.data.filter((item) => {
        let startsWithCondition =
          item.name.toLowerCase().startsWith(text.toLowerCase()) ||
          item.desc.toLowerCase().startsWith(text.toLowerCase());
        let includesCondition =
          item.name.toLowerCase().includes(text.toLowerCase()) ||
          item.desc.toLowerCase().includes(text.toLowerCase());

        if (startsWithCondition) {
          return startsWithCondition;
        } else if (!startsWithCondition && includesCondition) {
          return includesCondition;
        } else return null;
      });
      setFilteredData(filter);
    }
  };

  const columns = [
    {
      name: 'Service Name',
      selector: 'name',
      sortable: true,
      cell: (row) => <p className="text-bold-500 my-1">{row.name}</p>,
    },
    {
      name: 'Service Icon',
      selector: 'icon',
      sortable: true,
      cell: (row) => <p className="text-bold-500 my-1">{row.icon}</p>,
    },
    {
      name: 'Service Description',
      selector: 'desc',
      sortable: true,
      cell: (row) => <p className="text-bold-500 my-1">{row.desc}</p>,
    },
    {
      name: 'Action',
      selector: '',
      cell: (row) => (
        <Row>
          <Col md="6">
            <Button.Ripple
              color="success"
              onClick={() => history.push('/service/modify', { service: row })}
              className="btn-icon rounded-circle">
              <Edit />
            </Button.Ripple>
          </Col>
          <Col md="6">
            <Button.Ripple
              color="danger"
              onClick={() => handleDelete(row)}
              disabled={loadingDelete}
              className="btn-icon rounded-circle">
              {loadingDelete ? <Spinner color="white" size="sm" /> : <Trash2 />}
            </Button.Ripple>
          </Col>
        </Row>
      ),
    },
  ];

  if (error) {
    return <Error505 retry={refetch} />;
  }

  return (
    <React.Fragment>
      <Header title="Service" />

      <Card>
        <CardBody>
          <DataTable
            title="Skill"
            className="dataTable-custom"
            data={value.length ? filteredData : data && data.data}
            columns={columns}
            pagination
            striped
            highlightOnHover
            progressPending={loading}
            progressComponent={<LoadingSpinner />}
            subHeader
            subHeaderComponent={
              <CustomHeader
                value={value}
                handleFilter={handleFilter}
                label="Skill"
                handleAdd={handleAdd}
              />
            }
          />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Service;
