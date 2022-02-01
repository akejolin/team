/**
* @desc write to txt file on disk
* @param string $file - full file path on disk,
* @return void
*/

import fs from 'fs'

export default async (file:string, data:any) => fs.writeFile(file, data, (err) => {
  if (err) {
      throw new Error(err as any)
  }
})