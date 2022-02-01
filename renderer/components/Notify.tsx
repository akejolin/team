import React, {useState, useEffect, SetStateAction} from 'react'
import ListItem from './ListItem'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { useAppSelector } from "../redux/hooks";

import type {Ilog} from '../redux/actionLog/slice'

type Props = {}

const Notify = ({}: Props) => {
  const [open, setOpen] = React.useState(false);
  const actionLog = useAppSelector((state) => state.actionLog.value)
  
  useEffect(() => {
    setOpen(true)
  }, [actionLog])

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false);
  };

  const snackBarAction = (
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


    const notification:Ilog = actionLog.length > 0 
      ? 
        {
          action: actionLog[actionLog.length -1].action,
          description: actionLog[actionLog.length -1].description,
        }
      : 
        null
    
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      message={`${notification ? notification.action : ''}, ${notification ? notification.description : ''}`}
      action={snackBarAction}
    />
  )
}

export default Notify
