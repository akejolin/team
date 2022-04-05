import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

interface Iprops {
  id: string
  list: {key:string, value:string}[]
  onChange?(value):void
  buttonText?:string
}

export const PositionedMenu = (props: Iprops) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
    if (event.currentTarget.getAttribute('data-value')) {
      props.onChange(event.currentTarget.getAttribute('data-value'))
    }
  };

  return (
    <div>
      <Button
        id={`positioned-button-${props.id}`}
        aria-controls={open ? `positioned-menu-${props.id}` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {props.buttonText}
      </Button>
      <Menu
        id={`positioned-menu-${props.id}`}
        aria-labelledby={`positioned-button-${props.id}`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {
        props.list.map(item => (
          <MenuItem data-value={item.value} onClick={handleClose}>{item.key}</MenuItem>
        ))}
      </Menu>
    </div>
  );
}

PositionedMenu.defaultProps = {
  buttonText: 'Select'
}

export default PositionedMenu