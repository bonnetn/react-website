import {
  CatConnection,
  CatEdge,
  Maybe,
  Owner,
  PageInfo,
  Resolvers,
  Scalars,
} from "../__generated__/resolvers-types";
import { GraphQLError } from "graphql";
import { Repository } from "../repository/Repository";

const defaultLimit = 50;
const maxLimit = 100;

function catsIDToString(id: number): string {
  const payload = {
    model: "cat",
    id,
  };
  const json = JSON.stringify(payload);
  return Buffer.from(json).toString("base64");
}

function stringToCatsId(s: string): number | undefined {
  // TODO: Error handling for base64 & JSON decoding.
  const buf = new Buffer(s, "base64");
  const payload: { model: string | undefined; id: number | undefined } =
    JSON.parse(buf.toString());

  if (payload.model !== "cat") {
    throw new GraphQLError("'after' is invalid", {
      extensions: {
        code: "BAD_USER_INPUT_AFTER_PARAMETER",
      },
    });
  }

  return payload.id;
}

export class Handler {
  readonly #repository: Repository;

  constructor(repository: Repository) {
    this.#repository = repository;
  }

  resolvers: Resolvers = {
    Query: {
      catConnection: async (_, { first, after }, contextValue) => {
        const limit = (() => {
          if (first === undefined) {
            return defaultLimit;
          }

          if (first < 0) {
            throw new GraphQLError(
              "'first' should be strictly greater than 0",
              {
                extensions: {
                  code: "BAD_USER_INPUT_FIRST_PARAMETER",
                },
              }
            );
          }

          if (first > maxLimit) {
            return maxLimit;
          }

          return first;
        })();

        const afterNum = (() => {
          if (after === undefined) {
            // User did not provide the after parameter, fine
            // the SQL query can handle this case.
            return null;
          }

          const a = stringToCatsId(after);
          if (a === undefined) {
            // User did provide a value, but it is invalid.
            throw "invalid 'after' parameter";
          }

          return a;
        })();

        const cats = await this.#repository.searchCats("cha", limit, afterNum);

        const edges: CatEdge[] = cats.map(({ id, uuid, name, age, owner }) => {
          return {
            node: {
              id: uuid,
              name,
              age,
              owner: { id: owner.uuid, name: owner.name },
            },
            cursor: catsIDToString(id),
          };
        });

        const [hasPreviousPage, startCursor] = (() => {
          return [false, undefined];
        })();

        const [hasNextPage, endCursor] = (() => {
          if (edges.length < limit) {
            return [false, undefined];
          } else {
            return [true, edges.at(-1).cursor];
          }
        })();

        const connection: CatConnection = {
          edges: edges,
          pageInfo: {
            hasNextPage,
            endCursor,
          },
        };

        return connection;
      },
    },
  };
}
