import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="header">
      <ul>
        <li>
          <Link to="/">Home</Link>
          <Link to="/fridge">Fridge</Link>
        </li>
      </ul>  
    </div>
  );
};

export default Navigation;