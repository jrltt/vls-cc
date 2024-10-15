import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Earth } from "lucide-react";
import { useQuery } from "urql";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { CardContent } from "../components/ui/card";
import { getAllPeopleQuery } from "../queries";

const HomePage = () => {
  const [result] = useQuery({ query: getAllPeopleQuery });
  // console.log(result);

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div className="container mx-auto">
      Home
      {/* <pre>{JSON.stringify(data.allPeople?.people, null, 2)}</pre> */}
      {/* <ul>
        {data.allPeople?.people.map((person: any) => (
          <li key={person.id}>
            <Link to={`/person/${person.id}`}>{person.name}</Link>
          </li>
        ))}
      </ul> */}
      <div className="">
        <Card>
          <CardHeader>
            <CardTitle>People</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-8">
            {data.allPeople?.people.map((person: any) => (
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
                        <pre className="bg-orange-300 p-1 ml-2 rounded-md text-xs text-orange-900">
                          {person.id}
                        </pre>
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
    </div>
  );
};

export default HomePage;
