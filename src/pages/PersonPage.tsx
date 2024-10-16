import { Person } from "@/components/person.component";
import { useLoaderData } from "react-router-dom";
import { GetPersonByIdQuery } from "../generated/graphql";

const PersonPage = () => {
  const {
    data: { person },
  } = useLoaderData() as {
    data: NonNullable<GetPersonByIdQuery>;
  };

  if (!person) {
    return <p>Something went wrong</p>;
  }

  return (
    <>
      <Person {...{ data: person }} />

      <div>
        Films:{" "}
        <ul>
          {person?.filmConnection?.edges?.map((item, idx) => (
            <li key={idx}>
              {item?.node?.title}
              {item?.node?.releaseDate}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PersonPage;
