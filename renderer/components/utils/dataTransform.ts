import {selectYearData } from './dataHelper'

export interface IdataSet {
  [key: string]: any
}

export const gatherData = (_dataSet:IdataSet, calcPicker, YYYY, m) => {
    const out = []
    for (const [dataSetKey, dataSetValue] of Object.entries(_dataSet)) {
      
      let _targetDataset = selectYearData(dataSetValue, YYYY);
      const targetDataset = _targetDataset.find(item => item[1] === m)
      if (targetDataset) {
        if (calcPicker.find(i => i === `${dataSetKey}`) || calcPicker.length < 1) {
          out.push({dataSetKey,data: targetDataset})
        }
      }
    }
    return out
  }