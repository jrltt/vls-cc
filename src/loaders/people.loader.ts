import { GetAllPeopleQuery } from "@/generated/graphql";
import { graphqlClient } from "@/lib/graphql-client";
import { getAllPeopleQuery } from "@/queries";
import { defer } from "react-router-dom";

type AllPeople = Pick<GetAllPeopleQuery, "allPeople">;

export async function loadAllPeople() {
  const { data } = await graphqlClient
    .query<GetAllPeopleQuery>(getAllPeopleQuery, {})
    .toPromise();

  const { allPeople } = data as AllPeople;
  const people = allPeople?.people ?? {};

  return defer({ people });
}
