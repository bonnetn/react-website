import "./Search.scss";
import Template from "../components/Template";
import { NetworkStatus, useQuery } from "@apollo/client";
import { gql } from "../__generated__";
import SearchBox from "../components/SearchBox";
import CatsList, { Cat, State } from "../components/CatsList";
import MoreButton from "../components/MoreButton";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { SearchCatsQuery } from "../__generated__/graphql";

// If the user can fetch more results, then this is a function.
// Otherwise, undefined.
type MoreResults = (() => Promise<void>) | undefined;

const SEARCH_CATS = gql(`
  query SearchCats($query: String!, $cursor: String) {
    searchCats(query: $query, first: 20, after: $cursor) {
      edges {
        node {
          id
          age
          name
          owner {
            name
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`);

const queryName = "q";
const defaultQueryValue = "";

const useSearchQuery: () => [string, (query: string) => void] = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(queryName) ?? defaultQueryValue;

  const setSearchQuery = (query: string) => {
    const existingParams = Array.from(searchParams.entries());
    const newParams = new URLSearchParams([
      ...existingParams.filter(([key, _]) => key !== queryName),
      [queryName, query],
    ]);
    setSearchParams(newParams);
  };

  return [query, setSearchQuery];
};

function Search() {
  const [query, setQuery] = useSearchQuery();

  const handleNewInput = (input: string) => {
    setQuery(input);
  };

  const { loading, error, data, fetchMore, refetch, networkStatus } = useQuery(
    SEARCH_CATS,
    {
      variables: {
        query: query,
      },
      notifyOnNetworkStatusChange: true,
    }
  );
  useEffect(() => {
    refetch({ query: query });
  }, [refetch, query]);

  const fetchingMore = networkStatus === NetworkStatus.fetchMore;

  const computePageState: () => [State, MoreResults] = () => {
    if (loading && !fetchingMore)
      // Note: When fetching more elements, we do not want to clear the
      // ones that are already on the screen so that the user's scrollbar
      // does not reset.
      return [{ status: "loading" }, undefined];

    if (error)
      // There has been an error.
      return [{ status: "error", error: error.message }, undefined];

    if (data === undefined)
      // No data returned by the API!
      return [
        {
          status: "error",
          error: "GraphQL endpoint did not return data.",
        },
        undefined,
      ];

    const {
      searchCats: {
        edges,
        pageInfo: { hasNextPage, endCursor },
      },
    } = data;

    const handleMoreResults: MoreResults = (() => {
      if (hasNextPage) {
        return async () => {
          await fetchMore({
            variables: { cursor: endCursor },
          });
        };
      } else {
        return undefined;
      }
    })();

    const cats: Cat[] = edges.map((edge) => edge.node);

    return [
      {
        status: "ready",
        cats: cats,
      },
      handleMoreResults,
    ];
  };

  const [catsListState, moreResults] = computePageState();

  return (
    <Template>
      <div className={"search-container"}>
        <div className={"search-box"}>
          <SearchBox onInput={handleNewInput} defaultQuery={query} />
        </div>
      </div>

      <CatsList state={catsListState} />
      <MoreButton moreResults={moreResults} fetchingMore={fetchingMore} />
    </Template>
  );
}

export default Search;
