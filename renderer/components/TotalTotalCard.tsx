import React from 'react'
import FlexView from '../components/styledFlexView'
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import {numberWithCommas} from '../utils/thousendFormatter'
import { faCashRegister } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type {TcalcReturnObj} from './../components/utils/calculations'
import DiffText from './../components/diffText'
import type { T_CostsDataSet } from '../dataTypes/costs'
import { useAppSelector } from "../redux/hooks";

import {filterAllMonthBeforeAndUntil, pickData, pickAndSumData, multiFilterAndSelectOne, sumArray } from './utils/dataHelper'
import { getMonth, getCurrentYear } from './../utils/dateHelpers'
import {totalDiffInProgressFromLastYear} from './utils/calculations'

const round = (num) => Math.round(num * 10) / 10

type Props = {
  arrayYearA: T_CostsDataSet[],
  arrayYearB: T_CostsDataSet[],
  arrayBothYears: Array<{a:T_CostsDataSet, b:T_CostsDataSet}>
  sumYearA:number,
  sumYearB:number,
}






const TotalCard = ( props: Props) => {

  const yearA = Number(useAppSelector((state) => state.yearPicker.value))
  const yearB = yearA - 1;
  
  const arrayYearA = props.arrayBothYears.map(item => item['a'])
  const arrayYearB = props.arrayBothYears.map(item => item['b'])


  const sumYearA = sumArray(arrayYearA.map(item => item[2]))
  const sumYearB = sumArray(arrayYearB.map(item => item[2]))


  let diff = sumYearA - sumYearB

  const inProcent = (part, sumYearA, sumYearB) => sumYearB !== 0 ? round((Number(part) / Number(sumYearB)) * 100) : sumYearA === 0 ? 0 : 100 
  const result = inProcent(diff,sumYearA, sumYearB)
  
  const isIncreased = result > 0 ? true : false 
  
  const iconColor = '#ffffff'

  const StyledFlex = styled(FlexView)(({ theme }) => ({
    background: 'radial-gradient(circle, rgba(16,32,52,1) 0%, rgba(14,29,46,1) 100%)',
    borderRadius: 3,
    height: 80,
  }))
  
  const PrimaryText = styled(Typography)(({ theme }) => ({
    color: '#a1a1a1',
  }))
  const SecondaryText = styled(Typography)(({ theme }) => ({
    color: '#ffffff',
    fontSmooth: 'always',
    fontWeight: 'bold',
    fontSize: 19
  }))
  const SubberText = styled(Typography)(({ theme }) => ({
    fontSmooth: 'always',
    fontSize: 11,
    color: '#a1a1a1',
  }))

  const IconWindow = styled(FlexView)(({ theme }) => ({
    margin: 20,
    background:'radial-gradient(circle, rgba(18,37,60,1) 0%, rgba(6,14,23,1) 100%)',
    borderRadius: 3,
    color: iconColor.match(/#/g) ? iconColor : theme.palette[iconColor ? iconColor : 'warning'].main,
    fontSize: 17,
    fontWeight: 'bold',
 }))


  const YellowText = styled('span')(({ theme }) => ({color: theme.palette['warning'].main}))
  const BlueText = styled('span')(({ theme }) => ({color: theme.palette['info'].main}))
  const PurpleText = styled('span')(({ theme }) => ({color: theme.palette['secondary'].main}))
  const GreenText = styled('span')(({ theme }) => ({color: '#25db23'}))
  const RedText = styled('span')(({ theme }) => ({color: theme.palette['error'].main}))

  const SetColor = isIncreased ? RedText : GreenText

  

  return (
  <StyledFlex>
    <FlexView>
        <IconWindow style={{width: 70, height:'50px',}}>
          {yearA}
        </IconWindow>  
        <FlexView style={{flexDirection:'column', alignItems:'flex-start', textAlign: 'left'}}>
          <div style={{height: 20, paddingTop: 8}}>
            <PrimaryText variant="body2">Total</PrimaryText>
          </div>
          <FlexView style={{justifyContent: 'space-between', height: 10, }}>
            <SecondaryText>{`${numberWithCommas(sumYearA)}kr`}</SecondaryText>
          </FlexView>
          <div style={{height: 22}}>
            <SubberText>Some text</SubberText>
          </div>
        </FlexView>
    </FlexView>

    <FlexView>
        <IconWindow style={{width: 70, height:'50px',}}>
          {yearB}
        </IconWindow>  
        <FlexView style={{flexDirection:'column', alignItems:'flex-start', textAlign: 'left'}}>
          <div style={{height: 20, paddingTop: 8}}>
            <PrimaryText variant="body2">Total</PrimaryText>
          </div>
          <FlexView style={{justifyContent: 'space-between', height: 10, }}>
            <SecondaryText>{`${numberWithCommas(sumYearB)}kr`}</SecondaryText>
          </FlexView>
          <div style={{height: 22}}>
            <SubberText>Some text</SubberText>
          </div>
        </FlexView>
    </FlexView>


    <FlexView>
        <IconWindow style={{width: 70, height:'50px',}}>
          Diff
        </IconWindow>  
        <FlexView style={{flexDirection:'column', alignItems:'flex-start', textAlign: 'left'}}>
          <div style={{height: 20, paddingTop: 8}}>
            <PrimaryText variant="body2">{isIncreased ? 'Cost increase' : 'Cost decrease'}</PrimaryText>
          </div>
          <FlexView style={{justifyContent: 'space-between', height: 10, }}>
            <SecondaryText><SetColor>{`${numberWithCommas(diff)}kr`}</SetColor></SecondaryText>
          </FlexView>
          <div style={{height: 22}}>
            <SubberText><SetColor>{`${result}%`}</SetColor></SubberText>
          </div>
        </FlexView>
    </FlexView>

  </StyledFlex>
)}

TotalCard.defaultProps = {
  arrayYearA: [],
  arrayYearB: [],
  arrayBothYears: [],
  sumYearA: 0,
  sumYearB: 0,
}

export default TotalCard