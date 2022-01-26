export default (db:number[]) => db.reduce((max, item) =>
  (item > max ? item : max),
    db[0]
  )