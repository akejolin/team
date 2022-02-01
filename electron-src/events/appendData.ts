import { ipcMain, IpcMainEvent } from 'electron'
import getExt from '../utils/file.get-ext'
import readFileRowsInArray from '../utils/file.read.array'
import appendToFile from '../utils/file.append'
import writeToFile from '../utils/file.write.promise'
import findLatestId from '../utils/findLatestId'
import {dataStoragePath} from '../config/config'


export interface I_note {
  id: Number,
  year: Number,
  date: string,
  emp: string,
  impact: number,
  tags: string[],
  comment: string,
}
export interface IdataObject {
  [key: string]: string
}

export default () => {

const empKeys = ['emp0', 'emp1', 'emp2', 'emp3', 'emp4', 'emp5', 'emp6', 'emp7', 'emp8', 'emp9' , 'emp10', 'emp11', 'emp12', 'emp13', 'emp14', 'emp15', 'emp16', 'emp17', 'emp18', 'emp19']

let whitelistedFiles:IdataObject = {}

const makeString = (input:I_note[]):string => {
  let output = ''
  input.forEach((row:I_note) => {
    Object.values(row).forEach((item:string) => {
      const value = item
      if (Array.isArray(value)) {
        output += `${value.join(',')};`
      } else {
        output += `${value};`
      }
    })
    output += `\n`
  })
  return output
}

ipcMain.on('REQUEST_APPEND_DATA', async (event: IpcMainEvent, dataSource:string, formData:I_note) => {
  const ext = getExt(dataSource)
  const empKey = empKeys.find(key => dataSource.indexOf(key) > -1) 
  let transformedDataSource = empKey ? dataSource.replace(empKey, whitelistedFiles[empKey]) : dataSource 
  const filePath = `${dataStoragePath}${transformedDataSource.toLowerCase().replace(/_/g, '-')}${ext !== 'none' ? ext : '.txt'}`
   
    try {
      let rows:Array<string> = await readFileRowsInArray(`${filePath}`)
      let result = rows.map((row:string) => {
      let _arr = row.split(';').filter(r => r !== '')
      let arr = _arr.map(str => Number(str) ? Number(str) : str)
        return arr
      }).filter(r => r.length > 0)

      if (Number(formData.id) < 0) {
        const nextId = findLatestId(result.map(item => Number(item[0]))) + 1
        formData.id = Number(nextId)
        const target = []
        target.push(formData)

        await appendToFile(`${filePath}`, makeString(target))

      } else {

        let output:I_note[] = result.map(item => {

        const str = item[5] ? item[5].toString() : ''
        let tags = str.split(',').filter((ii:string) => ii !== '')
        tags = tags.map(item => item.replace(/ /g,''))
        tags = tags.filter(ii => ii.length > 0)

        //tags.unshift(item[3].toString())

        return {
          id: Number(item[0]),
          year: Number(item[1]),
          date: item[2].toString(),
          emp: item[3].toString(),
          impact: Number(item[4]),
          tags,
          comment: item[6].toString(),
        }})

        output = output.map(item => {
          if (Number(output) !== Number(formData.id)) {
            return formData
          } else {
            return item
          }
        })
        await writeToFile(`${filePath}`, makeString(output))
      }

      event.sender.send(`RESPONSE_APPEND_DATA_${dataSource}`, formData)
  
    } catch(error) {
      throw new Error(`error reading db file: ${filePath}, ${error}`)
    }
  })

}