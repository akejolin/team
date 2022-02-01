import fileRead from '../../utils/json-db/file.read'

export default async <T>(filePath:string) => new Promise<T>(async (resolve) => {
  try {
    const data = await fileRead(filePath)
    resolve(await JSON.parse(data))
  } catch(error) {
    throw new Error(`error reading db file: ${filePath}`)
  }
})