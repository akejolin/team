import React, { ReactNode } from 'react'

import Head from 'next/head'
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import SideMenu from './sideMenu'
import FlexView from '../components/flexView'
import Notify from '../components/Notify'



type Props = {
  children: ReactNode
  title?: string
}

const Layout = ({ children, title = 'Expenses App' }: Props) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          background: {
            //default: 'rgb(0, 30, 60)',
            default:  'rgb(10, 25, 41)',
          },

          //divider: 'rgb(0, 60, 90)',
        },
      }),
    [prefersDarkMode],
  );

  const PaddingRightGrid = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(2)
    }
  }))

  const Footer = styled('div')(({ theme }) => ({
    padding: '8px 16px 16px 8px',
    fontSize:12
  }))

  

  const onToggleDevTools = () => {
    global.ipcRenderer.send('TOOGLE_DEV_TOOLS')
  }

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" type="text/css" href="/css/font-awesome.all.min.css" />
      </Head>
      <Notify />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FlexView style={{height:20}} />
        </Grid>
        <Grid item xs={12} sm={4} md={2} lg={2} xl={2}>
          <div style={{width: '100%', textAlign:'center', opacity:0.9, padding: 8}}><img src="/images/logo.png" width="50%"/></div>
          <SideMenu />
        </Grid>
        <PaddingRightGrid item xs={12} sm={8} md={10} lg={10} xl={10}>
            {children}
        </PaddingRightGrid>
        <Grid item xs={12} sm={4} md={2} lg={2} xl={2} />
        <PaddingRightGrid item xs={12} sm={8} md={10} lg={10} xl={10}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Divider />
              
              <Footer>
                <div style={{cursor: 'pointer'}} onClick={onToggleDevTools}>Toogle devTools</div>
              </Footer>
              
            </Grid>
          </Grid>
        </PaddingRightGrid>
      </Grid>
    </ThemeProvider>
  )
}

export default Layout
