/**
* @desc write to txt file on disk
* @param string $file - full file path on disk,
* @return void
*/

import fs from 'fs'

export const writeFile = (file:string, data:string) => new Promise<void>((resolve, reject) => {
  
  fs.writeFile(file, data, (err:any):void => {
    if (err) {
      reject(err)
    }
    resolve()
  })

})

export default writeFile