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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ContactPageIcon from '@mui/icons-material/ContactPage';


import MonthlyLineCharts from '../components/charts/monthlyLineCharts'
import { dataCostUnit, dataUsageUnit, I_dataSets, T_CostsDataSet, T_month } from '../dataTypes/costs'
import PieCharts from '../components/charts/pieCharts'
import type {T_pieData} from '../components/charts/pieCharts'

import HealthAllowance from '../components/HealthAllowance'
import ExpensesPayout from '../components/expensesPayout'
import Picker from '../components/Picker'
import { set as empPickerSet } from "../redux/empPicker/slice";
import { set as yearPickerSet } from "../redux/yearPicker/slice";


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
  faUser,
  faHeart,
  //faFire as faBurn,
  //faBurn as faBurn 
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppDispatch, useAppSelector } from "../redux/hooks";


import { wrapper } from '../redux/store';
import { set as setIsDev, testing } from '../redux/system/slice'

const IndexPage = () => {

  const currentYear = useAppSelector((state) => state.yearPicker.value);
  const empPickerValue = useAppSelector((state) => state.empPicker.value);


  const dispatch = useAppDispatch()
  const [emp, _emp] = useState([])


  useEffect(() => {
    global.ipcRenderer.addListener(`EMP_RESPONSE`, (_event, data) => _emp(data))
  }, [empPickerValue])

  useEffect(() => {
    global.ipcRenderer.send('REQUEST_EMP', empPickerValue)

  },[empPickerValue])

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

  const TextBox = styled('div')(({ theme }) => ({
    ":first-letter" : {
      textTransform: 'capitalize',
    },
    padding: '8px 4px 8px 4px'
    //textTransform: 'capitalize',
  }))
  const CustomListItemText = styled(ListItemText)(({ theme }) => ({
    ":first-letter" : {
      textTransform: 'capitalize',
    }
  }))

  return (
    <Layout title="Employee | Team">
      <Grid container spacing={4}>
      <Grid item xs={12} sm={9}>
          <FlexView style={{alignItems: 'flex-start', flexDirection: 'column'}}>
            <StyledBox>
              <StyledText variant="body1">{currentYear}</StyledText>
              <h1 style={{marginBottom: 0, marginTop: -5,}}>
                Employee Overview
              </h1>
            </StyledBox>
          </FlexView>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FlexView style={{alignItems: 'right', justifyContent: 'flex-end', flexDirection: 'row'}}>
          <div style={{width: '40%', marginRight:20}}>
          <Picker
              value={`${currentYear}`}
              handleChange={(value:string) => dispatch(yearPickerSet(Number(value)))}
              data={
                [getCurrentYear,getCurrentYear-1, getCurrentYear-2].map(item => {
                  return {
                    key: `${item}`,
                    value: `${item}`
                  }
                })
              }
              />
            
            </div>
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
          <ChartCard style={{justifyContent: 'flex-start', }}>
            <ChartCardTitle>
              <FlexView style={{ flexDirection:'column', alignItems: 'flex-start', }}>
                <span>
                  <FontAwesomeIcon icon={faUser} />
                  <span style={{paddingLeft:8}}>General</span>  
                </span>
              </FlexView>
            </ChartCardTitle>
            <Grid container style={{padding:'0px 8px 16px 8px'}}>
              <Grid xs={12} sm={9} md={3} style={{padding:'16px 8px 8px 0px'}}>
              <img src={`file://${global.dataSourcePath}images/${emp['username']}.png`} style={{maxWidth: 200, width: '100%'}} />
              </Grid>
              <Grid xs={12} sm={9} md={9}>
                <List component="nav" dense={true} style={{width:'100%'}}>
                  {
                    Object.keys(emp).filter(
                      f => f === 'name' ||
                      f === 'level' ||
                      f === 'username' ||
                      f === 'salary' ||
                      f === 'since' ||
                      f === 'position'
                    ).map(item => {
                      return (

                        <ListItem>
                        <ListItemIcon>
                          <ContactPageIcon />
                        </ListItemIcon>
                        <CustomListItemText
                          primary={item}
                          secondary={emp[item]}
                        />
                      </ListItem>
                      )
                    })
                  }
                </List>
              </Grid>
            </Grid>

          </ChartCard>
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            <ChartCard style={{justifyContent: 'flex-start', height: 'auto', minHeight: 'auto'}}>
              <ChartCardTitle>
                <FlexView style={{ flexDirection:'column', alignItems: 'flex-start', }}>
                  <span>
                    <FontAwesomeIcon icon={faHeart} />
                    <span style={{paddingLeft:8}}>Health Allowance {currentYear}</span>
                  </span>
                </FlexView>
              </ChartCardTitle>
              <HealthAllowance />
            </ChartCard>
            <ChartCard style={{justifyContent: 'flex-start', height: 'auto', minHeight: 'auto', marginTop:20}}>
              <ChartCardTitle>
                <FlexView style={{ flexDirection:'column', alignItems: 'flex-start', }}>
                  <span>
                    <FontAwesomeIcon icon={faHeart} />
                    <span style={{paddingLeft:8}}>Expenses Payout {currentYear}</span>
                  </span>
                </FlexView>
              </ChartCardTitle>
              <ExpensesPayout />
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
