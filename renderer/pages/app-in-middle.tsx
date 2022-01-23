import React, {useEffect} from 'react'

import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import Head from 'next/head'
import { store, wrapper } from '../redux/store'
import { set as setDataKeys } from '../redux/dataKeys/slice'


import './style.css'


function App({
  Component, pageProps,
}: AppProps) {



  return (
    <React.Fragment>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </React.Fragment>
  )
}



App.getInitialProps = wrapper.getInitialAppProps(
  ({ dispatch }) => async ({ Component, ctx }: any) => {
  
    return {
      pageProps: {
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}),
      },
    }
  }
)


export default wrapper.withRedux(App);