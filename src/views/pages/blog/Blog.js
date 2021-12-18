import React, { useState } from "react";
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
} from "reactstrap";
import { Edit, Trash2 } from "react-feather";
import { toast } from "react-toastify";
import moment from "moment";
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
import baseAxios, { useAxios } from "../../../utility/baseAxios";
import { useAuthContext } from "../../../contexts/AuthContext";
import DataTable from "react-data-table-component";
import CustomHeader from "../../../components/custom/Table/CustomHeader";
import LoadingSpinner from "../../../components/@vuexy/spinner/Loading-spinner";
import Error505 from "../../misc/505";

const Blog = () => {
  const [{ data, loading, error }, refetch] = useAxios("blog", {
    useCache: false,
  });
  const [value, setValue] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const { logout } = useAuthContext();
  const authToken = localStorage.getItem("token-gbps");

  const handleAdd = () => {
    history.push("/blog/modify");
  };

  const handleDelete = async () => {
    try {
      setLoadingDelete(true);

      const { data: dataDelete } = await baseAxios.delete(`blog/${deleteId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
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
        let startsWithCondition = item.title
          .toLowerCase()
          .startsWith(text.toLowerCase());
        let includesCondition = item.title
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
      name: "Blog Picture",
      selector: "image",
      sortable: false,
      cell: (row) => (
        <a href={row.image} target="_blank" rel="noopener noreferrer">
          <img
            className="img-fluid img-thumbnail my-1"
            height="80"
            width="80"
            src={row.image}
            alt={row.title}
          />
        </a>
      ),
    },
    {
      name: "Blog Title",
      selector: "title",
      sortable: true,
      cell: (row) => <p className="text-bold-500 my-1">{row.title}</p>,
    },
    {
      name: "Tanggal",
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
          <Col md="6">
            <Button.Ripple
              color="success"
              onClick={() => history.push("/blog/modify", { blog: row })}
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
          <Col md="6">
            <LinkedinShareButton
              url={`https://granitebps.com/blogs/blog-details/${row.id}/${row.slug}`}
              summary={row.body}
              title={row.title}
            >
              <LinkedinIcon round size={32} />
            </LinkedinShareButton>
          </Col>
          <Col md="6">
            <FacebookShareButton
              url={`https://granitebps.com/blogs/blog-details/${row.id}/${row.slug}`}
              quote={row.title}
            >
              <FacebookIcon round size={32} />
            </FacebookShareButton>
          </Col>
          <Col md="6">
            <TwitterShareButton
              url={`https://granitebps.com/blogs/blog-details/${row.id}/${row.slug}`}
              title={row.title}
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
        </Row>
      ),
    },
  ];

  if (error) {
    return <Error505 retry={refetch} />;
  }

  return (
    <React.Fragment>
      <Header title="Blog" />

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
            title="Blog"
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
                label="Blog"
                handleAdd={handleAdd}
              />
            }
          />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Blog;
