import React, { useState } from "react";
import Header from "../../../components/custom/Header";
import FallbackSpinner from "../../../components/@vuexy/spinner/Fallback-spinner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Collapse,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { useAxios } from "../../../utility/baseAxios";
import Cookies from "js-cookie";
import { ChevronDown } from "react-feather";
import classNames from "classnames";

const Home = () => {
  const [collapseItems, setCollapseItems] = useState([]);
  const [status, setStatus] = useState("Closed");
  const [, setValue] = useState(false);

  const authToken = Cookies.get("token");
  const [{ data, loading }] = useAxios(
    {
      url: "dashboard",
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
    {
      useCache: false,
    }
  );

  const onEntered = (id) => {
    if (collapseItems.includes(id)) setStatus("Opened");
  };
  const onEntering = (id) => {
    if (collapseItems.includes(id)) setStatus("Opening...");
  };

  const onExited = (id) => {
    if (collapseItems.includes(id)) setStatus("Closed");
  };

  const onExiting = (id) => {
    if (collapseItems.includes(id)) setStatus("Closing...");
  };

  const toggleCollapse = (collapseID) => {
    let index = collapseItems.indexOf(collapseID);
    let items = collapseItems;
    if (index >= 0) {
      items.splice(index, index + 1);
    } else {
      let items = collapseItems;
      items.push(collapseID);
    }
    setCollapseItems(items);
    setValue((prevVal) => !prevVal);
  };

  if (loading) {
    return <FallbackSpinner />;
  }

  return (
    <React.Fragment>
      <Header title="Dashboard" />

      <Card>
        <CardHeader>
          <CardTitle>Count of API Call per Date</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="vx-collapse">
            {data.data.map((d, i) => (
              <div key={i} className="collapse-margin">
                <Card
                  onClick={() => toggleCollapse(d.date)}
                  className={classNames({
                    "collapse-collapsed":
                      status === "Closed" && collapseItems.includes(d.date),
                    "collapse-shown":
                      status === "Opened" && collapseItems.includes(d.date),
                    closing:
                      status === "Closing..." && collapseItems.includes(d.date),
                    opening:
                      status === "Opening..." && collapseItems.includes(d.date),
                  })}
                >
                  <CardHeader>
                    <CardTitle className="lead collapse-title collapsed">
                      {d.date}
                      <br />
                      Total : {d.total}
                    </CardTitle>
                    <ChevronDown size={15} className="collapse-icon" />
                  </CardHeader>
                  <Collapse
                    isOpen={collapseItems.includes(d.date)}
                    onEntering={() => onEntering(d.date)}
                    onEntered={() => onEntered(d.date)}
                    onExiting={() => onExiting(d.date)}
                    onExited={() => onExited(d.date)}
                  >
                    <CardBody>
                      <ListGroup flush>
                        {d.data.map((v, i) => (
                          <ListGroupItem key={i}>
                            {v.url}
                            <span className="float-right">{v.count}</span>
                          </ListGroupItem>
                        ))}
                      </ListGroup>
                    </CardBody>
                  </Collapse>
                </Card>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Home;
