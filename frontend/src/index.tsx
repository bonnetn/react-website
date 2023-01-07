import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import Search from "./routes/Search";
import About from "./routes/About";
import { graphqlURI } from "./config";
import { relayStylePagination } from "@apollo/client/utilities";

const client = new ApolloClient({
  uri: graphqlURI,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          searchCats: relayStylePagination(),
        },
      },
    },
  }),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/about",
    element: <About />,
  },
]);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
