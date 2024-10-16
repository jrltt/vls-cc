import { Films } from "@/components/films-component";
import { Person } from "@/components/person.component";
import { FilmConnection } from "@/interfaces";
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
      <Films
        {...{
          data: person?.filmConnection as NonNullable<FilmConnection>,
        }}
      />
    </>
  );
};

export default PersonPage;
