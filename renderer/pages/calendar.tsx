import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Grid from '@mui/material/Grid';
import Calendar from '../components/Calendar/calendar'
import Stack from '@mui/material/Stack';
import {absentTypes} from '../components/Calendar/data'

const IndexPage = () => {
  return (
    <Layout title="Notes | Team App">
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Calendar />
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" spacing={2} justifyContent="center">
            {absentTypes.filter(item => item.isPrimary).map(item => (
              <Stack direction="row" spacing={2} justifyContent="center">
                <div style={{height:16, width:16}} className={item.key}></div>
                <div style={{fontSize:12}}>{item.label}</div>
              </Stack>
            ))}
          </Stack>
        </Grid>
      </Grid>
  </Layout>
  )
}

export default IndexPage
