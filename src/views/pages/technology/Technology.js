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
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/1200px-Laravel.svg.png",
  },
  {
    name: "React.js",
    picture:
      "https://img.favpng.com/4/1/17/react-javascript-vue-js-logo-png-favpng-T97hHj5T2UsnURsbZ0PB5Mi3c.jpg",
  },
  {
    name: "Node.js",
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1280px-Node.js_logo.svg.png",
  },
];

const Technology = () => {
  const handleAdd = () => {
    history.push("/technology/modify");
  };

  const handleDelete = (data) => {
    console.log(data);
  };

  return (
    <React.Fragment>
      <Header title="Technology" />

      <Card>
        <CardHeader>
          <CardTitle>Technology</CardTitle>
          <Button.Ripple color="primary" onClick={handleAdd}>
            Add Technology
          </Button.Ripple>
        </CardHeader>
        <CardBody>
          <Table className="table-hover-animation" striped responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Technology Name</th>
                <th>Technology Picture</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((data, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{data.name}</td>
                  <td>
                    <a
                      href={data.picture}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        className="img-fluid"
                        height="50"
                        width="50"
                        src={data.picture}
                        alt={data.name}
                      />
                    </a>
                  </td>
                  <td>
                    <Button.Ripple
                      color="success"
                      onClick={() =>
                        history.push("/technology/modify", { data: data })
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

export default Technology;
