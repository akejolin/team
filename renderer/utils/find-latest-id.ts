export default (db) => db.reduce((max, item) =>
  (item.id > max ? item.id : max),
    db[0].id
  )