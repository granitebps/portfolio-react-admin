import React from "react";
import { Helmet } from "react-helmet";

const Header = ({ title }) => {
  return (
    <React.Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="content-header-left col-md-9 col-12 mb-2">
        <div className="row breadcrumbs-top">
          <div className="col-12">
            <h2 className="content-header-title float-left mb-0">{title}</h2>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
