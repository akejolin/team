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
import FlexView from './flexView';
import Picker from '../components/Picker'
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {isBrowser} from '../utils/isBrowser'
import {yyyymmdd} from '../utils/yyyymmss';


interface Iprops {
  dataType:string
  formId: string
  update?:Function

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

  const empPicker = useAppSelector((state) => state.empPicker.value)

  const [open, setOpen] = React.useState(false);
  const [tags, _tags] = useState([])
  const [formDataId, _formDataId] = useState(-1)
  const [formDataEmp, _formDataEmp] = useState(global.dataKeys[empPicker])
  const [formDataDate, _formDataDate] = useState(yyyymmdd(new Date()) )
  const [formDataImpact, _formDataImpact] = useState(3)
  const [formDataTags, _formDataTags] = useState([])
  const [formDataComment, _formDataComment] = useState('')




  useEffect(() => {
    global.ipcRenderer.addListener(`RESPONSE_UPDATE_DATA_${props.formId}`, (_event, data?:[]) => {
      props.update('SUCCESS')
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
    inputTags.unshift(formDataEmp)

    const formData:I_note = {
      id: formDataId,
      year: stringDate.getFullYear(),
      date: formDataDate,
      emp: formDataEmp,
      impact: formDataImpact,
      tags: formDataTags,
      comment: formDataComment,
    }


    global.ipcRenderer.send('REQUEST_UPDATE_DATA', props.dataType, props.formId, formData)
    //global.ipcRenderer.send('REQUEST_APPEND_DATA', props.dataType, formData)
    

  }
  const openExternal = (file) => {
    global.ipcRenderer.send('OPEN_FILE_IN_OS', file)
  }
  const handleClick = () => {
    setOpen(true)
  };
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );


  function valuetext(value: number) {
    return `${value}°C`;
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
  
  const filterDisplay = (_formDataTags) => {


    return (
    <Grid item xs={12} sm={12}>
      <FilterDisplayBox style={{ alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'row', padding: 8}}>
        {_formDataTags.map((tag,ii) => (
          <FilterDisplayChip key={`form-tags-${tag}-${ii}`} label={tag} variant="outlined" onClick={() => removeFormTag(tag)} onDelete={() => removeFormTag(tag)} />
        ))}            
      </FilterDisplayBox>
    </Grid>
  )
  }

  const tagsDisplay = [...tags]
  tagsDisplay.unshift([
    'Select',
    'Add tag'
  ])


  return (
    <FormControl sx={{ m: 1, width: '100%' }}>
    <FlexView style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'left'}}>
      <div style={{width: '100%'}}>
        <Label>Id: {formDataId === -1 ? 'Not created yet' : formDataId}</Label>
        <Label style={{width: '100%'}}>
          Employee:
        </Label>
        <TextField
          aria-label="minimum height"
          minRows={3}
          placeholder="Employee"
          style={{width:'100%', background:'#081018', color: 'white', border:'none', fontSize:16}}
          value={formDataEmp}
          onChange={(e:React.ChangeEvent<{ value: unknown }>) => _formDataEmp(e.target.value)}
        />
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
      </div>
      <Label style={{width: '100%'}}>
        Comment:
      </Label>
      <div style={{width: '100%'}}>
        <TextareaAutosize
          aria-label="minimum height"
          minRows={3}
          placeholder="Comment"
          style={{width:'100%', background:'#081018', color: 'white', border:'none', fontSize:16}}
          value={formDataComment}
          onChange={(e:React.ChangeEvent<{ value: unknown }>) => _formDataComment(e.target.value)}
        />
      </div>
      <Label style={{width: '100%'}}>
        Tags:
      </Label>
      <div style={{margin: '16px 0px 0px 0px'}}>
        <Picker
          handleChange={(value:string) => addFormTag(value)}
          data={
            tagsDisplay.map(item => {
              return {
                key: `${item[1]}`,
                value: `${item[1]}`
              }
            })
          }
        />
      </div>
      <div style={{margin: '16px 0px'}}>
        { filterDisplay(formDataTags) }
      </div>
      <FlexView style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <div>
          <IconButton onClick={() => save()} color="primary" aria-label="Save" component="span">
            <SaveIcon />
          </IconButton>
          
        </div>

      </FlexView>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          message="Changes was saved"
          action={action}
        />
      
    </FlexView>
    </FormControl>
  )

  
}

Editor.defaultProps = {
  update: () => {}
}


export default Editor