export type Params = {
  first: string;
  after: string;
  last: string;
  before: string;
};

export function paginate(
  query: string,
  { first, after, last, before }: Params
): string {
  let q = query;
  q = paginateForward(q, after, first);
  q = paginateBackwards(q, before, last);
  return q;
}

function paginateBackwards(
  query: string,
  cursorParam: string,
  limitParam: string
): string {
  return `
        SELECT *
        FROM (SELECT *
              FROM (
                       ${query}
                       ) AS "all_results"
              WHERE (${cursorParam}::Numeric IS NULL OR "all_results"."id" < ${cursorParam}::Numeric)
              ORDER BY "all_results"."id" DESC
              LIMIT ${limitParam}) AS results_desc
        ORDER BY "results_desc"."id" ASC
    `;
}

function paginateForward(
  query: string,
  cursorParam: string,
  limitParam: string
): string {
  return `
        SELECT *
        FROM (
                 ${query}
                 ) AS "all_results"
        WHERE (${cursorParam}::Numeric IS NULL OR ${cursorParam}::Numeric < "all_results"."id")
        ORDER BY "all_results"."id" ASC
        LIMIT ${limitParam}
    `;
}
