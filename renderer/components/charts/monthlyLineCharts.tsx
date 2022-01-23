

import React, {useState} from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { translate, T_CostsDataSet } from '../../dataTypes/costs'
import type { needleIndexType } from '../../dataTypes/costs'

export enum metrics {
  costs = 2,
  usage = 3,
}
export interface Icolors {
  stackA: string,
  stackB: string,
  stackC: string,
}

type Props = {
  stackA: T_CostsDataSet[]
  stackB?: T_CostsDataSet[]
  stackC?: T_CostsDataSet[]
  names?: any
  props?: string,
  unit?: string,
  metric: needleIndexType,
  colors?: Icolors,
  loop?:Array<Number>
  syncId?:string,
}



export const Charts = (props: Props) => {

  const [opacity, _opacity] = useState({y1: 1, y2: 1, y3:1})

  const months = {
    '1':'Jan','2':'Feb','3':'Mar','4':'Apr','5':'May','6':'Jun','7':'Jul','8':'Aug','9':'Sep','10':'Oct','11':'Nov','12':'Dec' 
  }

  
  const loop = props.loop ? props.loop : [1,2,3,4,5,6,7,8,9,10,11,12]

  const data = loop.map((month,i) => {
    const key = i + 1

    const monthA = props.stackA.find(year => Number(year[translate['m']]) === Number(month)) || [0,0,0,0]
    const monthB = props.stackB.find(year => Number(year[translate['m']]) === Number(month)) || [0,0,0,0]
    const monthC = props.stackC.find(year => Number(year[translate['m']]) === Number(month)) || [0,0,0,0]

    const output = {
        name: months[month.toString()],
    }


    output['y1'] = monthA[translate[props.metric]]
    if (props.stackB.length > 0) output['y2'] = Number(monthB[translate[props.metric]]);
    if (props.stackC.length > 0) output['y3'] = Number(monthC[translate[props.metric]]);

    return output
  })


  const onClick = (o) => {
    let { dataKey } = o;
  
    let y1:number = 1
    let y2:number = 1
    let y3:number = 1
  
    if (dataKey === 'y1') {
      y1 = 1
      y2 = opacity.y2 === 0 ? 1 : 0
      y3 = opacity.y3 === 0 ? 1 : 0
    } else if(dataKey === 'y2'){
      y1 = opacity.y1 === 0 ? 1 : 0
      y2 = 1
      y3 = opacity.y3 === 0 ? 1 : 0
    } else {
      y1 = opacity.y1 === 0 ? 1 : 0
      y2 = opacity.y2 === 0 ? 1 : 0
      y3 = 1
    }
    const setValue = opacity[dataKey] === 1 ? 0 : 1
    _opacity({ y1, y2, y3 })
  }


  
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
      <Line dot={{ opacity: opacity.y1 }} strokeOpacity={opacity.y1} type="monotone" dataKey="y1" name={`${props.names.a}`} stroke={props.colors.stackA} strokeWidth={3}/>
      { props.stackB.length > 0 && props.names.b &&  (
        <Line dot={{ opacity: opacity.y2 }} strokeOpacity={opacity.y2} type="monotone" dataKey="y2" name={`${props.names.b}`} stroke={props.colors.stackB} />
      )}
      { props.stackC.length > 0 && props.names.c && (
        <Line dot={{ opacity: opacity.y3 }} strokeOpacity={opacity.y3} type="monotone" dataKey="y3" name={`${props.names.c}`} stroke={props.colors.stackC} />
      )}
      <Legend verticalAlign="top" height={36} onClick={onClick} wrapperStyle={{cursor: 'pointer'}} />
    </LineChart>
  </ResponsiveContainer>
)}

Charts.defaultProps = {
  names: {a: 'Value A', b: 'Value B', c: 'Value C'},
  colors: {
    stackA: '#8884d8',
    stackB: '#50dacc',
    stackC: '#c350c6'
  },
  stackB : [],
  stackC : [],
  unit: 'kr'
}

export default Charts


