import React from 'react';
import Header from '../../../components/custom/Header';
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap';

const Home = () => {
  return (
    <React.Fragment>
      <Header title="Dashboard" />

      <Card>
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
        </CardHeader>
        <CardBody>
          <h1>Dashboard</h1>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Home;
