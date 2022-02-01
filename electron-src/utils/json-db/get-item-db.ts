/**
* @desc generate hash code.
* @return string - hash
*/


import readDB from './read-db'

module.exports = <T>(filepath:string, key:string, needle:string) => new Promise<T>(async (resolve, reject) => {

  let db:T[]
  try {
    db = await readDB(filepath)
    db = db.slice()
  } catch(error) {
    console.info('DB could not be loaded')
    db = []
  }

  const target = db.find((item:any) => item[key] === needle)
  
  target ? resolve(target) : reject('Item Not found')

})