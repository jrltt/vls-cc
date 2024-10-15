import { PeopleGrid } from "@/components/people-grid.component";
import { LoaderPeopleData } from "@/interfaces";
import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";

const HomePage = () => {
  const asyncData = useLoaderData() as LoaderPeopleData;

  return (
    <div className="container mx-auto mt-8">
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={asyncData}>
          <PeopleGrid />
        </Await>
      </Suspense>
    </div>
  );
};

export default HomePage;
