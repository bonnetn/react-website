import { Cat, Repository } from "./Repository";
import { fetchCatQuery, queries, searchCatsQuery } from "./Query.js";
import PG from "pg";

export class PostgresRepository implements Repository {
  readonly #db: PG.Pool;

  constructor(pool: PG.Pool) {
    pool.on("connect", this.registerQueries);
    this.#db = pool;
  }

  private async registerQueries(client: PG.Client): Promise<void> {
    for (const { name, content } of queries) {
      console.log(`Registering ${name}`);
      await client.query(content);
    }
  }

  async fetchCat(uuid: string): Promise<Cat | null> {
    const { rows } = await this.#db.query(fetchCatQuery, [uuid]);
    const result = rows.map(this.#catMapper);
    return result.at(0) ?? null;
  }

  async searchCats(
    queryString: string,
    first: number | null,
    after: number | null,
    last: number | null,
    before: number | null
  ): Promise<Cat[]> {
    const r = await this.#db.query("EXPLAIN ANALYZE " + searchCatsQuery, [
      queryString,
      first,
      after,
      last,
      before,
    ]);
    for (const l of r.rows) {
      console.log(l["QUERY PLAN"]);
    }
    const { rows } = await this.#db.query(searchCatsQuery, [
      queryString,
      first,
      after,
      last,
      before,
    ]);
    return rows.map(this.#catMapper);
  }

  #catMapper({ id, uuid, name, age, owner_uuid, owner_name }): Cat {
    const owner = { uuid: owner_uuid, name: owner_name };
    return { id, uuid, name, age, owner };
  }
}
