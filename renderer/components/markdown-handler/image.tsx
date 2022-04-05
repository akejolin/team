import React from "react";

export default (props:{
  children: any,
  src: string,
}) => {

  let attr = {
    className: 'md-image',
    src: props.src,
    style: {width: '100%'}
  }

  return React.createElement('img', attr, props.children)
}