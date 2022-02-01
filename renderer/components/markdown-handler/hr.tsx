import React from "react";

export default (props:{
  children: any
}) => {

  let attr = {
    className: 'hr',
  }

  return React.createElement('hr', attr, props.children)
}