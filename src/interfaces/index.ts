import {
  GetAllPeoplePaginatedQuery,
  GetPersonByIdQuery,
} from "@/generated/graphql";

export type AllPeople = Pick<GetAllPeoplePaginatedQuery, "allPeople">;

export type People = NonNullable<
  NonNullable<GetAllPeoplePaginatedQuery["allPeople"]>["edges"]
>[number];

export type PersonNode = NonNullable<NonNullable<People>["node"]>;

export type PageInfo = NonNullable<
  NonNullable<GetAllPeoplePaginatedQuery["allPeople"]>["pageInfo"]
>;

export type FilmConnection = NonNullable<
  NonNullable<GetPersonByIdQuery["person"]>["filmConnection"]
>;

export type Planets = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<NonNullable<FilmConnection>["edges"]>[number]
    >["node"]
  >["planetConnection"]
>["planets"];

export type LoaderPeopleData = {
  people: People[];
  pageInfo: PageInfo;
  totalCount: number;
};
