import { renderHook } from "@testing-library/react";
import { createClient, Provider } from "urql";
import { describe, expect, it, vi } from "vitest";
import { usePeopleData } from "./use-people-data.hook";

vi.mock("@/queries", () => ({
  getAllPeopleQueryPaginated: "",
}));

vi.mock("urql", async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...(mod as any),
    useQuery: vi.fn(() => [{ data: null, fetching: false, error: null }]),
  };
});

const mockClient = createClient({
  url: "http://localhost:3000",
});
describe("Use people data hook", () => {
  it("should return data on init", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider value={mockClient}>{children}</Provider>
    );

    const { result } = renderHook(
      () =>
        usePeopleData({
          people: [{ node: { id: "1", name: "Luke Skywalker" } }],
          pageInfo: { hasNextPage: false },
          totalCount: 1,
        }),
      { wrapper }
    );

    expect(result.current.people).toEqual([]);
  });
});
