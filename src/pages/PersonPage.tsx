import { Films } from "@/components/films-component";
import { Person } from "@/components/person.component";
import { FilmConnection } from "@/interfaces";
import { ArrowLeft } from "lucide-react";
import { Link, useLoaderData } from "react-router-dom";
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
    <div className="space-y-6">
      <Link
        className="py-2 px-3 bg-yellow-100 rounded-lg text-xs inline-flex items-center uppercase font-semibold hover:bg-yellow-200 transition-colors hover:border-yellow-300"
        to="/"
      >
        <ArrowLeft className="inline-block mr-2" strokeWidth={3} size={16} />
        Back to home
      </Link>
      <Person {...{ data: person }} />
      <Films
        {...{
          personFilms: person?.filmConnection as NonNullable<FilmConnection>,
        }}
      />
    </div>
  );
};

export default PersonPage;
