import { GetPersonByIdQuery } from "@/generated/graphql";
import { PersonCard } from "./person-card.component";
import { CardContent } from "./ui/card";

type ProducerCount = { producer: string; count: number };
type Person = NonNullable<GetPersonByIdQuery["person"]>;

function countProducers(person: Person): ProducerCount[] {
  const edges = person.filmConnection?.edges;

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

export function Person({ data }: { data: Person }) {
  const producers = countProducers(data);

  return (
    <>
      <PersonCard
        id={data.id}
        gender={data.gender}
        homeworld={{ name: data.homeworld?.name ?? "" }}
        name={data.name}
      >
        <CardContent className="space-y-4">
          <div className="flex items-center">Birth year: {data?.birthYear}</div>
          <div>
            Species avg. height: {data?.species?.averageHeight ?? "unknown"}
          </div>
          <div>
            List of producers and how many times they worked together:
            <ul className="list-disc list-inside">
              {producers?.map((item, idx) => (
                <li key={idx}>
                  {item.producer}, times: {item.count}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </PersonCard>
    </>
  );
}
