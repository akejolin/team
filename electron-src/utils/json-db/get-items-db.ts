/**
* @desc generate hash code.
* @return string - hash
*/

import readDB from './read-db'

export default <T>(filepath:string, field:string='*', needle:Array<string>=[]) => new Promise<T[]>(async (resolve) => {

  let db:T[] = []
  try {
    db = await readDB(filepath)
    db = db.slice()
  } catch(error) {
    console.info('Items was not found')
    db = []
  }


  if (field === '*' || needle.length < 1 || db.length < 1) {
    resolve(db)
  }


  needle.forEach(n => {
    db = db.filter((dbItem:any) => {
      return Array.isArray(dbItem[field as keyof T]) ? dbItem[field as keyof T].includes(n) : dbItem[field as keyof T] === n? true : false
    })
  })
  

  resolve(db)
})