import { translate } from '../../dataTypes/costs'
import type { needleIndexType, dataInFileKey } from '../../dataTypes/costs'
export const selectYearData = (stack:Array<Array<Number>>, year:Number) => stack.filter(item => Number(item[0]) === Number(year))

export const pickData = (stack:Array<number>, needle:needleIndexType = 'y',):number => {
  if (!stack) return 0;
  if (stack.length < 4) return 0;
  return stack[translate[needle]]
}

export const filterAllMonthBeforeAndUntil = (stack:Array<Array<number>>, year:number, month:number):Array<Array<number>> | [] => {
  return stack.filter(item => Number(item[translate['y']]) === Number(year) && Number(item[translate['m']]) <= Number(month))
}

export const filterData = (stack:Array<Array<number>>, target:needleIndexType = 'y', needle:number):Array<Array<number>> => {
  return stack.filter(item => Number(item[translate[target]]) === Number(needle))
}
export const multiFilterData = (stack:Array<Array<number>>, target:needleIndexType = 'y', needle:number, target2:needleIndexType = 'y', needle2:number):Array<number> | Array<Array<number>> => {
  return stack.filter(item => Number(item[translate[target]]) === Number(needle) && Number(item[translate[target2]]) === Number(needle2))
}
export const multiFilterAndSelectOne = (stack:Array<Array<number>>, target:needleIndexType = 'y', needle:number, target2:needleIndexType = 'y', needle2:number):Array<number> => {
  return stack.find(item => Number(item[translate[target]]) === Number(needle) && Number(item[translate[target2]]) === Number(needle2))
}

export const PromiseYearData = (stack:Array<Array<Number>>, year:Number) => new Promise<any>((resolve, reject) => {

  const selected = stack.filter(item => Number(item[0]) === Number(year))
  resolve(selected)
})   
export const pickAndSumData = (stack:Array<Array<Number>>, needle:needleIndexType = 'c'):number => {
  if (!stack) return 0;
  if (stack.length < 1) {return 0}
  const data = stack.map(item => Number(item[translate[needle]]))
  const sum = data.reduce(add, 0)
  function add(accumulator, a) {
    return Number(accumulator + a);
  }
  return sum
}

export const sumArray = (arr) => {
  if (!Array.isArray(arr)) {return 0}
  if (arr.length < 1) {return 0}
  
  const data = arr.map(item => item)
  const sum = data.reduce(add, 0)
  function add(accumulator, a) {
    return accumulator + a;
  }
  return sum
}