import { ipcMain, IpcMainEvent } from 'electron'
import getExt from '../utils/file.get-ext'
import readFileRowsInArray from '../utils/file.read.array'
import { stringToArray } from '../utils/stringToArray'
import { BaseModel } from '../events/models'
import {dataStoragePath} from '../config/config'

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

  const empKeys = ['emp0', 'emp1', 'emp2', 'emp3', 'emp4', 'emp5', 'emp6', 'emp7', 'emp8', 'emp9' , 'emp10', 'emp11', 'emp12', 'emp13', 'emp14', 'emp15', 'emp16', 'emp17', 'emp18', 'emp19']
  let whitelistedFiles:IdataObject = {}

  const filter = (stack:Imodel[], needles:string[], cb:Function) => {
    needles.forEach(needle => {
      // @ts-ignore
      stack = stack.filter(stackItem => stackItem.tags ? stackItem.tags.includes(needle) : false)
    })
    cb(stack)
  }


  ipcMain.on('REQUEST_QUERY_DATA', async (event: IpcMainEvent, dataSource:string, needles:string[]) => {
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

      const output:Imodel[] = result.map(item => {

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
      
      let filteredResult: Imodel[] = []
      filter(output, needles, (d:Imodel[]) => {
        filteredResult = d
      })
      event.sender.send(`RESPONSE_QUERY_DATA_${dataSource}`, filteredResult)
  
    } catch(error) {
      throw new Error(`error reading db file: ${filePath}, ${error}`)
    }
  })

}