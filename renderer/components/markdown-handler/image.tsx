import React from "react";

export default (props:{
  children: any,
  src: string,
}) => {

  let attr = {
    className: 'bmdc-image',
    src: props.src,
    style: {maxWidth: '100%'}
  }

  return React.createElement('img', attr, props.children)
}