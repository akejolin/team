import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FlexView from '../../components/styledFlexView'

export const Card = styled(FlexView)(({ theme }) => ({
  background:'radial-gradient(circle, rgba(16,32,52,1) 0%, rgba(14,29,46,1) 100%)',
  flexDirection: 'column',
  justifyContent: 'space-between',
  borderRadius: 10,
  boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px',
}))
export const ChartCard = styled(FlexView)(({ theme }) => ({
    background:'radial-gradient(circle, rgba(16,32,52,1) 0%, rgba(14,29,46,1) 100%)',
    minHeight: 350,
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 10,
    //boxShadow: 'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset',
    //boxShadow: 'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px',
    boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px',
    //boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
  }))

export const ChartCardTitle = styled('div')(({ theme }) => ({
    minHeight: 40,
    background: 'radial-gradient(circle, rgba(16,30,48,1) 0%, rgba(10,27,41,1) 100%)', // '#0a1a29',
    width: '100%',
    padding: '8px 10px',
    color: theme.palette.primary.main,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    fontSmooth: 'always',
    webkitFontSmoothing: 'antialiased',
    fontSize: 13,
  })) 