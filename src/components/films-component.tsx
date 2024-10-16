import { FilmConnection, Planets } from "@/interfaces";
import { Fragment } from "react/jsx-runtime";

function checkPlanetsWithoutWater(planets: Planets) {
  const total = planets?.filter((item) => item?.surfaceWater === 0);

  return total && total.length > 0 ? total.length : "None";
}

export function Films({ data }: { data: NonNullable<FilmConnection> }) {
  return (
    <div>
      <h3>Films:</h3>
      {data.map((item, idx) => (
        <Fragment key={idx}>
          Title: {item?.node?.title}
          <ul className="list-disc list-inside">
            <li>Release date: {item?.node?.releaseDate}</li>
            <li>Total planets: {item?.node?.planetConnection?.totalCount}</li>
            <li>
              Total planets without water:
              {checkPlanetsWithoutWater(item?.node?.planetConnection?.planets)}
            </li>
          </ul>
        </Fragment>
      ))}
    </div>
  );
}
