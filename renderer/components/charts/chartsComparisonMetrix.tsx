

import React, {PureComponent} from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts';
import {selectYearData, pickAndSumData} from '../utils/dataHelper'

export enum metrics {
  costs = 2,
  usage = 3,
}
export interface Icolors {
  yearA: string,
  yearB: string,
  yearC: string,
}



type Props = {
  stack?: number[][]
  currentYear: number,
  unitA?: string,
  unitB?: string,
  metricA?:metrics,
  metricB?:metrics,
  colors?:Icolors,
  loop?:Array<Number>,
  syncId?: string
}



export const Charts = (props: Props) => {
  

  const colors = {
    yearA: props.colors ? props.colors.yearA : '#8884d8',
    yearB: props.colors ? props.colors.yearB : '#50dacc',
    yearC: props.colors ? props.colors.yearC : '#c350c6'
  }

  const unitA = props.unitA ? props.unitA : 'kr'
  const unitB = props.unitB ? props.unitB : 'kWh'

  const yearA = selectYearData(props.stack, props.currentYear)
  const yearB = selectYearData(props.stack, props.currentYear-1)
  const yearC = selectYearData(props.stack, props.currentYear-2)


  const months = {
    '1':'Jan','2':'Feb','3':'Mar','4':'Apr','5':'May','6':'Jun','7':'Jul','8':'Aug','9':'Sep','10':'Oct','11':'Nov','12':'Dec' 
  }

  
  const loop = props.loop ? props.loop : [1,2,3,4,5,6,7,8,9,10,11,12]


  const gatherData = (datafield:number) => loop.map((month,i) => {
    const key = i + 1

    const monthA = yearA.find(year => Number(year[1]) === Number(month)) || [0,0,0,0]
    const monthB = yearB.find(year => Number(year[1]) === Number(month)) || [0,0,0,0]
    const monthC = yearC.find(year => Number(year[1]) === Number(month)) || [0,0,0,0]

    const output = {
        name: months[month.toString()],
        y1: monthA[Number(datafield)],
        y2: monthB[Number(datafield)],
        y3: monthC[Number(datafield)],
    }
    return output
  })

  
  return (
    <div>
    <ResponsiveContainer height={300}>
      <LineChart  data={gatherData(props.metricA)} syncId={props.syncId}>
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
          unit={unitA}
          name={unitA}
          fontSize={11}
        />
        <Tooltip />
        <Line type="monotone" dataKey="y1" name={`${props.currentYear}`} stroke={colors.yearA} strokeWidth={3} />
        <Line type="monotone" dataKey="y2" name={`${props.currentYear-1}`} stroke={colors.yearB} />
        <Line type="monotone" dataKey="y3" name={`${props.currentYear-2}`} stroke={colors.yearC} />
        <Legend verticalAlign="top" height={36}/>
      </LineChart>
    </ResponsiveContainer>
    <ResponsiveContainer height={160}>
        <LineChart  data={gatherData(props.metricB)} syncId={props.syncId}>
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
            unit={unitB}
            name={unitB}
            fontSize={11}
          />
          <Tooltip />
          <Line type="monotone" dataKey="y1" name={`${props.currentYear}`} stroke={colors.yearA} strokeWidth={3}/>
          <Line type="monotone" dataKey="y2" name={`${props.currentYear-1}`} stroke={colors.yearB} />
          <Line type="monotone" dataKey="y3" name={`${props.currentYear-2}`} stroke={colors.yearC} />
          
        </LineChart>
    </ResponsiveContainer>
  </div>
)}

export default Charts


