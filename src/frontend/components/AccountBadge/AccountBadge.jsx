import React from "react";
import { LocalStorage, SessionStorage } from "../../services/storage";
import { AUTHENTICATION_ROOT } from "../../../shared/constants";

import "./styles.css";

const AccountBadge = () => {
  const authenticateWithDiscord = () => {
    window.location.href = `${AUTHENTICATION_ROOT}/discord/authenticate`;
  };

  return (
    <div 
      className="account-badge"
      onClick={authenticateWithDiscord}
    >
      Login
    </div>
  );
};

export default AccountBadge;