import { Link } from "react-router-dom";
import { useQuery } from "urql";
import { getAllPeopleQuery } from "../queries";

const HomePage = () => {
  const [result] = useQuery({ query: getAllPeopleQuery });
  // console.log(result);

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div>
      Home
      {/* <pre>{JSON.stringify(data.allPeople?.people, null, 2)}</pre> */}
      <ul>
        {data.allPeople?.people.map((person: any) => (
          <li key={person.id}>
            <Link to={`/person/${person.id}`}>{person.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
