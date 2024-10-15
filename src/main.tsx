import { loadAllPeople } from "@/loaders/people.loader";
import { loadPersonById } from "@/loaders/person.loader";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createClient, Provider } from "urql";
import "./index.css";
import HomePage from "./pages/HomePage";
import PersonPage from "./pages/PersonPage";
import { getByPersonId } from "./queries";

const client = createClient({
  url: "https://swapi-graphql.netlify.app/.netlify/functions/index",
});

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
    <Provider value={client}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
