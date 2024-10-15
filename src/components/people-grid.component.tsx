import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePeopleData } from "@/hooks/use-people-data.hook";
import { LoaderPeopleData } from "@/interfaces";
import { Earth } from "lucide-react";
import { useAsyncValue } from "react-router-dom";

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
            People {people.length} displayed / {asyncData.totalCount} total
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-8">
          {people?.map((person: any) => (
            <div className="flex items-center" key={person.node.id}>
              <Card className="w-full">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage
                      className="object-cover"
                      src={`/avatars/${person.node.id}.webp`}
                      alt="Avatar"
                    />
                    <AvatarFallback>OM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-base font-medium leading-none flex items-center">
                      {person.node.name}
                      <span className="bg-orange-300 p-1 ml-2 rounded-md text-xs text-orange-900">
                        {person.node.id}
                      </span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {person?.node.gender}
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="ml-auto font-medium text-sm flex items-center">
                    <Earth className="w-4 h-4 mr-2" />
                    {person?.node.homeworld?.name}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}

          {pageInfo.hasNextPage && (
            <button onClick={loadMore} disabled={fetching}>
              {fetching ? "Loading..." : "Load More"}
            </button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
