import React from "react";
import "./NavBar.scss";
import { Link } from "react-router-dom";

const separator = "|";

function NavBar() {
  return (
    <nav>
      <Link to={`/`}>Homepage</Link>
      <span>{separator}</span>
      <Link to={`/search`}>Search</Link>
      <span>{separator}</span>
      <Link to={`/about`}>About</Link>
    </nav>
  );
}

export default NavBar;
