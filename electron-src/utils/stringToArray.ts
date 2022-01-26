export const stringToArray = (str:string, devider=',', transform:Function = (item:string) => item) => {
  let array = str.split(devider).filter((ii:string) => ii !== '')
  return transform(array)
}