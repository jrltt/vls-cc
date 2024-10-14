import { useLoaderData } from "react-router-dom";

const PersonPage = () => {
  const { data } = useLoaderData() as { data: { person: any } };
  console.log(data.person);

  return <div>Person</div>;
};

export default PersonPage;
