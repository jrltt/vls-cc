import { FilmConnection, PageInfo, Planets } from "@/interfaces";
import { getByPersonId } from "@/queries";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { useQuery } from "urql";

function checkPlanetsWithoutWater(planets: Planets) {
  const total = planets?.filter((item) => item?.surfaceWater === 0);

  return total && total.length > 0 ? total.length : "None";
}

export function Films({
  personFilms,
}: {
  personFilms: NonNullable<FilmConnection>;
}) {
  const { personId } = useParams() as { personId: string };
  const [films, setFilms] = useState<any[]>(personFilms.edges ?? []);
  const [pageInfo, setPageInfo] = useState<PageInfo>(personFilms.pageInfo);
  const [cursor, setCursor] = useState<string | null>(null);
  const [variables, setVariables] = useState({
    personId,
    first: 1,
    after: pageInfo?.endCursor ?? null,
  });

  const [{ data, fetching, error }] = useQuery({
    pause: !cursor,
    query: getByPersonId,
    variables,
  });

  useEffect(() => {
    if (data && data.person && data.person.filmConnection) {
      console.log(
        "data.person.filmConnection.edges",
        data.person.filmConnection.edges
      );

      setFilms((prevFilms) => [
        ...prevFilms,
        ...data.person.filmConnection.edges.map(
          (edge: { node: any }) => edge.node
        ),
      ]);
      setCursor(data.person.filmConnection.pageInfo.endCursor); // Update cursor for next page
    }
  }, [data]);

  const loadMoreFilms = () => {
    if (pageInfo.hasNextPage) {
      setCursor(pageInfo.endCursor ?? null);
    }
    setVariables((prev) => ({
      ...prev,
      after: cursor, // Pass the updated cursor for the next page
    }));
  };

  return (
    <div>
      <h3>Films (total: {personFilms?.totalCount})</h3>
      {films?.map((item, idx) => (
        <Fragment key={idx}>
          Title: {item?.node?.title}
          <ul className="list-disc list-inside">
            <li>Release date: {item?.node?.releaseDate}</li>
            <li>Total planets: {item?.node?.planetConnection?.totalCount}</li>
            <li>
              Total planets without water:
              {checkPlanetsWithoutWater(item?.node?.planetConnection?.planets)}
            </li>
          </ul>
        </Fragment>
      ))}

      {pageInfo?.hasNextPage && (
        <button onClick={loadMoreFilms}>Load More Films</button>
      )}

      {fetching && cursor && <p>Loading more films...</p>}
    </div>
  );
}
