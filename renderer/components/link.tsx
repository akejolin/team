import React from 'react'
import ListItem from './ListItem'

type Props = {
  items: any[]
}

const SideMenu = ({ items }: Props) => (
  <ul>
    {items.map((item) => (
      <li key={item.id}>
        <ListItem data={item} />
      </li>
    ))}
  </ul>
)

export default SideMenu