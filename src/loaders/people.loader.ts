import { GetAllPeoplePaginatedQuery } from "@/generated/graphql";
import type { AllPeople, PageInfo } from "@/interfaces";
import { graphqlClient } from "@/lib/graphql-client";
import { getAllPeopleQueryPaginated } from "@/queries";

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

  return { people, pageInfo, totalCount };
}
