import { ipcMain, IpcMainEvent } from 'electron'
import getExt from '../utils/file.get-ext'
import readFileRowsInArray from '../utils/file.read.array'
import writeToFile from '../utils/file.write.promise'
import appendToFile from '../utils/file.append'
import findLatestId from '../utils/findLatestId'
import { convertArrayToDatabaseRow } from '../utils/convertArrayToDatabaseRow'
import { stringToArray } from '../utils/stringToArray'
import shell from 'shelljs'
import fs from 'fs'
import { BaseModel } from '../events/models'
import {sortArray} from '../utils/sortArray'
import {dataStoragePath} from '../config/config'
//import { exec } from 'child_process'

export interface IdataObject {
  [key: string]: string
}

export type FormAction = 'CREATE' | 'UPDATE' | 'DELETE'


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

  const fillDataRowObject = (next:Imodel, prev?:Imodel, ):Imodel => {
    let output:any = {}

    Object.keys(model).forEach((key) => {
      if (key === 'year' && typeof model['date' as keyof Imodel] === 'string') {
        const dd:string|undefined = next['date' as keyof Imodel] ? next['date' as keyof Imodel].toString() : undefined
        output[key] = dd ? new Date(dd).getFullYear() : prev ? prev[key as keyof Imodel] : model[key as keyof Imodel]
      } else {
        output[key] = next[key as keyof Imodel] ? next[key as keyof Imodel] : prev ? prev[key as keyof Imodel] : model[key as keyof Imodel]
      }
      
    });
    return output as Imodel
  }



const empKeys = ['emp0', 'emp1', 'emp2', 'emp3', 'emp4', 'emp5', 'emp6', 'emp7', 'emp8', 'emp9' , 'emp10', 'emp11', 'emp12', 'emp13', 'emp14', 'emp15', 'emp16', 'emp17', 'emp18', 'emp19']
let whitelistedFiles:IdataObject = {}

ipcMain.on('REQUEST_UPDATE_DATA', async (event: IpcMainEvent, dataSource:string, receiverID, formData:Imodel, action: FormAction) => {
  
  
  if (!fs.existsSync(dataStoragePath)) {
    await shell.mkdir('-p', dataStoragePath)
  }
  
  const ext = getExt(dataSource)
  const empKey = empKeys.find(key => dataSource.indexOf(key) > -1) 
  let transformedDataSource = empKey ? dataSource.replace(empKey, whitelistedFiles[empKey]) : dataSource 
  const filePath = `${dataStoragePath}${transformedDataSource.toLowerCase().replace(/_/g, '-')}${ext !== 'none' ? ext : '.txt'}`
   
  let rows:Array<string> = []
  let result:Array<Array<string|number>> = []


  // Wash formData
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

  if (action !== 'DELETE' && Number(formData.id) < 0 || typeof formData.id === 'undefined') {
    action = 'CREATE'
  }


  try {
    // No id means new data
    //if (Number(formData.id) < 0 || typeof formData.id === 'undefined') {
      if (action === 'CREATE') {
      const nextId = findLatestId(result.map(item => Number(item[0]))) + 1
      formData.id = nextId
      const output = fillDataRowObject(formData)
      const target = []
      target.push(output)

      await appendToFile(`${filePath}`, convertArrayToDatabaseRow<Imodel>(target))

      return event.sender.send(`RESPONSE_UPDATE_DATA_${receiverID}`, output)
    }
  } catch(error) {
    throw new Error(`error creating new DB string row: ${filePath}, ${error}`)
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

    if (action === 'UPDATE') {
      output = output.map(item => {
        if (Number(item.id) === Number(formData.id)) {
          return fillDataRowObject(formData, item)
        } else {
          return item
        }
      })


      // Sort after date
      output = sortArray<Imodel>(output, 'date', 'desc')


      // Wash & transform whitespaces
      output = output.map((row:Imodel) => {
        const obj:any = {}
        Object.keys(model).forEach((field:string) => {
          if (typeof model[field as keyof Imodel] === 'string') {
            obj[field] = row[field as keyof Imodel].toString().replace(/\n/g, ' ¿')
          } else  {
            obj[field] = row[field as keyof Imodel]
          }
        })
        return obj as Imodel
      })


      await writeToFile(`${filePath}`, convertArrayToDatabaseRow<Imodel>(output))
      return event.sender.send(`RESPONSE_UPDATE_DATA_${receiverID}`, formData)
    }
    if (action === 'DELETE') {
      output = output.filter(item => item.id !== formData.id)
      await writeToFile(`${filePath}`, convertArrayToDatabaseRow<Imodel>(output))
      return event.sender.send(`RESPONSE_UPDATE_DATA_${receiverID}`, {status: `Id: ${formData.id} was deleted.`})
    }

  } catch(error) {
    throw new Error(`error updating DB string row: ${filePath}, ${error}`)
  }
})

}