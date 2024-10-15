import { graphqlClient } from "@/lib/graphql-client";
import { getByPersonId } from "@/queries";

export async function loadPersonById({
  params,
}: {
  params: { personId: string };
}) {
  const { personId } = params;
  const { data } = await graphqlClient
    .query(getByPersonId, { personId })
    .toPromise();
  return { data };
}
