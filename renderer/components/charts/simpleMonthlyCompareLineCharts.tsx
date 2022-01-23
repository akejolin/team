

import React, {useState} from 'react'
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
  stackA: number[]
  stackB?: number[]
  stackCA?: number[]
  stackCB?: number[]
  names?: any
  props?: string,
  unit?: string,
  unitC?: string,
  colors?: Icolors,
  loop?:Array<Number>
  syncId?:string,
}


const lineType = {
  kWh: 'monotone',
  kr: 'monotone',
  m3: 'monotone',
  kg: 'monotone',
  st: 'linear',
  undefined: 'monotone',
}



export const Charts = (props: Props) => {

  const [opacity, _opacity] = useState({y1: 1, y2: 1})

  const months = {
    '1':'Jan','2':'Feb','3':'Mar','4':'Apr','5':'May','6':'Jun','7':'Jul','8':'Aug','9':'Sep','10':'Oct','11':'Nov','12':'Dec' 
  }

  const loop = props.loop ? props.loop : [1,2,3,4,5,6,7,8,9,10,11,12]

  const dataA = loop.map((month,i) => {
    const output = {
        name: months[month.toString()],
    }
    output['y1'] = props.stackA[i]
    if (props.stackB.length > 0) {
      output['y2'] = props.stackB[i]
    }
    return output
  })

  const dataB = loop.map((month,i) => {
    const output = {
        name: months[month.toString()],
    }
    output['y3'] = props.stackCA[i]
    if (props.stackCB.length > 0) {
      output['y4'] = props.stackCB[i]
    }
    return output
  })


  const onClick = (o) => {
    let { dataKey } = o;

    let y1:number = 1
    let y2:number = 1

    if (dataKey === 'y1') {
      y1 = 1
      y2 = opacity.y2 === 0 ? 1 : 0
    } else {
      y1 = opacity.y1 === 0 ? 1 : 0
      y2 = 1
    }
    const setValue = opacity[dataKey] === 1 ? 0 : 1
    _opacity({ y1, y2 })
  }
  return (
    <React.Fragment>
  <ResponsiveContainer height={300}>
    <LineChart data={dataA} syncId={props.syncId}>
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
      <Line dot={{ opacity: opacity.y1 }} type={lineType[props.unit] ? lineType[props.unit] : 'monotone'} dataKey="y1" strokeOpacity={opacity.y1} name={`${props.names.a}`} stroke={props.colors.stackA} strokeWidth={3}/>
      { props.stackB.length > 0 && typeof props.names.b !== 'undefined' &&  (
        <Line dot={{ opacity: opacity.y2 }} type={lineType[props.unit] ? lineType[props.unit] : 'monotone'} dataKey="y2" strokeOpacity={opacity.y2} name={`${props.names.b}`} stroke={props.colors.stackB} />
      )}
      <Legend verticalAlign="top" height={36} onClick={onClick} wrapperStyle={{cursor: 'pointer'}} />
    </LineChart>
  </ResponsiveContainer>
  <ResponsiveContainer height={300}>
    <LineChart data={dataB} syncId={props.syncId}>
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
      unit={props.unitC}
      name={props.unitC}
      fontSize={11}
    />
    <Tooltip />
    <Line dot={{ opacity: opacity.y1 }} type={lineType[props.unitC] ? lineType[props.unitC] : 'monotone'} dataKey="y3" strokeOpacity={opacity.y1} name={`${props.names.a}`} stroke={props.colors.stackA} strokeWidth={3}/>
    { props.stackCB.length > 0 && typeof props.names.b !== 'undefined' &&  (
      <Line dot={{ opacity: opacity.y2 }} type={lineType[props.unitC] ? lineType[props.unitC] : 'monotone'} dataKey="y4" strokeOpacity={opacity.y2} name={`${props.names.b}`} stroke={props.colors.stackB} />
    )}
  </LineChart>
</ResponsiveContainer>
</React.Fragment>
)}

Charts.defaultProps = {
  names: {a: 'Value A', b: 'Value B'},
  colors: {
    stackA: '#8884d8',
    stackB: '#50dacc',
  },
  stackB : [],
  stackCA : [],
  stackCB : [],
  unit: 'kr',
  unitC: 'kr'
}

export default Charts


