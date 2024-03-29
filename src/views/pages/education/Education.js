import React, { useState } from "react";
import Header from "../../../components/custom/Header";
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
} from "reactstrap";
import { Trash2, Edit } from "react-feather";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";

import { history } from "../../../history";
import baseAxios, { useAxios } from "../../../utility/baseAxios";
import { useAuthContext } from "../../../contexts/AuthContext";
import CustomHeader from "../../../components/custom/Table/CustomHeader";
import LoadingSpinner from "../../../components/@vuexy/spinner/Loading-spinner";
import Error505 from "../../misc/505";

const Education = () => {
  const [{ data, loading, error }, refetch] = useAxios("education", {
    useCache: false,
  });
  const [value, setValue] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const { logout } = useAuthContext();
  const authToken = localStorage.getItem("token-gbps");

  const handleAdd = () => {
    history.push("/education/modify");
  };

  const handleDelete = async () => {
    try {
      setLoadingDelete(true);

      const { data: dataDelete } = await baseAxios.delete(
        `education/${deleteId}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      toast.success(dataDelete.message);
      refetch();
      setLoadingDelete(false);
      setDeleteId("");
    } catch (error) {
      if (error.response.status === 401) {
        logout();
      } else {
        toast.error("Something Wrong!");
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
          item.institute.toLowerCase().startsWith(text.toLowerCase()) ||
          item.start_year.toLowerCase().startsWith(text.toLowerCase()) ||
          item.end_year.toLowerCase().startsWith(text.toLowerCase());
        let includesCondition =
          item.name.toLowerCase().includes(text.toLowerCase()) ||
          item.institute.toLowerCase().includes(text.toLowerCase()) ||
          item.start_year.toLowerCase().includes(text.toLowerCase()) ||
          item.end_year.toLowerCase().includes(text.toLowerCase());

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
      name: "Education Name",
      selector: "name",
      sortable: true,
      cell: (row) => <p className="text-bold-500 my-1">{row.name}</p>,
    },
    {
      name: "Education Institute",
      selector: "institute",
      sortable: true,
      cell: (row) => <p className="text-bold-500 my-1">{row.institute}</p>,
    },
    {
      name: "Start Year",
      selector: "start_year",
      sortable: true,
      cell: (row) => <p className="text-bold-500 my-1">{row.start_year}</p>,
    },
    {
      name: "End Year",
      selector: "end_year",
      sortable: true,
      cell: (row) => <p className="text-bold-500 my-1">{row.end_year}</p>,
    },
    {
      name: "Action",
      selector: "",
      cell: (row) => (
        <Row>
          <Col md="6">
            <Button.Ripple
              color="success"
              onClick={() =>
                history.push("/education/modify", { education: row })
              }
              className="btn-icon rounded-circle"
            >
              <Edit />
            </Button.Ripple>
          </Col>
          <Col md="6">
            <Button.Ripple
              color="danger"
              onClick={() => setDeleteId(row.id)}
              disabled={loadingDelete}
              className="btn-icon rounded-circle"
            >
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
      <Header title="Education" />

      <Modal
        isOpen={deleteId !== ""}
        toggle={() => setDeleteId("")}
        className="modal-dialog-centered modal-sm"
      >
        <ModalHeader toggle={() => setDeleteId("")}>WARNING!!!</ModalHeader>
        <ModalBody>Are you sure want to delete this data?</ModalBody>
        <ModalFooter>
          <Button
            disabled={loadingDelete}
            color="danger"
            onClick={() => setDeleteId("")}
          >
            {loadingDelete ? <Spinner color="white" size="sm" /> : "No"}
          </Button>
          <Button
            disabled={loadingDelete}
            color="primary"
            onClick={handleDelete}
            outline
          >
            {loadingDelete ? <Spinner color="white" size="sm" /> : "Yes"}
          </Button>
        </ModalFooter>
      </Modal>

      <Card>
        <CardBody>
          <DataTable
            title="Education"
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
                label="Education"
                handleAdd={handleAdd}
              />
            }
          />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Education;
