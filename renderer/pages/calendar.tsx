import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Grid from '@mui/material/Grid';
import Calendar from '../components/Calendar/calendar'


const IndexPage = () => {
  return (
    <Layout title="Notes | Team App">
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Calendar />
        </Grid>
      </Grid>
  </Layout>
  )
}

export default IndexPage
