export const yyyymmdd = (date:Date) => {
  const mm = date.getMonth() + 1
  const dd = date.getDate()

return [
    date.getFullYear(),
    (mm>9 ? '' : '0') + mm,
    (dd>9 ? '' : '0') + dd
  ].join('-');
}


export default yyyymmdd