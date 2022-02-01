import React, { useState, useEffect } from 'react'

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Layout from '../components/Layout'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import FlexView from '../components/styledFlexView'
import Picker from '../components/Picker'
import { set as empPickerSet } from "../redux/empPicker/slice";
import { set as yearPickerSet } from "../redux/yearPicker/slice";
import EditorMDWrapper from '../components/editorMD/wrapper'
import EditorOnlyMDWrapper from '../components/editorOnlyMD/wrapper'
import {Card} from '../components/charts/cardDesign'
import {mdToComponent} from '../components/mdRenderer';
import DeleteDialog from '../components/Dialog'

import { 
  faComment,
  faCogs,
  faFile,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {add as actionLogAdd} from '../redux/actionLog/slice'
import type {Ilog} from '../redux/actionLog/slice'
import { T_annotationDataSet, T_annotationRawData } from '../dataTypes/annotations';
import { dayStringFormatter, monthStringFormatter } from '../utils/dateHelpers';

import { add as filterAdd, remove as filterRemove, reset as filterReset} from "../redux/noteFilterPicker/slice";
import {isBrowser} from '../utils/isBrowser'
import { getCurrentYear } from './../utils/dateHelpers'

let filter = []
let deleteTarget = -1
const IndexPage = () => {
  const currentYear = useAppSelector((state) => state.yearPicker.value);
  const empPicker = useAppSelector((state) => state.empPicker.value)
  const noteFilter = useAppSelector((state) => state.noteFilterPicker.value)
  const devMode = useAppSelector((state) => state.devMode.value)
  const [openDeleteDialog, _openDeleteDialog] = React.useState(false);
  filter = noteFilter
  const dispatch = useAppDispatch()

  const [dataDisplayed, _dataDisplayed] = useState([])
  const [dataDB, _dataDB] = useState([])
  const [notes, _notes] = useState([])
  const [showAddNewForm, _showAddNewForm] = useState(false)
  const [editorDbId, _editorDbId] = useState(-1)
  const [showMDEditor, _showMDEditor] = useState(false)
  const [MDeditorDbId, _MDeditorDbId] = useState(-1)

  interface I_note {
    id: Number,
    year: Number,
    date: string,
    emp: string,
    impact: number,
    tags: string[],
    comment: string,
  }

  const updateFeed = () => {
    global.ipcRenderer.send('REQUEST_QUERY_DATA', {
      dataSource: `${devMode ? 'dev/' : ''}NOTES`,
      receiverID: 'notelist',
      sortKey: 'tags',
      needles: filter
    })
  }

  useEffect(() => {
    dispatch(filterReset())
    dispatch(filterAdd(global.dataKeys[empPicker]))
  }, [empPicker])

  useEffect(() => {
    updateFeed()
    filter = noteFilter
  }, [noteFilter])

  useEffect(() => {
    updateFeed()
  }, [devMode])

  useEffect(() => { 

    
    global.ipcRenderer.addListener('RESPONSE_QUERY_DATA_notelist', (_event, data?:[]) => {
      _dataDisplayed([...data])
    })
    global.ipcRenderer.addListener('RESPONSE_UPDATE_DATA_NOTES_FEED', (_event) => {
      dispatch(actionLogAdd({action: 'Save', description: 'Data was successfully updated'} as Ilog))
      updateFeed()
    })
    
  },[])
  
  useEffect(() => {
    if (!showAddNewForm) {
      _editorDbId(-1)
    }
  },[showAddNewForm])

  useEffect(() => {
    if (!showMDEditor) {
      _MDeditorDbId(-1)
    }
  },[showMDEditor])

  
  

  const GridCon = Grid
  const StyledBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(1),
      paddingRight: theme.spacing(2)
    }
  }))
  const StyledText = styled(Typography)(({ theme }) => ({
    color: '#a1a1a1'
  }))

  const Body = styled(Typography)(({ theme }) => ({
    paddingBottom: 16
  }))
  const IconBox = styled(FlexView)(({ theme }) => ({
    fontSize: 40,
    padding: '0px 20px 20px 20px',
    width: 100,
    alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'row'
  }))
  const FileDisplay = styled('span')(({ theme }) => ({
    fontSize: 14,
    paddingLeft: 10,
    paddingBottom: 10,
    color: theme.palette['primary'].main
  }))
  
  

  const YellowText = styled('span')(({ theme }) => ({
    color: theme.palette['warning'].main
  }))
  const BlueText = styled('span')(({ theme }) => ({
    color: theme.palette['info'].main
  }))
  const PurpleText = styled('span')(({ theme }) => ({
    color: theme.palette['secondary'].main
  }))
  const GreenText = styled('span')(({ theme }) => ({
    color: '#25db23'
  }))

  const openExternal = (file) => {
    global.ipcRenderer.send('OPEN_FILE_IN_OS', file)
  }

  const FilterDisplayBox = styled(FlexView)(({ theme }) => ({
    background: 'none', //'#25db23'
  }))

  const FilterDisplayChip = styled(Chip)(({ theme }) => ({
    background: '#F95738',
    '&:hover': {
      background: "rgba(255, 255, 255,.7)",
    }
  }))

  const addTag = (tag) => dispatch(filterAdd(tag))
  const removeTag = (tag) => dispatch(filterRemove(tag))

  const filterDisplay = () => (
    <Grid item xs={12} sm={12}>
      <FilterDisplayBox style={{ alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'row', padding: 8}}>
        {noteFilter.map((t,ii) => (
          <FilterDisplayChip key={`tags-${t}-${ii}`} label={t} variant="outlined" onClick={() => removeTag(t)} onDelete={() => removeTag(t)} />
        ))}            
      </FilterDisplayBox>
    </Grid>
  )

  type I_noteKey = 'year' | 'date' |'emp' |'impact' |'tags' |'comment'
  const updateData = (type:I_noteKey, id, value:string) => {
    const formData:any = {
      id: Number(id),
      [type]: value,
    }
    global.ipcRenderer.send(
      'REQUEST_UPDATE_DATA', 
      {
        dataSource: `${devMode ? 'dev/' : ''}NOTES`,
        receiverID: 'NOTES_FEED',
        formData,
        action: 'UPDATE'
      }
    )
  }
  const deleteData = (id:number) => {
    const formData:any = {
      id: Number(id)
    }
    global.ipcRenderer.send(
      'REQUEST_UPDATE_DATA', 
      {
        dataSource: `${devMode ? 'dev/' : ''}NOTES`,
        receiverID: 'NOTES_FEED',
        formData,
        action: 'DELETE'
      }
    )
    deleteTarget = -1
  }

  return (
    <Layout title="Notes | Team App">
      <DeleteDialog
        id={`delete-dialog`}
        isOpen={openDeleteDialog}
        title={'Sure you wanna delete?'}
        desc={'This action cannot be undone.'}
        onConfirm={() => {
          _openDeleteDialog(false)
          deleteData(deleteTarget)
        }}
        onDeny={() => _openDeleteDialog(false)}
      />


        {showAddNewForm && (
          <EditorMDWrapper
            settings={{dataType: 'NOTES',formId:'NOTES_EDIT'}}
            dbid={editorDbId}
            showCloseCB={(state:boolean)=>_showAddNewForm(state)}
            update={updateFeed}
            headline={'Edit Notes'}
          />
        )}
        {showMDEditor && (
          <EditorOnlyMDWrapper
            settings={{dataType: 'NOTES',formId:'NOTES_EDIT'}}
            dbid={MDeditorDbId}
            showCloseCB={(state:boolean)=>_showMDEditor(state)}
            update={() => {
              _showMDEditor(false)
              updateFeed()
            }}
          />
        )}



      <Grid container spacing={4}>
        <Grid item xs={12} sm={9}>
          <FlexView style={{alignItems: 'flex-start', flexDirection: 'column'}}>
            <StyledBox>
              <StyledText variant="body2">&nbsp;</StyledText>
              <h1 style={{marginBottom: 0, marginTop: -5,}}>
                  Notes
              </h1>
            </StyledBox>
            <IconButton
              onClick={() => {_showAddNewForm(!showAddNewForm)}}
            >
              <AddIcon fontSize="medium" />
            </IconButton>
          </FlexView>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FlexView style={{alignItems: 'right', justifyContent: 'flex-end', flexDirection: 'row'}}>
          <div style={{width: '40%', marginRight:20}}>
            <Picker
              value={`${currentYear}`}
              handleChange={(value:string) => dispatch(yearPickerSet(Number(value)))}
              data={
                [getCurrentYear,getCurrentYear-1, getCurrentYear-2].map(item => {
                  return {
                    key: `${item}`,
                    value: `${item}`
                  }
                })
              }
            />
            
            </div>
            <div style={{width: '40%', marginRight:20}}>
              <Picker
                value={empPicker}
                handleChange={(value:string) => dispatch(empPickerSet(value))}
                data={
                  Object.keys(global.dataKeys).map(item => {
                    return {
                      key: `${global.dataKeys[item]}`,
                      value: `${item}`
                    }
                  })
                }
              />
            </div>
          </FlexView>
        </Grid>
        { filterDisplay() }
      {
      dataDisplayed.map((item:I_note, i:number) => (
        <Grid key={`file-box-${item.emp}-${i}`} item xs={12} sm={12} md={9}>
          <FlexView style={{alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'column', paddingBottom: 16}}>
            <div contentEditable data-id={item.id} onBlur={(e)=>{
              updateData(
                'date',
                e.target.getAttribute('data-id'),
                e.target.innerText,
              )
              }}>
              {item.date}
            </div>
            <FlexView style={{justifyContent: 'space-between'}}>
            <div style={{flexGrow:1}} data-id={item.id} onClick={(e)=>{
              _MDeditorDbId(
                Number(item.id)
              ),
              _showMDEditor(true)
              }}>
              <div>
              {mdToComponent(item.comment)}
              </div>  
              </div>
              <IconButton data-id={item.id} onClick={() => {
                //deleteData(item.id as number)
                deleteTarget = item.id as number
                _openDeleteDialog(true)
              }}>
                <DeleteIcon fontSize="small" />
              </IconButton> 
              <IconButton data-id={item.id} onClick={() => {
                _showAddNewForm(true)
                _editorDbId(
                  Number(item.id)
                )
              }}>
                <EditIcon fontSize="small" />
              </IconButton> 
            </FlexView>
            <Divider style={{width: '100%'}} />
            <FlexView style={{alignItems: 'left', justifyContent: 'flex-end', flexDirection: 'row',paddingTop: 20}}>
              <Stack direction="row" spacing={1}>
                {item.tags.map((t,ii) => (
                  <Chip key={`tags-${t}-${ii}`} label={t} variant="outlined" onClick={() => addTag(t)} />
                ))}
              </Stack>            
            </FlexView>
          </FlexView>


        </Grid>
      ))
      }


      </Grid>
  </Layout>
  )
}

export default IndexPage
