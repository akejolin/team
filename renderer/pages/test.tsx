import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'
import {isBrowser} from '../utils/isBrowser'
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import { add as filterAdd, remove as filterRemove, reset as filterReset} from "../redux/noteFilterPicker/slice";

const TestPage = () => {
  const empPicker = useAppSelector((state) => state.empPicker.value)
  const noteFilter = useAppSelector((state) => state.noteFilterPicker.value)
  
  const [dataDisplayed, _dataDisplayed] = useState([])
  const [secondTest, _secondTest] = useState([])
  const [buttonClicked, _buttonClicked] = useState(0)
  
  const dispatch = useAppDispatch()

  useEffect(() => {
    console.log('Event listener installed')
    global.ipcRenderer.addListener('RESPONSE_QUERY_DATA_NOTES', (_event, data?:[]) => { 
      console.log('how many times should we run ')
      return _dataDisplayed(data)
    })
  },[])

  useEffect(() => {
    //global.ipcRenderer.send('REQUEST_QUERY_DATA', 'NOTES', noteFilter)
  },[])

  useEffect(() => {
    dispatch(filterReset())
    dispatch(filterAdd(global.dataKeys[empPicker]))
  }, [empPicker])

  useEffect(() => {
    global.ipcRenderer.send('REQUEST_QUERY_DATA', 'NOTES', noteFilter)
  }, [noteFilter])
  
  console.log('buttonClickedbuttonClicked: ', buttonClicked)
  console.log('dataDisplayed: ', dataDisplayed)

  return (
  <div>
      <button onClick={() => _buttonClicked(buttonClicked + 1)} value="update">update</button>
      <Link href="/" passHref><span>Home</span></Link>
  </div>  

  )
}

export default TestPage
