import { ipcMain, IpcMainEvent } from 'electron'
import getExt from '../utils/file.get-ext'
import readFileRowsInArray from '../utils/file.read.array'
import writeToFile from '../utils/file.write.promise'
import appendToFile from '../utils/file.append'
import findLatestId from '../utils/findLatestId'
import { convertArrayToDatabaseRow } from '../utils/convertArrayToDatabaseRow'
import { stringToArray } from '../utils/stringToArray'
export interface I_note {
  id: Number,
  year?: Number,
  date?: string,
  emp?: string,
  impact?: number,
  tags?: string[],
  comment?: string,
}
export interface IdataObject {
  [key: string]: string
}


const fillDataRowObject = (formData:I_note, item?:I_note, ) => ({
  id: formData.id,
  year: formData.date ? new Date(formData.date).getFullYear() : item ? item.year : 1970,
  date: formData.date ? formData.date : item ? item.date : '1970-01-01',
  emp: formData.emp ? formData.emp : item ? item.emp : '',
  impact: formData.impact ? formData.impact : item ? item.impact : 3,
  tags: formData.tags ? formData.tags : item ? item.tags : [],
  comment: formData.comment ? formData.comment : item ? item.comment : '',
})

interface Iprops {
  endPointId:string
}

export default ({endPointId}:Iprops) => {

const empKeys = ['emp0', 'emp1', 'emp2', 'emp3', 'emp4', 'emp5', 'emp6', 'emp7', 'emp8', 'emp9' , 'emp10', 'emp11', 'emp12', 'emp13', 'emp14', 'emp15', 'emp16', 'emp17', 'emp18', 'emp19']
const dataStoragePath = '/Users/jonaslinde/data/team/'
let whitelistedFiles:IdataObject = {}

ipcMain.on('REQUEST_UPDATE_DATA', async (event: IpcMainEvent, dataSource:string, receiverID, formData:I_note) => {
  const ext = getExt(dataSource)
  const empKey = empKeys.find(key => dataSource.indexOf(key) > -1) 
  let transformedDataSource = empKey ? dataSource.replace(empKey, whitelistedFiles[empKey]) : dataSource 
  const filePath = `${dataStoragePath}${transformedDataSource.toLowerCase().replace(/_/g, '-')}${ext !== 'none' ? ext : '.txt'}`
   
  let rows:Array<string> = []
  let result:Array<Array<string|number>> = []

  try {
    rows = await readFileRowsInArray(`${filePath}`)
  } catch(error) {
    throw new Error(`error reading db file: ${filePath}, ${error}`)
  }

  try {
    result = rows.map((row:string) => {
      return stringToArray(row, ';', (array:string[]) => array.map((str:string) => Number(str) ? Number(str) : str))
    }).filter(r => r.length > 0)

  } catch(error) {
    throw new Error(`error converting DB string row to array: ${filePath}, ${error}`)
  }

  try {
    // No id means new data
    if (Number(formData.id) < 0 || typeof formData.id === 'undefined') {
      const nextId = findLatestId(result.map(item => Number(item[0]))) + 1
      formData.id = nextId
      const output = fillDataRowObject(formData)
      const target = []
      target.push(output)

      await appendToFile(`${filePath}`, convertArrayToDatabaseRow<I_note>(target))

      return event.sender.send(`RESPONSE_UPDATE_DATA_${receiverID}`, output)
    }
  } catch(error) {
    throw new Error(`error creating new DB string row: ${filePath}, ${error}`)
  }
  
  try {

    let output:I_note[] = result.map(item => {

    const str = item[5] ? item[5].toString() : ''
    let tags = stringToArray(str, ',', (array:string[]) => {
      array.map((item:string) => item.replace(/ /g,''))
      array = array.filter(ii => ii.length > 0)
      return array
    })

 
    const test: Array<Object> = Object.keys(I_note).map(key => {
      return { text: key, value: key }
    });

    console.log('test: ', test)

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
      if (Number(item.id) === Number(formData.id)) {
        return fillDataRowObject(formData, item)
      } else {
        return item
      }
    })

    await writeToFile(`${filePath}`, convertArrayToDatabaseRow<I_note>(output))

    return event.sender.send(`RESPONSE_UPDATE_DATA_${receiverID}`, formData)

  } catch(error) {
    throw new Error(`error updating DB string row: ${filePath}, ${error}`)
  }
})

}