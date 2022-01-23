import React from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles';

export const StyledFlexView = styled('div')(({ theme }) => ({
    height: '100%',
    width: '100%',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }))

export default StyledFlexView