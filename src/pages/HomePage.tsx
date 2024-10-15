import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GetAllPeopleQuery } from "@/generated/graphql";
import { Earth } from "lucide-react";
import { Suspense } from "react";
import { Await, useAsyncValue, useLoaderData } from "react-router-dom";

type People = NonNullable<
  NonNullable<GetAllPeopleQuery["allPeople"]>["people"]
>;

const HomePage = () => {
  const data = useLoaderData() as { people: People[] };

  console.log(data);

  return (
    <div className="container mx-auto">
      Home
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={data.people}>
          <HomeCard />
        </Await>
      </Suspense>
    </div>
  );
};

function HomeCard() {
  const people = useAsyncValue() as People[];

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>People</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-8">
          {people?.map((person: any) => (
            <div className="flex items-center gap-4" key={person.id}>
              <Card className="w-full">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage
                      className="object-cover"
                      src={`/avatars/${person.id}.webp`}
                      alt="Avatar"
                    />
                    <AvatarFallback>OM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-base font-medium leading-none flex items-center">
                      {person.name}
                      <span className="bg-orange-300 p-1 ml-2 rounded-md text-xs text-orange-900">
                        {person.id}
                      </span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {person?.gender}
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="ml-auto font-medium text-sm flex items-center">
                    <Earth className="w-4 h-4 mr-2" />
                    {person?.homeworld?.name}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default HomePage;
