import React, { useState, useEffect } from "react";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Badge,
} from "reactstrap";
import * as Icon from "react-feather";
import Cookies from "js-cookie";

import { history } from "../../../history";
import { useAuthContext } from "../../../contexts/AuthContext";
import baseAxios from "../../../utility/baseAxios";

const UserDropdown = () => {
  const { logout } = useAuthContext();
  const authToken = Cookies.get("token");

  const handleLogout = async (e) => {
    try {
      e.preventDefault();

      await baseAxios({
        url: "auth/logout",
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      logout();
    } catch (error) {
      console.error(error);
    }
  };

  const handleProfile = (e) => {
    e.preventDefault();
    history.push("/profile");
  };

  return (
    <DropdownMenu right>
      <DropdownItem tag="a" href="#" onClick={(e) => handleProfile(e)}>
        <Icon.User size={14} className="mr-50" />
        <span className="align-middle">Edit Profile</span>
      </DropdownItem>
      <DropdownItem divider />
      <DropdownItem tag="a" href="#" onClick={(e) => handleLogout(e)}>
        <Icon.Power size={14} className="mr-50" />
        <span className="align-middle">Log Out</span>
      </DropdownItem>
    </DropdownMenu>
  );
};

const NavbarUser = (props) => {
  const { state } = useAuthContext();
  const [messageCount, setMessageCount] = useState();
  const authToken = Cookies.get("token");

  useEffect(() => {
    const getMessage = async () => {
      const { data } = await baseAxios.get("message", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const unreadMessage = data.data.filter((m) => !m.is_read);
      setMessageCount(unreadMessage.length);
    };
    getMessage();
  }, [authToken]);

  return (
    <ul className="nav navbar-nav navbar-nav-user float-right">
      <UncontrolledDropdown tag="li" className="dropdown-notification nav-item">
        <DropdownToggle tag="span" className="nav-link nav-link-label">
          <Icon.Bell size={21} />
          <Badge pill color="primary" className="badge-up">
            {" "}
            {messageCount}{" "}
          </Badge>
        </DropdownToggle>
      </UncontrolledDropdown>
      <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
        <DropdownToggle tag="a" className="nav-link dropdown-user-link">
          <div className="user-nav d-sm-flex d-none">
            <span className="user-name text-bold-600">{state.user.name}</span>
          </div>
          <span data-tour="user">
            <img
              src={state.user.avatar}
              className="round"
              height="40"
              width="40"
              alt="avatar"
            />
          </span>
        </DropdownToggle>
        <UserDropdown {...props} />
      </UncontrolledDropdown>
    </ul>
  );
};
export default NavbarUser;
