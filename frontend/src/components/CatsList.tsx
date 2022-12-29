import React from "react";
import "./CatsList.scss";

type Owner = {
  name: string;
};

type Cat = {
  id: string;
  name: string;
  age: number;
  owner: Owner;
};

type Ready = {
  status: "ready";
  cats: Cat[];
};
type Loading = {
  status: "loading";
};
type Error = {
  status: "error";
  error: string;
};

type State = Ready | Loading | Error;

type Props = {
  state: State;
};

function CatsList({ state }: Props) {
  switch (state.status) {
    case "loading":
      return <p>Loading...</p>;

    case "ready":
      const { cats } = state;
      const list = cats.map((c) => (
        <tr key={c.id}>
          <td>{c.name}</td>
          <td>{c.age}</td>
          <td className={"owner-name"}>{c.owner.name}</td>
        </tr>
      ));

      return (
        <table>
          <thead>
            <tr>
              <th>Cat's name</th>
              <th>Age</th>
              <th>Owner's name</th>
            </tr>
          </thead>
          <tbody>{list}</tbody>
        </table>
      );

    case "error":
      return <strong>Error: {state.error}</strong>;
  }
}

export default CatsList;
export type { Cat, Owner, Ready, Loading, State };
