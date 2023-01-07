import { opendirSync, readFileSync } from "fs";
export const queries = await readSql("sql/");
export const searchCatsForwardQuery = "SELECT * FROM pg_temp.search_cats_forward($1::text, $2::int, $3::int, $4::int);";
export const searchCatsBackwardQuery = "SELECT * FROM pg_temp.search_cats_backward($1::text, $2::int, $3::int, $4::int);";
export const fetchCatQuery = "SELECT * FROM pg_temp.fetch_cat($1)";
async function readSql(path) {
    const dir = opendirSync(path);
    const result = [];
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
