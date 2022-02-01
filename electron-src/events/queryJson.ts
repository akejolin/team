import { ipcMain, IpcMainEvent } from 'electron'
import getExt from '../utils/file.get-ext'
import { BaseModel } from '../events/models'
import getItems from '../utils/json-db/get-items-db'
import {dataStoragePath} from '../config/config'
import {sortArray} from '../utils/sortArray'

export interface IdataObject {
  [key: string]: string
}

export default <T>({}:{
  endPointId?: String
  roleModel?: T
}) => {

  type Imodel = BaseModel<T>  

  const empKeys = ['emp0', 'emp1', 'emp2', 'emp3', 'emp4', 'emp5', 'emp6', 'emp7', 'emp8', 'emp9' , 'emp10', 'emp11', 'emp12', 'emp13', 'emp14', 'emp15', 'emp16', 'emp17', 'emp18', 'emp19']
  let whitelistedFiles:IdataObject = {}

  interface EventOptions {
    dataSource: string,
    receiverID: string,
    sortKey?: string,
    needles?: Array<string>
  }
  ipcMain.on('REQUEST_QUERY_DATA', async (event: IpcMainEvent, {
    dataSource,
    receiverID,
    sortKey='*',
    needles=[]
  }: EventOptions) => {
    
    const ext = getExt(dataSource)
    const empKey = empKeys.find(key => dataSource.indexOf(key) > -1) 
    let transformedDataSource = empKey ? dataSource.replace(empKey, whitelistedFiles[empKey]) : dataSource 
    const filePath = `${dataStoragePath}${transformedDataSource.toLowerCase().replace(/_/g, '-')}${ext !== 'none' ? ext : '.json'}`
  
    try {
      let rows:Imodel[] = await getItems<Imodel>(`${filePath}`, sortKey, needles)

      // Sort after date
      rows = sortArray<Imodel>(rows, 'date', 'desc')

      event.sender.send(`RESPONSE_QUERY_DATA_${receiverID}`, rows)
  
    } catch(error) {
      throw new Error(`error reading db file: ${filePath}, ${error}`)
    }
  })

}