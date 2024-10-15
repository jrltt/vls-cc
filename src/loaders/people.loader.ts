import { GetAllPeopleQuery } from "@/generated/graphql";
import { graphqlClient } from "../lib/graphql-client";
import { getAllPeopleQuery } from "../queries";

type AllPeople = Pick<GetAllPeopleQuery, "allPeople">;
type People = NonNullable<
  NonNullable<GetAllPeopleQuery["allPeople"]>["people"]
>;

export async function loadAllPeople() {
  const { data } = await graphqlClient
    .query<GetAllPeopleQuery>(getAllPeopleQuery, {})
    .toPromise();

  const { allPeople } = data as AllPeople;

  return { people: allPeople?.people } as { people: People };
}
