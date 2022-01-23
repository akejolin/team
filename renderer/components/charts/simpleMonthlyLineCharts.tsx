

import React, {PureComponent} from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { translate, T_CostsDataSet } from '../../dataTypes/costs'
import type { needleIndexType } from '../../dataTypes/costs'

export interface Icolors {
  stackA: string,
  stackB: string,
}

export type I_dataset = [
  number,number,number,number,number,number,number,number,number,number,number,number
]

type Props = {
  stackA: I_dataset
  stackB?: I_dataset
  names?: any // {a: string, b: string} | {a: string }
  props?: string,
  unit?: string,
  metric: needleIndexType,
  colors?: Icolors,
  loop?:Array<Number>
  syncId?:string,
}



export const Charts = (props: Props) => {

  const months = {
    '1':'Jan','2':'Feb','3':'Mar','4':'Apr','5':'May','6':'Jun','7':'Jul','8':'Aug','9':'Sep','10':'Oct','11':'Nov','12':'Dec' 
  }

  const loop = props.loop ? props.loop : [1,2,3,4,5,6,7,8,9,10,11,12]


  const data = loop.map((month,i) => {
    const output = {
        name: months[month.toString()],
    }
    output['y1'] = props.stackA[i]
    if (props.stackB.length > 0) {
      output['y2'] = props.stackB[i]
    }
    return output
  })

  
  return (
  <ResponsiveContainer>
    <LineChart data={data} syncId={props.syncId}>
      <CartesianGrid horizontal={true} strokeDasharray="2 2 2" stroke="rgba(15,58,91,0.6)" />
      <XAxis
        dataKey="name"
        axisLine={false}
        stroke="#12456b"
        fontSize={11}
      >
      </XAxis>
      <YAxis
        stroke="#12456b"
        axisLine={false}
        unit={props.unit}
        name={props.unit}
        fontSize={11}
      />
      <Tooltip />
      <Line type="monotone" dataKey="y1" name={`${props.names.a}`} stroke={props.colors.stackA} strokeWidth={3}/>
      { props.stackB.length > 0 && typeof props.names.b !== 'undefined' &&  (
        <Line type="monotone" dataKey="y2" name={`${props.names.b}`} stroke={props.colors.stackB} />
      )}
      <Legend verticalAlign="top" height={36}/>
    </LineChart>
  </ResponsiveContainer>
)}

Charts.defaultProps = {
  names: {a: 'Value A', b: 'Value B'},
  colors: {
    stackA: '#8884d8',
    stackB: '#50dacc',
  },
  stackB : [],
  unit: 'kr'
}

export default Charts


