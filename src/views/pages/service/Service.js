import React from "react";
import Header from "../../../components/custom/Header";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Table,
  Button,
} from "reactstrap";
import { history } from "../../../history";

const dummyData = [
  {
    name: "Laravel",
    icon: '<i class="fab fa-laravel"></i>',
    description:
      "I can make a website build with Laravel a PHP Framework. I have a lot of projects built with Laravel. I can make a website full of Laravel, or make Laravel as a backend for an API. If you are interesting, please contact me.",
  },
  {
    name: "Node.js",
    icon: '<i class="fab fa-node-js"></i>',
    description:
      "I can make a website build with Node.js a Javascript Framework. I have a lot of projects built with Node.js. I can make a website full of Node.js, and use EJS, HTML, Pug or Handlebars as a template, or make Node.js as a backend for an API. If you are interesting, please contact me.",
  },
];

const Service = () => {
  const handleAdd = () => {
    history.push("/service/modify");
  };

  const handleDelete = (data) => {
    console.log(data);
  };

  return (
    <React.Fragment>
      <Header title="Service" />

      <Card>
        <CardHeader>
          <CardTitle>Service</CardTitle>
          <Button.Ripple color="primary" onClick={handleAdd}>
            Add Service
          </Button.Ripple>
        </CardHeader>
        <CardBody>
          <Table className="table-hover-animation" striped responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Service Name</th>
                <th>Service Icon</th>
                <th>Service Description</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((data, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{data.name}</td>
                  <td>{data.icon}</td>
                  <td>{data.description}</td>
                  <td>
                    <Button.Ripple
                      color="success"
                      onClick={() =>
                        history.push("/service/modify", { data: data })
                      }
                    >
                      Edit
                    </Button.Ripple>
                  </td>
                  <td>
                    <Button.Ripple
                      color="danger"
                      onClick={() => handleDelete(data)}
                    >
                      Delete
                    </Button.Ripple>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Service;
