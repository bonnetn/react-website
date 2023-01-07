import { GraphQLError } from "graphql/index";
const defaultLimit = 50;
const maxLimit = 100;
export class Handler {
    constructor() {
        this.resolvers = {
            Query: {
                catConnection: (_, { first, after }, contextValue) => {
                    const limit = (() => {
                        if (first === undefined) {
                            return defaultLimit;
                        }
                        if (first < 0) {
                            throw new GraphQLError("'first' should be strictly greater than 0", {
                                extensions: {
                                    code: "BAD_USER_INPUT_FIRST",
                                },
                            });
                        }
                        if (first > maxLimit) {
                            return maxLimit;
                        }
                        return first;
                    })();
                    const edges = cats.map((node) => {
                        return { node };
                    });
                    const connection = {
                        edges: edges,
                    };
                    return connection;
                },
            },
        };
    }
}
