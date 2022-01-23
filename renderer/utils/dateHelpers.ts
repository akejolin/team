const _getCurrentYear = new Date().getFullYear()
export const getCurrentYear = Number(_getCurrentYear)

const now = new Date()
export const getCurrentMonth = now.getMonth()


export const getMonth = (date = new Date()) => Number(date.getMonth() + 1)



export const monthStringFormatter = {'1':'01','2':'02','3':'03','4':'04','5':'05','6':'06','7':'07','8':'08','9':'09','10':'10','11':'11','12':'12'}
export const dayStringFormatter = {'1':'01','2':'02','3':'03','4':'04','5':'05','6':'06','7':'07','8':'08','9':'09','10':'10','11':'11','12':'12','13':'13','14':'14','15':'15','16':'16','17':'17','18':'18','19':'19','20':'20','21':'21','22':'22','23':'23','24':'24','25':'25','26':'26','27':'27','28':'28','29':'29','30':'30','31':'31'}
