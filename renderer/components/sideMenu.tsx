import * as React from 'react';
import { useState, useEffect } from 'react'
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { styled } from '@mui/material/styles';

import Cloud from '@mui/icons-material/Cloud';

import MUILink from '@mui/material/Link';
import Link from 'next/link'
import { useRouter } from 'next/router'



export default function IconMenu() {
  const router = useRouter()
  const [menudata, _menudata] = useState([])

  const WhiteText = styled('div')(({ theme }) => ({
    color: 'white',
  }))
  

  useEffect(() => {
    global.ipcRenderer.addListener('DATA_RESPONSE_SYSTEM_MENU', (_event, data) => {
      return _menudata(data)})
    global.ipcRenderer.send('REQUEST_DATA', 'SYSTEM_MENU')

  }, [])


  const SelectedMenuItem = styled(MenuItem)(({ theme }) => ({
    color: 'rgb(10, 25, 41)',
    
    background: theme.palette['primary'].main,
    '&:hover': {
      background: "rgba(255, 255, 255,.7)",
      //color: 'white',
    'i': {
      //color: 'white',
    }
   },
   'i': {
    color: 'rgb(10, 25, 41)',
    }
  })) 

  const UnselectedMenuItem = styled(MenuItem)(({ theme }) => ({
    color: theme.palette['primary'].main,
  }))

  const SelectMenuItem = (props) => {
    return router.asPath === props.href ? <SelectedMenuItem {...props} >{props.children}</SelectedMenuItem> : <UnselectedMenuItem {...props}>{props.children}</UnselectedMenuItem>
  } 
  
  return (
      <MenuList>
          {
            menudata.map((item,i) => {
              return(
              <Link key={`key-${item[0]}-${i}`} href={item[0]}>
              <SelectMenuItem href={item[0]}>
                {item[3] && (
                  <ListItemIcon>
                    <i className={`${item[2]} ${item[3]}`} />
                  </ListItemIcon>
                )}
                <ListItemText>{item[1]}</ListItemText>
              </SelectMenuItem>
            </Link>
            )})
          }
        <Divider />
        <Link href="/settings" passHref>
          <SelectMenuItem>
            <ListItemIcon>
              <i className={`fas fa-cogs`} />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </SelectMenuItem>
        </Link>
      </MenuList>
  );
}