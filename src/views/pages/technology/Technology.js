import React, { useState } from "react";
import { Card, CardBody, Button, Row, Col, Spinner } from "reactstrap";
import Cookies from "js-cookie";
import { Edit, Trash2 } from "react-feather";

import Header from "../../../components/custom/Header";
import { history } from "../../../history";
import baseAxios, { useAxios } from "../../../utility/baseAxios";
import { useAuthContext } from "../../../contexts/AuthContext";
import DataTable from "react-data-table-component";
import CustomHeader from "../../../components/custom/Table/CustomHeader";
import LoadingSpinner from "../../../components/@vuexy/spinner/Loading-spinner";
import Error505 from "../../misc/505";
import { toast } from "react-toastify";
import { notAuthenticated } from "../../../utility/helper";

const Technology = () => {
  const [{ data, loading, error }, refetch] = useAxios("technology", {
    useCache: false,
  });
  const [value, setValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const { dispatch } = useAuthContext();
  const authToken = Cookies.get("token");

  const handleAdd = () => {
    history.push("/technology/modify");
  };

  const handleDelete = async (data) => {
    try {
      setLoadingDelete(true);

      const { data: dataDelete } = await baseAxios.delete(
        `technology/${data.id}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
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
      name: "Technology Name",
      selector: "name",
      sortable: true,
      cell: (row) => <p className="text-bold-500 mb-0">{row.name}</p>,
    },
    {
      name: "Technology Picture",
      selector: "percentage",
      sortable: false,
      cell: (row) => (
        <a href={row.pic} target="_blank" rel="noopener noreferrer">
          <img
            className="img-fluid img-thumbnail"
            height="50"
            width="50"
            src={row.pic}
            alt={row.name}
          />
        </a>
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
                history.push("/technology/modify", { technology: row })
              }
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

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <Error505 retry={refetch} />;
  }

  return (
    <React.Fragment>
      <Header title="Technology" />

      <Card>
        <CardBody>
          <DataTable
            title="Technology"
            className="dataTable-custom"
            data={value.length ? filteredData : data.data}
            columns={columns}
            pagination
            striped
            highlightOnHover
            subHeader
            subHeaderComponent={
              <CustomHeader
                value={value}
                handleFilter={handleFilter}
                label="Technology"
                handleAdd={handleAdd}
              />
            }
          />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Technology;
