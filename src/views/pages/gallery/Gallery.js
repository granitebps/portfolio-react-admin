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
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import moment from "moment";

import { history } from "../../../history";
import baseAxios, { useAxios } from "../../../utility/baseAxios";
import { useAuthContext } from "../../../contexts/AuthContext";
import LoadingSpinner from "../../../components/@vuexy/spinner/Loading-spinner";
import Error505 from "../../misc/505";
import { Trash2 } from "react-feather";
import DataTable from "react-data-table-component";
import CustomHeader from "../../../components/custom/Table/CustomHeader";
import { formatBytes } from "../../../utility/helper";

const Gallery = () => {
  const authToken = Cookies.get("token");
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: "gallery",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
    {
      useCache: false,
    }
  );
  const [deleteId, setDeleteId] = useState("");
  const [loadingDelete, setLoadingDelete] = useState(false);
  const { logout } = useAuthContext();
  const [filteredData, setFilteredData] = useState([]);
  const [value, setValue] = useState("");

  const handleAdd = () => {
    history.push("/gallery/modify");
  };

  const handleDelete = async () => {
    try {
      setLoadingDelete(true);

      const { data: dataDelete } = await baseAxios.delete(
        `gallery/${deleteId}`,
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
          item.ext.toLowerCase().startsWith(text.toLowerCase()) ||
          item.size.toLowerCase().startsWith(text.toLowerCase()) ||
          moment(item.created_at)
            .format("DD MMMM YYYY")
            .toLowerCase()
            .startsWith(text.toLowerCase());
        let includesCondition =
          item.name.toLowerCase().includes(text.toLowerCase()) ||
          item.ext.toLowerCase().includes(text.toLowerCase()) ||
          item.size.toLowerCase().includes(text.toLowerCase()) ||
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
      name: "File Name",
      selector: "name",
      sortable: true,
      cell: (row) => (
        <p className="text-bold-500 my-1">
          <a target="_blank" rel="noopener noreferrer" href={row.file}>
            {row.name}
          </a>
        </p>
      ),
    },
    {
      name: "Preview",
      cell: (row) =>
        row.ext === "jpg" || row.ext === "png" || row.ext === "jpeg" ? (
          <a href={row.file} target="_blank" rel="noopener noreferrer">
            <img
              className="img-fluid img-thumbnail my-1"
              height="80"
              width="80"
              src={row.file}
              alt={row.name}
            />
          </a>
        ) : null,
    },
    {
      name: "Ext",
      selector: "ext",
      sortable: true,
      cell: (row) => <p className="text-bold-500 my-1">{row.ext}</p>,
    },
    {
      name: "Size",
      selector: "size",
      sortable: true,
      cell: (row) => (
        <p className="text-bold-500 my-1">{formatBytes(row.size)}</p>
      ),
    },
    {
      name: "Created_at",
      selector: "created_at",
      sortable: true,
      cell: (row) => (
        <p className="text-bold-500 my-1">
          {moment(row.created_at).format("DD MMMM YYYY")}
        </p>
      ),
    },
    {
      name: "Action",
      selector: "",
      cell: (row) => (
        <Row>
          <Col md="12">
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

  if (loading) {
    return <LoadingSpinner retry={refetch} />;
  }
  if (error) {
    return <Error505 retry={refetch} />;
  }

  return (
    <React.Fragment>
      <Header title="Galeries" />

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
            title="Galeries"
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

export default Gallery;
