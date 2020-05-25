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
import moment from "moment";

const dummyData = [
  {
    firstName: "Jonathan Roseland",
    lastName: "Jonathan Roseland",
    email: "noreply@asset.fin",
    phone: "82225838939",
    message:
      "Hello Partners, The International Investment arm of our company is seeking interested partners in need of alternative funding for long term capital projects or for business development. Our managed private investment portfolio has an excess pool in private Investor funds for viable project financing, and covering all Public and Private Industry sectors. For investments in any viable Project presented by your organization please contact me directly via this for more details. Broker Partners are welcome. Regards Jonathan Roseland International Investment Executive Asset Finance proinvstor@gmail.com",
    date: "2020-01-01",
  },
  {
    firstName: "Francisco Salvadore",
    lastName: "Francisco Salvadore",
    email: "cidanold@yahoo.com",
    phone: "89925745649",
    message:
      "Dear CEO granitebps.com I have an urgent need for a partner to venture in a fully funded investment with you. I would want to negotiate the possibility of a working business agreement with you. Your business plan will be needed for review and your capability to be an Investment Manager is sacrosanct. I sent this message from your feed back form to see how serious and honest that you can be. Please reply to me: franscosalvadore@gmail.com Greetings! Francisco Salvadore",
    date: "2020-01-01",
  },
];

const Message = () => {
  const handleDelete = (data) => {
    console.log(data);
  };

  return (
    <React.Fragment>
      <Header title="Message" />

      <Card>
        <CardHeader>
          <CardTitle>Message</CardTitle>
        </CardHeader>
        <CardBody>
          <Table className="table-hover-animation" striped responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((data, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{data.firstName}</td>
                  <td>{data.lastName}</td>
                  <td>{data.email}</td>
                  <td>{data.phone}</td>
                  <td>{data.message}</td>
                  <td>{moment(data.date).format("DD MMMM Y")}</td>
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

export default Message;
