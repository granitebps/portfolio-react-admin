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
import { useState } from "react";
import CustomModal from "../../../components/custom/CustomModal";
import CustomCarousel from "../../../components/custom/CustomCarousel";

const dummyData = [
  {
    name: "SILISA",
    thumbnail: "https://granitebps.com/images/portfolio/silisa/thumbnail-1.PNG",
    picture: [
      "https://granitebps.com/images/portfolio/silisa/2.PNG",
      "https://granitebps.com/images/portfolio/silisa/3.PNG",
    ],
    description:
      "SILISA is an abbreviation of Sistem Monitoring Listrik Desa. This is a project that I build when I at my internship in PT Indonesia Comnets Plus (ICON+). I build this application from scratch with Laravel a PHP Framework. This application means to monitor all village in Indonesia. And then admin can add a village. Admin can also add an electricity status of a village. Admin can also add data by importing an excel file.",
    type: 1,
    url: "https://github.com/granitebps/silisa",
  },
  {
    name: "BMM",
    thumbnail:
      "https://granitebps.com/images/portfolio/bmm/thumbnail-BMM_-_Login.png",
    picture: [
      "https://granitebps.com/images/portfolio/bmm/BMM.png",
      "https://granitebps.com/images/portfolio/bmm/BMM_-_Login.png",
    ],
    description:
      "BBM is a project that I build for my task at my current company. This application builds with Laravel a PHP Framework. This application to register some people if they want to work overseas. This application has payment gateway and can export some excel data. This application have multiple user roles.",
    type: 2,
    url: "",
  },
];

const Portfolio = () => {
  const [showModal, setShowModal] = useState(false);
  const [dataModal, setDataModal] = useState({});

  const handleAdd = () => {
    history.push("/portfolio/modify");
  };

  const handleDelete = (data) => {
    console.log(data);
  };

  const toogleModal = (data) => {
    setShowModal(true);
    setDataModal(data);
  };

  return (
    <React.Fragment>
      <Header title="Portfolio" />

      <Card>
        <CardHeader>
          <CardTitle>Portfolio</CardTitle>
          <Button.Ripple color="primary" onClick={handleAdd}>
            Add Portfolio
          </Button.Ripple>
        </CardHeader>
        <CardBody>
          <Table className="table-hover-animation" striped responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Portfolio Name</th>
                <th>Portfolio Picture</th>
                <th>Portfolio Description</th>
                <th>Portfolio Type</th>
                <th>Portfolio URL</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((data, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{data.name}</td>
                  <td>
                    <Button.Ripple
                      color="warning"
                      onClick={() => toogleModal(data)}
                    >
                      Preview
                    </Button.Ripple>
                  </td>
                  <td>{data.description}</td>
                  <td>{data.type === 1 ? "Personal" : "Client"} Project</td>
                  <td>
                    {data.url ? (
                      <a
                        className="mr-1 mb-1 btn btn-info round"
                        href={data.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Link
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    <Button.Ripple
                      color="success"
                      onClick={() =>
                        history.push("/portfolio/modify", { data: data })
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

      {/* Preview Modal */}
      <CustomModal showModal={showModal} setShowModal={setShowModal}>
        <h3 className="text-center">Thumbnail</h3>
        <img
          src={dataModal.thumbnail}
          className="img-fluid img-thumbnail"
          alt="thumbnail"
        />
        <hr />
        <h3 className="text-center">
          {dataModal.picture && dataModal.picture.length} Picture
        </h3>
        <CustomCarousel images={dataModal.picture} />
      </CustomModal>
    </React.Fragment>
  );
};

export default Portfolio;
