/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { shell, Shell, ipcRenderer, IpcRenderer } from 'electron'
import readFileRowsInArray from './utils/file.read.array'

interface IdataKeys {
  [key: string]: string
}


declare global {
  namespace NodeJS {
    interface Global {
      ipcRenderer: IpcRenderer
      isDev: boolean,
      shell: Shell,
      dataKeys: IdataKeys
      dataSourcePath: string,
      tags: {category: string|number, tag: string|number}[] //Array<Array<string|number>>
    }
  }
  
}
const dataStoragePath = '/Users/jonaslinde/data/team/'
const translateData = async (dataSource:string) => {

  const filePath =  dataSource// `${dataSource.toLowerCase().replace(/_/g, '-')}${ext === 'none' ? ext : ''}`
  try {
    let rows:Array<string> = await readFileRowsInArray(`${filePath}`)
    rows = rows.filter(r => r.length > 0)
    
    const out:IdataKeys = {}
    rows.forEach((item,i) => {
      out[`emp${i}`] = item 
    })
    return Promise.resolve(out)

  } catch(error) {
    console.log('Error, load and create translateData >> : ', error)
    throw new Error(`Error, load and create translateData : ${filePath}, ${error}`)
  }
}

const requestArrayData = async (filePath='') => {

  try {
    let rows:Array<string> = await readFileRowsInArray(`${filePath}`)
    let result:Array<Array<number | string>> = rows.map((row:String) => {
    let _arr = row.split(';').filter(r => r !== '')
    let arr = _arr.map(str => Number(str) ? Number(str) : str)
      return arr
    }).filter(r => r.length > 0)
    return result

  } catch(error) {
    throw new Error(`error reading db file: ${filePath}, ${error}`)
  }

}


// Since we disabled nodeIntegration we can reintroduce
// needed node functionality here
process.once('loaded', async () => {
    global.ipcRenderer = ipcRenderer
    global.isDev = process.env ? true: false
    global.shell = shell
    global.dataKeys = await translateData(`${dataStoragePath}system-data-translate.txt`)
    global.dataSourcePath = dataStoragePath
    global.tags = await (await requestArrayData(`${dataStoragePath}system-tags.txt`)).map(item => ({category: item[0], tag: item[1]}))
})
