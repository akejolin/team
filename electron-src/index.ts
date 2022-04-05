// Native
import { join } from 'path'
import { format } from 'url'

// Packages
import { shell, BrowserWindow, app, ipcMain, IpcMainEvent } from 'electron'
import isDev from 'electron-is-dev'
import prepareNext from 'electron-next'

import installExtension, { REDUX_DEVTOOLS } from 'electron-devtools-installer';

import {dataStoragePath} from './config/config'

import readFileRowsInArray from './utils/file.read.array'
//import readFileRowsIntoObject from './utils/file.read.object'
import {readFile} from './utils/file.read'
import {writeFile} from './utils/file.write'
import {listFilesInDir} from './utils/listFilesInDir'
import getExt from './utils/file.get-ext'


import contextMenu from 'electron-context-menu'

import startQueryData from './events/queryJson'
import startUpdateArrayData from './events/updateArrayJson'
import { NoteModel, AbsentModel } from './events/models'
//import { allowedNodeEnvironmentFlags } from 'process'

let mainWindow:BrowserWindow

// Prepare the renderer once the app is ready
app.on('ready', async () => {
  installExtension(REDUX_DEVTOOLS)
  .then(() => null)
  .catch((err) => console.log('Redux extension installation error: ', err));

  // Render Next app
  await prepareNext('./renderer')

  contextMenu()


  // Create app window
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      preload: join(__dirname, 'preload.js'),
      webSecurity: false,
    },
  })

  mainWindow.webContents.send('BACKEND_DATA', {isDev});

  // Open devtools
  if (isDev) {
    //mainWindow.webContents.openDevTools()
  }

  const url = isDev
    ? 'http://localhost:8000/'
    : format({
        pathname: join(__dirname, '../renderer/out/index.html'),
        protocol: 'file:',
        slashes: true,
      })

  mainWindow.loadURL(url)
})

// Quit the app once all windows are closed
app.on('window-all-closed', app.quit)

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on('message', (event: IpcMainEvent) => {
 
  setTimeout(() => event.sender.send('message', 'hi from electron'), 500)
})


// Toggle devtools
let isDevtoolsOpen = false
ipcMain.on('TOOGLE_DEV_TOOLS', () => {
  if (isDev) {
    !isDevtoolsOpen ? mainWindow.webContents.openDevTools() : mainWindow.webContents.closeDevTools()
    isDevtoolsOpen = isDevtoolsOpen ? false : true
  }
})

export interface IdataObject {
  [key: string]: string
}

// Global scope variables
global.dataSourcePath = dataStoragePath
let whitelistedFiles:IdataObject = {}
let empKeys = ['emp0', 'emp1', 'emp2', 'emp3', 'emp4', 'emp5', 'emp6', 'emp7', 'emp8', 'emp9' , 'emp10', 'emp11', 'emp12', 'emp13', 'emp14', 'emp15', 'emp16', 'emp17', 'emp18', 'emp19']



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


app.on('ready', async () => {
  
  const translateData = async (dataSource:string) => {

    const filePath =  dataSource// `${dataSource.toLowerCase().replace(/_/g, '-')}${ext === 'none' ? ext : ''}`
    try {
      let rows:Array<string> = await readFileRowsInArray(`${filePath}`)
      rows = rows.filter(r => r.length > 0)
      
      const out:IdataObject = {}
      rows.forEach((item,i) => {
        out[`emp${i}`] = item 
      })
      return Promise.resolve(out)

    } catch(error) {
      throw new Error(`Error, load and create translateData : ${filePath}, ${error}`)
    }
  }

  whitelistedFiles = await translateData(`${dataStoragePath}system-data-translate.txt`)
  global.dataKeys = whitelistedFiles

  const tags = await (await requestArrayData(`${dataStoragePath}system-tags.txt`)).map(item => ({category: item[0], tag: item[1]}))
  global.tags = tags
  
})

ipcMain.on('REQUEST_EMP', async (event: IpcMainEvent, emp:string) => {

  const empKey = empKeys.find(key => emp.indexOf(key) > -1) 
  let transformedDataSource = empKey ? emp.replace(empKey, whitelistedFiles[empKey]) : emp 
  const filePath = `${dataStoragePath}${transformedDataSource.toLowerCase().replace(/_/g, '-')}${'.txt'}`
 
  try {
    let rows:Array<string> = await readFileRowsInArray(`${filePath}`)
    rows = rows.filter(r => r.length > 0)
    let result = rows.map((row:String) => {
      let _arr = row.split(':').filter(r => r !== '')
      let arr = _arr.filter(r => r.length > 0)
      return {[arr[0]]: arr[1] ? arr[1].replace(' ', '') : ''}
    })

    const out:IdataObject = {}
    result.forEach((item) => {
      for (const [key, value] of Object.entries(item)) {
        out[key] = value
      }
    })

    event.sender.send(`EMP_RESPONSE`, out)

  } catch(error) {
    throw new Error(`error reading db file: ${filePath}, ${error}`)
  }
})

