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
    percentage: 90,
  },
  {
    name: "React Native",
    percentage: 70,
  },
  {
    name: "React.js",
    percentage: 70,
  },
];

const Skill = () => {
  const handleAdd = () => {
    history.push("/skill/modify");
  };

  const handleDelete = (data) => {
    console.log(data);
  };

  return (
    <React.Fragment>
      <Header title="Skill" />

      <Card>
        <CardHeader>
          <CardTitle>Skill</CardTitle>
          <Button.Ripple color="primary" onClick={handleAdd}>
            Add Skill
          </Button.Ripple>
        </CardHeader>
        <CardBody>
          <Table className="table-hover-animation" striped responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Skill Name</th>
                <th>Skill Percentage</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((data, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{data.name}</td>
                  <td>{data.percentage}%</td>
                  <td>
                    <Button.Ripple
                      color="success"
                      onClick={() =>
                        history.push("/skill/modify", { data: data })
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

export default Skill;
