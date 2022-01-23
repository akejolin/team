import {pickData, filterAllMonthBeforeAndUntil, multiFilterAndSelectOne, pickAndSumData, sumArray} from '../../components/utils/dataHelper'
import { getMonth, getCurrentYear } from '../../utils/dateHelpers'
import type { needleIndexType } from '../../dataTypes/costs'

const targetMonth = getMonth()
const findDiff = (value1:number, value2:number) => value1 - value2
const calTot = (value1:number, value2:number) => value1 + value2
const round = (num) => Math.round(num * 10) / 10


export const MonthlyDiffFromLastYear = (stack, year) => {
  const nowValue = pickData(multiFilterAndSelectOne(stack, 'y', year, 'm', targetMonth), 'c')
  const prevValue = pickData(multiFilterAndSelectOne(stack, 'y', year-1, 'm', targetMonth), 'c')

  const diff = findDiff(nowValue, prevValue)

  const res = round(diff / prevValue * 100)
  const procent = `${res}%`

  const increase:boolean = res > 0 ? true : false 

  return {
    diff,
    procent,
    increase,
    nowValue,
    prevValue,
  }
}


export interface TcalcReturnObj {
  diff:number,
  result:number,
  procent:string,
  increase:boolean,
  nowValue:number,
  prevValue:number,
}

export const totalDiffInProgressFromLastYear = (stack, year, _month = targetMonth, target:needleIndexType = 'c'):TcalcReturnObj => {

  // Todo: Fix so limit is from last month.   
  let month = _month // _month - 1 < 1 ? 1 : _month - 1 
  let fromPrevMonth = _month - 1 < 1 ? 1 : _month - 1

  if (year < getCurrentYear) {
    month = 12
    fromPrevMonth = 12
  }

  const currentYearAndMonthSum = pickData(multiFilterAndSelectOne(stack, 'y', year, 'm', month), 'c')

  const nowArray = filterAllMonthBeforeAndUntil(stack, year, month)
  const nowValue = pickAndSumData(nowArray, target)
  
  const prevArray = filterAllMonthBeforeAndUntil(stack, year-1, currentYearAndMonthSum > 0 ? month : fromPrevMonth)
  const prevValue = pickAndSumData(prevArray, target)
  

  const diff = findDiff(nowValue, prevValue)

  const inProcent = (part, sumYearA, sumYearB) => sumYearB !== 0 ? round((Number(part) / Number(sumYearB)) * 100) : sumYearA === 0 ? 0 : 100 
  const result = inProcent(diff, nowValue, prevValue)

  const increase:boolean = result > 0 ? true : false
  const procent = `${result}%`
  
  return {
    diff,
    result,
    procent,
    increase,
    nowValue,
    prevValue,
  }
}

