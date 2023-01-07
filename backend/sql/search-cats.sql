CREATE FUNCTION pg_temp.search_cats_forward(query TEXT, first INT, after INT, before INT)
    RETURNS TABLE
            (
                id         INT,
                uuid       TEXT,
                name       TEXT,
                age        INT,
                owner_uuid TEXT,
                owner_name TEXT
            )
AS
$$
WITH
    -- Main query:
    search_results AS (SELECT cats.id     AS id,
                              cats.uuid   AS uuid,
                              cats.name   AS name,
                              cats.age    AS age,
                              owners.uuid AS owner_uuid,
                              owners.name AS owner_name

                       FROM cats
                                INNER JOIN owners ON owners.id = cats.owner_id

                       WHERE cats.name ILIKE '%' || query || '%')

    -- Only select the "first" n elements starting from the cursor "after".
SELECT *
FROM search_results
WHERE (after IS NULL OR after < id)
  AND (before IS NULL OR id < before)
ORDER BY id
LIMIT first
$$
    STABLE
    LANGUAGE SQL;

-- Search the cats table.
-- If "first" or "last" is NULL, it assumes +inf.
-- If "before" or "after" is NULL, it ignores the cursor constraint.
CREATE FUNCTION pg_temp.search_cats_backward(query TEXT, last INT, after INT, before INT)
    RETURNS TABLE
            (
                id         INT,
                uuid       TEXT,
                name       TEXT,
                age        INT,
                owner_uuid TEXT,
                owner_name TEXT
            )
AS
$$
WITH
    -- Main query:
    search_results AS (SELECT cats.id     AS id,
                              cats.uuid   AS uuid,
                              cats.name   AS name,
                              cats.age    AS age,
                              owners.uuid AS owner_uuid,
                              owners.name AS owner_name

                       FROM cats
                                INNER JOIN owners ON owners.id = cats.owner_id

                       WHERE cats.name ILIKE '%' || query || '%')

    -- Only select the "last" n elements ending on the cursor "before".
SELECT *
FROM (SELECT *
      FROM search_results
      WHERE (after IS NULL OR after < id)
        AND (before IS NULL OR id < before)
      ORDER BY id DESC
      LIMIT last) AS results
ORDER BY id
$$
    STABLE
    LANGUAGE SQL;
