import { gql } from "urql";

export const getAllPeopleQueryPaginated = gql`
  query GetAllPeoplePaginated($first: Int!, $after: String) {
    allPeople(first: $first, after: $after) {
      totalCount
      edges {
        node {
          id
          name
          gender
          homeworld {
            name
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export const getByPersonId = gql`
  query GetPersonById($personId: ID!) {
    person(id: $personId) {
      name
      birthYear
      gender
      homeworld {
        name
      }
      id
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
