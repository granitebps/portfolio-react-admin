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
    name: "PT Indonesia Comnets Plus (ICON+)",
    position: "Internship",
    startDate: "2019-01-01",
    endDate: "2019-04-01",
    currentJob: 0,
  },
  {
    name: "PT Wamplo Satu Interteknologi",
    position: "Junior Software Engineer",
    startDate: "2019-06-10",
    endDate: null,
    currentJob: 1,
  },
];

const Experience = () => {
  const handleAdd = () => {
    history.push("/experience/modify");
  };

  const handleDelete = (data) => {
    console.log(data);
  };

  return (
    <React.Fragment>
      <Header title="Experience" />

      <Card>
        <CardHeader>
          <CardTitle>Experience</CardTitle>
          <Button.Ripple color="primary" onClick={handleAdd}>
            Add Experience
          </Button.Ripple>
        </CardHeader>
        <CardBody>
          <Table className="table-hover-animation" striped responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Company Name</th>
                <th>Position</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((data, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{data.name}</td>
                  <td>{data.position}</td>
                  <td>{data.startDate}</td>
                  <td>{data.currentJob ? "Now" : data.endDate}</td>
                  <td>
                    <Button.Ripple
                      color="success"
                      onClick={() =>
                        history.push("/experience/modify", { data: data })
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

export default Experience;
