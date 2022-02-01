import React from 'react'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import Editor from '../../components/editorMD/Editor'
import FlexView from '../../components/styledFlexView'


interface Iprops{
  showCloseCB?(state:boolean): void,
  update?(): void,
  dbid: number,
  settings: {
    dataType: string,
    formId: string
  },
  headline?: string
}



export const EditorWrapper = (props:Iprops) => {
  const handleKeyPress = (event) => {
    console.log(event.key)
    if(event.key === 'w'){
      props.showCloseCB(false)
    }
  }
  return (
    <div style={{position: 'fixed', overflow:'auto',top: 0, left:0, zIndex: 10, padding: 20, width: '100%', height: '100vh', background: 'rgba(0,0,0,0.9)'}}>
      <FlexView style={{height: 'auto', justifyContent: 'space-between'}}>
        <div>
          <h3>{props.headline ? props.headline : 'Edit'}</h3>
        </div>
        <div>
          <IconButton onClick={() => props.showCloseCB(false)}>
            <CloseIcon fontSize="medium" />
          </IconButton>
        </div>
      </FlexView>
      <div style={{overflow:'auto'}}>
        <Editor
          dbid={props.dbid}
          settings={props.settings}
          update={(STATUS) => {
            if (STATUS === 'SUCCESS'){ 
              props.showCloseCB(false)
              props.update()
            } else {
              props.showCloseCB(true)
            }
          }}
        />
      </div>
  </div>
  )
}

export default EditorWrapper