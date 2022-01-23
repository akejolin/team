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
import { add as calcPickerAdd, remove as calcPickerRemove} from "../redux/calcPicker/slice";


import { wrapper } from '../redux/store';
import { set as setIsDev, testing } from '../redux/system/slice'

const IndexPage = () => {


  
 
  const currentYear = useAppSelector((state) => state.yearPicker.value);
  const calcPicker = useAppSelector((state) => state.calcPicker.value);
  const dispatch = useAppDispatch()

  //const dispatch = useAppDispatch()

  


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
   





  const calcPickerOnClick = ({id}) => {
    const isSelected:boolean = calcPicker.find(item => item === id)?true:false;
    dispatch(isSelected?calcPickerRemove(id):calcPickerAdd(id))
  }


  const generateAllDataSets = (year:Number, dataSets:I_dataSets, _calcPicker) => {
    const loop:T_month[] = [1,2,3,4,5,6,7,8,9,10,11,12]
    const isLatestYear = year === getCurrentYear
    const currentMonth = getMonth()

    
    const yearPerMonthArrays = loop.map((m) => {

      const outputA = gatherData(dataSet, _calcPicker, year, m)
      let outputB = gatherData(dataSet, _calcPicker, Number(year)-1, m)

      outputB = outputB.map((item,i) => {

        let outputSum = item
        const compareWithA = outputA.find(f => f.dataSetKey === item.dataSetKey)

        if (isLatestYear && !compareWithA) {
          outputSum.data = []
        } else if ( isLatestYear && compareWithA <= 0) {
          outputSum.data = []
        } else if (isLatestYear && m > currentMonth) {
          outputSum.data = []
        }
        return item
      })
      return {
        a: outputA,
        b: outputB,
      }
    })
    
    return {a: yearPerMonthArrays.map(item => item.a), b:yearPerMonthArrays.map(item => item.b)}
  
}


  const allDataSetsNoCalcFilter = generateAllDataSets(currentYear, dataSet, [
    'gas',
    'elst',
    'eldy',
    'waste',
    'water',
    'broadband',
    'security',
    'maintenance',
    'cleaning',
    'loan',
    'insurance',
    'gardenWaste',
    'firewood',
  ])



  const pick = (stack, dataSetKey, AorB) => {
    return stack[AorB].map(it => 
      it.filter(item => item.dataSetKey === dataSetKey).map(item => item.data && item.data.length > 0 ? item.data : [0,0,0,0])
    ).map(item => item[0] || [0,0,0,0])
  }

  const calcDiff = (a, b): T_diffOutput => {
    const round = (num) => Math.round(num * 10) / 10
    const inProcent = (part, a, b) => b !== 0 ? round((Number(part) / Number(b)) * 100) : a === 0 ? 0 : 100 
    
    let diff = a - b
    const procent = inProcent(diff,a, b)
    const increased = procent > 0 ? true : false

    return {
      diff,
      procent,
      increased,
      a,
      b
    }
  }

  const target = 'c'
  const totalCardarray: {
    id:string,
    icon: any,
    iconColor:string,
    primaryText:string,
    secondaryText:string,
    subberText:string,
    diff: T_diffOutput
  }[] = [
    {
      id: 'gas',
      icon: faBurn,
      iconColor: 'warning',
      primaryText: 'Gas',
      secondaryText: `${numberWithCommas(pickAndSumData(pick(allDataSetsNoCalcFilter, 'gas', 'a'),target),target)}kr`,
      subberText: `${numberWithCommas(pickAndSumData(pick(allDataSetsNoCalcFilter, 'gas', 'b'),target), target)}kr`,
      diff: calcDiff(pickAndSumData(pick(allDataSetsNoCalcFilter, 'gas', 'a'),target), pickAndSumData(pick(allDataSetsNoCalcFilter, 'gas', 'b'),target))
    },
    {
      id: 'elst',
      icon: faBolt,
      iconColor: 'secondary',
      primaryText: 'El static',
      secondaryText: `${numberWithCommas(pickAndSumData(pick(allDataSetsNoCalcFilter, 'elst', 'a'),target), target)}kr`,
      subberText: `${numberWithCommas(pickAndSumData(pick(allDataSetsNoCalcFilter, 'elst', 'b'),target), target)}kr`,
      diff: calcDiff(pickAndSumData(pick(allDataSetsNoCalcFilter, 'elst', 'a'),target), pickAndSumData(pick(allDataSetsNoCalcFilter, 'elst', 'b'),target))
    },
    {
      id: 'eldy',
      icon: faBolt,
      iconColor: 'secondary',
      primaryText: 'El variable',
      secondaryText: `${numberWithCommas(pickAndSumData(pick(allDataSetsNoCalcFilter, 'eldy', 'a'),target), target)}kr`,
      subberText: `${numberWithCommas(pickAndSumData(pick(allDataSetsNoCalcFilter, 'eldy', 'b'),target), target)}kr`,
      diff: calcDiff(pickAndSumData(pick(allDataSetsNoCalcFilter, 'eldy', 'a'),target), pickAndSumData(pick(allDataSetsNoCalcFilter, 'eldy', 'b'),target))
    },
    {
      id: 'water',
      icon: faTint,
      iconColor: 'info',
      primaryText: 'Water',
      secondaryText: `${numberWithCommas(pickAndSumData(pick(allDataSetsNoCalcFilter, 'water', 'a'),target), target)}kr`,
      subberText: `${numberWithCommas(pickAndSumData(pick(allDataSetsNoCalcFilter, 'water', 'b'),target), target)}kr`,
      diff: calcDiff(pickAndSumData(pick(allDataSetsNoCalcFilter, 'water', 'a'),target), pickAndSumData(pick(allDataSetsNoCalcFilter, 'water', 'b'),target))
    },
    {
      id: 'waste',
      icon: faTrashAlt,
      iconColor: 'info',
      primaryText: 'House Waste',
      secondaryText: `${numberWithCommas(pickAndSumData(pick(allDataSetsNoCalcFilter, 'waste', 'a'),target), target)}kr`,
      subberText: `${numberWithCommas(pickAndSumData(pick(allDataSetsNoCalcFilter, 'waste', 'b'),target), target)}kr`,
      diff: calcDiff(pickAndSumData(pick(allDataSetsNoCalcFilter, 'waste', 'a'),target), pickAndSumData(pick(allDataSetsNoCalcFilter, 'waste', 'b'),target))
    },
    {
      id: 'gardenWaste',
      icon: faTrashAlt,
      iconColor: 'info',
      primaryText: 'Garden waste',
      secondaryText: `${numberWithCommas(pickAndSumData(pick(allDataSetsNoCalcFilter, 'gardenWaste', 'a'),target), target)}kr`,
      subberText: `${numberWithCommas(pickAndSumData(pick(allDataSetsNoCalcFilter, 'gardenWaste', 'b'),target), target)}kr`,
      diff: calcDiff(pickAndSumData(pick(allDataSetsNoCalcFilter, 'gardenWaste', 'a'),target), pickAndSumData(pick(allDataSetsNoCalcFilter, 'gardenWaste', 'b'),target))
    },
    {
      id: 'broadband',
      icon: faWifi,
      iconColor: '#25db23',
      primaryText: 'Broadband',
      secondaryText: `${numberWithCommas(pickAndSumData(pick(allDataSetsNoCalcFilter, 'broadband', 'a'),target), target)}kr`,
      subberText: `${numberWithCommas(pickAndSumData(pick(allDataSetsNoCalcFilter, 'broadband', 'b'),target), target)}kr`,
      diff: calcDiff(pickAndSumData(pick(allDataSetsNoCalcFilter, 'broadband', 'a'),target), pickAndSumData(pick(allDataSetsNoCalcFilter, 'broadband', 'b'),target))
    },
    {
      id: 'security',
      icon: faShieldAlt,
      iconColor: '#25db23',
      primaryText: 'Security alarm',
      secondaryText: `${numberWithCommas(pickAndSumData(pick(allDataSetsNoCalcFilter, 'security', 'a'),target), target)}kr`,
      subberText: `${numberWithCommas(pickAndSumData(pick(allDataSetsNoCalcFilter, 'security', 'b'),target), target)}kr`,
      diff: calcDiff(pickAndSumData(pick(allDataSetsNoCalcFilter, 'security', 'a'),target), pickAndSumData(pick(allDataSetsNoCalcFilter, 'security', 'b'),target))
    },
    {
      id: 'maintenance',
      icon: faTools,
      iconColor: '#ff6868',
      primaryText: 'Maintenance',
      secondaryText: `${numberWithCommas(pickAndSumData(pick(allDataSetsNoCalcFilter, 'maintenance', 'a'),target), target)}kr`,
      subberText: `${numberWithCommas(pickAndSumData(pick(allDataSetsNoCalcFilter, 'maintenance', 'b'),target), target)}kr`,
      diff: calcDiff(pickAndSumData(pick(allDataSetsNoCalcFilter, 'maintenance', 'a'),target), pickAndSumData(pick(allDataSetsNoCalcFilter, 'maintenance', 'b'),target))
    },
    {
      id: 'cleaning',
      icon: faBroom,
      iconColor: '#ff6868',
      primaryText: 'House cleaning',
      secondaryText: `${numberWithCommas(pickAndSumData(pick(allDataSetsNoCalcFilter, 'cleaning', 'a'),target), target)}kr`,
      subberText: `${numberWithCommas(pickAndSumData(pick(allDataSetsNoCalcFilter, 'cleaning', 'b'),target), target)}kr`,
      diff: calcDiff(pickAndSumData(pick(allDataSetsNoCalcFilter, 'cleaning', 'a'),target), pickAndSumData(pick(allDataSetsNoCalcFilter, 'cleaning', 'b'),target))
    },
    {
      id: 'loan',
      icon: faDollarSign,
      iconColor: '#5ae3c0',
      primaryText: 'House loan',
      secondaryText: `${numberWithCommas(pickAndSumData(pick(allDataSetsNoCalcFilter, 'loan', 'a'),target), target)}kr`,
      subberText: `${numberWithCommas(pickAndSumData(pick(allDataSetsNoCalcFilter, 'loan', 'b'),target), target)}kr`,
      diff: calcDiff(pickAndSumData(pick(allDataSetsNoCalcFilter, 'loan', 'a'),target), pickAndSumData(pick(allDataSetsNoCalcFilter, 'loan', 'b'),target))
    },
    {
      id: 'insurance',
      icon: faDollarSign,
      iconColor: '#5ae3c0',
      primaryText: 'Insurance',
      secondaryText: `${numberWithCommas(pickAndSumData(pick(allDataSetsNoCalcFilter, 'insurance', 'a'),target), target)}kr`,
      subberText: `${numberWithCommas(pickAndSumData(pick(allDataSetsNoCalcFilter, 'insurance', 'b'),target), target)}kr`,
      diff: calcDiff(pickAndSumData(pick(allDataSetsNoCalcFilter, 'insurance', 'a'),target), pickAndSumData(pick(allDataSetsNoCalcFilter, 'insurance', 'b'),target))
    }
  ]
  
  const renderTotalCards = totalCardarray.map(item => {
   
    
    return (
      <Grid item xs={6} sm={6} md={3}>
        <TotalCard
          id={item.id}
          faIcon={item.icon}
          iconColor={item.iconColor}
          diff={item.diff}
          primaryText={item.primaryText}
          secondaryText={item.secondaryText}
          subberText={item.subberText}
          calcPicker={calcPicker}
          onClick={calcPickerOnClick}
        />
      </Grid>
    )
  })



  

  return (
    <Layout title="Settings | Expenses App">
      <Grid container spacing={4}>
        <Grid item xs={12} sm={9}>
          <FlexView style={{alignItems: 'flex-start', flexDirection: 'column'}}>
            <StyledBox>
              <StyledText variant="body1">{currentYear}</StyledText>
              <h1 style={{marginBottom: 0, marginTop: -5,}}>
                Variable Costs Overview
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
            {renderTotalCards}
          </GridCon>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <FlexView style={{flexDirection: 'row'}}>
            <TotalTotalCard arrayBothYears={totalYearAYearB} />
          </FlexView>
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


IndexPage.getInitialProps = wrapper.getInitialPageProps(
  ({ dispatch }) => async () => {
      await dispatch(testing('server rendered from page: ' + global.isDev));
      await dispatch(setIsDev(global.isDev));
  }
);


export default IndexPage
