import React from 'react'
import { Input, inputClasses } from '@mui/base/Input';
import { blue, grey } from '../../constants/Color';
import { styled } from '@mui/system';

function CInput({ placeholder, onChange, readOnly }) {
    return (
        <StyledInput placeholder={placeholder} onChange={onChange} readOnly={readOnly}/>
    )
}

const StyledInput = styled(Input)(
    ({ theme }) => `
  
    .${inputClasses.input} {
      box-sizing: border-box;
      width: 100%;
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.5;
      padding: 8px 12px;
      border-radius: 8px;
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
      background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
      &:hover {
        border-color: ${blue[400]};
      }
  
      &:focus {
        outline: 0;
        border-color: ${blue[400]};
        box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
      }
    }
  `,
);

export default CInput