ipcMain.on('REQUEST_DATA', async (event: IpcMainEvent, dataSource:string) => {
  const ext = getExt(dataSource)
  const empKey = empKeys.find(key => dataSource.indexOf(key) > -1) 
  let transformedDataSource = empKey ? dataSource.replace(empKey, whitelistedFiles[empKey]) : dataSource 
  const filePath = `${dataStoragePath}${transformedDataSource.toLowerCase().replace(/_/g, '-')}${ext !== 'none' ? ext : '.txt'}`
 
  try {
    let rows:Array<string> = await readFileRowsInArray(`${filePath}`)
    let result:Array<Array<number | string>> = rows.map((row:String) => {
    let _arr = row.split(';').filter(r => r !== '')
    let arr = _arr.map(str => Number(str) ? Number(str) : str)
      return arr
    }).filter(r => r.length > 0)
    event.sender.send(`DATA_RESPONSE_${dataSource}`, result)

  } catch(error) {
    throw new Error(`error reading db file: ${filePath}, ${error}`)
  }
})

/*
interface I_note {
  year: Number,
  date: string,
  emp: string,
  impact: number,
  tags: string[],
  comment: string,
}




ipcMain.on('REQUEST_FILTERED_DATA', async (event: IpcMainEvent, dataSource:string, needles:string[]) => {
  const ext = getExt(dataSource)
  const empKey = empKeys.find(key => dataSource.indexOf(key) > -1) 
  let transformedDataSource = empKey ? dataSource.replace(empKey, whitelistedFiles[empKey]) : dataSource 
  const filePath = `${dataStoragePath}${transformedDataSource.toLowerCase().replace(/_/g, '-')}${ext !== 'none' ? ext : '.txt'}`
 
  try {
    let rows:Array<string> = await readFileRowsInArray(`${filePath}`)
    let result:Array<Array<number | string>> = rows.map((row:String) => {
    let _arr = row.split(';').filter(r => r !== '')
    let arr = _arr.map(str => Number(str) ? Number(str) : str)
      return arr
    }).filter(r => r.length > 0)
    event.sender.send(`FILTERED_DATA_${dataSource}`, result)

  } catch(error) {
    throw new Error(`error reading db file: ${filePath}, ${error}`)
  }
})
*/





ipcMain.on('REQUEST_SYSTEM', async (event: IpcMainEvent, action:string) => {

  if (action === 'SOURCE_FILES') {
    try {
      const result:string[] = await listFilesInDir(`${dataStoragePath}`)
      event.sender.send(`REQUEST_SYSTEM_RESPONSE_${action}`, result)
    } catch(error) {
      throw new Error (`${error}`)
    }
  }
  if (action === 'SOURCE_DIR') {
    try {
      event.sender.send(`REQUEST_SYSTEM_RESPONSE_${action}`, dataStoragePath)
    } catch(error) {
      throw new Error (`${error}`)
    }
  }
})

ipcMain.on('REQUEST_SYSTEM_TRANSLATED_DATAKEYS', async (event: IpcMainEvent, action:string) => {

  if (action === 'SOURCE_FILES') {
    try {
      event.sender.send(`REQUEST_SYSTEM_TRANSLATED_DATAKEYS${action}`, whitelistedFiles)
    } catch(error) {
      throw new Error (`${error}`)
    }
  }
  if (action === 'SOURCE_DIR') {
    try {
      event.sender.send(`REQUEST_SYSTEM_RESPONSE_${action}`, dataStoragePath)
    } catch(error) {
      throw new Error (`${error}`)
    }
  }
})

ipcMain.on('REQUEST_FILE_DATA', async (event: IpcMainEvent, file:string) => {
  try {
    const result:string = await readFile(`${dataStoragePath}${file}`)
    event.sender.send(`REQUEST_FILE_DATA_RESPONSE`, result)
  } catch(error) {
    throw new Error (`${error}`)
  }
})
ipcMain.on('SAVE_FILE_DATA', async (event: IpcMainEvent, file:string, data:string) => {
  try {
    await writeFile(`${dataStoragePath}${file}`, data)
    event.sender.send(`SAVE_FILE_DATA_RESPONSE`, data)
  } catch(error) {
    event.sender.send(`SAVE_FILE_DATA_ERROR`, error)
    throw new Error (`${error}`)
  }
})

ipcMain.on('OPEN_FILE_IN_OS', async (event: IpcMainEvent, filepath:string) => {
  try {
    console.log('OPEN_FILE_IN_OS. Forwarding and open: ', filepath)
    shell.openExternal(filepath)
    //shell.openPath(path.join(`${dataStoragePath}`, `${file}`));
  } catch(error) {
    event.sender.send(`BACKEND_ERROR`, error)
    throw new Error (`${error}`)
  }
})



startQueryData<NoteModel>({})

startUpdateArrayData<NoteModel>({
  endPointId: 'REQUEST_UPDATE_DATA',
  roleModel: {
    year: 1970,
    date: '1970-01-01',
    emp: '',
    impact: 3,
    tags: [],
    comment: '',
  },
})

startUpdateArrayData<AbsentModel>({
  endPointId: 'REQUEST_UPDATE_ABSENT',
  roleModel: {
    name: '',
    date: '1970-01-01',
    type: 'HOLIDAY'
  },
  
})