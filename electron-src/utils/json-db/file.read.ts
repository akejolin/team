/**
* @desc read from txt file on disk
* @param string $file - full file path on disk,
* @return string - file content
*/

import fs from 'fs'

export default async (file:string) => new Promise<any>((resolve) => fs.readFile(file, 'utf8', (err, data) => {
  if (err) {
    throw new Error(err as any)
  }
  resolve(data)
}))
