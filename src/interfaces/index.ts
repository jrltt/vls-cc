import { GetAllPeoplePaginatedQuery } from "@/generated/graphql";

export type AllPeople = Pick<GetAllPeoplePaginatedQuery, "allPeople">;

export type People = NonNullable<
  NonNullable<GetAllPeoplePaginatedQuery["allPeople"]>["edges"]
>;

export type PageInfo = NonNullable<
  NonNullable<GetAllPeoplePaginatedQuery["allPeople"]>["pageInfo"]
>;

export type LoaderPeopleData = {
  people: People[];
  pageInfo: PageInfo;
  totalCount: number;
};
