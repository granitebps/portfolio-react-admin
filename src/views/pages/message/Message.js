import React, { useState } from "react";
import Cookies from "js-cookie";
import { Trash2, CheckCircle } from "react-feather";
import { toast } from "react-toastify";
import { Card, CardBody, Button, Row, Col, Spinner } from "reactstrap";
import moment from "moment";

import Header from "../../../components/custom/Header";
import baseAxios, { useAxios } from "../../../utility/baseAxios";
import { useAuthContext } from "../../../contexts/AuthContext";
import LoadingSpinner from "../../../components/@vuexy/spinner/Loading-spinner";
import Error505 from "../../misc/505";
import DataTable from "react-data-table-component";
import CustomHeader from "../../../components/custom/Table/CustomHeader";

const Message = () => {
  const authToken = Cookies.get("token");
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: "message",
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
    {
      useCache: false,
    }
  );
  const [value, setValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loadingItem, setLoadingItem] = useState(false);
  const { logout } = useAuthContext();

  const handleDelete = async (data) => {
    try {
      setLoadingItem(true);

      const { data: dataDelete } = await baseAxios.delete(
        `message/${data.id}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      toast.success(dataDelete.message);
      refetch();
      setLoadingItem(false);
    } catch (error) {
      if (error.response.status === 401) {
        logout();
      } else {
        toast.error("Something Wrong!");
      }
    }
  };

  const handleRead = async (data) => {
    try {
      setLoadingItem(true);

      const { data: dataRead } = await baseAxios.get(
        `message/read/${data.id}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      toast.success(dataRead.message);
      refetch();
      setLoadingItem(false);
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
          item.first_name.toLowerCase().startsWith(text.toLowerCase()) ||
          item.email.toLowerCase().startsWith(text.toLowerCase()) ||
          item.phone.toLowerCase().startsWith(text.toLowerCase()) ||
          item.message.toLowerCase().startsWith(text.toLowerCase()) ||
          item.last_name.toLowerCase().startsWith(text.toLowerCase());
        let includesCondition =
          item.first_name.toLowerCase().includes(text.toLowerCase()) ||
          item.email.toLowerCase().includes(text.toLowerCase()) ||
          item.phone.toLowerCase().includes(text.toLowerCase()) ||
          item.message.toLowerCase().includes(text.toLowerCase()) ||
          item.last_name.toLowerCase().includes(text.toLowerCase());

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
      name: "First Name",
      selector: "first_name",
      sortable: true,
      cell: (row) => <p className="text-bold-500 my-1">{row.first_name}</p>,
    },
    {
      name: "Last Name",
      selector: "last_name",
      sortable: true,
      cell: (row) => <p className="text-bold-500 my-1">{row.last_name}</p>,
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
      cell: (row) => <p className="text-bold-500 my-1">{row.email}</p>,
    },
    {
      name: "Phone",
      selector: "phone",
      sortable: true,
      cell: (row) => <p className="text-bold-500 my-1">{row.phone}</p>,
    },
    {
      name: "Message",
      selector: "message",
      sortable: true,
      cell: (row) => <p className="text-bold-500 my-1">{row.message}</p>,
    },
    {
      name: "Date",
      selector: "created_at",
      sortable: true,
      cell: (row) => (
        <p className="text-bold-500 my-1">
          {moment(row.created_at).format("DD MMMM YYYY")}
        </p>
      ),
    },
    {
      name: "Is Read",
      selector: "is_read",
      sortable: true,
      cell: (row) => (
        <p className="text-bold-500 my-1">{row.is_read ? "Yes" : "No"}</p>
      ),
    },
    {
      name: "Action",
      selector: "",
      cell: (row) => (
        <Row>
          <Col md={row.is_read ? 12 : 6}>
            <Button.Ripple
              color="danger"
              onClick={() => handleDelete(row)}
              disabled={loadingItem}
              className="btn-icon rounded-circle"
            >
              {loadingItem ? <Spinner color="white" size="sm" /> : <Trash2 />}
            </Button.Ripple>
          </Col>
          {!row.is_read && (
            <Col md="6">
              <Button.Ripple
                color="success"
                onClick={() => handleRead(row)}
                disabled={loadingItem}
                className="btn-icon rounded-circle"
              >
                {loadingItem ? (
                  <Spinner color="white" size="sm" />
                ) : (
                  <CheckCircle />
                )}
              </Button.Ripple>
            </Col>
          )}
        </Row>
      ),
    },
  ];

  if (error) {
    return <Error505 retry={refetch} />;
  }

  return (
    <React.Fragment>
      <Header title="Message" />

      <Card>
        <CardBody>
          <DataTable
            title="Message"
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
                label="Message"
                isAdd={false}
              />
            }
          />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Message;
