/**
* @desc write file to disk.
* @param string $dirName - name of dir,
* @param string $fileName - name of file,
* @param * $data - the data to be written,
* @return void
*/

import fs from 'fs'

export default async <T>(filePath:string, data:T) => new Promise<void>(async (resolve) => {
  fs.writeFile(filePath, JSON.stringify(data), (err) => {
    if (err) {
        throw new Error(err as any)
    }
    resolve()
  })

})

