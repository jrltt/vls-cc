import type { LoaderPeopleData, PageInfo, People } from "@/interfaces";
import { getAllPeopleQueryPaginated } from "@/queries";
import { useEffect, useState } from "react";
import { useQuery } from "urql";

export function usePeopleData(asyncData: LoaderPeopleData) {
  const [people, setPeople] = useState<People[]>(asyncData.people);
  const [pageInfo, setPageInfo] = useState<PageInfo>(asyncData.pageInfo);
  const [cursor, setCursor] = useState<string | null>(null);

  const [{ data, fetching, error }] = useQuery({
    pause: !cursor,
    query: getAllPeopleQueryPaginated,
    variables: {
      first: 9,
      after: cursor,
    },
  });

  useEffect(() => {
    if (data?.allPeople?.edges) {
      setPeople((prevPeople) => [
        ...prevPeople,
        ...data.allPeople?.edges.map((edge: any) => edge),
      ]);
      setPageInfo(data.allPeople.pageInfo);
    }
  }, [data]);

  const loadMore = () => {
    if (pageInfo.hasNextPage) {
      setCursor(pageInfo.endCursor ?? null);
    }
  };

  return { people, pageInfo, loadMore, fetching, error };
}
