import React, {useState, useEffect, SetStateAction} from 'react'
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Slider from '@mui/material/Slider';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FlexView from '../../components/flexView';

import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";



import ReactMarkdown from 'react-markdown'

interface Iprops {
  update?:Function,
  dbid: number,
  settings: {
    dataType:string,
    formId: string
  }
}

interface I_note {
  id: Number,
  year: Number,
  date: string,
  emp: string,
  impact: number,
  tags: string[],
  comment: string,
}



const Editor = (props:Iprops) => {
  const { settings } = props
  const empPicker = useAppSelector((state) => state.empPicker.value)

  const [mdtext, _mdtext] = React.useState(`
## Hej
svejs! Så **kul**
  `);




  useEffect(() => {
    
    global.ipcRenderer.addListener(`RESPONSE_UPDATE_DATA_${props.settings.formId}`, (_event, data?:[]) => {
      props.update('SUCCESS')
    })
  },[])
  


  const save = (type:any, id, value:string) => {
    const formData:any = {
      id: Number(id),
      [type]: value,
    }
    global.ipcRenderer.send('REQUEST_UPDATE_DATA', 'NOTESMD', props.settings.formId, formData, 'UPDATE')
  }





  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6}>
        <FormControl sx={{ m: 1, width: '100%' }}>
          <div style={{width: '100%'}}>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={3}
              placeholder="Comment"
              style={{width:'100%', background:'#081018', color: 'white', border:'none', fontSize:16}}
              value={mdtext}
              onChange={(e:React.ChangeEvent<{ value: unknown }>) => _mdtext(e.target.value)}
            />
          </div>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <ReactMarkdown>
          {mdtext}
        </ReactMarkdown>
      </Grid>
    </Grid>
  )

  
}

Editor.defaultProps = {
  update: () => {}
}


export default Editor