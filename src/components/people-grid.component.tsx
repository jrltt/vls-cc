import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePeopleData } from "@/hooks/use-people-data.hook";
import { LoaderPeopleData } from "@/interfaces";
import { Loader2 } from "lucide-react";
import { useAsyncValue } from "react-router-dom";
import { PersonCard, PersonCardSkeleton } from "./person-card.component";

export function PeopleGrid() {
  const asyncData = useAsyncValue() as LoaderPeopleData;
  const { people, pageInfo, loadMore, fetching, error } =
    usePeopleData(asyncData);

  // TODO: check if people can be undefined
  if (fetching && !people) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            People displayed: {people.length} / Total: {asyncData.totalCount}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-8">
          {people?.map((person: any) => (
            <PersonCard key={person.node.id} {...person.node} link />
          ))}
          {fetching && (
            <>
              <PersonCardSkeleton />
              <PersonCardSkeleton />
              <PersonCardSkeleton />
            </>
          )}
          {pageInfo.hasNextPage && (
            <div className="col-span-full  w-full flex items-center justify-center">
              <Button onClick={loadMore} disabled={fetching}>
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
        </CardContent>
      </Card>
    </div>
  );
}
