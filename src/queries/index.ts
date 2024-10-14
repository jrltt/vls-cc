import { gql } from "urql";

export const getAllPeopleQuery = gql`
  query GetAllPeople {
    allPeople {
      people {
        id
        name
      }
    }
  }
`;
