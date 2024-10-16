import { Person } from "@/components/person.component";
import { Planets } from "@/interfaces";
import { useLoaderData } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
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

  function checkPlanetsWithoutWater(planets: Planets) {
    const total = planets?.filter((item) => item?.surfaceWater === 0);

    return total && total.length > 0 ? total.length : "None";
  }
  return (
    <>
      <Person {...{ data: person }} />
      <div>
        <h3>Films:</h3>
        {person?.filmConnection?.edges?.map((item, idx) => (
          <Fragment key={idx}>
            Title: {item?.node?.title}
            <ul className="list-disc list-inside">
              <li>Release date: {item?.node?.releaseDate}</li>
              <li>Total planets: {item?.node?.planetConnection?.totalCount}</li>
              <li>
                Total planets without water:
                {checkPlanetsWithoutWater(
                  item?.node?.planetConnection?.planets
                )}
              </li>
            </ul>
          </Fragment>
        ))}
      </div>
    </>
  );
};

export default PersonPage;
