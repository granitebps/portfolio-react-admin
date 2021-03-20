import React from "react";
import { Input, Button } from "reactstrap";
import { Search } from "react-feather";

const CustomHeader = ({ value, handleFilter, handleAdd, isAdd = true }) => {
  return (
    <div className="d-flex flex-wrap justify-content-between">
      {isAdd && (
        <div className="add-new">
          <Button.Ripple color="primary" className="mr-1" onClick={handleAdd}>
            Add New
          </Button.Ripple>
        </div>
      )}
      <div className="position-relative has-icon-left mb-1">
        <Input value={value} onChange={(e) => handleFilter(e)} />
        <div className="form-control-position">
          <Search size="15" />
        </div>
      </div>
    </div>
  );
};

export default CustomHeader;
