/**
* @desc add to last row in txt file on disk
* @param string $file - full file path on disk,
* @return void
*/

import fs from 'fs'

export const appendFile = (file:string, data:string) => new Promise((resolve, reject) => fs.appendFile(file, data, (err:any):void => {
    if (err) {
        reject(err)
    }
    resolve(data)
  })
)