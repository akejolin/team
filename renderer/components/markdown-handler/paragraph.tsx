import React from "react";
/*
function HeadingRenderer(props) {
  var children = React.Children.toArray(props.children)
  var text = children.reduce(flatten, '')
  var slug = text.toLowerCase().replace(/\W/g, '-')
  return React.createElement('h' + props.level, {id: slug}, props.children)
}
*/
function flatten(text, child) {
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text)
}
export default (props) => {
  const children = React.Children.toArray(props.children)
  let text = children.reduce(flatten, '')
  let attr:any = {}
  let outputChildren = props.children
  if (text.search(/Note:/g) > -1) {
    const noteElementText = React.createElement('strong', {}, `Note: `)
    text = text.replace(/Note:/g, '')
    text = [noteElementText, `${text}`]
    outputChildren = React.createElement('span', {}, text)
    attr.className = 'mdc-card mdc-card--outlined helper-set-inner-margin'
  }

  if (text.search(/\*\*\* \*\*\* \*\*\*/g) > -1 && text.search(/--- --- ---/g) > -1) {
    const noteElementText = React.createElement('strong', {}, `Note: `)
    text = text.replace(/\*\*\* \*\*\* \*\*\*/g, '')
    text = text.replace(/--- --- ---/g, '')
    text = [noteElementText, `${text}`]
    outputChildren = React.createElement('span', {}, text)
    attr.className = 'mdc-card mdc-card--outlined helper-set-inner-margin'
  }

  return React.createElement('p', attr, outputChildren)
}