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
import FlexView from '../components/styledFlexView'
import {Card} from '../components/charts/cardDesign'
import { 
  faComment,
  faBolt, 
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { T_annotationDataSet, T_annotationRawData } from '../dataTypes/annotations';
import { dayStringFormatter, monthStringFormatter } from '../utils/dateHelpers';


const IndexPage = () => {

 
  const currentYear = useAppSelector((state) => state.yearPicker.value);

  const [dataAnnotations, _dataAnnotations] = useState([])

  
  useEffect(() => {


    global.ipcRenderer.addListener('DATA_RESPONSE_ANNOTATIONS', (_event, data?:T_annotationRawData) => {
      
      if (!data || !Array.isArray(data)) return null;

      const _data = data.map((item, i):T_annotationDataSet => {
        const tags = item[5] ? item[5].split(',') : []
        return {
          y: item[0],
          m: item[1],
          d: item[2],
          title: item[3],
          body: item[4],
          tags
        }
      })
      _dataAnnotations(_data)


    })




  }, [])

  useEffect(() => {
    global.ipcRenderer.send('REQUEST_DATA', 'ANNOTATIONS')
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
    fontSize: 60,
    padding: '0px 20px 20px 20px',
    width: 100,
    alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'row'
  }))
  const DateDisplay = styled('div')(({ theme }) => ({
    fontSize: 14,
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

  return (
    <Layout title="Settings | Expenses App">
      <Grid container spacing={4}>
        <Grid item xs={12} sm={9}>
          <FlexView style={{alignItems: 'flex-start', flexDirection: 'column'}}>
            <StyledBox>
              <StyledText variant="body2">&nbsp;</StyledText>
              <h1 style={{marginBottom: 0, marginTop: -5,}}>
                  Annotations log book
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
          {
            
          dataAnnotations.map((item,i) => (
            <Grid key={`card-${i}`} item xs={12} sm={12} md={10}>
              <Card style={{padding:'30px 30px 0px 30px'}}>

              <FlexView style={{alignItems: 'flext-start', justifyContent: 'flex-start', flexDirection: 'row', paddingTop: 20}}>
                <IconBox><FontAwesomeIcon icon={faComment} /></IconBox>
                <FlexView style={{alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'column', paddingBottom: 16}}>
                  <DateDisplay>{item.y}-{monthStringFormatter[`${item.m}`]}-{dayStringFormatter[item.d]}</DateDisplay>
                  <h2 style={{marginBottom: 5, marginTop: 0,}}>
                    {item.title}
                  </h2>
                  <Body>{item.body}</Body>
                  <Divider style={{width: '100%'}} />
                  <FlexView style={{alignItems: 'left', justifyContent: 'flex-end', flexDirection: 'row',paddingTop: 20}}>
                    <Stack direction="row" spacing={1}>
                      {item.tags.map((t,ii) => (
                        <Chip key={`tags-${t}-${ii}`} label={t} variant="outlined" />
                      ))}
                    </Stack>                
                  </FlexView>
                </FlexView>
              </FlexView>

              </Card>
            </Grid>
          ))
          }

       



      </Grid>
  </Layout>
  )
}

export default IndexPage
