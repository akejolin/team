//requiring path and fs modules
const path = require('path');
const fs = require('fs');
//joining path of directory

export const listFilesInDir = async (dir:string, ext:string[] = ['.txt']) => new Promise<string[]>((resolve, reject) => {
  /*
  const testFiles = (files:string[]):string[] => files.map(file => {
    console.log('file: ', file, 'ext: ', path.extname(file).toLowerCase(), 'ext.indexOf: ', ext.indexOf(path.extname(file).toLowerCase()))
    return file
  })
  */
  const targetFiles = (files:string[]):string[] => files.filter(file => ext.indexOf(path.extname(file).toLowerCase()) > -1 );

  if (!dir) {
      reject ('Unable to scan directory because no dir was provided');
  }
  fs.readdir(dir, function (err: string, files:[]) {
    if (err) {
      reject ('Unable to scan directory: ' + err);
    }
    let result:string[] = files
    if (ext.length > 0) {
      //testFiles(result)
      result = targetFiles(result)
    }

    resolve (result)
  })
})