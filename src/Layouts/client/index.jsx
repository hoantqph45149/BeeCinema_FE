import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const LayoutClient = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default LayoutClient;
