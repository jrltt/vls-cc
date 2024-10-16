import { FilmNodes, PageInfo, PersonFilmEdges, Planets } from "@/interfaces";
import { getByPersonId } from "@/queries";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "urql";

interface Props {
  personFilmsEdges: PersonFilmEdges;
  filmPageInfo: PageInfo;
}
export function useFilmsData({ personFilmsEdges, filmPageInfo }: Props) {
  const { personId } = useParams() as { personId: string };
  const [films, setFilms] = useState<FilmNodes[]>(
    personFilmsEdges?.map((edge) => edge?.node) ?? []
  );
  const [pageInfo, setPageInfo] = useState<PageInfo>(filmPageInfo);
  const [cursor, setCursor] = useState<string | null>(
    pageInfo?.endCursor ?? null
  );
  const [shouldLoadMore, setShouldLoadMore] = useState(false);

  const [{ data, fetching, error }] = useQuery({
    pause: !shouldLoadMore,
    query: getByPersonId,
    variables: {
      personId,
      first: 1,
      after: cursor,
    },
  });

  useEffect(() => {
    if (data && data.person && data.person.filmConnection) {
      setFilms((prevFilms) => [
        ...prevFilms,
        ...data.person.filmConnection.edges.map((edge: any) => edge.node),
      ]);

      setCursor(data.person.filmConnection.pageInfo.endCursor);
      setPageInfo(data.person.filmConnection.pageInfo);
      setShouldLoadMore(false);
    }
  }, [data]);

  function loadMoreFilms() {
    if (pageInfo.hasNextPage) {
      setShouldLoadMore(true);
    }
  }

  function checkPlanetsWithoutWater(planets: Planets) {
    const total = planets?.filter((item) => item?.surfaceWater === 0);
    return total && total.length > 0 ? total.length : "None";
  }

  return {
    checkPlanetsWithoutWater,
    error,
    fetching,
    films,
    loadMoreFilms,
    pageInfo,
  };
}
