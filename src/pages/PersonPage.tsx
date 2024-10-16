import { useLoaderData } from "react-router-dom";
import { GetPersonByIdQuery } from "../generated/graphql";

type ProducerCount = { producer: string; count: number };

function countProducers(
  person: NonNullable<GetPersonByIdQuery>["person"]
): ProducerCount[] {
  const edges = person?.filmConnection?.edges;

  if (!edges) {
    return [];
  }

  return edges.reduce<ProducerCount[]>((acc, filmEdge) => {
    const producers = filmEdge?.node?.producers ?? [];

    producers.forEach((producer) => {
      if (!producer) return;

      const existingProducer = acc.find((p) => p.producer === producer);

      if (existingProducer) {
        existingProducer.count += 1;
      } else {
        acc.push({ producer, count: 1 });
      }
    });

    return acc;
  }, []);
}

const PersonPage = () => {
  const {
    data: { person },
  } = useLoaderData() as {
    data: NonNullable<GetPersonByIdQuery>;
  };
  // FIXME data.person?.species?.averageHeight can be empty
  // FIXME data.person?.filmConnection?.edges add pagination
  // and reduce count producers "how many times"

  const producers = countProducers(person);
  console.log(producers);

  return (
    <>
      <div>Person {person?.name}</div>
      <div>Birth Year: {person?.birthYear}</div>
      <div>Species: {person?.species?.averageHeight}</div>
      <div>
        List of producers:
        <ul>
          {producers?.map((item, idx) => (
            <li key={idx}>
              {item.producer}, count: {item.count}
            </li>
          ))}
        </ul>
      </div>
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
