import React, {useState, useEffect} from 'react'
import FlexView from '../components/styledFlexView'
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PriceChange from '@mui/icons-material/PriceChange';


import { 
  faArrowUp,
  faArrowDown,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type {TcalcReturnObj} from './../components/utils/calculations'
import {sumArray } from '../components/utils/dataHelper'

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {numberWithCommas} from '../utils/thousendFormatter'

type Props = {

}


const HealthAllowance = ( props: Props) => {

  const dispatch = useAppDispatch()
  const currentEmp = useAppSelector((state) => state.empPicker.value);
  const currentYear = useAppSelector((state) => state.yearPicker.value);
  const yearlyHealthAllowance = useAppSelector((state) => state.constants.yearlyHealthAllowance);
  const [records, _records] = useState([])
  const [dense, setDense] = React.useState(false);

  interface IdataObject {
    [key: string]: string
  }

  useEffect(() => {
    global.ipcRenderer.addListener('DATA_RESPONSE_health_allowance', (_event, data) => {

      


      const reference:IdataObject = {}
      

      for (const [key, value] of Object.entries(global.dataKeys)) {
        reference[value] = key
      }
      

      const filteredData = data.filter((f) => 
        Number(f[0]) === Number(currentYear) && reference[f[2]] === currentEmp
      )
      let transformed = filteredData.map(item => {
        
        return {
          title: item[3],
          amount: item[4] ? Number(item[4]) : 0,
        }
      })
      const format = {

      }
      _records(transformed)
    })
  }, [currentEmp])

  useEffect(() => {
    global.ipcRenderer.send('REQUEST_DATA', 'health_allowance')

  },[currentEmp])



  const onClick = (e) => {
    //props.onClick({id: props.id}, e)
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  const CustomListItemText = styled(ListItemText)(({ theme }) => ({
    ":first-letter" : {
      textTransform: 'capitalize',
    }
  }))

  return (
  <FlexView style={{flexDirection: 'column', justifyContent: 'flex-start'}}>
    <List dense={dense} style={{width:'100%'}}>
    {
      records.map(item => (
        <React.Fragment>
      <ListItem>
        <ListItemIcon>
          <PriceChange />
        </ListItemIcon>
        <CustomListItemText
          primary={item.title}
          secondary={`${item.amount ? item.amount : '0'}kr`}
        />
      </ListItem>

      </React.Fragment>
      ))
    }
    </List>
    { records.length > 0 && (<Divider style={{width:'100%'}}/>)}
    <List dense={dense} style={{width:'100%'}}>
      <ListItem>
        <ListItemIcon>
          <PriceChange />
        </ListItemIcon>
        <ListItemText
          primary={`Total: ${numberWithCommas(sumArray(records.map(item => item.amount)))}kr`}
          secondary={`Left to spend: ${numberWithCommas(yearlyHealthAllowance - sumArray(records.map(item => item.amount)))}kr`}
        />
      </ListItem>
    </List>
  </FlexView>
)}

HealthAllowance.defaultProps = {
  onClick: () => {},
}

export default HealthAllowance