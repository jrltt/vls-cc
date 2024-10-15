import { createClient } from "urql";

export const graphqlClient = createClient({
  url: "https://swapi-graphql.netlify.app/.netlify/functions/index",
});
