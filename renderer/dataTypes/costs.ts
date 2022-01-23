export const translate = {y: 0, m: 1, c: 2, u: 3}

export enum dataInFileKey {
  y = 0,
  m = 1,
  c = 2,
  u = 3,
}

export type needleIndexType = 'y' | 'm' | 'c' | 'u' // YEAR, MONTH, COST, USAGE
export type T_month = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export type T_CostsDataSet = [
  number,
  T_month,
  number,
  number,
]

export interface I_dataSets {
  gas: T_CostsDataSet[],
  elst: T_CostsDataSet[],
  eldy: T_CostsDataSet[],
  waste: T_CostsDataSet[],
  water: T_CostsDataSet[],
  broadband: T_CostsDataSet[],
  security: T_CostsDataSet[],
  maintenance: T_CostsDataSet[],
  cleaning: T_CostsDataSet[],
  loan: T_CostsDataSet[],
  insurance: T_CostsDataSet[],
  gardenWaste: T_CostsDataSet[],
  firewood: T_CostsDataSet[],
}

export enum dataKeys {
  gas,
  elst,
  eldy,
  waste,
  water,
  broadband,
  security,
  maintenance,
  cleaning,
  loan,
  insurance,
  gardenWaste,
  firewood,
}


export type T_dataKey = 'gas' |'elst' | 'eldy' | 'waste' | 'water' | 'broadband' | 'security' | 'maintenance' | 'cleaning' | 'loan' | 'insurance' | 'gardenWaste' | 'firewood'
export const keyTranslator = {
  gas: 'Gas',
  elst: 'Static Electricity',
  eldy: 'Variable Electricity',
  waste: 'House Waste',
  water: 'Water & Drain',
  broadband: 'Wifi',
  security: 'Security',
  maintenance: 'Maintenance',
  cleaning: 'Cleaning',
  loan: 'Loan',
  insurance: 'Insurance',
  gardenWaste: 'Garden Waste',
  firewood: 'Fire Wood',
}

export const dataUsageUnit = {
  gas: 'kWh',
  elst: 'kWh',
  eldy: 'kWh',
  waste: 'kg',
  water: 'm3',
  broadband: 'st',
  security: 'st',
  maintenance: 'st',
  cleaning: 'st',
  loan: 'st',
  insurance: 'st',
  gardenWaste: 'kg',
  firewood: 'st',
  default: 'kr'
}

export const dataCostUnit = 'kr'

export const dataColor = {
  gas: '#8884d8',
  elst: '#50dacc',
  eldy: '#c350c6',
  waste: '#FF8042',
  water: '#e8d33b',
  broadband: '#e87c3b', // todo: change
  security: '#de5605',
  maintenance: '#de05be',
  cleaning: '#8d3dec',
  loan: '#3d9dec',
  insurance: '#3dec67',
  gardenWaste: '#da0f0f',
  firewood: '#ea1f0f',
}
