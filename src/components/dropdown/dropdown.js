import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./dropdown.css";

const DropDown = ({ handleSelect }) => {
  return (
    <DropdownButton
      onSelect={handleSelect}
      className="dropdown py-3"
      id="dropdown-item-button"
      title="Filter Tasks"
    >
      <Dropdown.Item as="button" eventKey="A">
        All Tasks
      </Dropdown.Item>
      <Dropdown.Item as="button" eventKey="P">
        Pending Tasks
      </Dropdown.Item>
      <Dropdown.Item as="button" eventKey="C">
        Completed Taks
      </Dropdown.Item>
    </DropdownButton>
  );
};

export default DropDown;
