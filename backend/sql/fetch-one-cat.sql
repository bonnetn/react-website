SELECT uuid, name, age, owner_id
  FROM cats
  WHERE uuid = $1
  LIMIT 1