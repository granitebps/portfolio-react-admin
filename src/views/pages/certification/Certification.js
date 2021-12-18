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
import moment from "moment";

import { history } from "../../../history";
import baseAxios, { useAxios } from "../../../utility/baseAxios";
import { useAuthContext } from "../../../contexts/AuthContext";
import CustomHeader from "../../../components/custom/Table/CustomHeader";
import LoadingSpinner from "../../../components/@vuexy/spinner/Loading-spinner";
import Error505 from "../../misc/505";

const Certification = () => {
  const [{ data, loading, error }, refetch] = useAxios("certification", {
    useCache: false,
  });
  const [value, setValue] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const { logout } = useAuthContext();
  const authToken = localStorage.getItem("token-gbps");

  const handleAdd = () => {
    history.push("/certification/modify");
  };

  const handleDelete = async () => {
    try {
      setLoadingDelete(true);

      const { data: dataDelete } = await baseAxios.delete(
        `certification/${deleteId}`,
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
          item.institution.toLowerCase().startsWith(text.toLowerCase()) ||
          moment(item.published)
            .format("DD MMMM YYYY")
            .toLowerCase()
            .startsWith(text.toLowerCase());
        let includesCondition =
          item.name.toLowerCase().includes(text.toLowerCase()) ||
          item.institution.toLowerCase().includes(text.toLowerCase()) ||
          moment(item.published)
            .format("DD MMMM YYYY")
            .toLowerCase()
            .includes(text.toLowerCase());

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
      name: "Certification Name",
      selector: "name",
      sortable: true,
      cell: (row) => <p className="text-bold-500 my-1">{row.name}</p>,
    },
    {
      name: "Institution",
      selector: "institution",
      sortable: true,
      cell: (row) => <p className="text-bold-500 my-1">{row.institution}</p>,
    },
    {
      name: "Link",
      selector: "link",
      sortable: true,
      cell: (row) => (
        <p className="text-bold-500 my-1">
          <a href={row.link} target="_blank" rel="noopener noreferrer">
            {row.link}
          </a>
        </p>
      ),
    },
    {
      name: "Start Published",
      selector: "published",
      sortable: true,
      cell: (row) => (
        <p className="text-bold-500 my-1">
          {moment(row.published).format("DD MMMM YYYY")}
        </p>
      ),
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
                history.push("/certification/modify", { certification: row })
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
      <Header title="Certification" />

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
            title="Certification"
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
                label="Certification"
                handleAdd={handleAdd}
              />
            }
          />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Certification;
