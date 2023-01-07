import { paginate } from "./Paginator.js";
import { opendirSync, readFileSync } from "fs";

type QueryFunction = {
  name: string;
  content: string;
};

export const queries: QueryFunction[] = await readSql("sql/");

export const searchCatsQuery: string = paginate(
  "SELECT * FROM pg_temp.search_cats($1)",
  {
    first: "$2",
    after: "$3",
    last: "$4",
    before: "$5",
  }
);

export const fetchCatQuery: string = "SELECT * FROM pg_temp.fetch_cat($1)";

async function readSql(path: string): Promise<QueryFunction[]> {
  const dir = opendirSync(path);

  const result: QueryFunction[] = [];
  for await (const entry of dir) {
    if (entry.isFile()) {
      result.push({
        name: entry.name,
        content: readFileSync(path + "/" + entry.name, { encoding: "utf-8" }),
      });
    }
  }
  return result;
}
