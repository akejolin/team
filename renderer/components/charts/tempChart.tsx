

import React, { useState, useEffect } from 'react'
import { BarChart, Bar, ReferenceLine, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';


export interface Icolors {
  a: string,
  b: string,
}

export type I_dataset = [
  number,number,number,number,number,number,number,number,number,number,number,number
]

type Props = {
  year: number
  syncId?: string,
  colors?: Icolors
}



export const Charts = (props: Props) => {

  let [fileData, _fileData] = useState([])

  useEffect(() => {
    global.ipcRenderer.addListener('DATA_RESPONSE_WEATHER', (_event:any, data:[string, string, number][]) => {
      const transformedData = data.map((item) => {
        if (!Array.isArray(item)) return null;
        const datum = item[0] ? item[0].split('-') : ['1970','01','01'] 

        return [
          Number(datum[0]),
          Number(datum[1]),
          Number(datum[2]),
          item[0],
          item[2],
        ]
      })
      const filteredData = transformedData.filter(filt => filt[0] === props.year)
      _fileData(filteredData)
      
    })
    global.ipcRenderer.send('REQUEST_DATA', 'WEATHER')
  }, [])

  

  const months = {
    '1':'Jan','2':'Feb','3':'Mar','4':'Apr','5':'May','6':'Jun','7':'Jul','8':'Aug','9':'Sep','10':'Oct','11':'Nov','12':'Dec' 
  }
  const amountOfDaysInMonth = [
    31,28,31,30,31,30,31,31,30,31,30,31 
  ]

  const loop = [1,2,3,4,5,6,7,8,9,10,11,12]

  const data = []
  const __data = loop.map((month,i) => {

    let arr = new Array(amountOfDaysInMonth[month-1])
    const arrr = []
    for (var i = 0, iMax = arr.length; i < iMax; i++) {
      arrr.push(i)
    }

    const days = arrr.map(day => {
     
      const _data = fileData.find(f => f[1] === month && f[2] === day)
      
      const output = {
        month: `${month}`,
        day: `${day}`,
        value: _data ? _data[4] : 0
      }
      data.push(output)

      return output
    })
    return days
  })


  
  
  return (
  <ResponsiveContainer>
    <BarChart data={data} syncId={props.syncId}>
    <ReferenceLine y={0} stroke="#12456b" />
      <XAxis
        dataKey={'none'}
        axisLine={false}
        stroke="#12456b"
        fontSize={11}
      />
      <YAxis
        stroke="#12456b"
        axisLine={true}
        name={'grader C'}
        fontSize={11}
      />
      <Tooltip />
      <Bar dataKey="value" name={`day`} fill={props.colors.a} />
    </BarChart>
  </ResponsiveContainer>
)}

Charts.defaultProps = {
  colors: {
    a: '#8884d8',
    b: '#50dacc',
  },
}

export default Charts


