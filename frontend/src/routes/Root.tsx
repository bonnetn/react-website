import React from "react";
import "./Root.scss";
import Template from "../components/Template";
import picture from "./pig.jpeg";

const alt = "Picture of a pig";

const content = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore \
et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea \
commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla \
pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est \
laborum.`;

function Root() {
  return (
    <Template>
      <div className={"flex-container"}>
        <aside>
          <img src={picture} alt={alt} />
        </aside>
        <section>{content}</section>
      </div>
    </Template>
  );
}

export default Root;
