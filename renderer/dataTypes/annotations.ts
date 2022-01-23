export enum dataInFileKey {
  ye = 0,
  mo = 1,
  da = 2,
  ti = 3,
  bo = 4,
  ta = 5,
}

export type T_month = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
export type T_days = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31
export type T_annotationRawData = [
  number,
  T_month,
  T_days,
  string,
  string,
  string,
]

export type T_annotationDataSet = {
  y: number,
  m: T_month,
  d: T_days,
  title: string,
  body: string,
  tags: Array<string>,
}

export interface I_dataSets {
  annotations: T_annotationDataSet[],
}

export enum dataKeys {
  annotations,
}

export type T_dataKey = 'annotations'
export const keyTranslator = {
  annotations: 'Annotations',
}
