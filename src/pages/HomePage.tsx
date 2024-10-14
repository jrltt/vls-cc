import { gql, useQuery } from "urql";

const query = gql`
  query GetAllPeople {
    allPeople {
      people {
        id
        name
      }
    }
  }
`;

const HomePage = () => {
  const [data] = useQuery({ query });
  console.log(data);

  return (
    <div>
      Home
      <pre>{JSON.stringify(data.data?.allPeople?.people, null, 2)}</pre>
    </div>
  );
};

export default HomePage;
