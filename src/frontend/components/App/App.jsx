import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "../Navigation";
import AccountBadge from "../AccountBadge";

import "./styles.css";

const App = () => {
  return (
    <Fragment>
      <AccountBadge />
      <Navigation />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/settings" element={<div>Settings</div>} />
        <Route path="/fridge" element={<div>Fridge</div>} />
      </Routes>
    </Fragment>  
  );
};

export default App;