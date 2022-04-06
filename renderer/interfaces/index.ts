// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Shell, IpcRenderer } from 'electron'

export interface IdataKeys {
  [key: string]: string
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      ipcRenderer: IpcRenderer
      isDev: boolean
      shell: Shell
      dataKeys: IdataKeys
      dataSourcePath: string
      tags: {category: string, tag: string}[]
    }
  }
  
}
