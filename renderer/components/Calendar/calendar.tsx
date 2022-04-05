import React, {useState, useEffect} from 'react'
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import {monthNumber, HALF_DAYS, WEEKDAY, reddays} from './data'
import yyyymmdd from '../../utils/yyyymmss'
import './date.extensions'
import {addMonths} from './date.extensions'

import CalendarView from './view'

interface Props {
  next?: number,
  currentDate?: number
}


const requestData = (devMode) => {
  global.ipcRenderer.send('REQUEST_QUERY_DATA', {
    dataSource: `${devMode ? 'dev/' : ''}calendar`,
    receiverID: 'CALENDAR',
    sortKey: 'date',
    needles: []
  })
}

export const Calendar = (props: Props) => {

  const devMode = useAppSelector((state) => state.devMode.value)

  const [currentIndex, _currentIndex] = useState(0)
  const [newDate, _newDate] = useState(new Date())
  const [calendarData, _calendarData] = useState([])

  let __newDate:Date = new Date()
  
  useEffect(() => {
    const setNewDate = addMonths(__newDate, currentIndex)
    _newDate(setNewDate)
  }, [currentIndex])


  useEffect(() => { 
    global.ipcRenderer.addListener('RESPONSE_QUERY_DATA_CALENDAR', (_event, data?:[]) => {
      _calendarData([...data])
      console.log('RESPONSE_QUERY_DATA ***** : ', data)
    })

    global.ipcRenderer.addListener('RESPONSE_UPDATE_DATA_ABSENT', (_event) => {
      requestData(devMode)
    })

  },[])

  useEffect(() => {
    requestData(devMode)
  }, [devMode])

  // dates ------------------------------------------------

  const updateCalendar = (newDate) => {
    var date = newDate || props.currentDate;
    var day = 1;
    var month = date.getMonth();
    var year = date.getFullYear();

    const daysInMonth = (month,year) => {
      var r = new Date(year, (month+1), 0).getDate();
      return r;
    }

    let total, output = [], _date, weekdayNum;

    const redDays = reddays;

    total = daysInMonth(month, year);
    for (var i=0; i<total; i++) {
      day = (i+1);
      _date = new Date(year, month, day);

      let _type = "NONE"
      let _comments = ""

      // Red days ***
      var date_string = yyyymmdd(_date);
      for (var ii=0; ii<redDays.length; ii++) {
        if (date_string === redDays[ii].date) {
          _type = "RED_DAY"
          _comments = redDays[ii].name
        }
      }
      // Half days ***
      var date_string = yyyymmdd(_date);
      for (var ii=0; ii<HALF_DAYS.length; ii++) {
        if (date_string === HALF_DAYS[ii].date) {
          _type = "HALF_DAY"
          _comments = HALF_DAYS[ii].name
        }
      }

      // Weekdays ***
      weekdayNum = _date.getDay();
      let weekdayCode = WEEKDAY[weekdayNum]
      let weekdayType = 'weekday'
      if (weekdayCode === 'S') {
        weekdayType = 'weekend'
      }

      // Result ***
      output.push({
        dateNumber: day,
        dateString: date_string,
        date:_date,
        weekday: weekdayCode,
        weekdayType: weekdayType,
        type: _type,
        comments:_comments
      });
    }
    return output;
  }

  // People ------------------------------------------------

  const People = Object.keys(global.dataKeys).map(item => {
    return {
      name: `${global.dataKeys[item]}`,
      id: `${item}`,
      dates: [],
      type: 'employee',
    }
  })

  const loadPeople = () => {
    return People.map(item => {
      item.dates = calendarData.filter(sak => sak.name === item.name)
      return item
    })
  }

  // update ------------------------------------------------
  const updatePersonDate = (data:any) => {

  }

  // render ------------------------------------------------

  const dates = updateCalendar(newDate);
  const todayDate = new Date()

  return (
    <CalendarView 
     dates={dates}
     people={loadPeople()}
     currentIndex={currentIndex}
     CurrentDate={newDate}
     todayDateString={yyyymmdd(todayDate)}
     next={(toValue) => _currentIndex(toValue)}
     select={(data) => updatePersonDate(data)}
    />
  )
}

export default Calendar