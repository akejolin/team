import { ipcMain, IpcMainEvent } from 'electron'
import getExt from '../utils/file.get-ext'
import readFileRowsInArray from '../utils/file.read.array'

import { stringToArray } from '../utils/stringToArray'

import { BaseModel } from '../events/models'
import {dataStoragePath} from '../config/config'

//import { exec } from 'child_process'

export interface IdataObject {
  [key: string]: string
}

export type FormAction = 'READ'


export default <T>({endPointId, roleModel}:{
  endPointId: String
  roleModel: T
}) => {

  type Imodel = BaseModel<T>  
  
  const model:Imodel = {
    ...{id: -1},
    ...roleModel,
  }

  console.log(endPointId)
  

const empKeys = ['emp0', 'emp1', 'emp2', 'emp3', 'emp4', 'emp5', 'emp6', 'emp7', 'emp8', 'emp9' , 'emp10', 'emp11', 'emp12', 'emp13', 'emp14', 'emp15', 'emp16', 'emp17', 'emp18', 'emp19']
let whitelistedFiles:IdataObject = {}

ipcMain.on('REQUEST_GET_DATA', async (event: IpcMainEvent, dataSource:string, receiverID, formData:Imodel) => {
  
  const ext = getExt(dataSource)
  const empKey = empKeys.find(key => dataSource.indexOf(key) > -1) 
  let transformedDataSource = empKey ? dataSource.replace(empKey, whitelistedFiles[empKey]) : dataSource 
  const filePath = `${dataStoragePath}${transformedDataSource.toLowerCase().replace(/_/g, '-')}${ext !== 'none' ? ext : '.txt'}`
   
  let rows:Array<string> = []
  let result:Array<Array<string|number>> = []

  for (const key in formData) {
    if (typeof formData[key as keyof Imodel] === 'string') {
      // @ts-ignore
      formData[key as keyof Imodel] = formData[key as keyof Imodel].toString().replace(/\n/g, '¿') 
    }
  }

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
    let output:Imodel[] = result.map(item => {
      const convertArray = (value:string) => {
        const str = value ? value.toString() : ''
        return stringToArray(str, ',', (array:string[]) => {
          array.map((item:string) => item.replace(/ /g,''))
          array = array.filter(ii => ii.length > 0)
          return array
        })
      } 

      const obj:any = {}
      Object.keys(model).forEach((key:string, i:number) => {
        if (Array.isArray(model[key as keyof Imodel])) {
          obj[key] = convertArray(item[i] as string)
        } else if (typeof model[key as keyof Imodel] === 'string') {
          obj[key] = item[i].toString().replace(/¿/g, ' \n')
        } else  {
          obj[key] = item[i]
        }
      })
    
      return obj as Imodel

    })
    output = output.filter(item => Number(item.id) === Number(formData.id))
    return event.sender.send(`RESPONSE_GET_DATA_${receiverID}`, output)
    
  } catch(error) {
    throw new Error(`error updating DB string row: ${filePath}, ${error}`)
  }
})

}