
import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



type Props = {
  id: string
  isOpen: boolean
  title: string
  desc: string
  onConfirm(): void
  onDeny(): void
}

const DialogComponent = (props: Props) => (
  <Dialog
    open={props.isOpen}
    aria-labelledby={`alert-${props.id}-labelby`}
    aria-describedby={`alert-${props.id}-desc`}
  >
    <DialogTitle id={`alert-${props.id}-title`}>
      {props.title}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id={`alert-${props.id}-description`}>
      {props.desc}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => props.onDeny()}>No</Button>
      <Button onClick={() => props.onConfirm()} autoFocus>Yes</Button>
    </DialogActions>
  </Dialog>
)

export default DialogComponent