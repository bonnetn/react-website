-- $1: Query
-- $2: After
-- $3: First
SELECT cats.id AS id,
       cats.uuid AS uuid,
       cats.name AS name,
       cats.age AS age,
       owners.uuid AS owner_uuid,
       owners.name AS owner_name

FROM cats
         INNER JOIN owners ON owners.id = cats.owner_id

WHERE (
              ($2::Numeric IS NULL OR cats.id > $2::Numeric)
              AND cats.name ILIKE '%' || $1 || '%'
  )
  LIMIT $3;
