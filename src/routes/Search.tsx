import "./Search.scss";
import Template from "../components/Template";
import { NetworkStatus, useQuery } from "@apollo/client";
import { gql } from "../__generated__";
import SearchBox from "../components/SearchBox";
import CatsList, { Cat, Ready, State } from "../components/CatsList";
import MoreButton from "../components/MoreButton";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo } from "react";

// If the user can fetch more results, then this is a function.
// Otherwise, undefined.
type MoreResults = (() => Promise<void>) | undefined;

const SEARCH_CATS = gql(`
  query SearchCats($cursor: String, $search: String!) {
    search_cats_connection(first: 20, after: $cursor, args: {search: $search}, order_by: {id: asc}) {
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
        search: query,
      },
      notifyOnNetworkStatusChange: true,
    }
  );
  useEffect(() => {
    refetch({ search: query });
  }, [query]);

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
      search_cats_connection: {
        edges,
        pageInfo: { hasNextPage, endCursor },
      },
    } = data;

    const handleMoreResults = async () => {
      if (hasNextPage) {
        await fetchMore({
          variables: { cursor: endCursor },
        });
      }
    };

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