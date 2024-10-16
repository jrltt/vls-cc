import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useFilmsData } from "@/hooks/use-films-data.hook";
import { FilmConnection } from "@/interfaces";
import { Clapperboard, Loader2 } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

interface Props {
  personFilms: NonNullable<FilmConnection>;
}
export function Films({ personFilms }: Props) {
  const {
    error,
    fetching,
    films,
    loadMoreFilms,
    pageInfo,
    checkPlanetsWithoutWater,
  } = useFilmsData({
    personFilmsEdges: personFilms.edges ?? [],
    filmPageInfo: personFilms.pageInfo,
  });

  return (
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
  );
}
