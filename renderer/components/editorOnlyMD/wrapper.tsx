import React, {useState, useEffect} from 'react'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';


import FlexView from '../../components/styledFlexView'

import MdEditor from 'react-markdown-editor-lite';
import ReactMarkDown from '../markdown-handler'


import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {add as actionLogAdd} from '../../redux/actionLog/slice'
import type {Ilog} from '../../redux/actionLog/slice'

interface Iprops{
  showCloseCB?(state:boolean): void,
  update?(): void,
  dbid: number,
  settings: {
    dataType: string,
    formId: string
  }
}


export const EditorWrapper = (props:Iprops) => {
  const devMode = useAppSelector((state) => state.devMode.value)
  const [mdtext, _mdtext] = useState()
  const dispatch = useAppDispatch()
  useEffect(() => { 

    global.ipcRenderer.addListener(`RESPONSE_UPDATE_DATA_${props.settings.formId}`, (_event, data?:[]) => {
      props.update()
      dispatch(actionLogAdd({action: 'Save', description: 'Data was successfully stored'} as Ilog))
    })
    global.ipcRenderer.addListener(`RESPONSE_QUERY_DATA_${props.settings.formId}`, (_event, data?:[]) => {
      // @ts-ignore
      _mdtext(data[0]?.comment)
      
    })

    global.ipcRenderer.send('REQUEST_QUERY_DATA',
      { 
        dataSource: `${devMode ? 'dev/' : ''}${props.settings.dataType}`,
        receiverID: props.settings.formId,
        sortKey: 'id',
        needles: [props.dbid],
      }
    )
  },[])

  useEffect(() => { 

  },[])


  const save = (type:any, id, value:string) => {
    const formData:any = {
      id: Number(id),
      [type]: value,
    }

    global.ipcRenderer.send(
      'REQUEST_UPDATE_DATA', 
      {
        dataSource: `${devMode ? 'dev/' : ''}${props.settings.dataType}`,
        receiverID: props.settings.formId,
        formData,
        action: 'UPDATE'
      }
    )
  }

  return (
    <div style={{position: 'fixed', overflow:'auto',top: 0, left:0, zIndex: 10, padding: 20, width: '100%', height: '100vh', background: 'rgba(0,0,0,.8)'}}>
      <FlexView style={{height: 'auto', justifyContent: 'space-between'}}>
        <div>
          <h3>Data Editor</h3>
        </div>
        <div>
        <IconButton onClick={() => save('comment', props.dbid, mdtext)}>
            <SaveIcon fontSize="medium" />
          </IconButton>
          <IconButton onClick={() => props.showCloseCB(false)}>
            <CloseIcon fontSize="medium" />
          </IconButton>
        </div>
      </FlexView>
      <div style={{overflow:'auto'}}>
        <MdEditor
          value={mdtext}
          style={{ height: '600px' }}
          renderHTML={text => <ReactMarkDown source={text} />}
          onChange={({ text }) => _mdtext(text)}
        />
      </div>
  </div>
  )
}

export default EditorWrapper