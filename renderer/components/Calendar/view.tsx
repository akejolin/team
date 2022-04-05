import React, {useState, ReactNode}  from 'react'
import { styled } from '@mui/material/styles';
import './date.extensions'
import FlexView from '../styledFlexView' 
import PopOver from './popover'
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useAppSelector } from "../../redux/hooks";
export const Base = styled(FlexView)(({ theme }) => ({
  background:'none',
}))

interface Props {
  dates: any,
  people: any,
  todayDateString: string,
  CurrentDate: Date,
  currentIndex: number,
  prev?(toValue:number): any,
  next?(toValue:number): any,
  select?(data:any): any
}

  
export const View = (props: Props) => {
  const devMode = useAppSelector((state) => state.devMode.value)
  const [popOverContent, _popOverContent] = useState([])

  const tdWeekdays = props.dates.map((day) => {
    let todayMark = ""
    if (props.todayDateString === day.dateString) {
      todayMark = "TODAY"
    }
    return(
    <td
      key={`Weekdays-${day.dateNumber}`}
      className={['table-header', 'row-weekdays','weekday', day.weekday, day.weekdayType, `HEADER_${day.type}`, todayMark].join(' ')}
    >
      {day.weekday}
    </td>
  )})
    const tdPeople = props.people.map((person, i) => {
      return(
      <tr className={["row"].join("-")} key={`person-tr-${person.id}`}>
        <td className="table-body first">
          <a href="#">{person.name}</a>
        </td>
      {
        props.dates.map((date, i) => {
          let todayMark = ""
          if (props.todayDateString === date.dateString) {
            todayMark = "TODAY"
          }
          const ABSENT = person.dates.find(personDates => personDates.date === date.dateString)

          return (
          <td
            onClick={() => _popOverContent([{
              personId: person.id,
              stringDate: date.dateString,
              absentValue: ABSENT?.type,
              absentId: ABSENT ? Number(ABSENT?.id) : undefined
            }])}
            key={`person-td-${i}-${person.id}`}
            className={['person-date', 'table-body', `${ABSENT ? ABSENT.type : ''}`, 'weekday', date.weekday, date.weekdayType, todayMark].join(' ')}
            style={{position: 'relative'}}
          >
            <span>{date.dateNumber}</span>
          </td>
        )})
      }
      </tr>
    )})
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return (
      <Base>
          <FlexView style={{flexDirection: 'column',}}>
            <FlexView style={{flex: 'auto', flexDirection: 'column', height:'90%'}}>
              <FlexView style={{flexDirection: 'column'}}>
                <header>
                  <h4 className="calendar-header" >{months[props.CurrentDate.getMonth()]} - {props.CurrentDate.getFullYear()}</h4>
                </header>
                <table id="calendar-table" cellSpacing="0" cellPadding="0" width="100%">
                  <thead>
                    <tr>
                      <td className="table-header row-weekdays first"></td>
                      {tdWeekdays}
                    </tr>
                  </thead>
                  <tbody>
                    {tdPeople}
                  </tbody>
                </table>
                <div id="navigator-bar">
                  <IconButton onClick={()=>props.next(props.currentIndex-1)} color="primary" aria-label="upload picture" component="span">
                    <ArrowBackIosNewIcon />
                  </IconButton>
                  <IconButton onClick={()=>props.next(props.currentIndex+1)} color="primary" aria-label="upload picture" component="span">
                    <ArrowForwardIosIcon />
                  </IconButton>
                </div>
              </FlexView>
            </FlexView>
            <FlexView style={{flex: 'auto', backgroundColor: '#0059b3',height:'10%'}}>
              {popOverContent.length > 0 && (
                <PopOver
                  onChange={(data) => {
                    
                    _popOverContent([])
                    let formData:any = {
                      id: data.absentId ? Number(data.absentId): -1,
                      name: global.dataKeys[data.personId],
                      date: data.stringDate,
                      type: data.absentType 
                    }
                   
                    let action;
                    if (data.absentType === 'NONE' && data.absentId) {
                      action = 'DELETE'
                    } else if (data.absentId) {
                      action = 'UPDATE'
                    } else {
                      action = 'CREATE'
                    }

                    global.ipcRenderer.send(
                      'REQUEST_UPDATE_ABSENT', 
                      {
                        dataSource: `${devMode ? 'dev/' : ''}CALENDAR`,
                        receiverID: 'ABSENT',
                        formData,
                        action  
                      }
                    )
                    

                  }} data={popOverContent}/>
              )}
            </FlexView>
          </FlexView>
      </Base>
  )
}

View.defaultProps = {
  prev: (toValue) => {},
  next: (toValue) => {},
  select: () => {},
}

export default View