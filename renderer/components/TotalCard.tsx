import React from 'react'
import FlexView from '../components/styledFlexView'
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { 
  faArrowUp,
  faArrowDown
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type {TcalcReturnObj} from './../components/utils/calculations'
import DiffText from './../components/diffText'
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { add, remove } from "../redux/calcPicker/slice";
import type { T_dataKey } from '../dataTypes/costs'

export interface T_diffOutput {
  diff: number,
  procent: number,
  increased: boolean,
  a: number,
  b: number,
}

type Props = {
  id: string,
  selected: boolean
  primaryText?: string,
  secondaryText?: string,
  subberText?: string,
  diffText?: TcalcReturnObj,
  diffUsage?: TcalcReturnObj,
  faIcon?: any,
  iconColor?: string,
  onClick?: Function,
  calcPicker?: Array<string>
  increased: boolean
  diff?: T_diffOutput
}


const TotalCard = ( props: Props) => {
  const diff = props.diff
  const calcPicker = props.calcPicker // useAppSelector((state) => state.calcPicker.value);
  const dispatch = useAppDispatch()

  const isSelected:boolean = calcPicker.find(item => item === props.id)?true:false;

  const iconColor = props.iconColor ? props.iconColor : '#ffffff'

  const StyledFlex = styled(FlexView)(({ theme }) => ({
    background: 'radial-gradient(circle, rgba(16,32,52,1) 0%, rgba(14,29,46,1) 100%)',
    borderRadius: 3,
    height: 80,
    border: isSelected ? 'solid 1px #f1f1f1' : 'none' 
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
     fontSize: 19,
  }))

  const diffUsage = props.diffUsage ? `(${props.diffUsage.procent})` : ''


  const DefaultColorText = styled('span')(({ theme }) => ({}))
  const Increase = styled(Typography)(({ theme }) => ({
    color: '#e8593b',
    fontSize: 11
  }))
  const Decrease = styled(Typography)(({ theme }) => ({
    color: '#83e83b',
    fontSize: 11
  }))

  const DiffDisplay = (props) => {
    if (!diff) return null;
    const icon = diff.procent === 0 ? null: diff.procent > 0 ? faArrowUp : faArrowDown
    if (diff.increased) {
      return (
        <Increase>
          {icon && (<FontAwesomeIcon icon={icon} />)}
          {diff.procent}%
        </Increase>
      )
    } else {
      return (
        <Decrease>{icon && (<FontAwesomeIcon icon={icon} />)} {diff.procent}%</Decrease>
      )
    }
  }

  const onClick = (e) => {
    props.onClick({id: props.id}, e)
  }

  return (
  <StyledFlex>
    <FlexView style={{cursor: 'pointer'}} onClick={onClick}>
        <IconWindow style={{width: 70, height:'50px',}}>
          <FontAwesomeIcon icon={props.faIcon} />
        </IconWindow>  
        <FlexView style={{flexDirection:'column', alignItems:'flex-start', textAlign: 'left'}}>
          <div style={{height: 20, paddingTop: 8}}>
            <PrimaryText variant="body2">{props.primaryText}</PrimaryText>
          </div>
          <FlexView style={{justifyContent: 'space-between', height: 10, }}>
            <SecondaryText variant="body1">{props.secondaryText}</SecondaryText>
            <div style={{paddingRight: 8}}><DiffDisplay /></div>
          </FlexView>
          <div style={{height: 20}}>
            <SubberText>{props.subberText} {diffUsage}</SubberText>
          </div>
        </FlexView>


    </FlexView>
    
  </StyledFlex>
)}

TotalCard.defaultProps = {
  selected: false,
  onClick: () => {},
  calcPicker: [],
  increased: false
}

export default TotalCard