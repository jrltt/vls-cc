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

export const getByPersonId = gql`
  query GetPersonById($personId: ID!) {
    person(id: $personId) {
      name
      birthYear
      species {
        averageHeight
      }
      filmConnection {
        edges {
          node {
            producers
            title
            releaseDate
          }
        }
      }
    }
  }
`;
