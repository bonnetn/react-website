import { opendirSync, readFileSync } from "fs";

type QueryFunction = {
  name: string;
  content: string;
};

export const queries: QueryFunction[] = await readSql("sql/");

export const searchCatsForwardQuery: string =
  "SELECT * FROM pg_temp.search_cats_forward($1::text, $2::int, $3::int, $4::int);";
export const searchCatsBackwardQuery: string =
  "SELECT * FROM pg_temp.search_cats_backward($1::text, $2::int, $3::int, $4::int);";

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
