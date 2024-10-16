import { graphqlClient } from "@/lib/graphql-client";
import { getByPersonId } from "@/queries";
import type { Params } from "react-router-dom";

export async function loadPersonById({
  params,
}: {
  params: Params<"personId">;
}) {
  const { data } = await graphqlClient
    .query(getByPersonId, { personId: params.personId })
    .toPromise();

  return { data };
}
