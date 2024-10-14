import { useLoaderData } from "react-router-dom";
import { GetPersonByIdQuery } from "../generated/graphql";

const PersonPage = () => {
  const { data } = useLoaderData() as { data: GetPersonByIdQuery };
  // FIXME data.person?.species?.averageHeight can be empty
  // FIXME data.person?.filmConnection?.edges add pagination
  // and reduce count producers "how many times"

  return (
    <>
      <div>Person {data.person?.name}</div>
      <div>Birth Year: {data.person?.birthYear}</div>
      <div>Species: {data.person?.species?.averageHeight}</div>
      <div>
        Films:{" "}
        <ul>
          {data.person?.filmConnection?.edges?.map((item, idx) => (
            <li key={idx}>
              {item?.node?.title}
              {item?.node?.releaseDate}
              <ul>
                Producers:
                {item?.node?.producers?.map((producer, idx) => (
                  <li key={idx}>{producer}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PersonPage;
