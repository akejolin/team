import { ipcMain, IpcMainEvent } from 'electron'
import getExt from '../utils/file.get-ext'

import findLatestId from '../utils/findLatestId'
import shell from 'shelljs'
import fs from 'fs'
import { BaseModel } from '../events/models'
import {sortArray} from '../utils/sortArray'
import getItems from '../utils/json-db/get-items-db'
import writeDB from '../utils/json-db/write-db'

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

interface EventOptions {
  dataSource: string,
  receiverID: string,
  formData: Imodel,
  action?: 'CREATE' | 'UPDATE' | 'DELETE' | undefined
}

ipcMain.on(`${endPointId}`, async (event: IpcMainEvent, {
  dataSource,
  receiverID,
  formData,
  action
}:EventOptions) => {
  
  
  if (!fs.existsSync(dataStoragePath)) {
    await shell.mkdir('-p', dataStoragePath)
  }
  
  const ext = getExt(dataSource)
  const empKey = empKeys.find(key => dataSource.indexOf(key) > -1) 
  let transformedDataSource = empKey ? dataSource.replace(empKey, whitelistedFiles[empKey]) : dataSource 
  const filePath = `${dataStoragePath}${transformedDataSource.toLowerCase().replace(/_/g, '-')}${ext !== 'none' ? ext : '.json'}`
   
  let rows:Imodel[]

  try {
    rows = await getItems<Imodel>(`${filePath}`)
  } catch(error) {
    throw new Error(`error reading db file: ${filePath}, ${error}`)
  }


  if (action !== 'DELETE') {
    if (Number(formData.id) < 0 || typeof formData.id === 'undefined') {
      action = 'CREATE'
    } else {
      action = 'UPDATE'
    }
  }

  try {
      if (action === 'CREATE') {
      const nextId = findLatestId(rows.map(item => Number(item.id))) + 1
      formData.id = nextId
      const output = fillDataRowObject(formData)
      rows.push(output)
      await writeDB<Imodel[]>(`${filePath}`, rows)
      return event.sender.send(`RESPONSE_UPDATE_DATA_${receiverID}`, output)
    }
  } catch(error) {
    throw new Error(`error creating new DB string row: ${filePath}, ${error}`)
  }
  
  

  try {
    if (action === 'UPDATE') {

      console.log('IT SHOULD BE AN UPDATE')

      rows = rows.map(item => {
        if (Number(item.id) === Number(formData.id)) {
          return fillDataRowObject(formData, item)
        } else {
          return item
        }
      })


      // Sort after date
      rows = sortArray<Imodel>(rows, 'date', 'desc')

      await writeDB<Imodel[]>(`${filePath}`, rows)
      return event.sender.send(`RESPONSE_UPDATE_DATA_${receiverID}`, formData)
    }
    if (action === 'DELETE') {
      rows = rows.filter(item => item.id !== formData.id)
      await writeDB<Imodel[]>(`${filePath}`, rows)
      return event.sender.send(`RESPONSE_UPDATE_DATA_${receiverID}`, {status: `Id: ${formData.id} was deleted.`})
    }

  } catch(error) {
    throw new Error(`error updating DB string row: ${filePath}, ${error}`)
  }
})

}