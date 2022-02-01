import path from 'path'
import fs from 'fs'
import shell from 'shelljs'
import fileWrite from '../../utils/json-db/file.write'


module.exports = async (dir:string, fileName:string, data:any) => {
  const diskPath = path.resolve('.', dir)
  const filePath = `${diskPath}/${fileName}`
  if (!fs.existsSync(diskPath)) {
    await shell.mkdir('-p', diskPath)
  }
  if (!fs.existsSync(filePath)) {
    await fileWrite(filePath, JSON.stringify(data))
  }
}