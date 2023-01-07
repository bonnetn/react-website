CREATE FUNCTION pg_temp.fetch_cat(catUuid TEXT)
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

WHERE cats.uuid::text = catUuid
$$
    LANGUAGE SQL;
