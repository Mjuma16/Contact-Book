import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <footer />
    </div>
  );
}

export default RootLayout;
