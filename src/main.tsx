import { graphqlClient } from "@/lib/graphql-client";
import { loadAllPeople } from "@/loaders/people.loader";
import { loadPersonById } from "@/loaders/person.loader";
import HomePage from "@/pages/HomePage";
import PersonPage from "@/pages/PersonPage";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "urql";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    loader: loadAllPeople,
  },
  {
    path: "/person/:personId",
    element: <PersonPage />,
    loader: loadPersonById,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider value={graphqlClient}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
