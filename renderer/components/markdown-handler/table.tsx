import React from "react";
function flatten(text, child) {
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text)
}
export const table = (props) => {
  const table = React.createElement('table', {className: 'mdc-data-table__table'}, props.children)
  const innerWrapper = React.createElement('div', {className: 'mdc-data-table__table-container'}, table)
  return React.createElement('div', {className: 'mdc-data-table helper-full-width'}, innerWrapper)
}
export const tableHead = (props) => {
  let attr = {
    className: 'mdc-data-table__header-row helper-opacity-25',
  }
  return React.createElement('thead', attr, props.children)
}
export const tableBody = (props) => React.createElement('tbody', { className: 'mdc-data-table__content' }, props.children)
export const tableRow = (props) => {
  const children = React.Children.toArray(props.children)
  let text = children.reduce(flatten, '')
  //text = text.substring(0,10)
  let attr = {
    className: 'mdc-data-table__row',
  }
  return React.createElement('tr', attr, props.children)
}
export const tableCell = (props) => {

  let attr = {
    className: 'mdc-data-table__cell',
  }
  return React.createElement('td', attr, props.children)
}

export default table