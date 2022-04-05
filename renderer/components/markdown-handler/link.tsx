import React from "react";
import shelljs from 'shelljs'
export default (props:{
  children: any
  href: string
}) => {
  let attr = {
    target: '_blank',
    href: props.href,
    class: 'open-in-os'
  }

  return React.createElement('a', attr, props.children)
}