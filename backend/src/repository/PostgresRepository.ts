import pgPromise from "pg-promise";
import { Cat, Repository } from "./Repository";

namespace Query {
  export const fetchOneCat = sql("../sql/fetch-one-cat.sql");
  export const searchCats = sql("../sql/search-cats.sql");

  function sql(path: string): pgPromise.QueryFile {
    const queryFile = new pgPromise.QueryFile(path, {
      minify: true,
    });
    queryFile.prepare();
    return queryFile;
  }
}

export type Configuration = {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
};

export class PostgresRepository implements Repository {
  readonly #db: pgPromise.IDatabase<{}>;

  constructor(config: Configuration) {
    const initOptions = {};
    const cn = {
      ...config,
      max: 30, // use up to 30 connections
    };
    const pgp = pgPromise(initOptions);
    this.#db = pgp(cn);
  }

  async fetchOneCat(uuid: string): Promise<Cat | null> {
    const query = new pgPromise.ParameterizedQuery({
      text: Query.fetchOneCat,
      values: [uuid],
    });
    const result = await this.#db.oneOrNone(query);

    return result.map(this.#catMapper);
  }

  async searchCats(
    queryString: string,
    limit: number,
    after: number | null
  ): Promise<Cat[]> {
    const query = new pgPromise.ParameterizedQuery({
      text: Query.searchCats,
      values: [queryString, after, limit],
    });
    const result = await this.#db.any(query);

    return result.map(this.#catMapper);
  }

  #catMapper({ id, uuid, name, age, owner_uuid, owner_name }): Cat {
    const owner = { uuid: owner_uuid, name: owner_name };
    return { id, uuid, name, age, owner };
  }
}
