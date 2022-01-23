import { useState, useEffect } from 'react'
import Link from 'next/link'
import MUILink from '@mui/material/Link';
import Layout from '../components/Layout'
import TotalCard from '../components/TotalCard'
import TotalTotalCard from '../components/TotalTotalCard'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FlexView from '../components/styledFlexView'
import {ChartCard, ChartCardTitle} from '../components/charts/cardDesign'

import MonthlyLineCharts from '../components/charts/monthlyLineCharts'
import type { T_CostsDataSet, T_month } from '../dataTypes/costs'
import PieCharts from '../components/charts/pieCharts'
import type {T_pieData} from '../components/charts/pieCharts'

import YearPicker from '../components/yearPicker'

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


const IndexPage = () => {

 
  const currentYear = useAppSelector((state) => state.yearPicker.value);
  const calcPicker = useAppSelector((state) => state.calcPicker.value);


  const [dataGas, _dataGas] = useState([])
  const [dataElst, _dataElst] = useState([])
  const [dataEldy, _dataEldy] = useState([])
  const [dataWaste, _dataWaste] = useState([])
  const [dataWater, _dataWater] = useState([])
  const [dataBroadband, _dataBroadband] = useState([])
  const [dataSecurity, _dataSecurity] = useState([])
  const [dataMaintenance, _dataMaintenance] = useState([])
  const [cleaningData, _cleaningData] = useState([])
  const [dataLoan, _dataLoan] = useState([])
  const [dataInsurance, _dataInsurance] = useState([])
  const [dataGardenWaste, _dataGardenWaste] = useState([])
  const [dataFirewood, _dataFirewood] = useState([])

  //const [totalData, _totalData] = useState([])
  const [sumTotalData, _sumTotalData] = useState(0)

  //const [currentYear, _currentYear] = useState(getCurrentYear())
  const [currencyLabel, _currencyLabel] = useState('kr')
  
  useEffect(() => {
    global.ipcRenderer.addListener('DATA_RESPONSE_GAS', (_event, data) => _dataGas(data))
    global.ipcRenderer.addListener('DATA_RESPONSE_ELECTRICITY_STATIC', (_event, data) => _dataElst(data))
    global.ipcRenderer.addListener('DATA_RESPONSE_ELECTRICITY_DYNAMIC', (_event, data) => _dataEldy(data))
    global.ipcRenderer.addListener('DATA_RESPONSE_WATER', (_event, data) => _dataWater(data))
    global.ipcRenderer.addListener('DATA_RESPONSE_TRASH', (_event, data) => _dataWaste(data))
    global.ipcRenderer.addListener('DATA_RESPONSE_BROADBAND', (_event, data) => _dataBroadband(data))
    global.ipcRenderer.addListener('DATA_RESPONSE_SECURITY', (_event, data) => _dataSecurity(data))
    global.ipcRenderer.addListener('DATA_RESPONSE_MAINTENANCE', (_event, data) => _dataMaintenance(data))
    global.ipcRenderer.addListener('DATA_RESPONSE_CLEANING', (_event, data) => _cleaningData(data))
    global.ipcRenderer.addListener('DATA_RESPONSE_LOAN', (_event, data) => _dataLoan(data))
    global.ipcRenderer.addListener('DATA_RESPONSE_INSURANCE', (_event, data) => _dataInsurance(data))
    global.ipcRenderer.addListener('DATA_RESPONSE_GARDEN_WASTE', (_event, data) => {
      return _dataGardenWaste(data)
    })
    global.ipcRenderer.addListener('DATA_RESPONSE_FIREWOOD', (_event, data) => _dataFirewood(data))
  }, [])
  

  useEffect(() => {
    global.ipcRenderer.send('REQUEST_DATA', 'GAS')
    global.ipcRenderer.send('REQUEST_DATA', 'ELECTRICITY_STATIC')
    global.ipcRenderer.send('REQUEST_DATA', 'ELECTRICITY_DYNAMIC')
    global.ipcRenderer.send('REQUEST_DATA', 'WATER')
    global.ipcRenderer.send('REQUEST_DATA', 'TRASH')
    global.ipcRenderer.send('REQUEST_DATA', 'BROADBAND')
    global.ipcRenderer.send('REQUEST_DATA', 'SECURITY')
    global.ipcRenderer.send('REQUEST_DATA', 'MAINTENANCE')
    global.ipcRenderer.send('REQUEST_DATA', 'CLEANING')
    global.ipcRenderer.send('REQUEST_DATA', 'LOAN')
    global.ipcRenderer.send('REQUEST_DATA', 'INSURANCE')
    global.ipcRenderer.send('REQUEST_DATA', 'GARDEN_WASTE')
    global.ipcRenderer.send('REQUEST_DATA', 'FIREWOOD')
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

  const dataSet = {
    gas: dataGas,
    elst: dataElst,
    eldy: dataEldy,
    waste: dataWaste,
    water: dataWater,
    broadband: dataBroadband,
    security: dataSecurity,
    maintenance: dataMaintenance,
    cleaning: cleaningData,
    loan: dataLoan,
    insurance: dataInsurance,
    gardenWaste: dataGardenWaste,
    firewood: dataFirewood,
  } 



  const generateAllTotalArray = (year):T_pieData[] => {

    
    let output = []

    for (const [dataSetKey, dataSetValue] of Object.entries(dataSet)) {
      let targetDataset = selectYearData(dataSetValue, year);
      if (targetDataset) {
        if (calcPicker.find(i => i === `${dataSetKey}`) || calcPicker.length < 1) {
          output.push({name: dataSetKey, data: targetDataset})
        }
      }
    }

    

    const final = []
    output.forEach(item => {
      let sum = 0
      if (item.data) {

        item.data.forEach(d => {
          sum = sum + Number(d[2])
        })
      }
 
      final.push({name: item.name, value: sum})
    })

    return final
  }

  const pieData  = generateAllTotalArray(currentYear)

  const generateTotalArray = (year:Number): T_CostsDataSet[] => {
    const loop:T_month[] = [1,2,3,4,5,6,7,8,9,10,11,12]
    
    const yearPerMonth = loop.map((m):T_CostsDataSet => {

      const output = gatherData(dataSet, calcPicker, year, m)

      let sum = 0
      output.forEach(item => {
        sum += Number(item.data[2])
      })
      return [Number(year), m, sum, 0]
    })
    return yearPerMonth
  }

  const generateYearAndYearB = (year:Number): {a:T_CostsDataSet, b:T_CostsDataSet}[] => {
    const loop:T_month[] = [1,2,3,4,5,6,7,8,9,10,11,12]
    const isLatestYear = year === getCurrentYear
    const currentMonth = getMonth()

    const yearPerMonth = loop.map((m):{a:T_CostsDataSet, b:T_CostsDataSet} => {

      const outputA = gatherData(dataSet, calcPicker, year, m)
      const outputB = gatherData(dataSet, calcPicker, Number(year)-1, m)

      let sumA = 0
      outputA.forEach(item => {
        sumA += Number(item.data[2])
      })

      let sumB = 0

      outputB.forEach((item,i) => {

        let outputSum:number = item.data[2] ? item.data[2] : 0
        const compareWithA = outputA.find(f => f.dataSetKey === item.dataSetKey)

        if (isLatestYear && !compareWithA) {
          outputSum = 0
        } else if ( isLatestYear && compareWithA <= 0) {
          outputSum = 0
        } else if (isLatestYear && m > currentMonth) {
          outputSum = 0
        }
        sumB += Number(outputSum)
      })

      return {
        a: [Number(year), m, sumA, 0],
        b: [Number(year), m, sumB, 0],
      }
    })
    return yearPerMonth
  }

  const totalYearAYearB = generateYearAndYearB(currentYear)

  const arrayYearA = generateTotalArray(currentYear)
  const arrayYearB = generateTotalArray(currentYear-1)
   
  return (
    <Layout title="Settings | Expenses App">
      <Grid container spacing={4}>
        <Grid item xs={12} sm={9}>
          <FlexView style={{alignItems: 'flex-start', flexDirection: 'column'}}>
            <StyledBox>
              <StyledText variant="body1">{currentYear}</StyledText>
              <h1 style={{marginBottom: 0, marginTop: -5,}}>
                Variable Usage Overview
              </h1>
            </StyledBox>
          </FlexView>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FlexView style={{alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row'}}>
            <div style={{width: '20%'}}>
              <YearPicker />
            </div>
          </FlexView>
        </Grid>
        <Grid item xs={12}>
          <GridCon container spacing={4}>
            <Grid item xs={6} sm={6} md={3}>
              <TotalCard
                id={'gas'}
                faIcon={faBurn}
                iconColor="warning"
                primaryText={`Gas`}
                secondaryText={`${numberWithCommas(pickAndSumData(selectYearData(dataGas, currentYear), 'c'))}${currencyLabel}`}
                subberText={`${numberWithCommas(pickAndSumData(selectYearData(dataGas, currentYear), 'u'))}Kwh,`}
                diffText={totalDiffInProgressFromLastYear(dataGas, currentYear)}
                diffUsage={totalDiffInProgressFromLastYear(dataGas, currentYear, getMonth(),'u')}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <TotalCard
                id={'elst'}
                faIcon={faBolt}
                iconColor="secondary"
                primaryText={`Electricty Net`}
                secondaryText={`${numberWithCommas(pickAndSumData(selectYearData(dataElst, currentYear), 'c'))}${currencyLabel}`}
                subberText={`${numberWithCommas(pickAndSumData(selectYearData(dataElst, currentYear), 'u'))}Kwh`}
                diffText={totalDiffInProgressFromLastYear(dataElst, currentYear)}
                diffUsage={totalDiffInProgressFromLastYear(dataElst, currentYear, getMonth(),'u')}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <TotalCard
                id={'eldy'}
                faIcon={faBolt}
                iconColor="secondary"
                primaryText={`Electricty`}
                secondaryText={`${numberWithCommas(pickAndSumData(selectYearData(dataEldy, currentYear), 'c'))}${currencyLabel}`}
                subberText={`${numberWithCommas(pickAndSumData(selectYearData(dataEldy, currentYear), 'u'))}Kwh`}
                diffText={totalDiffInProgressFromLastYear(dataEldy, currentYear)}
                diffUsage={totalDiffInProgressFromLastYear(dataEldy, currentYear, getMonth(),'u')}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <TotalCard
                id={'water'}
                faIcon={faTint}
                iconColor="info"
                primaryText={`Water & Drain`}
                secondaryText={`${numberWithCommas(pickAndSumData(selectYearData(dataWater, currentYear), 'c'))}${currencyLabel}`}
                subberText={`${numberWithCommas(pickAndSumData(selectYearData(dataWater, currentYear), 'u'))}m3`}
                diffText={totalDiffInProgressFromLastYear(dataWater, currentYear)}
                diffUsage={totalDiffInProgressFromLastYear(dataWater, currentYear, getMonth(),'u')}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <TotalCard
                id={'waste'}
                faIcon={faTrashAlt}
                iconColor="info"
                primaryText={`House waste`}
                secondaryText={`${numberWithCommas(pickAndSumData(selectYearData(dataWaste, currentYear), 'c'))}${currencyLabel}`}
                subberText={`${numberWithCommas(pickAndSumData(selectYearData(dataWaste, currentYear), 'u'))}kg`}
                diffText={totalDiffInProgressFromLastYear(dataWaste, currentYear)}
                diffUsage={totalDiffInProgressFromLastYear(dataWaste, currentYear, getMonth(),'u')}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <TotalCard
                id={'broadband'}
                faIcon={faWifi}
                iconColor="#25db23"
                primaryText={`Broadband`}
                secondaryText={`${numberWithCommas(pickAndSumData(selectYearData(dataBroadband, currentYear), 'c'))}${currencyLabel}`}
                subberText={`${numberWithCommas(pickAndSumData(selectYearData(dataBroadband, currentYear), 'u'))}st`}
                diffText={totalDiffInProgressFromLastYear(dataBroadband, currentYear)}
                diffUsage={totalDiffInProgressFromLastYear(dataBroadband, currentYear, getMonth(),'u')}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <TotalCard
                id={'security'}
                faIcon={faShieldAlt}
                iconColor="#25db23"
                primaryText={`Security alarm`}
                secondaryText={`${numberWithCommas(pickAndSumData(selectYearData(dataSecurity, currentYear), 'c'))}${currencyLabel}`}
                subberText={`${numberWithCommas(pickAndSumData(selectYearData(dataSecurity, currentYear), 'u'))}st`}
                diffText={totalDiffInProgressFromLastYear(dataSecurity, currentYear)}
                diffUsage={totalDiffInProgressFromLastYear(dataSecurity, currentYear, getMonth(),'u')}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <TotalCard
                id={'maintenance'}
                faIcon={faTools}
                iconColor="#ff6868"
                primaryText={`Maintenance`}
                secondaryText={`${numberWithCommas(pickAndSumData(selectYearData(dataMaintenance, currentYear), 'c'))}${currencyLabel}`}
                subberText={`${numberWithCommas(pickAndSumData(selectYearData(dataMaintenance, currentYear), 'u'))}st`}
                diffText={totalDiffInProgressFromLastYear(dataMaintenance, currentYear)}
                diffUsage={totalDiffInProgressFromLastYear(dataMaintenance, currentYear, getMonth(),'u')}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <TotalCard
                id={'cleaning'}
                faIcon={faBroom}
                iconColor="#ff6868"
                primaryText={`Cleaning`}
                secondaryText={`${numberWithCommas(pickAndSumData(selectYearData(cleaningData, currentYear), 'c'))}${currencyLabel}`}
                subberText={`${numberWithCommas(pickAndSumData(selectYearData(cleaningData, currentYear), 'u'))}st`}
                diffText={totalDiffInProgressFromLastYear(cleaningData, currentYear)}
                diffUsage={totalDiffInProgressFromLastYear(cleaningData, currentYear, getMonth(),'u')}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <TotalCard
                id={'loan'}
                faIcon={faDollarSign}
                iconColor="#5ae3c0"
                primaryText={`Loan`}
                secondaryText={`${numberWithCommas(pickAndSumData(selectYearData(dataLoan, currentYear), 'c'))}${currencyLabel}`}
                subberText={`${numberWithCommas(pickAndSumData(selectYearData(dataLoan, currentYear), 'u'))}st`}
                diffText={totalDiffInProgressFromLastYear(dataLoan, currentYear)}
                diffUsage={totalDiffInProgressFromLastYear(dataLoan, currentYear, getMonth(),'u')}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <TotalCard
                id={'insurance'}
                faIcon={faDollarSign}
                iconColor="#5ae3c0"
                primaryText={`Insurance`}
                secondaryText={`${numberWithCommas(pickAndSumData(selectYearData(dataInsurance, currentYear), 'c'))}${currencyLabel}`}
                subberText={`${numberWithCommas(pickAndSumData(selectYearData(dataInsurance, currentYear), 'u'))}st`}
                diffText={totalDiffInProgressFromLastYear(dataInsurance, currentYear)}
                diffUsage={totalDiffInProgressFromLastYear(dataInsurance, currentYear, getMonth(),'u')}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
            <TotalCard
                id={'gardenWaste'}
                faIcon={faTrashAlt}
                iconColor="#5ae3c0"
                primaryText={`Garden waste`}
                secondaryText={`${numberWithCommas(pickAndSumData(selectYearData(dataGardenWaste, currentYear), 'c'))}${currencyLabel}`}
                subberText={`${numberWithCommas(pickAndSumData(selectYearData(dataGardenWaste, currentYear), 'u'))}kg`}
                diffText={totalDiffInProgressFromLastYear(dataGardenWaste, currentYear)}
                diffUsage={totalDiffInProgressFromLastYear(dataGardenWaste, currentYear, getMonth(),'u')}
              />
            </Grid>
          </GridCon>
        </Grid>

        <Grid item xs={12} sm={12} md={7}>
          <ChartCard>
            <ChartCardTitle>
              <FlexView style={{ flexDirection:'column', alignItems: 'flex-start', }}>
                <span><FontAwesomeIcon icon={faCashRegister} /> Cost development during the year </span>
              </FlexView>
            </ChartCardTitle>
            <FlexView style={{ flexDirection:'column', background: 'rgba(13,28,40,0.4)' }}>
              <div style={{paddingRight: 25, paddingBottom: 5, width: '100%', height:'100%'}}>
                <MonthlyLineCharts
                  syncId={`cost-per-month`}
                  stackA={arrayYearA}
                  stackB={arrayYearB}
                  metric={`c`}
                  names={{a: `${currentYear}`, b: `${currentYear-1}`}}
                />
              </div>
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
            <FlexView style={{ flexDirection:'column', background: 'rgba(13,28,40,0.4)' }}>
              <div style={{paddingRight: 25, paddingBottom: 5, width: '100%', height:'100%'}}>
                <PieCharts stack={pieData} />
              </div>
            </FlexView>
          </ChartCard>
            
          </Grid>


      </Grid>
  </Layout>
  )
}

export default IndexPage
