import React from 'react'
import FlexView from '../components/styledFlexView'
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faArrowUp,
  faArrowDown
} from '@fortawesome/free-solid-svg-icons'

import type {TcalcReturnObj} from './../components/utils/calculations'

type Props = {
  obj?: TcalcReturnObj,
}


const DiffText = ( props: Props) => {

  if (typeof props.obj === 'undefined') {
    return null
  }

  const Increase = styled(Typography)(({ theme }) => ({
    color: '#e8593b',
    fontSize: 11
  }))

  const Decrease = styled(Typography)(({ theme }) => ({
    color: '#83e83b',
    fontSize: 11
  }))

  const Unchanged = styled(Typography)(({ theme }) => ({
    color: 'grey',
    fontSize: 11
  }))

  if (props.obj.increase === true) {
    return (
      <Increase><FontAwesomeIcon icon={faArrowUp} /> {props.obj.result}%</Increase>
    )
  } else {
    return (
      <Decrease><FontAwesomeIcon icon={faArrowDown} /> {props.obj.result}%</Decrease>
    )
  }
}

export default DiffText