var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Handler_repository;
import { GraphQLError } from "graphql";
const defaultLimit = 50;
const maxLimit = 100;
function catsIDToString(id) {
    const payload = {
        model: "cat",
        id,
    };
    const json = JSON.stringify(payload);
    return Buffer.from(json).toString("base64");
}
function stringToCatsId(s) {
    // TODO: Error handling for base64 & JSON decoding.
    const buf = new Buffer(s, "base64");
    const payload = JSON.parse(buf.toString());
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
    constructor(repository) {
        _Handler_repository.set(this, void 0);
        this.resolvers = {
            Query: {
                searchCats: async (_, { query, first, after, last, before }, contextValue) => {
                    if (first !== undefined && last !== undefined) {
                        throw new GraphQLError("setting both 'first' and 'last' argument is not supported", {
                            extensions: {
                                code: "UNSUPPORTED_ARGUMENT_FIRST_AND_LAST_SET",
                            },
                        });
                    }
                    const limit = (() => {
                        if (first === undefined) {
                            return defaultLimit;
                        }
                        if (first < 0) {
                            throw new GraphQLError("'first' should be strictly greater than 0", {
                                extensions: {
                                    code: "BAD_USER_INPUT_FIRST_PARAMETER",
                                },
                            });
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
                    const cats = await __classPrivateFieldGet(this, _Handler_repository, "f").searchCats(query, { state: "first", value: limit }, afterNum, null);
                    const edges = cats.map(({ id, uuid, name, age, owner }) => {
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
                        }
                        else {
                            return [true, edges.at(-1).cursor];
                        }
                    })();
                    const connection = {
                        edges: edges,
                        pageInfo: {
                            hasNextPage,
                            hasPreviousPage: false,
                            endCursor,
                        },
                    };
                    return connection;
                },
            },
        };
        __classPrivateFieldSet(this, _Handler_repository, repository, "f");
    }
}
_Handler_repository = new WeakMap();
