import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GetAllPeoplePaginatedQuery } from "@/generated/graphql";
import { getAllPeopleQueryPaginated } from "@/queries";
import { Earth } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { Await, useAsyncValue, useLoaderData } from "react-router-dom";
import { useQuery } from "urql";

type People = NonNullable<
  NonNullable<GetAllPeoplePaginatedQuery["allPeople"]>["edges"]
>;
type PageInfo = NonNullable<
  NonNullable<GetAllPeoplePaginatedQuery["allPeople"]>["pageInfo"]
>;
type LoaderPeopleData = {
  people: People[];
  pageInfo: PageInfo;
  totalCount: number;
};

const useHomeCard = (asyncData: LoaderPeopleData) => {
  const [people, setPeople] = useState<People[]>(asyncData.people);
  const [pageInfo, setPageInfo] = useState<PageInfo>(asyncData.pageInfo);
  const [cursor, setCursor] = useState<string | null>(null);

  const [{ data, fetching, error }] = useQuery({
    pause: !cursor,
    query: getAllPeopleQueryPaginated,
    variables: {
      first: 3,
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

  return { people, pageInfo, loadMore, fetching };
};

const HomePage = () => {
  const asyncData = useLoaderData() as LoaderPeopleData;
  console.log(asyncData);

  return (
    <div className="container mx-auto mt-8">
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={asyncData}>
          <HomeCard />
        </Await>
      </Suspense>
    </div>
  );
};

function HomeCard() {
  const asyncData = useAsyncValue() as LoaderPeopleData;
  const { people, pageInfo, loadMore, fetching } = useHomeCard(asyncData);

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

export default HomePage;
