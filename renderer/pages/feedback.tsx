import { useState, useEffect } from 'react'
import Link from 'next/link'
import MUILink from '@mui/material/Link';
import Layout from '../components/Layout'
import TotalCard, { T_diffOutput } from '../components/TotalCard'
import TotalTotalCard from '../components/TotalTotalCard'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FlexView from '../components/styledFlexView'
import {ChartCard, ChartCardTitle} from '../components/charts/cardDesign'

import MonthlyLineCharts from '../components/charts/monthlyLineCharts'
import { dataCostUnit, dataUsageUnit, I_dataSets, T_CostsDataSet, T_month } from '../dataTypes/costs'
import PieCharts from '../components/charts/pieCharts'
import type {T_pieData} from '../components/charts/pieCharts'

import Picker from '../components/Picker'
import { set as empPickerSet } from "../redux/empPicker/slice";


import {selectYearData, pickAndSumData } from '../components/utils/dataHelper'
import { gatherData } from '../components/utils/dataTransform'


import {numberWithCommas} from '../utils/thousendFormatter'
import { getMonth, getCurrentYear } from './../utils/dateHelpers'
import { totalDiffInProgressFromLastYear } from '../components/utils/calculations'

import { 

  faBolt,
  faTint,
  faBurn,
  faWifi,
  faTrashAlt,
  faDollarSign,
  faShieldAlt,
  faTools,
  faBroom,
  faCashRegister,
  //faFire as faBurn,
  //faBurn as faBurn 
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { add as calcPickerAdd, remove as calcPickerRemove} from "../redux/calcPicker/slice";


import { wrapper } from '../redux/store';
import { set as setIsDev, testing } from '../redux/system/slice'

const IndexPage = () => {

  const currentYear = useAppSelector((state) => state.yearPicker.value);
  const empPickerValue = useAppSelector((state) => state.empPicker.value);


  const dispatch = useAppDispatch()

  //const dispatch = useAppDispatch()

  const [emp0, _emp0] = useState([])
  const [emp1, _emp1] = useState([])
  const [emp2, _emp2] = useState([])
  const [emp3, _emp3] = useState([])
  const [emp4, _emp4] = useState([])
  const [emp5, _emp5] = useState([])

  const dataSet = {
    emp0,
    emp1,
    emp2,
    emp3,
    emp4,
    emp5,
  } 

  useEffect(() => {
    global.ipcRenderer.addListener(`RESPONSE_SYSTEM_TRANSLATED_DATAKEYS`, (_event, data) => dispatch(setDataKeys(data)))
    global.ipcRenderer.addListener(`DATA_RESPONSE_score_emp0`, (_event, data) => _emp0(data))
    global.ipcRenderer.addListener('DATA_RESPONSE_score_emp1', (_event, data) => _emp1(data))
    global.ipcRenderer.addListener('DATA_RESPONSE_score_emp2', (_event, data) => _emp2(data))
    global.ipcRenderer.addListener('DATA_RESPONSE_score_emp3', (_event, data) => _emp3(data))
    global.ipcRenderer.addListener('DATA_RESPONSE_score_emp4', (_event, data) => _emp4(data))
    global.ipcRenderer.addListener('DATA_RESPONSE_score_emp5', (_event, data) => _emp5(data))
  }, [])

  useEffect(() => {
    global.ipcRenderer.send('REQUEST_SYSTEM_TRANSLATED_DATAKEYS')
    global.ipcRenderer.send('REQUEST_DATA', 'score_emp0')
    global.ipcRenderer.send('REQUEST_DATA', 'score_emp1')
    global.ipcRenderer.send('REQUEST_DATA', 'score_emp2')
    global.ipcRenderer.send('REQUEST_DATA', 'score_emp3')
    global.ipcRenderer.send('REQUEST_DATA', 'score_emp4')
    global.ipcRenderer.send('REQUEST_DATA', 'score_emp5')
  },[])

  const GridCon = Grid
  const StyledBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(1),
      paddingRight: theme.spacing(2)
    }
  }))
  const StyledText = styled(Typography)(({ theme }) => ({
    color: '#a1a1a1'
  }))

  const YellowText = styled('span')(({ theme }) => ({
    color: theme.palette['warning'].main
  }))
  const BlueText = styled('span')(({ theme }) => ({
    color: theme.palette['info'].main
  }))
  const PurpleText = styled('span')(({ theme }) => ({
    color: theme.palette['secondary'].main
  }))
  const GreenText = styled('span')(({ theme }) => ({
    color: '#25db23'
  }))

  return (
    <Layout title="Employee | Team">
      <Grid container spacing={4}>
      <Grid item xs={12} sm={9}>
          <FlexView style={{alignItems: 'flex-start', flexDirection: 'column'}}>
            <StyledBox>
              <StyledText variant="body1">{currentYear}</StyledText>
              <h1 style={{marginBottom: 0, marginTop: -5,}}>
                Dashboard
              </h1>
            </StyledBox>
          </FlexView>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FlexView style={{alignItems: 'right', justifyContent: 'flex-end', flexDirection: 'row'}}>
            <div style={{width: '40%', marginRight:20}}>
              <Picker
              value={empPickerValue}
              handleChange={(value:string) => dispatch(empPickerSet(value))}
              data={
                Object.keys(global.dataKeys).map(item => {
                  return {
                    key: `${global.dataKeys[item]}`,
                    value: `${item}`
                  }
                })
              }
              />
            </div>
          </FlexView>
        </Grid>
        

        <Grid item xs={12} sm={12} md={7}>
          <ChartCard>
            <ChartCardTitle>
              <FlexView style={{ flexDirection:'column', alignItems: 'flex-start', }}>
                <span><FontAwesomeIcon icon={faCashRegister} /> Score:  </span>
              </FlexView>
            </ChartCardTitle>
            <FlexView style={{ flexDirection:'column', background: 'rgba(13,28,40,0.4)' }}>
            </FlexView>
          </ChartCard>
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
          <ChartCard>
            <ChartCardTitle>
              <FlexView style={{ flexDirection:'column', alignItems: 'flex-start', }}>
                <span><FontAwesomeIcon icon={faCashRegister} /> Each cost share of total year {currentYear}</span>
              </FlexView>
            </ChartCardTitle>
          </ChartCard>
          </Grid>
      </Grid>
  </Layout>
  )
}


IndexPage.getInitialProps = wrapper.getInitialPageProps(
  ({ dispatch }) => async () => {
      await dispatch(testing('server rendered from page: ' + global.isDev));
      await dispatch(setIsDev(global.isDev));
  }
);


export default IndexPage
