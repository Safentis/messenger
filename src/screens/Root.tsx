import React from "react";
import { ToastContainer } from "react-toastify";

import RootRouter from "./RootRoutes";
import "./Root.css";

function Root(): any {
  return (
    <main className="main">
      <RootRouter />
      <ToastContainer />
    </main>
  );
}

export default Root;
