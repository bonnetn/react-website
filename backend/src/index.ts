import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import { PostgresRepository } from "./repository/PostgresRepository.js";
import { Handler } from "./handler/Handler.js";
import PG from "pg";

const pgPool = new PG.native.Pool({
  host: "localhost",
  port: 5432,
  database: "postgres",
  user: "postgres",
  password: "mysecretpassword",
});
await pgPool.connect();

const repository = new PostgresRepository(pgPool);
const handler = new Handler(repository);
const resolvers = handler.resolvers;

await repository.searchCats("", { state: "last", value: 42 }, 10, null);
await repository.searchCats("", { state: "first", value: 42 }, 10, null);
console.log(await repository.fetchCat("fdec4fc8-a39c-4cf7-8bfd-28e305a33c1b"));

const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
