import React, { useState } from "react";
import { Card, CardBody, Button, Row, Col, Spinner } from "reactstrap";
import Cookies from "js-cookie";
import { Edit, Trash2 } from "react-feather";
import { toast } from "react-toastify";
import moment from "moment";

import Header from "../../../components/custom/Header";
import { history } from "../../../history";
import baseAxios, { useAxios } from "../../../utility/baseAxios";
import { useAuthContext } from "../../../contexts/AuthContext";
import DataTable from "react-data-table-component";
import CustomHeader from "../../../components/custom/Table/CustomHeader";
import LoadingSpinner from "../../../components/@vuexy/spinner/Loading-spinner";
import Error505 from "../../misc/505";
import { notAuthenticated } from "../../../utility/helper";

const Blog = () => {
  const [{ data, loading, error }, refetch] = useAxios("blog", {
    useCache: false,
  });
  const [value, setValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const { dispatch } = useAuthContext();
  const authToken = Cookies.get("token");

  const handleAdd = () => {
    history.push("/blog/modify");
  };

  const handleDelete = async (data) => {
    try {
      setLoadingDelete(true);

      const { data: dataDelete } = await baseAxios.delete(`blog/${data.id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      toast.success(dataDelete.message);
      refetch();
      setLoadingDelete(false);
    } catch (error) {
      if (error.response.status === 401) {
        notAuthenticated(dispatch);
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
              onClick={() => handleDelete(row)}
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
      <Header title="Blog" />

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
