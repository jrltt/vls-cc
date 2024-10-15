import { GetAllPeoplePaginatedQuery } from "@/generated/graphql";
import { graphqlClient } from "@/lib/graphql-client";
import { getAllPeopleQueryPaginated } from "@/queries";
import { defer } from "react-router-dom";

type AllPeople = Pick<GetAllPeoplePaginatedQuery, "allPeople">;
type PageInfo = NonNullable<
  NonNullable<GetAllPeoplePaginatedQuery["allPeople"]>["pageInfo"]
>;

export async function loadAllPeople() {
  const { data } = await graphqlClient
    .query<GetAllPeoplePaginatedQuery>(getAllPeopleQueryPaginated, {
      first: 9,
      cursor: null,
    })
    .toPromise();

  const { allPeople } = data as AllPeople;
  const pageInfo = allPeople?.pageInfo as PageInfo;
  const totalCount = allPeople?.totalCount ?? 0;
  const people = allPeople?.edges ?? {};

  return defer({ people, pageInfo, totalCount });
}
