import { useState, useEffect } from 'react'
import Link from 'next/link'
import MUILink from '@mui/material/Link';
import Layout from '../components/Layout'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FlexView from '../components/styledFlexView'
import FileEditor from '../components/FileEditor'
import {Card} from '../components/charts/cardDesign'
import { 
  faComment,
  faCogs,
  faFile,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { T_annotationDataSet, T_annotationRawData } from '../dataTypes/annotations';
import { dayStringFormatter, monthStringFormatter } from '../utils/dateHelpers';

import { add as pickerAdd, remove as pickerRemove} from "../redux/calcPickerSettings/slice";

import {isBrowser} from '../utils/isBrowser'


const IndexPage = () => {
  const picker = useAppSelector((state) => state.calcPickerSettings.latest)
  const dispatch = useAppDispatch()
  const [sourceDir, _sourceDir] = useState([])
  const [sourceFiles, _sourceFiles] = useState([])
  
  if(isBrowser) {
    global.ipcRenderer.addListener('REQUEST_SYSTEM_RESPONSE_SOURCE_FILES', (_event, data?:[]) => _sourceFiles(data))
    global.ipcRenderer.addListener('REQUEST_SYSTEM_RESPONSE_SOURCE_DIR', (_event, data?:[]) => _sourceDir(data))
  }

  useEffect(() => {
    global.ipcRenderer.send('REQUEST_SYSTEM', 'SOURCE_DIR')
    global.ipcRenderer.send('REQUEST_SYSTEM', 'SOURCE_FILES')
  },[])
  
  

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

  return (
    <Layout title="Settings | Expenses App">
      <Grid container spacing={4}>
        <Grid item xs={12} sm={9}>
          <FlexView style={{alignItems: 'flex-start', flexDirection: 'column'}}>
            <StyledBox>
              <StyledText variant="body2">&nbsp;</StyledText>
              <h1 style={{marginBottom: 0, marginTop: -5,}}>
                  Settings
              </h1>
            </StyledBox>
          </FlexView>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FlexView style={{alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row'}}>
            <div style={{width: '20%'}}>
              
            </div>
          </FlexView>
        </Grid>
            <Grid  item xs={12} sm={12} md={9}>
              <Card style={{padding:'30px 30px 0px 30px'}}>
              <FlexView style={{alignItems: 'flext-start', justifyContent: 'flex-start', flexDirection: 'row', paddingTop: 20}}>
                <IconBox><FontAwesomeIcon icon={faCogs} /></IconBox>
                <FlexView style={{alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'column', paddingBottom: 16}}>
                  <h2 style={{marginBottom: 5, marginTop: 0,}}>
                    Data settings
                  </h2>

                  <TextField style={{width:'100%', background:'black', color: 'white'}} disabled id="data-source-location" label={`Data source folder location`} variant="outlined" value={sourceDir} />



                </FlexView>
              </FlexView>

              </Card>
            </Grid>

       

      {sourceFiles.map(item => (
        <Grid key={`file-box-${item}`} item xs={12} sm={12} md={9}>
          <Card style={{padding:16}}>
          <FlexView style={{justifyContent: 'space-between', flexDirection: 'row', paddingTop: 0}}>
            <FlexView onClick={()=>dispatch(pickerAdd(item))} style={{cursor: 'pointer', alignItems: 'flext-start', justifyContent: 'flex-start', flexDirection: 'row', paddingTop: 0}}>
              <FileDisplay><FontAwesomeIcon icon={faFile} /></FileDisplay>
              <FileDisplay><span>{item}</span></FileDisplay>
            </FlexView>
            <FileDisplay style={{cursor: 'pointer'}} onClick={()=>openExternal(item)}><FontAwesomeIcon icon={faExternalLinkAlt} /></FileDisplay>
          </FlexView>
          <Divider style={{width:'100%'}} />
          <FlexView style={{alignItems: 'flext-start', justifyContent: 'flex-start', flexDirection: 'row', paddingTop: 0}}>
            {picker.find(f => f === item) && (<FileEditor file={item} />)}
          </FlexView>
          </Card>
        </Grid>
      ))}



      </Grid>
  </Layout>
  )
}

export default IndexPage
