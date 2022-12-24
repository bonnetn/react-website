import React from "react";
import "./Template.scss";
import NavBar from "../components/NavBar";
import Header from "../components/Header";

type Props = {
  children: React.ReactNode;
};

function Template({ children }: Props) {
  return (
    <div>
      <Header />
      <NavBar />
      <div className={"main-content"}>{children}</div>
    </div>
  );
}

export default Template;
