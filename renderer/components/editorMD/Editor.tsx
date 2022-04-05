import React, {useState, useEffect} from 'react'
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';

import FlexView from '../../components/flexView';
import Picker from '../../components/Picker'
import {yyyymmdd} from '../../utils/yyyymmss';

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {add as actionLogAdd} from '../../redux/actionLog/slice'
import type {Ilog} from '../../redux/actionLog/slice'

import MdEditor from 'react-markdown-editor-lite';
import ReactMarkDown from '../markdown-handler'
import PositionedMenu from '../../components/PositionedMenu';

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
  const dispatch = useAppDispatch()
  const empPicker = useAppSelector((state) => state.empPicker.value)
  const devMode = useAppSelector((state) => state.devMode.value)

  const [open, setOpen] = React.useState(false);
  const [tags, _tags] = useState([])
  const [formDataId, _formDataId] = useState(-1)
  const [formDataEmp, _formDataEmp] = useState(global.dataKeys[empPicker])
  const [formDataDate, _formDataDate] = useState(yyyymmdd(new Date()) )
  const [formDataImpact, _formDataImpact] = useState(3)
  const [formDataTags, _formDataTags] = useState([])
  const [formDataComment, _formDataComment] = useState('')

  const dataFill = {
    id: _formDataId,
    year: () => {},
    date: _formDataDate,
    emp: _formDataEmp,
    impact: _formDataImpact,
    tags: _formDataTags,
    comment: _formDataComment,
  }



  useEffect(() => {

    global.ipcRenderer.addListener(`RESPONSE_QUERY_DATA_${props.settings.formId}`, (_event, data?:[]) => {
      // @ts-ignore
      const dbData:I_note = Array.isArray(data) && data.length > 0 ? data[0] : null
      // @ts-ignore
      Object.keys(dbData).forEach(field => {
        dataFill[field] ? dataFill[field](dbData[field]): null
      })
    })


    // If editing existing
    if (props.dbid !== -1) {
      global.ipcRenderer.send('REQUEST_QUERY_DATA',
        { 
          dataSource: `${devMode ? 'dev/' : ''}${props.settings.dataType}`,
          receiverID: props.settings.formId,
          sortKey: 'id',
          needles: [props.dbid],
        }
      )
    }

    global.ipcRenderer.addListener(`RESPONSE_UPDATE_DATA_${props.settings.formId}`, (_event, data?:[]) => {
      props.update('SUCCESS')
      dispatch(actionLogAdd({action: 'Save', description: 'Data was successfully stored'} as Ilog))
      setOpen(true)
    })
    global.ipcRenderer.addListener('DATA_RESPONSE_SYSTEM_TAGS', (_event, data) => {
      _tags([...data])
    })
    global.ipcRenderer.send('REQUEST_DATA', 'SYSTEM_TAGS')
  },[])
  

  const save = () => {

    const stringDate = new Date(formDataDate);

    const inputTags = formDataTags
    if (!inputTags.includes(formDataEmp)) inputTags.unshift(formDataEmp);

    const formData:I_note = {
      id: Number(formDataId),
      year: stringDate.getFullYear(),
      date: formDataDate,
      emp: formDataEmp,
      impact: Number(formDataImpact),
      tags: formDataTags,
      comment: formDataComment,
    }

    global.ipcRenderer.send(
      'REQUEST_UPDATE_DATA', 
      {
        dataSource: `${devMode ? 'dev/' : ''}${props.settings.dataType}`,
        receiverID: settings.formId,
        formData,
      }
    )
  }

  const addFormTag = (value) => {
    if (!formDataTags.includes(value) && value !== 'Select') {
      const nextData = formDataTags
      !formDataTags.includes(value) ? nextData.push(value) : null
      _formDataTags([...nextData])
    }
  }
  const removeFormTag = (value) => {
    let nextData = []
    nextData = formDataTags.filter(item => item !== value)
    _formDataTags([...nextData])
  }
  
  const Label = styled('div')(({ theme }) => ({
    margin: '10px 0px'
  }))
  const FilterDisplayBox = styled(FlexView)(({ theme }) => ({
    background: 'none', 
  }))
  
  const FilterDisplayChip = styled(Chip)(({ theme }) => ({
    background: '#F95738',
    '&:hover': {
      background: "rgba(255, 255, 255,.7)",
    },
    margin: 4,
  }))
  

  const tagsDisplay = [...tags]
  tagsDisplay.unshift([
    'Select',
    'Add tag'
  ])


  const filterDisplay = (_formDataTags) => {


    return (

      <FilterDisplayBox style={{ alignItems: 'flex-end', justifyContent: 'flex-end', flexDirection: 'row', padding: 8}}>
        <div style={{margin: '0px 8px 0px 0px'}}>
          <PositionedMenu
            list={tagsDisplay.map(item => ({key: item[1], value: item[1]}))}
            id={'tag-add'}
            onChange={(value) => addFormTag(value)}
            buttonText={'Add +'}
          />
        </div>
        {_formDataTags.map((tag,ii) => (
          <FilterDisplayChip key={`form-tags-${tag}-${ii}`} label={tag} variant="outlined" onClick={() => removeFormTag(tag)} onDelete={() => removeFormTag(tag)} />
        ))}            
      </FilterDisplayBox>

  )
  }



/*
        <Label>Id: {formDataId === -1 ? 'Not created yet' : formDataId}</Label>

        <Label style={{width: '100%'}}>
          Date:
        </Label>
        <TextField
          aria-label="minimum height"
          minRows={3}
          placeholder="Date"
          style={{width:'100%', background:'#081018', color: 'white', border:'none', fontSize:16}}
          value={formDataDate}
          onChange={(e:React.ChangeEvent<{ value: unknown }>) => _formDataDate(e.target.value)}
        />
        <Label style={{width: '100%'}}>
          Impact:
        </Label>
        <Slider
          aria-label="Impact"
          value={formDataImpact}
          getAriaValueText={valuetext}

          style={{maxWidth: 500, border:'none', fontSize:16}}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={5}
          onChange={(e:React.ChangeEvent<{ value: unknown }>) => _formDataImpact(e.target.value)}
        />

*/

  function onImageUpload(file) {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = data => {
        resolve(data.target.result);
      };
      reader.readAsDataURL(file);
    });
  }

  return (
    <FormControl sx={{ m: 1, width: '100%' }}>
    <FlexView style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'left'}}>
      <div style={{width: '99%'}}>
        <MdEditor
          value={formDataComment}
          style={{ height: '500px' }}
          renderHTML={text => <ReactMarkDown source={text} />}
          onChange={({ text }) => _formDataComment(text)}
          onImageUpload={onImageUpload}
          imageAccept={'.jpg,.jpeg,.gif,.png'}
        />
      </div>
      <FlexView style={{width: '99%', flexDirection: 'row', justifyContent: 'space-between'}}>
      <div>
        <TextField
          aria-label="minimum height"
          minRows={3}
          placeholder="Employee"
          style={{width:'100%', maxWidth:300, background:'#081018', color: 'white', border:'none', fontSize:16}}
          value={formDataEmp}
          onChange={(e:React.ChangeEvent<{ value: unknown }>) => _formDataEmp(e.target.value)}
        />
      </div>
      <FlexView style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        { filterDisplay(formDataTags) }
      </FlexView>
      </FlexView>
      <FlexView style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <div>
          <IconButton onClick={() => save()} color="primary" aria-label="Save" component="span">
            <SaveIcon />
          </IconButton>
          
        </div>
      </FlexView>
    </FlexView>
    </FormControl>
  )
}

Editor.defaultProps = {
  update: () => {}
}
export default Editor