import React, {useState, useEffect, SetStateAction} from 'react'
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FlexView from './flexView';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';


interface Iprops {
  file:string
  update?:Function
}

const FileEditor = (props:Iprops) => {
  const [open, setOpen] = React.useState(false);
  const [fileData, _fileData] = useState([])
  const [sourceDir, _sourceDir] = useState([])
  useEffect(() => {
    global.ipcRenderer.addListener('REQUEST_FILE_DATA_RESPONSE', (_event, data?:[]) => _fileData(data))
    global.ipcRenderer.addListener('REQUEST_SYSTEM_RESPONSE_SOURCE_DIR', (_event, data?:[]) => _sourceDir(data))
    global.ipcRenderer.addListener('SAVE_FILE_DATA_RESPONSE', (_event, data?:[]) => {
    
      setOpen(true)
      _fileData(data)
    })
  }, [])

  useEffect(() => {
    global.ipcRenderer.send('REQUEST_FILE_DATA', props.file)
  },[])

  const save = () => {
    global.ipcRenderer.send('SAVE_FILE_DATA', props.file, fileData)
  }
  const openExternal = (file) => {
    //Todo: global.shell.openPath(`${sourceDir}${file}`)
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

  return (
    <FlexView style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'left'}}>
      <div style={{width: '100%'}}>
        <TextareaAutosize
          aria-label="minimum height"
          minRows={3}
          placeholder="File Data"
          style={{width:'100%', background:'#081018', color: 'white', border:'none', fontSize:16}}
          value={fileData}
          onChange={(e:React.ChangeEvent<{ value: unknown }>) => _fileData(e.target.value as SetStateAction<any[]>)}
        />
      </div>
      
      <FlexView style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <div>
          <IconButton onClick={() => save()} color="primary" aria-label="Save" component="span">
            <SaveIcon />
          </IconButton>
        </div>
        <div>
          <IconButton onClick={() => openExternal(props.file)} color="primary" aria-label="Save" component="span">
            <OpenInNewIcon />
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
  )
}

FileEditor.defaultProps = {
  update: () => {}
}


export default FileEditor