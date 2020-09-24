import React, { useState } from 'react';
import {
  Card,
  CardBody,
  Button,
  Row,
  Col,
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import DataTable from 'react-data-table-component';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { Edit, Trash2 } from 'react-feather';

import { history } from '../../../history';
import baseAxios, { useAxios } from '../../../utility/baseAxios';
import LoadingSpinner from '../../../components/@vuexy/spinner/Loading-spinner';
import Error505 from '../../misc/505';
import Header from '../../../components/custom/Header';
import CustomHeader from '../../../components/custom/Table/CustomHeader';
import { useAuthContext } from '../../../contexts/AuthContext';

const Skill = () => {
  const [{ data, loading, error }, refetch] = useAxios('skill', {
    useCache: false,
  });
  const [value, setValue] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const { logout } = useAuthContext();
  const authToken = Cookies.get('token');

  const handleAdd = () => {
    history.push('/skill/modify');
  };

  const handleDelete = async () => {
    try {
      setLoadingDelete(true);

      const { data: dataDelete } = await baseAxios.delete(`skill/${deleteId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      toast.success(dataDelete.message);
      refetch();
      setLoadingDelete(false);
      setDeleteId('');
    } catch (error) {
      if (error.response.status === 401) {
        logout();
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
          item.percentage.toLowerCase().startsWith(text.toLowerCase());
        let includesCondition =
          item.name.toLowerCase().includes(text.toLowerCase()) ||
          item.percentage.toLowerCase().includes(text.toLowerCase());

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
      name: 'Skill Name',
      selector: 'name',
      sortable: true,
      cell: (row) => <p className="text-bold-500 mb-0">{row.name}</p>,
    },
    {
      name: 'Skill Percentage',
      selector: 'percentage',
      sortable: true,
      cell: (row) => <p className="text-bold-500 mb-0">{row.percentage}</p>,
    },
    {
      name: 'Action',
      selector: '',
      cell: (row) => (
        <Row>
          <Col md="6">
            <Button.Ripple
              color="success"
              onClick={() => history.push('/skill/modify', { skill: row })}
              className="btn-icon rounded-circle">
              <Edit />
            </Button.Ripple>
          </Col>
          <Col md="6">
            <Button.Ripple
              color="danger"
              onClick={() => setDeleteId(row.id)}
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
      <Header title="Skill" />

      <Modal
        isOpen={deleteId !== ''}
        toggle={() => setDeleteId('')}
        className="modal-dialog-centered modal-sm">
        <ModalHeader toggle={() => setDeleteId('')}>WARNING!!!</ModalHeader>
        <ModalBody>Are you sure want to delete this data?</ModalBody>
        <ModalFooter>
          <Button disabled={loadingDelete} color="danger" onClick={() => setDeleteId('')}>
            {loadingDelete ? <Spinner color="white" size="sm" /> : 'No'}
          </Button>
          <Button disabled={loadingDelete} color="primary" onClick={handleDelete} outline>
            {loadingDelete ? <Spinner color="white" size="sm" /> : 'Yes'}
          </Button>
        </ModalFooter>
      </Modal>

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

export default Skill;
