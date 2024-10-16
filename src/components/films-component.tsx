import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FilmConnection, FilmNodes, PageInfo, Planets } from "@/interfaces";
import { getByPersonId } from "@/queries";
import { Clapperboard, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "urql";
import { Skeleton } from "./ui/skeleton";

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

  const [films, setFilms] = useState<FilmNodes[]>(
    personFilms.edges?.map((edge) => edge?.node) ?? []
  );
  const [pageInfo, setPageInfo] = useState<PageInfo>(personFilms.pageInfo);
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

  const loadMoreFilms = () => {
    if (pageInfo.hasNextPage) {
      setShouldLoadMore(true);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <h6 className="font-bold flex items-center">
            <Clapperboard className="mr-2" />
            Films total: {personFilms?.totalCount}
          </h6>
        </CardHeader>
        <CardContent className="space-y-4">
          {films?.map((item, idx) => (
            <div className="w-72" key={idx}>
              <p>Title: {item?.title}</p>
              <ul className="list-disc list-inside">
                <li>Release date: {item?.releaseDate}</li>
                <li>Total planets: {item?.planetConnection?.totalCount}</li>
                <li>
                  Total planets without water:{" "}
                  {checkPlanetsWithoutWater(item?.planetConnection?.planets)}
                </li>
              </ul>
            </div>
          ))}
          {fetching && (
            <>
              <Skeleton className="h-4 w-[210px]" />
              <Skeleton className="h-4 w-[60px]" />
              <Skeleton className="h-4 w-[90px]" />
              <Skeleton className="h-4 w-[120px]" />
            </>
          )}
          {pageInfo?.hasNextPage && (
            <div className="col-span-full inline-flex items-center justify-center">
              <Button onClick={loadMoreFilms} disabled={fetching}>
                {fetching && (
                  <>
                    <Loader2 className="animate-spin mr-2" size={16} />
                    Loading...
                  </>
                )}
                {!fetching && "Load More"}
              </Button>
            </div>
          )}

          {error && <p>Error loading more films: {error.message}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
