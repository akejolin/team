/**
* @desc read from txt file on disk
* @param string $file - full file path on disk,
* @return string - file content
*/

import fs from 'fs'

export const readFileRowsInArray = async (file:string) => new Promise<Array<string>>((resolve, reject) => fs.readFile(file, 'utf8', (err:any, data:any) => {
  
  if (err) {
    return reject(err)
  }
  let stringData = data.toString()
  stringData = stringData.replace(/\; /g, ';')
  let arr = stringData.toString().replace(/\r\n/g,'\n').split('\n');

  //arr = arr.replace(/≠≠/g, '\n')

  return resolve(arr)
}))

export default readFileRowsInArray
