import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import {
  Configuration,
  PostgresRepository,
} from "./repository/PostgresRepository.js";
import { Handler } from "./handler/Handler.js";

const conf: Configuration = {
  host: "localhost",
  port: 5432,
  database: "postgres",
  user: "postgres",
  password: "mysecretpassword",
};
const repository = new PostgresRepository(conf);
const handler = new Handler(repository);
const resolvers = handler.resolvers;

const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
