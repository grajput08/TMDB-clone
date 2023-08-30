import React from "react";
import HeaderBar from "./header";
import Footer from "./footer";

export default function layout({ children }) {
  return (
    <div>
      <HeaderBar />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
