/**
* @desc read from txt file on disk
* @param string $file - full file path on disk,
* @return string - file content
*/

import fs from 'fs'

export const readFile = async (file:string) => new Promise<string>(
  (resolve, reject) => fs.readFile(file, 'utf8', (err, data):void=> {
    if (err) reject(err);
    resolve(data)
  })
)

export default readFile
