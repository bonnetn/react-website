-- NOTE: This files contains two functions:
-- 1. search_cats_forward: Which searches and returns the first N results.
-- 2. search_cats_backward: Same, but returns the N last results.
--
-- This allows PostgreSQL to efficiently retrieve the rows in both scenario.
-- (using a index scan, or a reverse index scan).

-- Search the cats table.
-- WARNING: This function is not paginated and may be very expensive.
CREATE FUNCTION pg_temp.search_cats_unpaginated(query TEXT, after INT, before INT)
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
SELECT cats.id     AS id,
       cats.uuid   AS uuid,
       cats.name   AS name,
       cats.age    AS age,
       owners.uuid AS owner_uuid,
       owners.name AS owner_name

FROM cats
         INNER JOIN owners ON owners.id = cats.owner_id

WHERE cats.name ILIKE '%' || query || '%'
  AND (after IS NULL OR after < cats.id)
  AND (before IS NULL OR cats.id < before)

$$
    STABLE
    LANGUAGE SQL;

-- Search the cats table and return the first N results.
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
-- Only select the "first" n elements starting from the cursor "after".
SELECT *
FROM pg_temp.search_cats_unpaginated(query, after, before)
ORDER BY id
LIMIT first
$$
    STABLE
    LANGUAGE SQL;

-- Search the cats table and return the last N results..
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
-- Only select the "last" n elements ending on the cursor "before".
SELECT *
FROM (SELECT *
      FROM pg_temp.search_cats_unpaginated(query, after, before)
      ORDER BY id DESC
      LIMIT last) AS results
ORDER BY id
$$
    STABLE
    LANGUAGE SQL;
