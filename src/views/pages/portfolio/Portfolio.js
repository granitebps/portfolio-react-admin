import React, { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Spinner,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Edit, Trash2, Eye, Link } from "react-feather";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";
import {
  LinkedinShareButton,
  LinkedinIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

import Header from "../../../components/custom/Header";
import { history } from "../../../history";
import CustomModal from "../../../components/custom/CustomModal";
import CustomCarousel from "../../../components/custom/CustomCarousel";
import baseAxios, { useAxios } from "../../../utility/baseAxios";
import { useAuthContext } from "../../../contexts/AuthContext";
import LoadingSpinner from "../../../components/@vuexy/spinner/Loading-spinner";
import Error505 from "../../misc/505";
import CustomHeader from "../../../components/custom/Table/CustomHeader";

const Portfolio = () => {
  const [{ data, loading, error }, refetch] = useAxios("portfolio", {
    useCache: false,
  });
  const [value, setValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const { logout } = useAuthContext();
  const authToken = localStorage.getItem("token-gbps");
  const [showModal, setShowModal] = useState(false);
  const [dataModal, setDataModal] = useState({});

  const handleAdd = () => {
    history.push("/portfolio/modify");
  };

  const handleDelete = async () => {
    try {
      setLoadingDelete(true);

      const { data: dataDelete } = await baseAxios.delete(
        `portfolio/${deleteId}`,
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
    const text = e.target.value;
    let filter = filteredData;
    setValue(text);

    if (text.length) {
      filter = data.data.filter((item) => {
        const startsWithCondition =
          item.name.toLowerCase().startsWith(text.toLowerCase()) ||
          item.desc.toLowerCase().startsWith(text.toLowerCase());
        const includesCondition =
          item.name.toLowerCase().includes(text.toLowerCase()) ||
          item.desc.toLowerCase().includes(text.toLowerCase());

        if (startsWithCondition) {
          return startsWithCondition;
        }
        if (!startsWithCondition && includesCondition) {
          return includesCondition;
        }
        return null;
      });
      setFilteredData(filter);
    }
  };

  const toogleModal = (data) => {
    setShowModal(true);
    setDataModal(data);
  };

  const columns = [
    {
      name: "Portfolio Name",
      selector: "name",
      sortable: true,
      cell: (row) => <p className="text-bold-500 my-1">{row.name}</p>,
    },
    {
      name: "Portfolio Picture",
      cell: (row) => (
        <Button.Ripple
          color="warning"
          onClick={() => toogleModal(row)}
          className="btn-icon rounded-circle"
        >
          <Eye />
        </Button.Ripple>
      ),
    },
    {
      name: "Portfolio Description",
      selector: "desc",
      sortable: true,
      cell: (row) => <p className="text-bold-500 my-1">{row.desc}</p>,
    },
    {
      name: "Portfolio Type",
      selector: "type",
      sortable: true,
      cell: (row) => (
        <p className="text-bold-500 my-1">
          {row.type === 1 ? "Personal Project" : "Client Project"}
        </p>
      ),
    },
    {
      name: "Portfolio URL",
      cell: (row) =>
        row.url ? (
          <a
            className="my-1 btn btn-info btn-icon rounded-circle"
            href={row.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Link />
          </a>
        ) : (
          "-"
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
                history.push("/portfolio/modify", { portfolio: row })
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
          {row.type === 1 && (
            <>
              <Col md="6">
                <LinkedinShareButton
                  url={row.url}
                  summary={row.desc}
                  title={row.name}
                >
                  <LinkedinIcon round size={32} />
                </LinkedinShareButton>
              </Col>
              <Col md="6">
                <FacebookShareButton url={row.url} quote={row.name}>
                  <FacebookIcon round size={32} />
                </FacebookShareButton>
              </Col>
              <Col md="6">
                <TwitterShareButton
                  url={row.url}
                  title={row.name}
                  hashtags={[
                    "web",
                    "mobile",
                    "programming",
                    "webdeveloper",
                    "mobiledeveloper",
                  ]}
                >
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
              </Col>
            </>
          )}
        </Row>
      ),
    },
  ];

  if (error) {
    return <Error505 retry={refetch} />;
  }

  return (
    <>
      <Header title="Portfolio" />

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
            title="Portfolio"
            className="dataTable-custom"
            data={value.length ? filteredData : data ? data.data : []}
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
                label="Portfolio"
                handleAdd={handleAdd}
              />
            }
          />
        </CardBody>
      </Card>

      {/* Preview Modal */}
      <CustomModal showModal={showModal} setShowModal={setShowModal}>
        <h3 className="text-center">Thumbnail</h3>
        <img
          src={dataModal.thumbnail}
          className="img-fluid img-thumbnail"
          alt="thumbnail"
        />
        <hr />
        <h3 className="text-center">
          {dataModal.pic && dataModal.pic.length} Picture
        </h3>
        <CustomCarousel images={dataModal.pic} />
      </CustomModal>
    </>
  );
};

export default Portfolio;
