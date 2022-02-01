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
  // Replace all potential linebreaks
  //output = output.replace(/\n/g, '¿')
  return output
}
export default convertArrayToDatabaseRow