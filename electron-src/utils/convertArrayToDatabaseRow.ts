export const convertArrayToDatabaseRow = <T>(input:T[]):string => {
  let output = ''
  input.forEach((row:T) => {
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
export default convertArrayToDatabaseRow