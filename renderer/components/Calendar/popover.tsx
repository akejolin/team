import React, { Component } from 'react';
import FlexView from '../styledFlexView'
import {absentTypes} from './data'

interface Props {
  data?: any,
  position?: any
  onChange?(value:any): any
}

export const TheComponent = (props: Props) => {

  return (
    <div id="popover">
      <FlexView
        style={{
          flexDirection: 'column',
          backgroundColor: '#fff',
          width: 200,
          //minHeight: 200,
          color: '#000',
        }}
      >
        <span id="selected-date"></span>
        Absent:<br/>
        <select onChange={(e)=>{props.onChange({
          ...{ absentType: e.target.value},
          ...props.data[0]
        })}} id="select-type" style={{marginBottom: 10}}>
          <option key="default">Choose</option>
          <option key="none" value="NONE">None</option>
          {
            absentTypes.map(function(key,i) {

              const selected = key.key === props.data[0].absentValue

              return <option key={i} selected={selected} value={key.key}>{key.label}</option>
            })
          }
        </select>
      </FlexView>
    </div>
  );
}

TheComponent.defaultProps = {
  data: [],
  onChange: () => {}
}

export default TheComponent

