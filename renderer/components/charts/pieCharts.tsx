import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { keyTranslator } from '../../dataTypes/costs'
import type { T_dataKey } from '../../dataTypes/costs'
/*

// Data sample

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

*/

const COLORS = [
  '#8884d8', 
  '#50dacc',
  '#c350c6',
  '#FF8042',
  '#e8d33b',
  '#e87c3b',
  '#de5605',
  '#de05be',
  '#8d3dec',
  '#3d9dec',
  '#3dec67',
  '#da0f0f',
];

const RADIAN = Math.PI / 180;

export interface Icolors {
  stackA: string,
  stackB: string,
  stackC: string,
}

export interface T_pieData {
  name: T_dataKey,
  value: number,
}

type Props = {
  stack: T_pieData[]
}

export const Charts = (props: Props) => {
 
  const data = props.stack.length > 0 ? props.stack : []
  
  const renderCustomizedLabel2 = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = outerRadius * 1.5 // innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text fontSize={10} x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${keyTranslator[data[index].name]}: ${(percent * 100).toFixed(0)}%`}
    </text>
    )
  }

  if (data.length < 1) return null ;

  return (
    <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={true}
        label={renderCustomizedLabel2}
        outerRadius={70}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}>
           
          </Cell>
        ))}
      </Pie>
    </PieChart>
  </ResponsiveContainer>
  );
}

/*
  colors: {
    stackA: '#8884d8',
    stackB: '#50dacc',
    stackC: '#c350c6'
  },
*/

Charts.defaultProps = {
  stack: []
}

export default Charts

