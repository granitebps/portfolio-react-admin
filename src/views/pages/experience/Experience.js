import React, { useState } from 'react';
import Header from '../../../components/custom/Header';
import {
  Card,
  CardBody,
  Button,
  Spinner,
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import Cookies from 'js-cookie';
import { Trash2, Edit } from 'react-feather';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';
import moment from 'moment';

import { history } from '../../../history';
import baseAxios, { useAxios } from '../../../utility/baseAxios';
import { useAuthContext } from '../../../contexts/AuthContext';
import CustomHeader from '../../../components/custom/Table/CustomHeader';
import { notAuthenticated } from '../../../utility/helper';
import LoadingSpinner from '../../../components/@vuexy/spinner/Loading-spinner';
import Error505 from '../../misc/505';

const Experience = () => {
  const [{ data, loading, error }, refetch] = useAxios('experience', {
    useCache: false,
  });
  const [value, setValue] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const { dispatch } = useAuthContext();
  const authToken = Cookies.get('token');

  const handleAdd = () => {
    history.push('/experience/modify');
  };

  const handleDelete = async () => {
    try {
      setLoadingDelete(true);

      const { data: dataDelete } = await baseAxios.delete(`experience/${deleteId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      toast.success(dataDelete.message);
      refetch();
      setLoadingDelete(false);
      setDeleteId('');
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
          item.company.toLowerCase().startsWith(text.toLowerCase()) ||
          item.position.toLowerCase().startsWith(text.toLowerCase()) ||
          item.desc.toLowerCase().startsWith(text.toLowerCase()) ||
          moment(item.start_date)
            .format('DD MMMM YYYY')
            .toLowerCase()
            .startsWith(text.toLowerCase()) ||
          moment(item.end_date).format('DD MMMM YYYY').toLowerCase().startsWith(text.toLowerCase());
        let includesCondition =
          item.company.toLowerCase().includes(text.toLowerCase()) ||
          item.position.toLowerCase().includes(text.toLowerCase()) ||
          item.desc.toLowerCase().includes(text.toLowerCase()) ||
          moment(item.start_date)
            .format('DD MMMM YYYY')
            .toLowerCase()
            .includes(text.toLowerCase()) ||
          moment(item.end_date).format('DD MMMM YYYY').toLowerCase().includes(text.toLowerCase());

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
      name: 'Company Name',
      selector: 'company',
      sortable: true,
      cell: (row) => <p className="text-bold-500 my-1">{row.company}</p>,
    },
    {
      name: 'Position',
      selector: 'position',
      sortable: true,
      cell: (row) => <p className="text-bold-500 my-1">{row.position}</p>,
    },
    {
      name: 'Description',
      selector: 'desc',
      sortable: true,
      cell: (row) => <p className="text-bold-500 my-1">{row.desc}</p>,
    },
    {
      name: 'Start Date',
      selector: 'start_date',
      sortable: true,
      cell: (row) => (
        <p className="text-bold-500 my-1">{moment(row.start_date).format('DD MMMM YYYY')}</p>
      ),
    },
    {
      name: 'End Date',
      selector: 'end_date',
      sortable: true,
      cell: (row) => (
        <p className="text-bold-500 my-1">
          {row.current_job ? 'Now' : moment(row.end_date).format('DD MMMM YYYY')}
        </p>
      ),
    },
    {
      name: 'Action',
      selector: '',
      cell: (row) => (
        <Row>
          <Col md="6">
            <Button.Ripple
              color="success"
              onClick={() => history.push('/experience/modify', { experience: row })}
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
      <Header title="Experience" />

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
            title="Experience"
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
                label="Experience"
                handleAdd={handleAdd}
              />
            }
          />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Experience;
