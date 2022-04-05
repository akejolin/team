import React, {useState, ReactNode}  from 'react'
import { styled } from '@mui/material/styles';
import './date.extensions'
import FlexView from '../styledFlexView' 
import PopOverForm from './popover'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import PopOver from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
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
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const tdWeekdays = props.dates.map((day) => (
    <td key={`Weekdays-${day.dateNumber}`}
      className={['table-header', 'row-weekdays','weekday', day.weekday, day.weekdayType, `HEADER_${day.type}`, props.todayDateString === day.dateString ? 'TODAY': ''].join(' ')}
    >
      {day.weekday}
    </td>
  ))
  const tdPeople = props.people.map((person, ii) => (
    <tr className={["row"].join("-")} key={`person-tr-${person.id}`}>
      <td className="table-body first">{person.name}</td>
    {
      props.dates.map((date, i) => {
        let todayMark = ""
        if (props.todayDateString === date.dateString) {
          todayMark = "TODAY"
        }
        const ABSENT = person.dates.find(personDates => personDates.date === date.dateString)


        const LAST_ROW = ii === props.people.length-1 ? 'table-footer' : ''

        return (
        <td
          key={`person-td-${i}-${person.id}`}
          className={['person-date', 'table-body', `${ABSENT ? ABSENT.type : ''}`, 'weekday', date.weekday, date.weekdayType, todayMark, LAST_ROW].join(' ')}
          style={{position: 'relative', textAlign: 'center'}}
        >
          <Button
            style={{minWidth: 1}}
            size="small"
            onClick={(e) => {
              setAnchorEl(e.currentTarget)
              _popOverContent([{
                personId: person.id,
                stringDate: date.dateString,
                absentValue: ABSENT?.type,
                absentId: ABSENT ? Number(ABSENT?.id) : undefined
              }])
            }}
          >{date.dateNumber}</Button>
        </td>
      )})
    }
    </tr>
  ))
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
        {popOverContent.length > 0 && (
          <PopOver
            id='some-id'
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={()=>setAnchorEl(null)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <PopOverForm
              onChange={(data) => {
                
                _popOverContent([])
                setAnchorEl(null)

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
              }}
              data={popOverContent}
            />
          </PopOver>
        )}
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